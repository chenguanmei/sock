<template>
    <div class="app-newsinfo">
        <div class="header">
            <img src="../img/newsinfo.jpg">
        </div>
        <div class="title">
            <h2>{{list.title}}</h2>
            <p>{{list.ntime | dateFilter}}</p>
        </div>
        <div class="content"> 
            <img :src="list.pic">
            <p>{{list.content}}</p>       
        </div>
        <div class="comment">
            <comment-box :nid="this.nid"></comment-box>
        </div>
    </div>
</template>
<script>
    import comment from "./comment.vue"
    export default {
        data(){
            return{
                list:[],
                nid:this.$route.query.nid
            }
        },
        methods:{
            getNewsInfo(){
                var nid=this.$route.query.nid;
                var url="newsinfo?nid="+nid;
                this.$http.get(url,{nid:nid}).then(result=>{
                     this.list=result.body[0];
                     console.log(this.list);
                })
            }
        },
        created(){
            this.getNewsInfo();
        },
        components:{
            "comment-box":comment
        }
    }
</script>
<style>
    .app-newsinfo{
        background:#fff;
    }
    .app-newsinfo .header img{
        width:100%;
        height:104px;
        margin-top:30px;
    }
    .app-newsinfo .title{
       width:90%;
       height:153px;
       margin:0 auto;
       margin-bottom:20px;
       border-bottom:1px solid #999;
    }
    .app-newsinfo .title h2{
        font-size:28px;
        color:#333;
        line-height:30px;
        font-weight:500;
        margin:23px 0;
    }
    .app-newsinfo .title p{
        font-size:14px;
        color:#999;
        line-height:20px;
        margin-top:10px;
    }
    .app-newsinfo .content{
        margin:0 20px;
        padding-bottom:40px;
    }
    .app-newsinfo .content p{
        text-indent:21pt;
        font-size:14px;
        line-height:28px;
        color:#333;
        margin:0 0 10px;
    }
    .app-newsinfo .content img{
        width:100%;
        height:268px;
    }
</style>