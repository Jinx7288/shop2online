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
                        <el-card class="box-card" shadow="hover" @click="gotologin">
                            <div class="zi zi_usercheck icon_size3 zi_inverse"></div>
                            <div>我有账户，登录</div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="box-card" shadow="hover" @click="gotosignup">
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
        <headbar @rendergoods = "rendergoods" class="headbar"></headbar>

        <div style="margin:0px 80px">
             <goodcard v-for="(item,index) in goodList"
                    :key="item.goodid"
                    :item='item'
                    :index='index'
                    class="goodcard"
                    @togglelogin="togglelogin"></goodcard>
        </div>
       
    </div>
    
</template>
<script>
import goodcard from '../components/goodcard.vue'
import headbar from '../components/headbar'
import biglabel from "../components/biglabel"
// import test from '../components/test'
export default {
    data:function() {
        return {
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
    },
    methods:{
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
            this.$http.get('index/getGoods?mode=0&page=1&size=20'
                     ).then(function(res){
                        console.log(res);
                        if(res.data.code=="1") {
                            console.log(res.data.data)
                            // this.goodList=JSON.parse(res.data.data)
                            that.goodList=res.data.data
                        } else {
                            that.$message.error("获取数据失败");
                        }
                     },(e)=>{
                         that.$message.error("请求失败");
                     });
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
    display: inline-block;
    margin: 11px 20px;
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