<template>
  <div class="back">
    <el-header>
    <el-button type="danger" disabled>删除选中</el-button>
    </el-header>
    <el-main>
        <goodcardper v-for="(item,index) in goods"
            :key="item.goodid"
            :item='item'
            :index='index'
            class="goodcard">
            <div @click="togglefloat(item)">
            </div>
            </goodcardper>
    </el-main>
  </div>
</template>

<script>
import goodcardper from "../personalcenter/goodcardper"
import Mock from 'mockjs'

export default {
  data:function() {
    return {
      // goods:[
      // {
      //   goodsId:"232",
      //   seller:"admin",
      //   date:"20210520",
      //   msg:"head for a good"
      // }
      // ]
    }
  },
   computed:{
    userinfo:function() {
      let userinfo = window.sessionStorage.getItem("userinfo") ? window.sessionStorage.getItem("userinfo") : {username:"not"}
      return userinfo
    },
    goods() {
      let Random = Mock.Random;
      let list = []
      for(let i = 0;i<=10;i++) {
        let imgurl = "http://placekitten.com/g/500/500"
           let goods = Mock.mock(
        {
          "goodsid":"@natural(3444,4444)",
          "seller":"@cname",
          "title":"@cparagraph(1)",
          "msg":"@cparagraph(1)",
          "state|1":[1,2,3,4,5],
          "imgurl":imgurl,
          "date":"@date('yyyy-MM-dd')"
        })
        list.push(goods)
      }
      return list
    }
  },

  mounted:function() {
     let that=this;
            this.$http.get('/users/getUserGoods', { headers: {
           'content-type': 'application/json',
           "token":window.sessionStorage.getItem("token")
        }}
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
  methods:{
    togglefloat:function(item) {
      
    }

  },
  components:{
    goodcardper
  }
}
</script>
<style scoped>
.el-button {
  margin: 10px;
}
.back {
    width: 70%;
    margin: 0px auto;
}
.goodcard {
    display: inline-block;
    margin: 11px 20px;
}
</style>>