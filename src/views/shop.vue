<template>
    <div>
        <el-dialog 
        center
        :visible.sync="showbox"
        width="70%">
        <sentense 
            v-for="(item,index) in inbox"
                    :key="item"
                    :item='item'
                    :index='index'>
        </sentense>
        </el-dialog>
          <el-dialog
                center
                title="您还未登录"
                :visible.sync="showlogin"
                width="30%">
                <el-row>
                    <el-col :span="12">
                        <el-card class="box-card" shadow="hover" @click.native="gotologin">
                            <div class="zi zi_usercheck icon_size3 zi_inverse"></div>
                            <div>我有账户，登录</div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="box-card" shadow="hover" @click.native="gotosignup">
                            <div class="zi zi_userplus icon_size3 zi_inverse">
                            </div>
                            <div>没有,现在注册</div>
                        </el-card>
                    </el-col>
                </el-row>                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="togglelogin">随便看看</el-button>
                </span>
            </el-dialog>
       <el-container>
            <el-header>
                    <el-row  align="middle">
                        <el-col :span="2">
                            <div class="logo">
                                <a href="https://www.fzu.edu.cn/" target="_self"><img src="../../public/logo.png" class="img1"></a>
                             </div>
                        </el-col>
                        <el-col :span="3" :offset='2' class="headspan">
                            <span>闲置物品交易平台</span>
                        </el-col>
                        <el-col :span="4" :offset="18" class="habt">
                            <el-button type="danger" @click="toupload" size="small" v-show="logined">
                                上传商品
                            </el-button>
                            <el-badge :value="messages" style="margin-left:5px" :is-dot="newmsg"  v-show="logined">
                                <!-- <el-button type="" plain size="mini" @click="openinbox">消息</el-button> -->
                                <el-button type="" plain size="mini" @click="gotomsg">消息</el-button>
                            </el-badge>
                            <el-dropdown class="headimg">
                                <span>
                                    <el-avatar :size="40" ><img src="../../public/default-head.webp" class="img2" ></el-avatar>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="gotopc">{{ userinfo.username }}</el-dropdown-item>
                                    <el-dropdown-item divided @click.native="unregister" v-show="logined">注销</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>        
                        </el-col>
                    </el-row>
                </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
       </el-container>
    </div>
</template>
<script>
import sentense from "../components/sentense"
export default {
    data() {
        return {
            goodList:[],
            messages:"",
            inbox:["您的商品已经卖出，请联系xxxxxxxxxxxx以进行交易，完成后请点击完成"
                    ,"您的商品未通过审核，已纳入未通过审核列表，可在个人中心界面查看详情"
                    ,"您的商品上传成功，将被放在首页供选购，您将会收到通知"
                    ,"您的违规商品过多，若再次发布将被封禁账号，特此警告"
                    ],
            showbox:false,
            showlogin:false,
            newmsg:true
        }
    },
    created() {
    },
    mounted:function() {
        this.connect();

    },
    computed:{
        userinfo:function() {
            return window.sessionStorage.getItem('userinfo') ? JSON.parse(window.sessionStorage.getItem('userinfo')) : {username:"未登录"}
        },
        logined:function() {
            return window.sessionStorage.getItem('userinfo') ? true :false
        },
        path:function() {
            let token = JSON.parse(window.sessionStorage.getItem('token'))
            return "ws://120.78.128.98:8080/socket/"+token
            // return "ws://z3773e6368.qicp.vip/socket/"+token
        },
    },
    methods:{
        connect:function() {
            let that = this
            this.socket = new WebSocket(that.path);
            this.socket.onopen = this.open;
            this.socket.onerror = this.error;
            this.socket.onmessage = this.getMessage;
        },
        gotomsg:function() {
            this.$router.push({path:'/personalcenter/inbox'})
        },
        open:function() {
            console.log("websocket连接已建立")
            // console.log();
        },
        error:function() {
            // console.log(e)
            console.log("failed to connect ")
        },
        getMessage:function(ev) {
            console.log(ev)
            // this.inbox.append(msg)
        },
        send:function() {
            this.socket.send();
        },
        toupload:function() {
            if(window.sessionStorage.getItem("token")) {
            this.$router.push({path:'upload'})
            } else {
                this.togglelogin
            }
        },
        unregister:function() {
            window.sessionStorage.removeItem('userinfo')
            window.sessionStorage.removeItem('token')
            this.$router.push({path:'/login'})
        },
        gotopc:function() {
            if (window.sessionStorage.getItem('token')) {
                this.$router.replace({ path:"/personalcenter"})
            } else {
                this.togglelogin();
            }
        },
        openinbox:function() {

        },
            togglelogin:function() {
        this.showlogin= this.showlogin == true ? false : true
        },
        gotologin:function() {
            console.log(1)
            this.$router.push({ path:"/login"})
        },
        gotosignup:function() {
            this.$router.push({ path:"/register"})
        }
    },
    components: { 
        sentense
     },
     beforeDestroy() {
      clearInterval(this.timer);
    }
}
</script>
<style>

.el-dialog {
    height: 80%;
    overflow: scroll;
    overflow-x: hidden;
}
</style>
<style scoped>
.box-card {
    padding-left: 35px;
    height: 189px;
    background-color: rgb(255, 203, 203);
    color: rgb(100, 100, 100);
}
.spantext {
   font-size: 15px;
   color: rgb(32, 30, 30);
}
.icon_size3 {
    font-size: 5rem;
}
#app > div {
    padding: 0px;
    margin: 0px;
    background-color: rgb(244, 244, 244);
    height: 120%;
    overflow: scroll;
}
.el-header {
    padding: 0 0px;
    box-sizing: border-box;
    flex-shrink: 0;
}
.img1 {
    height: 40px;
    margin: 10px 20px;
}
.el-row {
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 1px 0px gray; 
}
.headspan {
    font-size: 13px;
    position: relative;
    left: -75px;
    top: 30px;
    color: rgb(248, 79, 73);
}
.line {
    box-shadow: 0px 0px 0px 1px rgba(255, 0, 0, 0.808);
    margin-bottom: 40px;
}
.habt {
    position: relative;
    top:50%;
    transform:translateY(-50%);
}
.headimg {
    position: relative;
    left: 25px;
    top: 16px;
}
</style>