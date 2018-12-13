<template>
 <div class="app-container">
    <!--顶部导航条-->
    <header>        
        <img src="./img/logo.png">       
    </header>
    <router-view></router-view>
     <!--选择规格-->
        <div class="bg"></div>
        <div class="spec">
            <div class="col">
                <span @click="close">&times;</span>
            </div>
            <div class="spec-i">
                <img :src="list.img">
            </div>
            <div class="spec-d">
                <p class="price">￥{{list.price}}</p>
                <p class="rest">库存{{list.rest}}件</p>
                <p class="choose">{{list.title}}</p>
            </div>
            <div class="spec-s">
                <p class="taste">食品口味</p>
                <button class="btn">{{list.title}}</button>
            </div>
            <div class="s-count">
                <span>购买数量</span>
                <div class="count">
                    <a class="s-sub" @click="subCon()">-</a>
                    <input type="numeber" value="1" v-model="n"/>
                    <a class="s-add" @click="addCon()">+</a>
                </div>
            </div>
            <div class="s-buy">
                <button @click="addCart" class="sure">确定</button>
            </div>
        </div>
    <!--底部导航栏-->
    <div v-if="$store.getters.hasShow">
        <nav class="mui-bar mui-bar-tab foot">
            <a class="mui-tab-item mui-active" @click="jump">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">店铺</span>
            </a>  
             <router-link class="mui-tab-item" to="home/goodlist">
                <span class="mui-icon mui-icon-extra mui-icon-extra-custom"></span>
                <span class="mui-tab-label">客服</span>
            </router-link>      
            <router-link class="mui-tab-item" to="/home/shopCart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-heart"></span>
                <span class="mui-tab-label">收藏</span>
            </router-link>
            <a class="mui-tab-item">
                <button class="add" @click="addToCart">加入购物车</button>
            </a>
            <router-link class="mui-tab-item" to="/home/shopCart">
                <button class="buy">立即购买</button>
            </router-link>
	    </nav>
     </div>
    <div v-else>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item mui-active" to="/">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>  
             <router-link class="mui-tab-item" to="/home/goodlist">
                <span class="mui-icon mui-icon-extra mui-icon-extra-hotel"></span>
                <span class="mui-tab-label">商城</span>
            </router-link>      
            <router-link class="mui-tab-item" to="/home/cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">
                        {{$store.getters.optCount}}
                    </span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link to="/home/login" class="mui-tab-item">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
	    </nav>
     </div>
 </div> 
</template>
<script>
    import {Toast} from "mint-ui";
    export default {
        data(){
            return{
                n:"1",
                list:[]
            }
        },
        methods:{
            //判断是否加载详情页的底部导航栏
            isShow(){
                var u=this.$route.path;
                if(u!="/home/goodinfo")
                    this.$store.commit("chgShow",false);
            },
            //选择规格里的添加购物车
            addCart(){
                var pid=this.$route.query.pid;
                this.$http.get("addCart?pid="+pid+"&count="+this.n).then(result=>{
                    var spec=document.querySelector(".spec");
                    var bg=document.querySelector(".bg");
                    spec.style.bottom="-420px";
                    bg.style.bottom="-800px";
                    //修改vuex共享数据
                    this.$store.commit("increment",this.n);
                    //this.$store.commit("substract");
                    this.n=1;
                    Toast("添加成功，在购物车等亲");
                })
            },
            //底部导航栏的添加购物车
            addToCart(){
                var spec=document.querySelector(".spec");
                var bg=document.querySelector(".bg");                                
                spec.style.bottom="0";
                bg.style.bottom="0";
                var pid=this.$route.query.pid;
                this.$http.get("goodinfo?pid="+pid).then(result=>{
                    this.list=result.body.obj2[0];
                    console.log(this.list);
                })
            },
            //当点击店铺时，底部导航栏要改变
            jump(){
                this.$router.push("/");
                this.$store.commit("chgShow",false);
                var spec=document.querySelector(".spec");
                var bg=document.querySelector(".bg");  
                spec.style.bottom="-420px";
                bg.style.bottom="-800px";
            },
            //关闭规则选择框
            close(){
                var spec=document.querySelector(".spec");
                var bg=document.querySelector(".bg");
                spec.style.bottom="-420px";
                bg.style.bottom="-800px";
            },
            //数量增减
            addCon(con){
                if(this.n<5000)
                    this.n++;
            },
            subCon(con){
                if(this.n>1)
                    this.n--;
            },
        },
        created(){
            this.isShow();
        }
    }
