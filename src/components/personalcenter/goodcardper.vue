<template>
    <div>
        <el-card>
            <el-image :src="base+toString(item.goodsId)" class="image" fit="fill"></el-image>
            <div style="padding: 14px;">
                <span class="title">{{ item.msg }}</span>
                <span class="price">{{ item.price }}</span>
                <div class="bottom clearfix">
                <span class="el-icon-user user">{{ item.seller }}</span><br>
                <time class="time el-icon-time">{{ item.date  }}</time><br>
                <el-button type="danger" class="button" size="small" @click="gotodetail">详情</el-button>
                <el-button type="danger" class="button" size="small">删除</el-button>
                </div>
            </div>
    </el-card>  
    </div>
</template>
<script>
export default {
    name:'goodcardper',
    data:function() {
        return {
            base:"http://120.78.128.98:8080/index/getGoodsMainPicture?goodsId="
            
        }
    },
    created:function() {
        // console.log(this.item)
    },
    computed:{
    },
    methods:{
        gotodetail:function() {
            if (window.sessionStorage.getItem('userinfo')) {
                this.$router.push({path:'/personalgooddetail',query: { goodid:this.goodid}})
            } else {
                this.$emit('togglelogin')
            }
            // this.$router.push({path:'/detail',query: { goodid:this.item.goodsId}})
        },
        getSample:function() {
            let that = this
            
        }
    },
    props:{
        item: {
            type: Object,                 //可指定接收类型，如:Array.
            default:() => []   //可设置默认值
        },
        index:{
            type: Number
        }
    }
}
</script>
<style scoped>
.button {
    margin: 5px auto;
}
.el-image {
    height:200px;
    width: 250px;
}
.el-card  /deep/ .el-card__body {
    padding: 0px;
}
.title {
    font-size: 15px;
    color: rgb(243, 109, 92);
}
.price {
    font-weight: 600;
    margin-left: 20px;
}
.user {
    font-size: 10px;
    color: rgb(31, 30, 30);
}
.time {
    font-size: 11px;
    color: rgb(160, 159, 159);
}
</style>