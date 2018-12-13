<template>
    <div class="app-cart">
        <div class="d1">
            <p class="p1"><span class="shopcart">购物车</span><span class="mag">管理</span></p>
            <p class="p2">共{{sum}}件商品</p>  
        </div>
        <div class="d2">    
            <table>
                <thead>
                    <tr class="t1">
                        <td style="width:10%">
                            <input type="checkbox" id="cg" class="inptall">
                        </td>
                        <td style="width:20%">
                            <router-link to="/home">
                            零食工坊
                            </router-link>
                        </td>
                        <td style="width:50%" class="quan">
                            领券
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key="item.id" class="t2">
                        <td>
                            <input type="checkbox" class="inpt1"/>
                        </td>
                        <td>
                            <img :src="item.img">
                        </td>
                        <td>
                            <tr class="title">
                                <td colspan="2">{{item.title}}</td>
                            </tr>
                            <tr>
                                <td class="price" style="width:60%">￥{{item.price.toFixed(2)}}</td>
                                <td style="width:40%">
                                    <a class="btn1" @click="goodsub(item.id)">-</a>
                                    <input type="number" class="inpt2" :value="item.count">
                                    <a class="btn1" @click="goodadd(item.id)">+</a>
                                </td>
                            </tr>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d4">
            <!--<input type="checkbox" class="inpt1">
            <span class="allsel">全选</span>-->
            合计：<span class="price">￥{{getSum.toFixed(2)}}元</span>
            <router-link to="/home/pay" class="calcu">结算</router-link>
        </div>
        <div class="d3">
            <h5>你可能还喜欢</h5>
            <div class="goodlist">
                <div class="gooditem" v-for="item in list1" :key="item.pid">
                    <img :src="item.img" @click="jump(item.pid)">
                    <p class="title">{{item.title}}</p>
                    <p class="ps">
                        <span class="price">价格：￥{{item.price.toFixed(2)}}</span>
                        <span class="sale">{{item.sale}}人付款</span>
                    </p>
                    <button class="buy">立即购买</button>
                    <button class="add">加入购物车</button>
                </div>
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
                sum:"1"
            }
        },
        methods:{
            /*获取购物车信息 */
            getCart(){
                this.$http.get("cart").then(result=>{
                    this.list=result.body;
                    this.sum=result.body.length;
                })
            },
            /*可能喜欢 */
            getlist(){
                this.$http.get("goodlist").then(result=>{
                    this.list1=result.body
                })
            },
            /*数量加减 */
            goodsub(id){
                if(this.list[id-1].count<10){
                  this.list[id-1].count--;
              }
            },
            goodadd(id){
                if(this.list[id-1].count>1){
                  this.list[id-1].count++;
                }
            },
            /*全选 */
            selectAll(){            
                var chbAll=document.getElementById("cg");
                chbAll.onclick=function(){
                    var chbAll=this;
                    var chbs=document.querySelectorAll(".app-cart .inpt1");
                    for(var chb of chbs){
                        chb.checked=chbAll.checked;
                    }
                }
                //设置定时器，给一些时间，这样就会等到页面全部加载完之后，再查找元素，就可以找到了。
                setTimeout(function(){
                    var chbs=document.querySelectorAll(".app-cart .inpt1");
                    for(var chb of chbs){
                        chb.onclick=function(){
                            var chb=this;
                            //查找一个未被选中的
                            var nocheck=document.querySelector(".app-cart .inpt1:not(:checked)");
                            if(nocheck==null){
                                chbAll.checked=true;
                            }else{
                                chbAll.checked=false;
                            }
                        }
                    }
                },1000)
            },
            //可能喜欢里的商品跳转
            jump(pid){
                this.$router.push("/home/goodinfo?pid="+pid);
                this.$store.commit("chgShow",true);
            }
        },
        created(){
            this.getCart();
            this.getlist();
        },
        mounted(){
            this.selectAll();
        },
        computed:{
            getSum:function(){
                var sum=0;
                for(var item of this.list){
                    sum+=item.price*item.count;
                }
                return sum;
            }
        }
    }
</script>
<style>
    .app-cart{
        margin-top:30px;
        position:relative;
    }
    /*背景 */
    .app-cart .d1{
        height:65px;
        background:#ff7c09;
    }
    .app-cart .p1,.app-cart .p2{
        height:20px;
        line-height:25px;
        padding:5px 15px;
        color:#fff;
    }
    .app-cart .p1{
        display:flex;
        justify-content:space-between;
    }
    .app-cart .p2,.app-cart .mag{
        font-size:14px;
        font-weight:100;
    }
    .app-cart .shopcart{
        font-size:20px;
    }  
    .app-cart .d2{
        width:96%;
        margin:0 8px;
        background:#fff;
    }
    .app-cart .d2 img{
        width:50px;
        height:50px;
    }
    .app-cart table{
        width:100%;
        margin:10px 15px;
        font-size:15px;
    }
    .app-cart table td{
        margin-right:10px;
        word-wrap:break-word;
    }
    .app-cart thead{
        margin:10px;
    }
    .app-cart thead tr{
        height:44px;
    }
    .app-cart img{
        width:40px;
        height:40px;
    }
    .app-cart .price{
        color:#ff7c09;
    }
    .app-cart a{
        color:#000;
    }
    .app-cart table .t1{
        height:40px;
    }
    .app-cart table .t2{
        height:60px;
    }
    .app-cart .inpt1,.app-cart .inptall{
        width:15px;
        height:15px;
        /*border-radius:50%;
        background:#fff;*/
    }
    .app-cart .inpt2,.app-cart .btn1{
        display:block;
        width:25px;
        height:25px;
        line-height:25px;
        text-align:center;
        border:1px solid #ccc;
        float:left;
    }
    .app-cart .inpt2{
        width:30px;
    }
    .app-cart table .t2 tr{
        height:33px;
    }
    .app-cart .quan{
        text-align:center;
    }
    /*可能喜欢 */
    .app-cart .d3{
        margin-top:20px;
    }
    .app-cart .goodlist{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        margin:10px;
    }
    .app-cart .goodlist .gooditem{
        width:49%;
        /*border:1px solid #ff7c09;*/
        padding:5px 2px;
        margin:5px 0;
        height:230px;
    }
    .app-cart .goodlist .gooditem img{
        width:100%;
        height:61%;
    }
    .app-cart .goodlist .gooditem .buy{
        font-size:10px;
        background:#ff7c09;
        color:#fff;
        margin-right:6px;
    }
    .app-cart .goodlist .gooditem .add{
        font-size:10px;
        background:#ff7c09;
        color:#fff;
    }
    .price,.title{
        margin:0 5px;
    }
    .app-cart .price{
        color:#ff7c09;
    }
    .app-cart .title{
        color:#000;
    }
    .app-cart .ps{
        display:flex;
        justify-content:space-between;
    }
    .app-cart .d2 table input{
        padding:0;
        font-size:14px;
    }
    .app-cart .d3 h5{
        color:#ff7c09;
        font-size:16px;
        text-align:center;
    }
    /*结算 */
    .app-cart .d4{
        width:100%;
        background:#fff;
        padding:5px;
        font-size:15px;
        position:fixed;
        bottom:50px;
        z-index:100;
    }
    .app-cart .allsel{
        margin-right:96px;
    }
    .app-cart .calcu{
        display:inline-block;
        padding:10px 27px;
        height:40px;
        background:#ff7c09;
        color:#fff;
        border-radius:10px;
        margin-left:140px;
    }
</style>