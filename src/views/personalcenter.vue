<template>
    <div>
        <profile class="headpic">
        </profile>       
        <div class="head">
            <el-menu :default-active="defaultactive"  
            mode="horizontal" 
            background-color="#fafafa"
            :router="true"
            >
            <el-menu-item index="infor" class="zi zi_useredit">  我的商品</el-menu-item>
            <el-menu-item index="inbox" class="zi zi_envelopeBold"> 消息中心</el-menu-item>
            <el-menu-item index="addresses" class="zi zi_addressBook"> 地址管理</el-menu-item>
            <el-menu-item index="orders" class="zi zi_list"> 订单管理</el-menu-item>
            <el-menu-item index="settings" class="zi zi_cog" disabled> 设 置</el-menu-item>
            </el-menu>
        </div>
        <div class="body">
            <router-view></router-view>
        </div>
    </div>    
</template>
<script>
import profile from '../components/profile'
export default {
    data:function() {
        return {
            defaultactive:"infor",
            orderedlist:[
                {
                    goodid:"2323232",
                    goodname:"sdsdsdsdsds",
                    location:"sdasdasdada",
                    price:"343"
                }
            ]
        }
    },
    components:{
        profile,
    },
    methods:{

    }
}
</script>
<style scoped>
.headpic {
    width: auto;
    height: 130px;
}
.head {
    width: 1320px;
    margin: 0px 200px;
    padding: 0px 0px;
    background-color: #fafafa;
}
.el-tab-pane {
   
}
.el-menu--horizontal>.el-menu-item {
    float: left;
    height: 40px;
    line-height: 40px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #909399;
}
</style>
