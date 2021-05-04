<template>
  <div>
    <p>msettings</p>
  </div>
</template>

<script>
export default {
  name: 'test',
  data:function() {
    return {

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
</style>>