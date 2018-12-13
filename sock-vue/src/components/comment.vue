<template>
    <div class="app-comment">
        <h3>评论列表</h3>
        <hr>
        <!--发表评论区-->
        <textarea placeholder="写评论……" maxlength="120" v-model="msg"></textarea>
        <mt-button size="large" @click="postComment">发表评论</mt-button>
        <!--显示评论区-->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in list" :key="item.id">
                <div class="cmt-info">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;&nbsp;&nbsp;发表时间：{{item.ctime | dateFilter}}
                </div>
                <div class="cmt-body">
                    {{item.content}}
                </div>
            </div>
        </div>
        <mt-button size="large" @click="getMore" class="seeall">查看全部评论</mt-button>
    </div>
</template>
<script>
    import {Toast} from "mint-ui";
    export default {
        data(){
            return{
                msg:"",  //双向绑定用户评论
                pageIndex:0,
                pageSize:3,
                list:[],
                hasMore:true,
                pageCount:2
            }
        },
        methods:{
            postComment(){
                var nid=this.nid;  //向父组件要了id
                var msg=this.msg;
                if(msg.trim().length==0){
                    Toast("评论内容不能为空");
                    return;
                }
                this.$http.post("postcomment",{nid:nid,msg:msg}).then(result=>{
                    Toast("评论成功");
                    this.msg="";
                    //评论成功以后重新加载
                    this.pageIndex=0;
                    this.list=[];
                    this.getMore();
                })
            },
            getMore(){
                this.pageIndex++;
                this.hasMore=this.pageIndex<=this.pageCount;
                if(!this.hasMore){
                    var b=document.querySelector(".app-comment .seeall");
                    b.innerHTML="没有更多评论了";
                    return;
                }
                var p=this.pageIndex;
                var s=this.pageSize;
                var nid=this.nid;
                this.$http.get("getcomment?nid="+nid+"&pno="+p+"&pageSize="+s).then(result=>{
                   var rows=this.list.concat(result.body.data);
                   this.list=rows;
                   this.pageCount=result.body.pageCount;
                })
            }
        },
        created(){
           this.getMore()
        },
        props:["nid"]
    }
</script>
<style>
    .app-comment{
        margin:15px;
    }
    .app-comment .mint-button{
        background:#fff;
        color:#ff7c09;
        border:1px solid #ff7c09;
        margin:10px 0;
        font-size:14px;
    }
    .app-comment textarea{
        border:1px solid #ff7c09;
        color:#ff7c09;
        margin-bottom:0;
    }
    .app-comment hr{
        border:1px solid #ff7c09;
        margin-top:10px;
    }
    .app-comment .cmt-item{
        font-size:14px;
    }
    .app-comment .cmt-list .cmt-info{
        line-height:30px;
    }
    .app-comment .cmt-list .cmt-body{
        line-height:35px;
        text-indent:2em;
    }
</style>