<template>
    <el-container>
        <el-aside width="650px">
            <div class="bts">
                <el-button type="primary" icon="el-icon-s-home" size="medium" circle="" class="homebt" @click="toshop"></el-button>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-arrow-left" plain size="mini" disabled>上一个</el-button>
                    <el-button type="primary" plain size="mini" disabled>下一个<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
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
            <detailpanel :detail='gooddetail' @ordertoggle='ordertoggle' :justshow="justshow"></detailpanel> 
            <el-dialog title="下单"   :visible.sync="ordertogglestate">
                 <el-form :model="orderform"  ref="orderform" label-width="100px">
                    <el-form-item label="选择已有地址">
                         <el-select v-model="currentad" placeholder="请选择" style="width:50%"   @change="hdadcg">
                                <el-option
                                v-for="item in ads"
                                :key="item.address"
                                :item="item"
                                :value="item.str"
                                :label="item.str"
                                >
                                {{item.receiver}} {{item.address}} {{item.phone}}
                                </el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="联系人" prop="receiver">
                        <el-input v-model="orderform.receiver" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="orderform.address" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="orderform.phone" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="checked" disabled="oldad">保存该地址</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="orderclick">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-main>
    </el-container>
</template>
<script>
import detailpanel from '../components/detailpanel'
import Mock from "mockjs"
export default {
    data:function() {
        return {
            oldad:false,
            currentad:{},
            checked:false,
            gooddetail:{},
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
                receiver:"",
                address:"",
                phone:""
            },
            ads:[
        {
          address:"铜盘校区#10",
          phone:"15377777777",
          receiver:"哆啦A梦",
          str:"铜盘校区#10 15377777777 哆啦A梦"
        },
        {
          address:"厦门美院",
          phone:"15377777777",
          receiver:"小智",
          str:"厦门美院 15377777777 小智"
        },{
          address:"旗山校区#27",
          phone:"15377777777",
          receiver:"皮卡丘",
          str:"旗山校区#27 15377777777 皮卡丘"
        }
        ],
            justshow:false
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
        // let good=this.$route.query
        // // console.log(good)
        // let that=this;
        //     this.$http.get('/goods/getDetails?goodsId='+good.goodid,{
        //                      "content-type":"application/json"
        //                  }
        //              ).then(function(res){
        //                 // console.log(res);
        //                 if(res.data.state=="1") {
        //                     this.gooddetail=JSON.parse(res.data.good)
        //                 } else {
        //                     that.$message.error("获取商品数据失败");
        //                 }
        //              },(e)=>{
        //                  that.$message.error("商品请求失败");
        //              });
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
        hdadcg:function(item) {
            let items= item.split(" ")
            console.log(items)
            this.orderform = {
                receiver:items[0],
                address:items[1],
                phone:items[2]
            }
            console.log(this.orderform);
        },
        bigize:function(index) {
            this.bigurl=this.urllist[index]
        },
        ordertoggle:function() {
            this.ordertogglestate =  this.ordertogglestate == true ? false : true; 
        },
        orderclick:function() {
            let that = this;
            this.$http.post('/user/orderGoods',that.orderform).then(function(res) {
                console.log(res)
                if(res.status==200) {
                    that.$message.success("已通知卖家，请保持联系方式畅通")
                }
            })
        },
        toshop:function() {
            this.$router.push({path:'/shop'})
        }
    },
    components:{
        detailpanel
    }
}
</script>
<style>
#app > div > section > main > section > main > div.el-dialog__wrapper > div {
    height: 60%;
    width: 40%;
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