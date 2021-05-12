<template>
    <el-row class="bar" align="middle">
    <el-col :span="6">
        <div class="btg">
            <el-button type="danger" plain @click="valueup">价格升序</el-button>
        <el-button type="danger" plain @click="valuedown">价格降序</el-button>
        </div>
    </el-col>
      <el-col :span="6" :offset="18">
        <el-input placeholder="请输入内容" v-model="keyword" class="search">
            <el-button icon="el-icon-search" slot="append" @click="submitKw"></el-button>
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
        valueup:function() {
             let that = this;
            // this.$http.get('index/getGoods?mode=1&page=1&size=20'
            //          ).then(function(res){
            //              console.log(res);
            //             if(res.status = "200") {
            //                 that.$emit('rendergoods',res.data.data)
            //             } else {
            //                 that.$message.error("获取失败");
            //             }
            //          },(e)=>{
            //              that.$message.error("请求失败");
            //          }); 
            that.$emit('valueup');
        },
        valuedown:function() {
             let that = this;
            // this.$http.get('index/getGoods?mode=0&page=1&size=20'
            //          ).then(function(res){
            //              console.log(res);
            //             if(res.status = "200") {
            //                 that.$emit('rendergoods',res.data.data)
            //             } else {
            //                 that.$message.error("获取失败");
            //             }
            //          },(e)=>{
            //              that.$message.error("请求失败");
            //          }); 
            that.$emit('valuedown');
        },
        submitKw:function() {
            let kw=this.keyword;
            let that = this;
            this.$http.get('/index/getGoodsByKeyword?mode=0&page=1&size=20&keyword='+kw
                     ).then(function(res){
                        //  console.log(res);
                        if(res.status = "200") {
                            that.$emit('rendergoods',res.data.data)
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
.bar {
    margin: 0px;
    height: 60px;
}
.search {
    position: relative;
    top:50%;
    transform:translateY(-50%);
}
.btg {
    position: relative;
    top:50%;
}
</style>