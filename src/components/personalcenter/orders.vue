<template>
  <div class="back">
        <el-cascader
              v-model="cg"
              :options="cgs"
              @change="hdcg"
              >
          </el-cascader>
        <order  v-for="(item,index) in cgoods"
            :key="item.goodid"
            :item='item'
            :index='index'>

        </order>

  </div>
</template>

<script>
import order from "../personalcenter/order"
import Mock from 'mockjs'
export default {
  data:function() {
    return {
      cg:["yigoumai"],
        cgs:[{
          value: '1',
          label: '已购买',
        },{
          value: '2',
          label: '等待中',
        },{
          value: '3',
          label: '被屏蔽',
        },{
          value: '4',
          label: '已取消',
        },{
          value: '5',
          label: '其他'
        }],
      cgoods:[]
    }
  },
  computed:{
    goods() {
      let Random = Mock.Random;
      let list = []
      for(let i = 0;i<=20;i++) {
        let imgurl = "http://placekitten.com/g/200/200"
           let goods = Mock.mock(
        {
          "goodsid":"@natural(3444,4444)",
          "title":"@cparagraph(1)",
          "msg":"@cparagraph(4,5)",
          "state|1":[1,2,3,4,5],
          "imgurl":imgurl
        })
        list.push(goods)
      }
      return list
    }
  },
  mounted:function() {
    this.cgoods = this.goods
  },
  components:{
    order
  },
  methods:{
    hdcg() {
      let cstate = Number(this.cg[0])
      // console.log(cstate);
      // let log2 = this.goods
      // console.log(log2);
      this.cgoods = this.goods.filter(item => item.state == cstate)
      // let log = this.cgoods
      // console.log(log);
    }
  }

}
</script>
<style scoped>
.back {
  width: 70%;
  background-color: rgb(250, 250, 250);
  margin: 0px auto;
}
</style>>