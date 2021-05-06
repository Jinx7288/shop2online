<template>
  <div>
      <el-table :data="userlist" style="width: 100%" highlight-current-row >
                        <el-table-column prop="username" label="用户名" width="250"></el-table-column>
                        <el-table-column prop="state" label="状态" width="100px"></el-table-column>
                        <el-table-column prop="lasttime" label="最后登录时间" width="270"></el-table-column>
                        <!-- <el-table-column prop="modifyTime" label="修改时间" width="180"></el-table-column> -->
                        <el-table-column prop="badgoods" label="违禁商品数"></el-table-column>
                        <el-table-column prop="checknumber" label="待审核数"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" plain size="mini" @click.native.prevent="unfreeze(scope.$index,userlist)" v-show="check(scope.$index)">解除冻结</el-button>
                                <el-button type="danger" size="mini" @click.native.prevent="freeze(scope.$index,userlist)" v-show="!check(scope.$index)">冻结</el-button>
                            </template>
                        </el-table-column>
                        </el-table>
  </div>
</template>

<script>
export default {
  name: 'test',
  data:function() {
    return {
        userlist:[
          {
            username:"test",
            state:0,
            lasttime:"2021 04 04 22 00",
            badgoods:"0",
            checknumber:"3"
          },
          {
            username:"demoforsign",
            state:1,
            lasttime:"2021 05 04 22 00",
            badgoods:"1",
            checknumber:"3"
          },{
            username:"adminsssss",
            state:0,
            lasttime:"2021 05 04 22 00",
            badgoods:"3",
            checknumber:"0"
          },
        ]
    }
  },
  created:function() {
      let that=this;
            this.$http.get('index/getUsers'
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
  },
  methods:{
      check:function(index) {
        if(this.userlist[index].state == 0) {
          return false
        } else {
          return true
        }
      },
      freeze:function(index,list) {
          let that = this;
          this.userlist[index].state = "1"
        this.$http
        .post("/auth/freezeUser", {
            username:list[index].username
        })
        .then(function (res) {
          // console.log(res);
          if (res.status == 200) {
            that.$message.success("冻结成功！");
          }
        });
      },
      unfreeze:function(index,list) {
          let that = this;
          this.userlist[index].state = "0"
        this.$http
        .post("/auth/freezeUser", {
            username:list[index].username
        })
        .then(function (res) {
          // console.log(res);
          if (res.status == 200) {
            that.$message.success("解冻成功！");
          }
        });
      }
  },
  props:{
    item: {
            type: Array,                 //可指定接收类型，如:Array.
            default:() => []   //可设置默认值
        },
        index:{
            type: Number
        }
  }
}
</script>
<style scoped>
</style>>