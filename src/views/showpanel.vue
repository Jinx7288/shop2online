<template>
    <div class="showpanel">
        <div class="sthtest">
            <el-dialog
                center
                title="您还未登录"
                :visible.sync="showlogin"
                width="30%">
                <el-row>
                    <el-col :span="12">
                        <el-card class="box-card" shadow="hover" @click.native="gotologin">
                            <div class="zi zi_usercheck icon_size3 zi_inverse"></div>
                            <div>我有账户，登录</div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="box-card" shadow="hover" @click.native="gotosignup">
                            <div class="zi zi_userplus icon_size3 zi_inverse">
                            </div>
                            <div>没有,现在注册</div>
                        </el-card>
                    </el-col>
                </el-row>                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="togglelogin">随便看看</el-button>
                </span>
            </el-dialog>
        </div>
        <el-row type="flex">
            <el-col :span="11" :offset="1">
                 <div class="labelbox">
                    <biglabel v-for="item in labels"
                        :key="item.name"
                        :item='item'
                        @rendergoods="rendergoods"></biglabel>
                 </div>
            </el-col>
            <el-col :span="12" :offset="2">
                   <div class="carousel">
            <el-carousel :interval="2500" height="300px">
                <el-carousel-item v-for="item in carousellist" :key="item">
                    <el-image :src="item" fit="fill"></el-image>
                </el-carousel-item>
            </el-carousel>
        </div>
            </el-col>
        </el-row>
        <headbar @rendergoods = "rendergoods" class="headbar" @valueup="valueup" @valuedown="valuedown"></headbar>

        <div style="margin:0px auto" v-infinite-scroll="load">
             <goodcard v-for="(item,index) in goodList"
                    :key="item.goodid"
                    :item='item'
                    :index='index'
                    class="goodcard"
                    @togglelogin="togglelogin"></goodcard>
                     <p v-if="true" style="margin:0px 45%">加载中...</p>
        </div>
       
    </div>
    
</template>
<script>
import goodcard from '../components/goodcard.vue'
import headbar from '../components/headbar'
import biglabel from "../components/biglabel"
import Mock from "mockjs"
// import test from '../components/test'
export default {
    data:function() {
        return {
             timer:"",
            goodList:[
            ],
            showlogin:false,
            carousellist:[
                "https://www.fzu.edu.cn/attach/2015/03/07/86281.jpg",
                "https://www.fzu.edu.cn/attach/2015/03/07/86277.jpg",
                "https://www.fzu.edu.cn/attach/2015/03/07/86273.jpg",
                "https://www.fzu.edu.cn/attach/2015/03/07/86279.jpg",
            ],
            labels:[]
        }
    },
    components:{
        goodcard,
        biglabel,
        headbar,
    },
    created:function() {
        this.getGoodsList();
        this.getlabels();
        let that = this
        // this.timer =setInterval(this.qesmsg, 8000);
    },
    methods:{
        load() {
            
        },
          qesmsg:function() {
            let that = this;
            //   this.$http
            //     .post("/auth/getmsg", {
            //         userid:userinfo
            //     })
            //     .then(function (res) {
            //     console.log(res);
            //     if (res.status == 200) {
            //         that.$message.success(res.data.msg);
            //     }
            //     });
            // console.log("sth")
            that.$message.info("您有新消息！")
        },
        valueup:function() {
            let that = this
            this.goodList = that.goodList.sort((a,b)=> a.price-b.price)
        },
        valuedown:function() {
            let that = this
            this.goodList=that.goodList.sort((a,b)=> b.price-a.price)
        },
        rendergoods:function(item) {
            this.goodList = item
        },
        getlabels:function() {
               let that=this;
            this.$http.get('/index/getLabelByFid?fid=0'
                     ).then(function(res){
                        if(res.data) {
                            // console.log(res.data)
                            that.labels=res.data.data
                            console.log(JSON.parse(JSON.stringify(that.labels)))
                        } else {
                            that.$message.error("获取数据失败");
                        }
                     },(e)=>{
                         that.$message.error("请求失败");
                     });
        },
        getGoodsList:function() {
            let that=this;
            // this.$http.get('index/getGoods?mode=0&page=1&size=20'
            //          ).then(function(res){
            //             console.log(res);
            //             if(res.data.code=="1") {
            //                 console.log(res.data.data)
            //                 // this.goodList=JSON.parse(res.data.data)
            //                 that.goodList=res.data.data
            //             } else {
            //                 that.$message.error("获取数据失败");
            //             }
            //          },(e)=>{
            //              that.$message.error("请求失败");
            //          });

                        let Random = Mock.Random;
                        Random.extend({
                            tag: function(date) {
                                var tags = ['女装','女裙','女上装','手机','手机数码','摄像机','充电宝','排插','墙纸','键盘','主机','显卡','娱乐','剧本杀','主机','掌机','其他'];
                                return this.pick(tags)
                            }
                        })
                        let clist = []
                        for(let i = 0;i<=40;i++) {
                            let imgurl = "http://placekitten.com/g/300/300";
                            let tags =[]
                            for(let i = 1;i<=3;i++) {
                            tags.push(Random.tag())
                            }
                            let goods = Mock.mock(
                            {
                            "goodsid":"@natural(3444,4444)",
                            "title":"@cword(5,13)",
                            "msg":"@cparagraph(4,5)",
                            "state|1":[1,2,3,4,5],
                            "imgurl":imgurl,
                            "price":"@natural(10,500)",
                            "phone":"@natural(13000000000,19900000000)",
                            "seller":"@cname",
                            "date":"@date",
                            "tags":tags
                            })
                            clist.push(goods)
                        }
        this.goodList = clist
        this.$store.commit('shareGoods',that.goodList);
        },
        togglelogin:function() {
        this.showlogin= this.showlogin == true ? false : true
        },
        gotologin:function() {
            this.$router.push({ path:"/login"})
        },
        gotosignup:function() {
            this.$router.push({ path:"/register"})
        }
    },
}
</script>
<style>
#app > div > section > main > div > div.sthtest > div > div {
    height: 50%;
    overflow: hidden;
}
</style>
<style scoped>
.labelbox {
    padding: 10px;
    border-radius: 10px;
    margin-bottom:10px ;
    border:rgb(255, 110, 110) 0.3px solid;
    background-color: rgb(255, 223, 223);
}
.headbar {
    width: 85%;
    margin: 0px auto;
}
.carousel {
    width: 90%;
    margin: 10px 30px 0px 0px;
}
.showpanel {
    margin-top: 40px;
}
.goodcard {
    /* display: inline-block;
    margin: 11px auto; */
    display: inline-block;
    margin: 30px;
    height: 250px;
    width: 250px;
}
.box-card {
    padding-left: 35px;
    height: 189px;
    background-color: rgb(255, 203, 203);
    color: rgb(100, 100, 100);
}
.spantext {
   font-size: 15px;
   color: rgb(32, 30, 30);
}
.icon_size3 {
    font-size: 5rem;
}
</style>