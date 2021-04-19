<template>
  <el-dialog title="修改密码"  width="70%">
        <el-row>
          <el-col :span="24">请输入您的用户名：<el-input v-model="user.username" placeholder=""></el-input></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">请输入您的注册邮箱：<el-input v-model="user.email" placeholder=""></el-input></el-col>
        </el-row>
        <el-row>
            <el-col :span="12" :offset='6'><el-button type="danger" @click="submit">重置</el-button></el-col>
        </el-row>
  </el-dialog>
</template>
<script>
// import 
export default {
    data:function() {
        return {
            user:{
                username:'',
                email:''
            }
        }
    },
    methods:{
        submit:function() {
            let that =this;
            this.$http.post('user/getPassword',that.user,{
                            "content-type":"application/json"
                        }
                    ).then(function(res){
                        if(res.data.code=="1") {
                            that.$message.success("修改成功"); 
                        } else {
                            that.$message.error(res.data.msg);
                        }
                    },(e)=>{
                        that.$message.error("请求失败");
                    }); 
        },
        close:function() {
            this.$emit.call();
        }
    }
};
</script>
<style scoped>

</style>