<template>
  <div class="box">
      <el-row>
          <el-col :span="4" :offset="0">
              <el-avatar shape="square" :size="100" :src="item.imgurl"></el-avatar>
          </el-col>
          <el-row :span="20">
              <p class="title">{{ item.title }}</p>
              <p class="msg">{{ item.msg}}</p>
              <p class="state">{{ item.state | replace }}</p>
          </el-row>
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
</style>>
