<template>
  <div class="box">
      <el-row>
          <el-col :span="4" :offset="0">
              <el-avatar shape="square" :size="100" :src="item.imgurl" class="img"></el-avatar>
          </el-col>
          <el-col :span="16">
              <p class="title">{{ item.title }}</p>
              <p class="msg">{{ item.msg}}</p>
              <p class="state">{{ item.state | replace }}</p>
            <el-button type="danger" v-if="item.state==2">取消订单</el-button>
              <el-button type="info" v-if="item.state==3">申请重新审核</el-button>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data:function() {
    return {

    }
  },
  props:{
        item: {
            type: Object,              
            default:() => {
                imgurl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"

            }  
        },
        index:{
            type: Number
        }
  },
   filters: {
        replace: function (value) {
        if (!value) return ''
        value = value.toString()
        value=value.replaceAll("1","已购买")
        value=value.replaceAll("2","等待中")
        value=value.replaceAll("3","被屏蔽")
        value=value.replaceAll("4","已取消")
        value=value.replaceAll("5","其他")
        return value
    }
    }, 
}
</script>
<style scoped>
.img {
    position: relative;
    top: 50%;
    transform:translateY(50%)
}
.bt {
    margin: 40px 0px;
    position: relative;
    top: 50%;
    transform:translateY(50%)
}
.box {
    padding: 20px;
    background-color: rgb(230, 230, 230);
    border-radius: 20px;
    margin: 30px;
}
.title {
    color: rgb(255, 136, 136);
    font-size: 1.5em;
}
.state {
    padding: 3px;
    color: red;
    background-color: rgb(255, 212, 212);
    border: red 0.3px solid;
    border-radius: 2px;
    width: 4em;
}
</style>>
