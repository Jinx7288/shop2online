<template>
    <el-row>
      <el-col :span="12"><el-button type="danger" size="small" plain>价格升序</el-button><el-button type="danger" size="small" plain>价格降序</el-button></el-col>
      <el-col :span="6" :offset="6">
        <el-input placeholder="请输入内容" v-model="input">
            <el-button icon="el-icon-search" slot="append" @click="submitKw" v-model="keyword"></el-button>
        </el-input>
      </el-col>
    </el-row>    
</template>
<script>
export default {
    data:function() {
        return {
            keyword:''
        }
    },
    methods:{
        submitKw:function() {
            let kw=this.keyword;
            let that = this;
            this.$http.post('search',kw,{
                             "content-type":"application/json"
                         }
                     ).then(function(res){
                         console.log(res);
                        if(res.data.state=="1") {
                        // ! 处理数据，放进store里
                        } else {
                            that.$message.error("搜索失败");
                        }
                     },(e)=>{
                         that.$message.error("请求失败");
                     }); 
        }
    }
}
</script>
<style scoped>

</style>