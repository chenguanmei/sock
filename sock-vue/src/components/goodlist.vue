<template>
    <div class="app-goodlist">
        <div class="goodlist">
            <div class="gooditem" v-for="item in list" :key="item.pid">
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
</template>
<script>
    export default {
        data(){
            return{
                list:[]
            }
        },
        methods:{
            getlist(){
                this.$http.get("goodlist").then(result=>{
                    this.list=result.body
                    //console.log(this.list);
                })
            },
            jump(pid){
                this.$router.push("/home/goodinfo?pid="+pid);
                this.$store.commit("chgShow",true);
            }
        },
        created(){
            this.getlist();
        }
    }
</script>
<style>
    .app-goodlist{
        background:#fff;
        margin-top:30px;
    }
    .app-goodlist .goodlist{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        margin:10px;
    }
    .app-goodlist .goodlist .gooditem{
        width:49%;
        /*border:1px solid #ff7c09;*/
        padding:5px 2px;
        margin:10px 0;
        height:230px;
    }
    .app-goodlist .goodlist .gooditem img{
        width:100%;
        height:50%;
    }
    .app-goodlist .goodlist .gooditem .buy{
        font-size:10px;
        background:#ff7c09;
        color:#fff;
        margin-right:6px;
    }
    .app-goodlist .goodlist .gooditem .add{
        font-size:10px;
        background:#ff7c09;
        color:#fff;
    }
    .price,.title{
        margin:0 5px;
    }
    .app-goodlist .price{
        color:#ff7c09;
    }
    .app-goodlist .title{
        color:#000;
    }
    .app-goodlist .ps{
        display:flex;
        justify-content:space-between;
    }
</style>