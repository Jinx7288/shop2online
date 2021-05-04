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
            <detailpanel :detail='gooddetail' @ordertoggle='ordertoggle' :justshow="justshow" @deletegood='deletegood'></detailpanel> 
            <el-dialog title="下单"   :visible.sync="ordertogglestate">
                 <el-form :model="orderform"  ref="orderform" label-width="100px">
                    <el-form-item label="姓名" prop="title">
                        <el-input v-model="orderform.title" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone" style="width:70%">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in ads"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                </el-option>
                            </el-select>
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
export default {
    data:function() {
        return {
            fit:"fill",
            gooddetail:['标题，样式','777',
            '详细信息，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，',
            '联系方式','用户id，啊不会还得写用户主页吧'],
            urllist:[
                
            ],
            bigurl:'',
            ordertogglestate:false,
            orderform:{
                buyer:"",
            },
            ads:[],
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
    },
    methods:{
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