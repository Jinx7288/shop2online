<template>
    <el-form></el-form>
</template>
<script>
export default {
    data:function() {
        return {
           
        }
    },
    props:{
        detail: {
            type: Array,                 //可指定接收类型，如:Array.
            default:() => ['女装，学长的，迷惑，标题，样式','777',
            '详细信息，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，学长的，',
            '联系方式','用户id，啊不会还得写用户主页吧']   //可设置默认值
        }
    }
}
</script>
<style scoped>

</style>