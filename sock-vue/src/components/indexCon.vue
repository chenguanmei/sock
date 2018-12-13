<template>
    <div class="app-home">
        <!--首页轮播图-->
        <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in list" :key="item.id">
                <img :src="item.img_url">
            </mt-swipe-item>
        </mt-swipe>
        <div class="sock">
            <h1>带你吃遍生活的每一个角落</h1>
            <p>美味与你共享</p>
            <div v-for="item in list1" class="rec">
                <img :src="item.img_url">
                <p>
                    {{item.title1}}<br>
                    {{item.title2}}
                </p>
            </div>
        </div>
        <div class="sock1">
            <img src="../img/pic.png">
        </div>
        <div class="zs">
            <h1>招商加盟</h1>
            <div class="sock2"></div>
            <h4>选对<span>品牌</span>成功创业</h4>
            <h4>致力于打造中国最具价值的零食专卖连锁品牌</h4>
            <div class="sock3">
                <p>凭借完善的“连锁品牌专卖”经营模式，</p>
                <p>专业、专注、专心，成就领先品牌，带您创业无忧！</p>
            </div>
            <a href="#" class="btn">了解详情</a>
        </div>
        <div class="news">
            <h1>企业动态</h1>
            <p>精彩报道为您呈现，让你实时了解最新动态</p>
            <div class="sock4">
                <div class="news-list" v-for="item in list2">
                    <img :src="item.pic">
                    <h5>{{item.title}}</h5>
                    <div class="date">{{item.ntime}}</div>
                    <p>{{item.content}}</p>
                    <div class="more">
                        <router-link :to="'/home/newsinfo?nid='+item.nid">More</router-link>
                    </div>      
                </div>
                <mt-button class="seemore" @click="getMore">了解更多企业动态</mt-button>
            </div>
        </div>  
        <div class="footer">
            <div class="left">
                <img src="../img/logo.png">
                <p>
                    总部地址：南京市建邺区河西万达广场商务E座32层<br>
                    客服电话：400 812 9099<br>
                    团购热线：18052036065（耿经理）<br>
                    市场合作：18052036953（王经理）
                </p>
                <div class="sock5">          
                  <a href="#">关于我们</a>
                  <a href="#">官方商城</a>
                  <a href="#">招商加盟</a>
                  <a href="#">联系我们</a>
                </div>
            </div>
            <div class="right">
                <img src="../img/weibo.png">
                <p>扫码关注官方微博</p>
                <img src="../img/weixin.png">
                <p>扫码关注官方微信</p>
            </div>
        </div>   
    </div>
</template>
<script>
    export default {
        data(){
            return{
                list:[],
                list1:[],
                list2:[],
                pageIndex:0,
                pageSize:3,
                hasMore:true,
                pageCount:2  //总页数
            }
        },
        methods:{
            getMore(){
                this.pageIndex++;
                this.hasMore=this.pageIndex<=this.pageCount;
                if(!this.hasMore){return}
                var url="home?pno="+this.pageIndex+"&pageSize="+this.pageSize;
                this.$http.get(url).then(result=>{
                    this.list=result.body.obj;
                    this.list1=result.body.obj1;
                    //this.list2=result.body.obj2.data;
                    var rows=this.list2.concat(result.body.obj2.data); //直接把空的list2和查询到的结果连接在一起
                    this.list2=rows;
                    this.pageCount=result.body.obj2.pageCount;
                })
            }
        },
        created(){
            this.getMore();
        }
    }
