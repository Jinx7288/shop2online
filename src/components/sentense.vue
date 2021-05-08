<template>
  <div>
      <div>
        <el-avatar :size="40" :src="require('@/assets/img/default-head.webp')"></el-avatar>
        <p class="admin">Admin</p>
      </div>
      <div class="item arrow">
          <span>{{ item }}</span>
      </div>
  </div>
</template>

<script>
export default {
  data:function() {
    return {

    }
  },
  props:{
      item: {
            type: String,
            default:() => []   
        },
        index:{
            type: Number
        }
  }
}
</script>
<style scoped>
.admin {
  position: relative;
  top: 83px;
  left: 110px;
}
.el-avatar {
  position: relative;
  top:90px;
  left:110px;
  border: rgb(243, 241, 241) 1px solid;
}
.item {
    background-color: rgb(243, 241, 241);
    padding:15px 90px ;
    margin: 0px auto;
    width: 50%;
    border-radius: 10px;
    border:rgb(243, 241, 241) solid 0.2px;
    font-size: 18px;
    
}
.arrow{
        position: relative;
        border:0.2px solid rgb(155, 154, 154);
        border-radius:5px;
        background: rgb(219, 219, 215);
}
.arrow:before,.arrow:after {
        content: "";
        display: block;
        position: absolute;
        width:0;
        height: 0;
        border: 6px solid transparent;
        border-right-color: rgb(219, 219, 219);
        left: -11px;
        top: 20px;
        z-index:1;
}
.arrow:after {
    left: -12px;
    border-right-color: rgb(184, 184, 184);
    z-index:0;
}
</style>>