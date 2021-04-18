<template>
   <div class="warp_for_register">
        <div class="box">
                <el-row>
                    <el-col :span="6" :offset="6">
                        <img src="..\..\public\logo.png">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                            <el-input type="text" v-model="newuser.newname" placeholder="请输入用户名，仅支持汉字、字母、数字及下划线" maxlength="15" minlength="1" show-word-limit></el-input>
                    </el-col>
                </el-row>
                <el-row>                
                    <el-col :span="24"><el-input v-model="newuser.email" type="text"  placeholder="请输入您的邮箱" minlength="8" maxlength="20" show-word-limit></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><el-input v-model="newuser.newpw" placeholder="请设置密码，8~15位，须含数字及大小写字母" show-password maxlength="20" minlength="8"></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><el-input v-model="newuser.newpw2" type="password" placeholder="请确认您的密码" maxlength="20" minlength="8"></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><el-button type="danger" @click="register">注册</el-button></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><el-button type="danger"  plain @click="backtologin">返回登录</el-button></el-col>
                </el-row>
            </div>    
   </div>
</template>
<script>
export default {
    data() {
        return {
            newuser:{
                newname:'tfr',
                newpw:'123456Aa*',
                newpw2:'123456Aa*',
                email:'777777@qq.com'
            }
        }
    },
    computed:{
        userinfo:function() {
            let that =this
            return that.newuser.newname
        }
    },
    methods:{
        register:function() {
            let that = this;
            this.$http.post('register',that.newuser,{
                             "content-type":"application/json"
                         }
                     ).then(function(res){
                        //  console.log(res);
                        if(res.state=="1") {
                           that.$message.success("注册失败"); 
                            window.sessionStorage.setItem('token',JSON.stringify(data.token));
                            window.sessionStorage.setItem('userinfo',JSON.stringify(that.userinfo));
                            that.$router.push({ path:'/shop' })
                        } else {
                            that.$message.error(res);
                        }
                     },(e)=>{
                         that.$message.error("注册失败");
                     }); 
        },
        backtologin:function() {
            this.$router.push({ path:'/login' })
        }
    }
}
</script>
<style scoped>
.warp_for_register {
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