<template>
  <div class="warp">
      <el-dialog   :visible.sync="showdia">
         <el-form :model="newad"  ref="newad" label-width="100px" class="form">
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="newad.address" style="width:80% "></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="receiver">
                        <el-input v-model="newad.receiver" style="width:80% "></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="newad.phone" style="width:80% "></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="addad">确 认</el-button>
                    </el-form-item>
                </el-form>       
      </el-dialog>
      <el-row>
        <el-col :span="2" :offset="4">
          <el-button type="danger" @click="togglenewad" size="medium" plain>新建地址</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
              <el-table :data="addresses" style="width: 70%" highlight-current-row >
                        <el-table-column prop="address" label="地址"></el-table-column>
                        <el-table-column prop="receiver" label="联系人" width="180"></el-table-column>
                        <el-table-column prop="phone" label="联系方式" width="240"></el-table-column>
                        <!-- <el-table-column prop="rate" label=""></el-table-column>
                        <el-table-column prop="checknumber" label=""></el-table-column> -->
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" plain size="mini" @click.native.prevent="upgrate(scope.$index,addresses)">更新</el-button>
                                <el-button type="danger" plain size="mini" @click.native.prevent="delad(scope.$index,addresses)">删除</el-button>
                            </template>
                        </el-table-column>
      </el-table>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data:function() {
    return {
      addresses:[
        {
          address:"铜盘校区#10",
          phone:"15377777777",
          receiver:"哆啦A梦"
        },
        {
          address:"厦门美院",
          phone:"15377777777",
          receiver:"小智"
        },{
          address:"旗山校区#27",
          phone:"15377777777",
          receiver:"皮卡丘"
        }
        ],
      newad: {
        address:"",
        phone:"",
        reveiver:"",
        username:"",
        addressId:""
      },
      showdia: false,
      mode:0,
      modiindex:""
    }
  },
  computed:{
    userinfo:function() {
      let userinfo = window.sessionStorage.getItem("userinfo") ? window.sessionStorage.getItem("userinfo") : {username:"not"}
      return userinfo
    }
  },
  mounted:function() {
     let that=this;
            this.$http.get('/users/getAddress?username='+that.userinfo.username
                     ).then(function(res){
                        console.log(res);
                        if(res.data.code=="1") {
                            // console.log(res.data.data)
                            that.addresses = res.data.data
                        } else {
                            // that.$message.error("获取地址失败");
                        }
                     },(e)=>{
                         that.$message.error("请求失败");
                     });
  },
  methods:{
    togglenewad:function() {
      this.showdia =this.showdia === true ?  false :true
    },
    addad:function() {
        let that = this;
        let cache= JSON.parse(JSON.stringify(that.newad))
        if(this.mode == 0) {
        this.newad.username = this.userinfo.username;
        this.$http
        .post("/users/createAddress", cache)
        .then(function (res) {
          console.log(res);
          if (res.status == 200) {
            that.$message.success("添加成功");
          }
        });
        this.addresses.push(cache)
        this.showdia = false
      } else  {
        let cache= JSON.parse(JSON.stringify(that.newad))
        this.$http
        .post("/users/updateAddress", that.newad)
        .then(function (res) {
          console.log(res);
          if (res.status == 200) {
            that.$message.success("修改成功");
          }
        });
        this.addresses[this.modiindex] = cache
        this.mode = 0
        this.showdia = false
          this.newad={
            address:"",
            phone:"",
            reveiver:"",
            username:"",
            addressId:""
          }
      }
    },
    delad:function(index,adlist) {
      let that = this;
      this.$http
        .post("/users/deleteAddress",adlist[index])
        .then(function (res) {
          console.log(res);
          if (res.status == 200) {
            that.$message.success("删除成功");
          }
        });
        adlist.splice(index,1)
    },
    upgrate:function(index,adlist) {
      console.log(index)
      this.showdia = true;
      this.modiindex = index
      this.mode =1
      this.newad = adlist[index]
    }
  },
  props:{

  }
}
</script>
<style>
#app > div > div:nth-child(3) > div > div.el-dialog__wrapper > div {
  height: 40%;
  width: 45%;
  overflow: hidden;
}
</style>

<style scoped>
.warp {
  padding: 20px;
}
.el-table {
  margin: 20px auto;
}
</style>>
