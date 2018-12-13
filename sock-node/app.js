//1.加载模块
const express=require("express");
const pool=require("./pool.js");
//2.创建express对象
var app=express();
//2.1加载跨域访问模块
const cors=require("cors");
//2.2配置允许哪个程序哪个端口访问
app.use(cors({
    origin:["http://127.0.0.1:3001","http://localhost:3001"],
    credentials:true
}))
//3.指定静态目录
app.use(express.static(__dirname+"/public"));
//4.绑定监听窗口
app.listen(3000);

//一：首页图片、广告、新闻
app.get("/home",(req,res)=>{
    var obj=[
        {id:1,img_url:"http://127.0.0.1:3000/img/banner1.jpg"}, 
        {id:2,img_url:"http://127.0.0.1:3000/img/banner2.jpg"},
        {id:3,img_url:"http://127.0.0.1:3000/img/banner3.jpg"},
        {id:4,img_url:"http://127.0.0.1:3000/img/banner4.jpg"},
		{id:5,img_url:"http://127.0.0.1:3000/img/banner5.jpg"},
    ];
    var obj1=[
        {id:1,img_url:"http://127.0.0.1:3000/img/pic1.png",title1:"零食选的好，工作没烦恼",title2:"同事都爱吃，好吃的让人叫起来"},
        {id:2,img_url:"http://127.0.0.1:3000/img/pic2.png",title1:"休闲，健康，时尚",title2:"你喜欢的美味，我都有"},
        {id:3,img_url:"http://127.0.0.1:3000/img/pic3.png",title1:"酸、甜、苦、辣、咸",title2:"吃到的幸福远不止一种味道"},
    ]
    
     //新闻列表
     //1.参数 当前页码 每页大小
     var pno=req.query.pno;
     var pageSize=req.query.pageSize;
     //2:sql
     //2.1 查找总记录数=>转换成总页数
     var sql="select count(nid) as c from news";
     var obj2={}; //保存客户端发送的数据
     var progress=0;  //进度
     pool.query(sql,(err,result)=>{
         if(err) throw err;
         var c=Math.ceil(result[0].c/pageSize);  //共有多少页
         obj2.pageCount=c;
         progress+=50;
         if(progress==100){
             res.send({obj,obj1,obj2});
         }
     });
     var sql="select * from news limit ?,?";
     var offset=parseInt((pno-1)*pageSize);  //分页偏移量
     pageSize=parseInt(pageSize);
     pool.query(sql,[offset,pageSize],(err,result)=>{
         if(err) throw err;
         obj2.data=result;
         progress+=50;
         if(progress==100){
            res.send({obj,obj1,obj2});  //有两句语句要执行，看谁后执行完，谁就发送结果
         }   
     })
})

//三：新闻详情页
app.get("/newsinfo",(req,res)=>{
    var nid=parseInt(req.query.nid);
    console.log(nid)
    var sql="SELECT * FROM news WHERE nid=?";
    pool.query(sql,[nid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//四：用户发表新闻评论
const qs=require("querystring");
app.post("/postcomment",(req,res)=>{
    req.on("data",(buf)=>{
        var str=buf.toString();  //将参数转为字符串
        var obj=JSON.parse(str);  //将字符串转为对象
        var msg=obj.msg;
        var nid=parseInt(obj.nid);
        var sql="INSERT INTO comments(user_name,content,ctime,nid) VALUES('匿名',?,now(),?)";
        pool.query(sql,[msg,nid],(err,result)=>{
            if(err) throw err;
            res.send({code:1,msg:"添加成功"})
        })
    })
})

//五：显示当前新闻下的所有评论
app.get("/getcomment",(req,res)=>{
     //评论列表
     //1.参数 当前页码 每页大小
     var nid = parseInt(req.query.nid);
     var pno=req.query.pno;
     var pageSize=req.query.pageSize;
     //2:sql
     //2.1 查找总记录数=>转换成总页数
     var sql="select count(nid) as c from comments where nid=?";
     var obj={}; //保存客户端发送的数据
     var progress=0;  //进度
     pool.query(sql,[nid],(err,result)=>{
         if(err) throw err;
         var c=Math.ceil(result[0].c/pageSize);  //共有多少页
         obj.pageCount=c;
         progress+=50;
         if(progress==100){
             res.send(obj);
         }
     });
     var sql="select * from comments where nid=? order by id desc limit ?,?";
     var offset=parseInt((pno-1)*pageSize);  //分页偏移量
     pageSize=parseInt(pageSize);
     pool.query(sql,[nid,offset,pageSize],(err,result)=>{
         if(err) throw err;
         obj.data=result;
         progress+=50;
         if(progress==100){
            res.send(obj);  //有两句语句要执行，看谁后执行完，谁就发送结果
         }   
     })
})

//六、显示商品列表
app.get("/goodlist",(req,res)=>{
    var sql="select * from sock";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//七、显示商品详情
app.get("/goodinfo",(req,res)=>{  
    var obj=[
        {id:1,img_url:"http://127.0.0.1:3000/img/banner1.jpg"}, 
        {id:2,img_url:"http://127.0.0.1:3000/img/banner2.jpg"},
        {id:3,img_url:"http://127.0.0.1:3000/img/banner3.jpg"},
        {id:4,img_url:"http://127.0.0.1:3000/img/banner4.jpg"}
    ];
    var pid=req.query.pid;
    var sql="select * from sock where pid=?"
    pool.query(sql,[pid],(err,result)=>{
        if(err) throw err;
        var obj2=result;
        res.send({obj,obj2});
    })
})

//八、显示购物车信息
app.get("/cart",(req,res)=>{
    var sql='select s.title,s.price,s.img,c.count,c.id from sock s,cart c where s.pid=c.pid';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//九、加入购物车
app.get("/addCart",(req,res)=>{
    var pid=req.query.pid;
    var count=req.query.count;
    var sql1="select * from cart where pid=?"
    pool.query(sql1,[pid],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            var sql="insert into cart values(null,?,?)";
            pool.query(sql,[pid,count],(err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        }else{
            var sql="update cart set count=count+? where pid=?";
            pool.query(sql,[count,pid],(err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        }
    })   
})

//十、用户登录
app.get("/login",(req,res)=>{
    var uname=req.query.uname;
    var upwd=req.query.upwd;
    var sql="SELECT count(id) as c FROM user WHERE uname=? AND upwd=md5(?)"
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result[0].c==0){
            res.send({code:-1,msg:"用户名或密码错误"})
        }else{
            res.send({code:1,msg:"登录成功"}) 
        }
    })
})
