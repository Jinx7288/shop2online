<template>
    <div class="back">
        <div>
            <el-button circle class="el-icon-back" type="danger" @click="toshop"> </el-button>            
        </div>
        <div  class="headpic">
            <!-- <el-image :src="require('@/assets/img/default-head.webp')"></el-image>   -->
            <div><el-avatar :size="60" :src="require('@/assets/img/default-head.webp')"></el-avatar></div>
        </div>
    </div>    
</template>
<script>
export default {
    data:function() {
        return {
            headurl:"../assets/img/default-head.webp"
        }
    },
    methods:{
        toshop:function() {
            this.$router.push({path:'/shop'})
        }
    }
}
</script>
<style scoped>
.back {
    /* background-image: url("https://www.fzu.edu.cn/attach/2015/03/07/86283.jpg"); */
    /* background-image: url("http://ww1.sinaimg.cn/mw690/70ace9b7ly1ggzusnypoej20yi0yiaop.jpg"); */
    background: url("https://www.fzu.edu.cn/attach/2015/05/10/119502.jpg") 0px -40px fixed;

}

.headpic {
    height: 100px;
    width:100px;
    margin: 0px auto;
    padding: 30px;
}
.el-avatar {
    box-shadow: red 0px 0px 10px 1px;
    transition:all 0.1s linear;
}
.el-avatar:hover {
    box-shadow: 0px 0px 10px 7px red;
    height: 195px; 
    width: 195px;
}
</style>