<template>
  <div class="warp_for_login">
    <div class="box">
      <el-row>
        <el-col :span="6" :offset="6">
          <img src="..\..\public\logo.png" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"
          ><el-input
            prefix-icon="el-icon-user"
            type="text"
            v-model="logininfo.username"
            placeholder="请输入用户名/邮箱"
            maxlength="20"
            minlength="1"
            clearable
          ></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"
          ><el-input
            prefix-icon="el-icon-key"
            type="password"
            v-model="logininfo.password"
            placeholder="请输入您的密码"
            maxlength="15"
            minlength="8"
            clearable
          ></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="15"
          ><el-input
            prefix-icon=""
            type="text"
            v-model="logininfo.code"
            placeholder="请输入验证码"
            maxlength="4"
            minlength="0"
            clearable
          ></el-input
        ></el-col>
        <el-col :span="9">
          <el-button type="danger" @click="toggleshow" v-show="getname">获取验证码</el-button>
          <img :src="imgurl" class="imgs" v-show="!getname">
          <!-- <img src="http://z3773e6368.qicp.vip/auth/getCode/?username=demoforsign" class="imgs"> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24"
          ><el-button type="danger" @click="login">登录</el-button></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6"
          ><el-button type="text" plain @click="togglesetpw"
            >重置密码</el-button
          ></el-col
        >
      </el-row>
    </div>
    <el-dialog title="重置密码" width="40%" :visible.sync="showsetpw">
      <el-row>
        <el-col :span="24"
          ><el-input
            v-model="resetpw.username"
            placeholder="请输入您的用户名"
          ></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"
          ><el-input
            v-model="resetpw.email"
            placeholder="请输入您的注册邮箱"
          ></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"
          ><el-input
            prefix-icon="el-icon-key"
            type="password"
            v-model="resetpw.password"
            placeholder="请输入您的新密码"
            maxlength="15"
            minlength="8"
            clearable
          ></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-input
            v-model="resetpw.code"
            type="text"
            placeholder="请输入验证码"
          >
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="text" plain @click="sendauthcode"
            >发送验证码</el-button
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="9"
          ><el-button type="danger" @click="submit">重置</el-button></el-col
        >
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { checkpw } from "../assets/js/fns";
export default {
  data() {
    return {
      getname:true,
      imgurl:"http://120.78.128.98:8080/auth/getCode?username=",
      logininfo: {
        code: "",
        username: "admin",
        password: "admin",
      },
      showsetpw: false,
      resetpw: {
        username: "",
        password: "",
        secret: "",
        email: "",
      },
    };
  },
  components: {},
  methods: {
    toggleshow:function() {
      this.getname = false
      this.imgurl= this.imgurl + this.logininfo.username
    },
    sendauthcode: function () {
      let that = this;
      this.$http
        .post("/auth/getPassword", {
          email: that.resetpw.email,
          username:that.resetpw.username
        })
        .then(function (res) {
          console.log(res);
          if (res.status == 200) {
            that.$message.success(res.data.msg);
          }
        });
    },
    login: function () {
      let that = this;
      if (
        /^\w+$/.test(that.logininfo.username)
      ) {
        this.$http
          .post("auth/login", that.logininfo, {
            "content-type": "application/json",
          })
          .then(
            function (res) {
              if (res.status==200) {
                that.$message.success("登录成功");
                console.log(res)
                window.sessionStorage.setItem(
                  "token",
                  JSON.stringify(res.data.data.token)
                );
                window.sessionStorage.setItem(
                  "userinfo",
                  JSON.stringify(that.logininfo)
                );
                that.$store.commit("getuserinfo", that.logininfo);
                that.$router.replace({ path: "/managecontent" });
              } else {
                that.$message.error(res.data.msg);
              }
            },
            (e) => {
              that.$message.error("登录失败");
            }
          );
      } else {
        this.$message.error("账号或密码格式错误！");
      }
    },
    switchto: function () {
      let that = this;
      that.$router.push({ path: "/register" });
    },
    justExplore: function () {
      this.$router.push({ path: "/shop" });
    },
    togglesetpw: function () {
      this.showsetpw = true;
    },
    submit: function () {
      let that = this;
      if (
        /^\w+$/.test(that.resetpw.username) &&
        /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(
          that.resetpw.email
        )
      ) {
        this.$http
          .post(
            "auth/rePassword",
            {
                password:that.resetpw.password,
                secret:that.resetpw.code,
                username:that.resetpw.username
            },
            {
              "content-type": "application/json",
            }
          )
          .then(
            function (res) {
              if (res.status == 200) {
                that.$message.success("修改成功");
                setInterval(function () {
                  that.resetpw =  {
                        username: "",
                        password: "",
                        secret: "",
                        email: "",
                    };
                  that.showsetpw = false;
                }, 2);
              } else {
                that.$message.error(res.data.msg);
              }
            },
            (e) => {
              that.$message.error("请求失败");
            }
          );
      } else {
        this.$message.error("账号或邮箱格式错误！");
      }
    },
    turntoml: function () {
      this.$router.push({ path: "/manage" });
    },
  },
};
</script>
<style>
.el-dialog {
  border-radius: 20px;
}
#app > div > div.el-dialog__wrapper > div {
  height: 55%;
  border-radius: 20px;
  overflow: hidden;
}
</style>

<style scoped>
.imgs {
  height: 40px;
  margin-left: 10px;
}
.warp_for_login {
  background-color: rgb(254, 254, 254);
  padding: 5px;
  height: 100%;
}
.box {
  margin: 20vh auto;
  padding: 20px;
  border: 0.5px solid rgba(240, 240, 240);
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
  width: 100%;
}
img {
  height: 50px;
}
.el-button.is-active,
.el-button.is-plain:active {
  color: rgb(250, 186, 184);
  border-color: rgb(250, 186, 184);
}
.el-button--text {
  color: rgb(238, 95, 90);
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}
.el-button.is-plain:focus,
.el-button.is-plain:hover {
  background: #fff;
  border-color: rgb(250, 186, 184);
  color: rgb(241, 108, 103);
}
.setpw {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: block;
}
</style>