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
                            <el-input type="text" v-model="newuser.username" placeholder="请输入用户名，仅支持汉字、字母、数字及下划线" maxlength="15" minlength="1" show-word-limit></el-input>
                    </el-col>
                </el-row>
                <el-row>                
                    <el-col :span="24"><el-input v-model="newuser.email" type="text"  placeholder="请输入您的邮箱" minlength="8" maxlength="20" show-word-limit></el-input></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><el-input v-model="newuser.phone" type="text" placeholder="请输入您的手机号" maxlength="11" show-word-limit></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><el-input v-model="newuser.password" placeholder="请设置密码，8~15位，须含数字及大小写字母" show-password maxlength="20" minlength="8"></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><el-input v-model="newpw2" type="password" placeholder="请确认您的密码" maxlength="20" minlength="8"></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-input v-model="newuser.code" type="text" placeholder="邮箱验证码">
                        </el-input>
                    </el-col>
                    <el-col :span="8">
                                <el-button type="text" plain @click="sendauthcode">发送验证码</el-button>
                    </el-col>
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
            getcode:false,
            newuser:{
                username:'demoforsign',
                password:'123456Aa*',
                email:'2117000274@qq.com',
                phone:'15333333333',
                code:""
            },
            newpw2:'123456Aa*',
        }
    },
    computed:{
        userinfo:function() {
            let that =this
            return that.newuser.username
        }
    },
    methods:{
        sendauthcode:function() {
            let that = this;
            this.$http.post('/auth/sendEmailCode',{
                email:that.newuser.email
            }).then(function(res) {
                console.log(res)
                if(res.status==200) {
                    that.$message.success(res.data.msg)
                }
            })
        },
        register:function() {
            let that = this;
            this.$http.post('/auth/register',that.newuser,{
                             "content-type":"application/json"
                         }
                     ).then(function(res){
                        //  console.log(res);
                        if(res.data.code=="1") {
                           that.$message.success("注册成功"); 
                            window.sessionStorage.setItem('token',JSON.stringify(res.data.token));
                            window.sessionStorage.setItem('userinfo',JSON.stringify(that.userinfo));
                            that.$router.push({ path:'/shop' })
                        } else {
                            that.$message.error(res.data.msg);
                            console.log(res)
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
</style>