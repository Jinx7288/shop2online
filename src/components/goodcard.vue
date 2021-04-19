<template>
    <div class="forborder">
        <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
                <span>{{ }}</span>
                <div class="bottom clearfix">
                
                <time class="time">{{  }}</time>
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
            goodid:''
        }
    },
    methods:{
        gotodetail:function() {
            this.$router.push({path:'/detail',query: { goodid:this.goodid}})
        },
        getSample:function() {
            let that = this
            
        }
    },
    props:{
        item: {
            type: Array,                 //可指定接收类型，如:Array.
            default:() => []   //可设置默认值
        },
        index:{
            type: Number
        }
    }
}
</script>
<style scoped>
.forborder {
    padding: 10px;
    border: 2px rgb(243, 144, 144) solid;
    border-radius: 7px;
    width: 14%;
}
img {
    width: 100%;
}
</style>