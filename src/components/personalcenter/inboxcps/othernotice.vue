<template>
  <div class="back"  v-infinite-scroll="load" >
        <sentense 
            v-for="(item,index) in msgs"
                    :key="item"
                    :item='item'
                    :index='index'
                    >
        </sentense>
  </div>
</template>

<script>
import sentense from "../../sentense"
export default {
  data:function() {
    return {
        msgs:[
            "您的商品已经卖出，请联系xxxxxxxxxxxx以进行交易，完成后请点击完成"
            ,"您的商品上传成功，将被放在首页供选购，您将会收到通知"
        ]
    }
  },
  methods:{
      load() {

      }
  },
    components:{
        sentense
    },
  props:{
  }
}
</script>
<style scoped>
.back {
    width: 60vw;
    background-color: rgb(244, 244, 244);
    height: 65vh;
}
</style>>
