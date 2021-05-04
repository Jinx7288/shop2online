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
        </div>
    </div>
</template>

<script>
import { checkpw } from "../assets/js/fns";
export default {
    data() {
        return {
            logininfo:{
                username:'admin',
                password:'123456Aa*',
            },
            showsetpw: false,
        }
    },
    components:{
       
    },
    methods:{
        login:function() {
            let that=this;
            if (/^\w+$/.test(that.logininfo.username)&&checkpw(that.logininfo.password)) {
                this.$http.post('user/login',that.logininfo,{
                             "content-type":"application/json"
                         }
                     ).then(function(res){
                        if(res.status==200) {
                           that.$message.success("登录成功"); 
                            window.sessionStorage.setItem('token',JSON.stringify(res.data.token));
                            window.sessionStorage.setItem('userinfo',JSON.stringify(that.logininfo.username));
                            that.$router.replace({ path:'/managecontent' })
                        } else {
                            that.$message.error(res.data.msg);
                        }
                     },(e)=>{
                         that.$message.error("登录失败");
                     }); 
            } else {
                this.$message.error('账号或密码格式错误！')
            }
        },
        togglesetpw:function() {
            this.showsetpw = true;
        }
    }
}
</script>

<style scoped>
.warp_for_login {
    background-color: rgb(254, 254, 254);
    padding: 5px;
    height: 100%
}
.box {
    margin: 20vh auto;
    padding: 20px;
    border:0.5px solid rgba(240, 240, 240);
    border-radius: 5px;
    background-color: rgba(247, 247, 247, 0.616);
    width: 400px;
    line-height: 10px;
    font-size: large;
}
.box:hover {
    box-shadow: 0px 2px 5px 0.5px gray;
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
.el-button.is-active, .el-button.is-plain:active {
    color: rgb(250, 186, 184);
    border-color: rgb(250, 186, 184);
}
.el-button--text {
    color: rgb(238, 95, 90);
    background: 0 0;
    padding-left: 0;
    padding-right: 0;
}
.el-button.is-plain:focus, .el-button.is-plain:hover {
    background: #FFF;
    border-color: rgb(250, 186, 184);
    color: rgb(241, 108, 103);
}
.setpw {
    position: absolute;
    top: 50%;
    transform:translateY(-50%);
    display: block;
}
</style>