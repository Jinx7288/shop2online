<template>
    <div>
       <el-container>
            <el-header>
                    <el-row  align="middle">
                        <el-col :span="2">
                            <div class="logo">
                                <a href="https://www.fzu.edu.cn/" target="_self"><img src="../../public/logo.png"></a>
                             </div>
                        </el-col>
                        <el-col :span="3" :offset='2' class="headspan">
                            <span>闲置物品交易平台</span>
                        </el-col>
                        <el-col :span="4" :offset="18" class="habt">
                            <el-button type="danger">
                                上传商品
                            </el-button>
                            <el-badge :value="12" style="margin-left:5px">
                                <el-button type="danger" plain>消息</el-button>
                            </el-badge>
                            <el-dropdown class="headimg">
                                <span>
                                    <el-avatar :size="50" ><img src="../../public/default-head.webp"></el-avatar>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item disabled>{{ userinfo }}</el-dropdown-item>
                                    <el-dropdown-item divided @click="unregister">注销</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>        
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24"><div class="line"></div></el-col>
                    </el-row>
                </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
       </el-container>
    </div>
</template>
<script>


export default {
    data() {
        return {
            goodList:[],
        }
    },
    created() {
        this.getGoodsList()
    },
    computed:{
        userinfo:function() {
            return window.sessionStorage.getItem('userinfo') ? JSON.parse(window.sessionStorage.getItem('userinfo')) : {username:"未登录"}
        }
    },
    methods:{
        unregister:function() {
            window.sessionStorage.removeItem('userinfo')
            window.sessionStorage.removeItem('token')
            this.$router.push({path:'/login'})
        },
        getGoodsList:function() {
            let that=this;
            this.$http.get('index/getGoods?model=0&orderBy=date&page=1&size=10'
                     ).then(function(res){
                        console.log(res);
                        if(res.data.state=="1") {
                            this.goodList=JSON.parse(res.data.goodList)
                        } else {
                            that.$message.error("获取数据失败");
                        }
                     },(e)=>{
                         that.$message.error("请求失败");
                     });
            // this.$store.commit('shareGoods',that.goodList);
            this.$store.commit('shareGoods',[1,2,3,4,5,6,7,8,9,10]);
            // ! 注意一下，别忘删
        }
    },
    components: {  },

}
</script>
<style scoped>
#app > div {
    padding: 20px;
    background-color: rgb(250, 186, 184);
}
img {
    height: 60px;
}
.headspan {
    font-size: 18px;
    position: relative;
    left: 0px;
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