<template>
    <div class="app-login">
        <div class="help">
            <span>帮助</span>
        </div>
        <div class="login">
            <div class="log-img">
                 <img src="../img/login.png">
            </div>
            <form action="#">
                <input type="text" placeholder="请输入您的账户" name="uname" class="uname" v-model="unameval">
                <input type="password" placeholder="请输入您的密码" name="upwd" class="upwd" v-model="upwdval">
                <input type="button" value="登录" @click="getlogin" class="log">
                <p>
                    <a href="#" class="forget">忘记密码</a>
                    <a href="#" class="register">注册</a>
                </p>
            </form>
        </div>
    </div>
</template>
<script>
    import {Toast} from "mint-ui"; 
    export default {
        data(){
            return{
                unameval:"",
                upwdval:""
            }
        },
        methods:{
            getlogin(){
                //console.log(1223)
                var u=this.unameval;
                var p=this.upwdval;
                this.$http.get("login?uname="+u+"&upwd="+p).then(result=>{
                    if(result.body.code==1){
                        Toast(result.body.msg);
                        this.$router.push("/");
                    }else{
                        Toast(result.body.msg);
                    }
                })
            }
        }
    }
</script>
<style>
    .app-login{
        width:100%;
        height:800px;
        margin-top:30px;
        background:#fff;
        text-align:center;
    }
    .app-login .help{
        height:30px;
        width:95%;
        color:#000;
        margin:0 auto;
        margin-top:15px;
        padding-top:15px;
    }
    .app-login .help span{
        float:right;
    }
    .app-login .login{
        width:100%;
    }
    .app-login .login form{
        width:95%;
        margin:0 auto;
    }
    .app-login .login form input{
        font-size:12px;
    }
    .app-login .log-img{
        width:98px;
        height:82px;
        margin:0 auto;
        margin-top:30px;
    }
    .app-login .log{
        width:100%;
        height:40px;
        color:#fff;
        background:#ff7c09;
        border-radius:15px;
        margin-bottom:15px;
    }
    .app-login form p{
        width:95%;
        margin:0 auto;
    }
    .app-login .forget{
        float:left;
        color:#000;
    }
    .app-login .register{
        float:right;
        color:#000;
    }
</style>