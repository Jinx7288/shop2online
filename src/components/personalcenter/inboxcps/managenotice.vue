<template>
  <div class="back">
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
                    "您的商品未通过审核，已纳入未通过审核列表，可在个人中心界面查看详情"
                    ,"您的违规商品过多，若再次发布将被封禁账号，特此警告"
                    ,"您的商品被举报，经核实情况属实，已屏蔽"
                    ],
    }
    },
     methods: {
        load:function() {
            
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
    background-color: rgb(244, 244, 244);
    width: 60vw;
}
</style>>
