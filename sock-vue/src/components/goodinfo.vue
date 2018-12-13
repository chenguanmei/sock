<template>
    <div class="app-goodinfo">
        <!--轮播图-->
         <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in list" :key="item.id">
                <img :src="item.img_url">
            </mt-swipe-item>
         </mt-swipe>
         <!--商品信息-->
        <div class="detail">
            <div class="d-header">
                <p class="price">￥{{list2.price.toFixed(2)}}</p>             
                <p class="title">{{list2.title}}</p>
                <p class="exp">
                    <span>快递：0.00</span>
                    <span>月销：{{list2.sale}}件</span>
                    <span>福建福州</span>
                </p>
            </div>
            <div class="mid"></div>
            <ul class="mui-table-view mui-table-view-chevron">
                    <li class="mui-table-view-cell mui-media">
                        <a class="mui-navigate-right">
                            <div class="mui-media-body">	
                                <p class='mui-ellipsis'>
                                    <span class="ptitle">优惠</span>
                                    <span class="con">购买可得20积分</span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a class='mui-navigate-right' href="javascript:;">
                            <div class="mui-media-body">
                                <p class='mui-ellipsis'>
                                    <span class="ptitle">服务</span>
                                    <span class="con">破损包退</span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a class="mui-navigate-right">
                            <div class="mui-media-body">
                                <p class='mui-ellipsis'>
                                    <span class="ptitle">规格</span>
                                    <span class="con">选择食品口味</span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a class="mui-navigate-right">
                            <div class="mui-media-body">
                                <p class='mui-ellipsis'>
                                    <span class="ptitle">参数</span>
                                    <span class="con">生产日期 品牌</span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media">
                        <a class="mui-navigate-right">
                            <div class="mui-media-body">
                                <p class='mui-ellipsis exp'>
                                    <span class="con">宝贝评价</span>
                                    <span class="comment">查看全部</span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <div class="viewcom">
                        <p class="ptitle">大鱼吃小鱼</p>
                        <p class="ucomment">味道很不错，还会继续购买</p>
                    </div>
			</ul>
            <div class="good">
               <span>————宝贝详情————</span>
            </div>
            <div class="d-img">
				<img src="http://127.0.0.1:3000/img/banner1.jpg">
                <img src="http://127.0.0.1:3000/img/banner2.jpg">
                <img src="http://127.0.0.1:3000/img/banner3.jpg">
                <img src="http://127.0.0.1:3000/img/banner4.jpg">
			</div>
			<div class="d-footer">
                <p class="ill">价格说明</p>
                <ul>
                    <li>
                        <p class="special"><span class="cir"></span>划线价格</p>
                        <p>商品的专柜加、吊牌价、正品零售价、厂商指导价或该商品的层级展示过的销售价等，<span class="special">并非原价</span>，仅供参考。</p>
                    </li>
                    <li>
                        <p class="special"><span class="cir"></span>未划线价格</p>
                        <p>商品的<span class="special">实时标价</span>，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</p>
                    </li>
                    <li>
                        <p><span class="cir"></span>商家详情页（含主图）以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。</p>
                    </li>
                    <li>
                        <p><span class="cir"></span>此说明仅当出现价格比较时有效，具体请参见《淘宝价格发布规范》。若商家单独对划线价格进行说明的，以商家的表述为准。</p>
                    </li>
                </ul>
            </div>
        </div>      
    </div>
</template>
<script>
    export default {
        data(){
            return{
                list:[],
                list2:[]
            }
        },
        methods:{
            getImg(){
                var pid=this.$route.query.pid;
                this.$http.get("goodinfo?pid="+pid).then(result=>{   
                    this.list=result.body.obj;
                    this.list2=result.body.obj2[0];
                })
            }
        },
        created(){
            this.getImg();
        }
    }
</script>
<style>
    .app-goodinfo p{
        margin:0;
        padding:0;
    }
    .app-goodinfo{
        background:#fff;
    }
    /*设置轮播图 */
    .app-goodinfo .mint-swipe{
        height:177px;
        width:400px;
        margin-top:30px;
    }
    .app-goodinfo .mint-swipe img{
        width:100%;
        height:100%;;
    }
    .app-goodinfo nav{
        z-index:1000;
    }
    /*商品详情 */
    .app-goodinfo .detail .d-header{
        padding:10px;
    }
    .app-goodinfo .detail .mid{
        height:15px;
        width:400px;
        margin-left:0;
        background:#f3f3f3;
    }
    .app-goodinfo .detail .d-header p{
        margin:5px auto;
    }
    .app-goodinfo .price{
        font-size:20px;
        color:red;
        font-weight:bold;
    }
    .app-goodinfo .title{
        font-size:18px;
        font-weight:bold;
        color:#000;
    }
    .app-goodinfo .exp{
        display:flex;
        justify-content:space-between;
    }
    .app-goodinfo .ptitle{
        font-size:12px;
        margin-right:15px;
    }
    .app-goodinfo .con{
        font-size:12px;
        color:#000;
    }
    .app-goodinfo .mui-table-view-cell:after{
        background:#fff;
    }
    .app-goodinfo .detail img{
        width:100%;
    }
    .app-goodinfo .detail img:first-child{
        margin-top:10px;
    }
    .app-goodinfo .detail .comment{
        color:#ff7c09;
        font-size:12px;   
    }
    .app-goodinfo .viewcom{
        margin:0 15px;
        padding-bottom:10px;
    }
    .app-goodinfo .ucomment{
        color:#000;
        font-size:12px;
    }
    .app-goodinfo .good{
        background:#f3f3f3;
        width:400px;
        font-size:12px;
        padding:9px 0;
    }
    .app-goodinfo .good span{
        margin-left:112px;
    }
    .app-goodinfo .d-footer{
        padding:15px;
    }
    .app-goodinfo .d-footer ul{
        list-style:none;
        padding-left:0;
        margin-top:0px;      
    }
    .app-goodinfo .d-footer ul li{
        margin-bottom:5px;
    }
    .app-goodinfo .d-footer p{
        font-size:10px;
    }
    .app-goodinfo .d-footer .cir{
        display:inline-block;
        width:4px;
        height:4px;
        background:#ff7c09;
        border-radius:50%;
        margin-bottom:3px;
        margin-right:5px;
    }
    .app-goodinfo .d-footer ul .special{
        color:#000;
        font-size:11px;
    }
    .app-goodinfo .d-footer .ill{
        color:#000;
        font-size:14px;
    }
</style>