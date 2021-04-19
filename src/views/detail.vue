<template>
    <el-container>
        <el-aside width="400px"></el-aside>
        <el-main>
            <detailpanel :detail='gooddetail'></detailpanel>
        </el-main>
    </el-container>
</template>
<script>
import detailpanel from '../components/detailpanel'
export default {
    data:function() {
        return {
            gooddetail:[]
        }
    },
    created:function() {
        let good=this.$route.query
        let that=this;
            this.$http.post('getgooddetail',good,{
                             "content-type":"application/json"
                         }
                     ).then(function(res){
                        if(res.data.state=="1") {
                            this.gooddetail=JSON.parse(res.data.good)
                        } else {
                            that.$message.error("获取商品数据失败");
                        }
                     },(e)=>{
                         that.$message.error("商品请求失败");
                     });
    },
    methods:{

    },
    components:{
        detailpanel
    }
}
</script>
<style scoped>

</style>