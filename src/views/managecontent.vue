<template>
  <div class="page">
     <el-container>
         <el-header>
             <el-row  align="middle">
                        <el-col :span="2">
                            <div class="logo">
                                <a href="https://www.fzu.edu.cn/" target="_self"><img src="../../public/logo.png" class="img1"></a>
                             </div>
                        </el-col>
                        <el-col :span="3" :offset='2' class="headspan">
                            <span>后台管理</span>
                        </el-col>
                        <el-col :span="2" :offset="20" class="habt">
                            <el-dropdown class="headimg">
                                <span>
                                    <el-avatar :size="40" ><img src="../../public/default-head.webp" class="img2" ></el-avatar>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>admin</el-dropdown-item>
                                    <el-dropdown-item divided @click.native="unregister">注销</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>        
                        </el-col>
                    </el-row>
         </el-header>
        <el-container>
             <el-aside width="200px">
             <el-menu  class="el-menu-vertical-demo" :collapse="isCollapse" router default-active="/goodscheck">
                    <el-menu-item index="/goodscheck">
                        <i class="zi zi_listul zi_size"></i>
                        <span slot="title"> 商品审核</span>
                    </el-menu-item>
                    <el-menu-item index="/usermanage">
                        <i class="zi zi_usercog zi_size"></i>
                        <span slot="title">  用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/statistic">
                        <i class="zi zi_curve zi_size"></i>
                        <span slot="title">  数据统计</span>
                    </el-menu-item>
                    <el-menu-item index="/msettings">
                        <i class="zi zi_circleComponents zi_size"></i>
                        <span slot="title">  设置</span>
                    </el-menu-item>
                    </el-menu>
         </el-aside>
         <el-main>
              <router-view></router-view>
         </el-main>
        </el-container>
     </el-container>
  </div>
</template>

<script>
export default {
  name: 'test',
  data:function() {
    return {
        isCollapse:false
    }
  },
    components:{
  },
  props:{
    
  },
  methods:{
      unregister:function() {
        window.sessionStorage.removeItem('userinfo')
        window.sessionStorage.removeItem('token')
        this.$router.push({path:'/login'})
      }
  }
}
</script>
<style scoped>
.el-aside {
    overflow: hidden;
}
.zi_size {
    font-size: 1.5rem;
}
.el-header {
    padding: 0 0px;
    box-sizing: border-box;
    flex-shrink: 0;
    margin-bottom: 10px;
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
    font-size: 16px;
    position: relative;
    left: -75px;
    top: 30px;
    color: rgb(248, 79, 73);
}
.page {
    margin: 0px;
    width: 100%;
}
</style>>
<style>
body {
    margin: 0px;
}
</style>