<template>
    <div>
        <el-card>
            <el-image :src="item.imgurl" class="image" fit="fill">
                <div slot="error" class="image-err">
                    <i class="el-icon-picture-outline">图片不存在哦(＠_＠;))</i>
                </div>
            </el-image>
            <div style="padding: 14px;">
                <span class="title">{{ item.title }}</span><br>
                <span class="price">￥{{ item.price }}</span>
                <div class="bottom clearfix">
                <span class="el-icon-user user">{{ item.seller }}</span><br>
                <time class="time el-icon-time">{{ item.date | fixdate }}</time><br>
                <el-button type="danger" class="button" size="small" @click="gotodetail">详情</el-button>

                </div>
            </div>
    </el-card>  
    </div>
</template>
<script>
export default {
    name:'goodcard',
    data:function() {
        return {
            base:"http://120.78.128.98:8080/index/getGoodsMainPicture?goodsId="
            
        }
    },
    created:function() {
        // console.log(this.item)
    },
    computed:{
        imgurl:function() {
            return this.base + this.item.id
        }
    },
    methods:{
        gotodetail:function() {
            if (window.sessionStorage.getItem('userinfo')) {
                this.$router.push({path:'detail',query: { goodid:this.goodid}})
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
    },
    filters: {
        fixdate: function (value) {
            if (!value) return ''
            value = value.toString()
            value = value.slice(0,16)
            value = value.replace("T",)
            return value
        }
    }
}
</script>
<style>
#app > div > section > main > div > div:nth-child(4) > div > div > div > div.el-image.image > div {
    padding: 40% 15%;
}
</style>
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
    margin: 20px 0px;
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