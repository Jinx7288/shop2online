<template>
    <div>
       <el-container>
            <el-header height="60px">
                    <el-row>
                        <el-col :span="2">
                            <div class="logo">
                                <a href="https://www.fzu.edu.cn/" target="_self"><img src="../../public/logo.png"></a>
                             </div>
                        </el-col>
                        <el-col :span="2" :offset='2' class="headspan">
                            <span>闲置物品交易</span>
                        </el-col>
                        <el-col :span="2" :offset="20">
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        <el-avatar :size="40" ><img src="../../public/default-head.webp"></el-avatar>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                      <el-dropdown-item disabled>{{ }}</el-dropdown-item>
                                      <el-dropdown-item disabled></el-dropdown-item>
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
            <goodcard></goodcard>
        </el-main>
       </el-container>
    </div>
</template>
<script>
import goodcard from '../components/goodcard.vue'
export default {
    data() {
        return {

        }
    },
    methods:{
        unregister:function() {
            window.sessionStorage.removeItem('userinfo')
            window.sessionStorage.removeItem('token')
            this.$router.push({path:'/login'})
        }
    },
    components: { goodcard },

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
}
</style>