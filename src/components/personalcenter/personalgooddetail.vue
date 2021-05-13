<template>
    <el-container>
        <el-aside width="650px">
            <div class="bts">
                <el-button type="primary" icon="el-icon-back" size="medium" circle="" class="homebt" @click="toper"></el-button>
            </div>
            <div style="float:right">
                <div class="bigpic">
                    <el-image
                        style="width: 100%; height: 100%"
                        :src="bigurl"
                        :fit="fit">
                    </el-image>
                </div>
                <ul>
                    <li class="block" v-for='(item,index) in urllist' :key="index" :index='index' :item="item">
                        <div class="smallpic"  @mouseenter="bigize(index)">
                            <el-image
                                style="width: 100px; height: 100px"
                                :src="item"
                                :fit="fit">
                            </el-image>
                        </div>
                    </li>
                </ul>
            </div>
        </el-aside>
        <el-main>
            <detailpanel2 :detail='gooddetail' @ordertoggle='ordertoggle' :justshow="justshow"></detailpanel2> 
        </el-main>
    </el-container>
</template>
<script>
import detailpanel2 from '../detailpanel2'
import Mock from "mockjs"

export default {
    data:function() {
        return {
            fit:"fill",
            urllist:[
                "http://placekitten.com/g/200/200",
                "http://placekitten.com/g/205/220",
                "http://placekitten.com/g/260/230",
                "http://placekitten.com/g/270/240",
                "http://placekitten.com/g/260/230",
            ],
            bigurl:'',
            ordertogglestate:false,
            orderform:{
                buyer:"",
            },
            ads:[],
            justshow:false,
            gooddetail:{}
        }
    },
    // computed:{
    //     bigurl:function() {
    //         return this.urllist[0]
    //     }
    // },   // ! 计算属性不能直接修改
    beforeRouteEnter (to, from, next) {
    next(vm => {
      if(from.path === "/info"){
        vm.justshow = true;
      }
    });
    },
    created:function() {
        let good=this.$route.query
        // console.log(good)
        let that=this;
            this.$http.get('/goods/getDetails?goodsId='+good.goodid,{
                             "content-type":"application/json"
                         }
                     ).then(function(res){
                        // console.log(res);
                        if(res.data.state=="1") {
                            this.gooddetail=JSON.parse(res.data.good)
                        } else {
                            that.$message.error("获取商品数据失败");
                        }
                     },(e)=>{
                         that.$message.error("商品请求失败");
                     });
        this.bigurl=this.urllist[0];
              // this.bigurl=this.urllist[0];
            let Random = Mock.Random;
            Random.extend({
                tag: function(date) {
                    var tags = ['女装','女裙','女上装','手机','手机数码','摄像机','充电宝','排插','墙纸','键盘','主机','显卡','娱乐','剧本杀','主机','掌机','其他'];
                    return this.pick(tags)
                }
            })
                let imgurl = "http://placekitten.com/g/300/300";
                let tags =[]
                for(let i = 1;i<=3;i++) {
                tags.push(Random.tag())
                }
                let goods = Mock.mock({
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
        this.gooddetail= goods
    },
    methods:{
        bigize:function(index) {
            this.bigurl=this.urllist[index]
        },
        ordertoggle:function() {
            this.ordertogglestate =  this.ordertogglestate == true ? false : true; 
        },
        toper:function() {
            // this.$router.push({path:'/personalcenter'})
            this.$router.go(-1)
        }
    },
    components:{
        detailpanel2
    },
    computed:{

    }
}
</script>
<style>
#app > div > section > main > section > main > div.el-dialog__wrapper > div {
    height: 60%;
    border-radius: 20px;
    overflow: hidden;
}
</style>
<style scoped>
.el-aside {
    overflow-x: hidden;
}
.homebt {
    margin-right: 30px;
}
.bigpic {
    margin-top: 40px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    height: 400px;
    padding: 0px;
    /* border: black 1px solid; */
}
.bts {
    position: relative;
    top:3%;
    left: 10%;
}
.smallpic {
    width: 30px;
    height: 30px;
    display: inline;
}
ul {
    list-style: none;
    margin: 20px;
}
.block {
    display: inline;
    padding: 10px 5px;
    margin: 0px;
    width: 20%;
}
.el-image:hover {
    box-shadow: rgb(241, 191, 191) 0px 0px 2px 2px;
}
</style>