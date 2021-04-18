<template>
    <div class="warp_for_login">
        <div class="box">
            <el-row>
                <el-col :span="6" :offset="6">
                    <img src="..\..\public\logo.png">
                </el-col>
            </el-row>
            <el-row>
                    <el-col :span="24"><el-input prefix-icon="el-icon-user" type="text" v-model="logininfo.username" placeholder="请输入用户名/邮箱"  maxlength="20" minlength="1" clearable></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><el-input prefix-icon="el-icon-key" type="password" v-model="logininfo.password" placeholder="请输入您的密码" maxlength="15" minlength="8" clearable ></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><el-button type="danger" @click="login">登录</el-button></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><el-button type="danger" plain @click="switchto">还未注册？点击注册</el-button></el-col>
                </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logininfo:{
                username:'test',
                password:'123456Cc*'
            }
        }
    },
    methods:{
        login:function() {
            let that=this;
            this.$http.post('login',that.logininfo,{
                             "content-type":"application/json"
                         }
                     ).then(function(res){
                         console.log(res);
                        if(res.state=="1") {
                           that.$message.success("登录失败"); 
                            window.sessionStorage.setItem('token',JSON.stringify(data.token));
                            window.sessionStorage.setItem('userinfo',JSON.stringify(that.logininfo.username));
                            that.$router.replace({ path:'/shop' })
                        } else {
                            that.$message.error("登录失败");
                        }
                     },(e)=>{
                         that.$message.error("登录失败");
                     }); 
        },
        switchto:function() {
            let that = this;
            that.$router.push({ path:'/register' })
        }
    }
}
</script>

<style scoped>
.warp_for_login {
    background-color: rgb(250, 186, 184);
    padding: 5px;
    height: 100%
}
.box {
    margin: 20vh auto;
    padding: 20px;
    border:none;
    border-radius: 10px;
    background-color: rgba(253, 253, 253, 0.616);
    width: 400px;
    line-height: 10px;
    font-size: large;
}
.el-row {
    margin-bottom: 25px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-button {
    width:100%;
}
img {
    height: 50px;
}
</style>