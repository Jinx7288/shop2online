<template>
  <div>
      <el-button class="flab" type="text" size="medium" @click="ggbl(item.id)">{{item.name}}</el-button>
        <el-button
            type="danger"
            plain
            size="mini"
            v-for="tag in slabels"
            :key="tag.name"
            @click="ggbl(tag.id)">
            {{tag.name}}
            </el-button>
  </div>
</template>

<script>
export default {
  name: 'test',
  data:function() {
    return {
        slabels:[]
    }
  },
  created:function() {
         let that=this;
        //  console.log(that.item)
            this.$http.get('/index/getLabelByFid?fid='+that.item.id
                     ).then(function(res){
                        if(res.data) {
                            that.slabels=res.data.data
                            // console.log(JSON.parse(JSON.stringify(res.data.data)))
                        } else {
                            that.$message.error("获取数据失败");
                        }
                     },(e)=>{
                         that.$message.error("请求失败");
                     });
  },
  methods:{
      ggbl:function(lid) {
             let that=this;
            this.$http.get('/index/getGoodsByLabel?mode=0&page=1&size=20&labelId=0'+lid
                     ).then(function(res){
                        if(res.data) {
                            that.$emit("rendergoods",res.data.data)
                        } else {
                            that.$message.error("获取数据失败");
                        }
                     },(e)=>{
                         console.log(e)
                         that.$message.error("请求失败");
                     });
      }
  },
  props:{
    item: {
            type: Object,          
            default:() => {}
        },
        index:{
            type: Number
        }
  }
}
</script>
<style scoped>
.el-tag {
    margin: 0px 3px; 
}
</style>>