</script>
<style>
    .app-home{
        background:#fff;
        font:12px 微软雅黑, Arial;
        color:rgb(51, 51, 51);
    }
    a{
        text-decoration:none;
    }
    /*设置轮播图 */
    .app-home .mint-swipe{
        height:177px;
        width:100%;
        margin-top:30px;
    }
    .app-home .mint-swipe img{
        width:100%;
        height:100%;;
    }
    .app-home h1{
        font-size:28px;
        text-align:center;
        margin-top:15px;
        color:rgb(51,51,51)
    }
    .app-home .sock p{
        font-size:20px;
        color:#666;
        text-align:center;
        margin:20px 0;
        font-weight:300;
    }
    /*中间部分*/
    .app-home .rec{
        width:94%;
        height:350px;
        margin:20px auto;
        border-bottom:1px solid #ddd;
    }
    .app-home .rec img{
        width:100%;
        height:276px;
    }
    .app-home .rec p{
        font-size:16px;
        text-align:center;
    }
    .app-home .sock1{
        width:94%;
        height:177px;
        margin:0 auto;
        margin-top:30px;
    }
    .app-home .sock1 img{
        width:100%;
    }
    .app-home .zs{
        width:94%;
        height:435px;
        padding-left:5%;
        padding-right:5%;
        padding-top:20px;
        background:#f6f6f6;
        margin:0 auto;
    }
    .app-home .zs h1{
        font-size:30px;
        text-align:left;
    }
    .app-home .zs .sock2{
        width:143px;
        height:4px;
        background:#333;
        margin-top:30px;
        margin-bottom:40px;
    }
    .app-home .zs h4{
        font-size:18px;
        line-height:24px;
    }
    .app-home .zs h4 span{
        color:#ff7c09;
    }
    .app-home .zs h4+h4{
        color:#666;
        font-weight:500;
        margin-top:8px;
        margin-bottom:15px;
    }
    .app-home .zs p{
        font-size:16px;
        margin-bottom:6px;
        text-align:left;
    }
    .app-home .zs .sock3{
        margin-top:20px;
        margin-bottom:50px;
    }
    .app-home .zs .btn{
        display:block;
        width:194px;
        height:46px;
        padding-left:18px;
        font-size:14px;
        color:#979797;
        box-sizing:border-box;
        border:2px solid #979797;
        line-height:46px;
    }
    /*企业动态 */
    .app-home .news{
        width:90%;
        margin:0 auto;
        margin-top:10px;
        padding-bottom:30px;
    }
    .app-home .news .sock4{
        margin-top:20px;
    }
    .app-home .news .sock4 .news-list{
        margin-bottom:15px;
    }
    .app-home .news h1{
        font-size:28px;
        padding:0 10px;
    }
    .app-home .news p{
        font-size:20px;
        color:#666;
        font-weight:300;
        margin-top:20px;
        margin-bottom:10px;
        height:50px;
        overflow: hidden;  /*超出部分隐藏*/ 
        text-overflow:ellipsis;
       /* white-space:nowrap;*/
    }
    .app-home .news img{
        width:100%;
        height:251px;
    }
    .app-home .news .news-list h5{
        font-size:18px;
        margin-top:10px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        color:#333;
        font-weight:bold;
    } 
    .app-home .news .news-list .date{
        font-size:16px;
        color:#666;
        margin-top:10px;
    }
    .app-home .news .news-list p{
        font-size:14px;
        line-height:24px;
        height:70px;
        overflow:hidden;
        margin-top:10px;
    }
    .app-home .news .news-list .more{
        width:60px;
        height:25px;
        font-size:12px;
        line-height:25px; 
        text-align:center;
        margin-top:10px;
        border:1px dashed #ffb502;
    }
    .app-home .news .news-list .more a{
         color:#ffb502;
    }
    .app-home .news .sock4 .seemore{
        background:#fff;
        border:1px solid #ffb502;
        color:#ffb502;
        font-size:14px;
        text-align:center;
    }
     /*底部*/
    .app-home .footer{
        width:100%;
        height:400px;
        padding:40px 20px;
        background:#000;
        margin-bottom:0;
    }
    .app-home .footer .left{
        float:left;
        width:70%;
    }
    .app-home .footer .left img{
        width:80%;
        vertical-align:middle;
    }
    .app-home .footer .left p{
        font-size:15px;
        line-height:26px;
        color:#f7f7f7;
        margin-top:20px;
    }
    .app-home .footer .left .sock5{
        margin-top:20px;
    }
    .app-home .footer .left a{
         font-size:16px;
         color:#fff;
         line-height:30px;
         display:inline-block;
         margin-right:30px;
     }
    .app-home .footer .right{
        float:left;
        width:30%;
        margin-top:43px;
        text-align:center;
    }
   .app-home .footer .right img{
        width:82px;
        height:82px;
    }
    .app-home .footer .right p{
        font-size:14px;
        color:#fff;
        width:82px;
        margin:0 auto;
        margin-bottom:10px;
    }
</style>