</script>
<style>
    /*底部导航栏 */
   .app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }
   .app-container .mui-bar-tab{
       background:#000;
   }
    .app-container .mui-bar-tab .mui-tab-item.mui-active {
        color: #ffb502;
    }
    .app-container .mui-bar-tab .mui-tab-item {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }
    .app-container .mui-bar-tab .mui-tab-item .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .app-container .mui-bar-tab .mui-tab-item .mui-icon~.mui-tab-label {
        font-size:11px;
        display:block;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    /*购物车背景*/
    .app-container .mui-icon .mui-badge{
        background:#ff7c09;
    }
 /*顶部导航条*/ 
    header{
        background:#000;
        color:#fff;
        width:100%;
        height:70px;
        position:fixed;
        top:0;
        left:0;
        z-index:1000;
    }
    header img{
        width:129px;
        height:40px;
        margin-top:15px;
        margin-left:15px;
    }
    /*详情页底部导航栏 */
    .app-container nav .add,.app-container nav .buy{
        padding:17px 0;
        color:#fff;
        border:0;
        width:79px;
        font-size:12px;
        border-radius:0;
        margin-bottom:0
    }
     .app-container nav .add{
         background:red;
     }
    .app-container nav .buy{
        background:#ff7c09;
    }
     /*背景层 */
    .bg{
        width:100%;
        height:800px;
        background:#000;
        opacity:0.8;
        position:fixed;
        bottom:-800px;
        z-index:10;
    }
    /*规格选择框 */
    .spec{
        width:100%;
        height:400px;
        background:#fff;
        position:fixed;
        bottom:-400px;
        z-index:100;
        border-radius:5px 5px 0 0;
        padding:15px;
        padding-top:5px;
    }
    .spec .col{
        height:22px;
    }
    .spec .col span{
        float:right;
        display:inline-block;
        width:20px;
        height:20px;
        text-align:center;
        border:1px solid #ccc;
        border-radius:50%;
    }
    .spec .spec-i{
        width:33%;
        float:left;
        height:120px;
    }
    .spec .spec-d{
        width:67%;
        float:left;
        height:120px;
        padding:15px;
    }
    .spec img{
        width:100px;
        height:80px;
        margin-top:10px;
    }
    .spec .price{
        color:#ff7c09;
        margin:0;
        font-size:18px;
        margin-bottom:4px;
    }
    .spec .rest,.spec .choose{
        margin-bottom:4px;
    }
    .spec .taste{
        color:#000;
        font-size:12px;
    }
    .spec .btn{
        background:pink;
        color:#ff7c09;
        border:1px solid #ff7c09;
        font-size:12px;
        margin-bottom:10px;
    }
    .spec .spec-s{
        border-bottom:1px solid #ddd;
    }
    .spec .s-count{
        padding:15px 10px;
        border-bottom:1px solid #ddd;
    }
    .spec .count{
        float:right;
    }
    .spec .s-count span{
        font-size:12px;
        color:#000;
    }
    .spec .count a,.spec .count input{
        display:inline-block;
        width:25px;
        height:25px;
        line-height:25px;
        text-align:center;
        color:#aaa;
        background:#ddd;
    }
    .spec .count input{
        color:#000;
        border:0;
        margin:0 2px;
    }
    .spec .s-buy{
        text-align:center;
        height:140px;
        /*padding-bottom:15px;*/
    }
    .spec .sure{
        width:95%;
        height:38px;
        color:#fff;
        background:#ff7c09;
        border-radius:15px;
        margin-top:70px;
    }
</style>
