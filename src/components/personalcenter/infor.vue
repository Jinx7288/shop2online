<template>
  <div class="back">
    <el-button type="danger">删除选中</el-button>
           <goodcard v-for="(item,index) in goods"
                    :key="item.goodid"
                    :item='item'
                    :index='index'
                    class="goodcard"
                   ></goodcard>
  </div>
</template>

<script>
import goodcard from "../goodcard"
export default {
  data:function() {
    return {
      goods:[
      {
        goodsId:"232",
        seller:"admin",
        date:"20210520",
        msg:"head for a good"
      }
      ]
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
            this.$http.get('/users/getUserGoods?username='+that.userinfo.username
                     ).then(function(res){
                        console.log(res);
                        if(res.data.code=="1") {
                            console.log(res.data.data)
                            that.goods = res.data.data
                        } else {
                            that.$message.error("获取商品失败");
                        }
                     },(e)=>{
                         that.$message.error("请求失败");
                     });
  },
  props:{

  },
  components:{
    goodcard
  }
}
</script>
<style scoped>
.back {
    width: 70%;
    margin: 0px auto;
}
.goodcard {
    display: inline-block;
    margin: 11px 20px;
}
</style>>