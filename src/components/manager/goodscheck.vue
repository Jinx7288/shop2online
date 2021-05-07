<template>
      <div>
          <el-dialog
          :visible.sync="showdetail"
          width="80%">
          <template slot="title">{{ currentgood.title}}</template>
          <el-container>
            <el-aside width="600px">
                 <div style="float:left">
                <div class="bigpic">
                    <el-image
                        style="width: 100%; height: 100%"
                        :src="bigurl"
                        :fit="fit">
                    </el-image>
                </div>
                <ul style="display: inline-block">
                    <li class="block" v-for='(item,index) in urllist' :key="index" :index='index' :item="item">
                        <div class="smallpic"  @mouseenter="bigize(index)">
                            <el-image
                                style="width:80px; height: 80px"
                                :src="item"
                                :fit="fit">
                            </el-image>
                        </div>
                    </li>
                </ul>
            </div>
            </el-aside>
            <el-main>
                 <div class="card">
                      <span class="title">{{ details.title}} </span><br>
                      <span class="price">价格:￥ {{ details.price}}</span><br>
                      <div class="detaileddetail">描述：{{details.msg }}</div><br>
                      <span class="address">联系方式：{{ details.phone}}</span>
                  </div>
            </el-main>
            </el-container></el-dialog>
          <el-table :data="goodslist" style="width: 100%" highlight-current-row >
                        <el-table-column prop="title" label="商品标题" width="300px"></el-table-column>
                        <!-- <el-table-column prop="modifyTime" label="修改时间" width="180"></el-table-column> -->
                        <el-table-column prop="upuser" label="上传用户" width="200px"></el-table-column>
                        <el-table-column prop="tags" label="标签">
                              <template slot-scope="scope">
                                  <el-tag type="danger" style="margin:3px"> {{ scope.row.tags | splitsth}}</el-tag>
                                  <!-- <el-tag type="danger" v-for="item in goodslist[].tags" :key="item" style="margin:3px">{{ item }}</el-tag> -->
                              </template>
                        </el-table-column>
                        <el-table-column label="操作" width="500px">
                            <template slot-scope="scope">
                                <el-button type="primary" plain size="mini" @click.native.prevent="detail(scope.$index,goodslist)">查看详情</el-button>
                                <el-button type="primary" plain size="mini" @click.native.prevent="ok(scope.$index,goodslist)" v-show="checkpass(scope.$index)&&checkblock(scope.$index)">通过</el-button>
                                <el-button type="primary" plain size="mini" @click.native.prevent="ok(scope.$index,goodslist)" v-show="!checkpass(scope.$index)&&checkblock(scope.$index)">取消通过</el-button>
                                <!-- <el-button type="danger" plain size="mini" @click.native.prevent="deletegood(scope.$index,goodslist)">删除</el-button> -->
                                <el-button type="danger" size="mini" @click.native.prevent="deletegood(scope.$index,goodslist)" v-show="checkblock(scope.$index)&&checkpass(scope.$index)">屏蔽</el-button>
                                <el-button type="danger" size="mini" @click.native.prevent="deletegood(scope.$index,goodslist)" v-show="!checkblock(scope.$index)&&checkpass(scope.$index)">取消屏蔽</el-button>
                            </template>
                        </el-table-column>
                        </el-table>
      </div>

</template>

<script>
// import { config } from 'vue/types/umd'
export default {
  components: { },
  data:function() {
    return {
        details:{
          title:"",
          price:"",
          msg:"",
          phone:""
        },
         fit:"fill",
            urllist:[
                "https://www.fzu.edu.cn/attach/2015/03/07/86281.jpg",
                "https://www.fzu.edu.cn/attach/2015/03/07/86277.jpg",
                "https://www.fzu.edu.cn/attach/2015/03/07/86273.jpg",
                "https://www.fzu.edu.cn/attach/2015/03/07/86279.jpg",
            ],
            bigurl:"",
        currentgood:{
            title:"",
            gid:"",
            upuser:"",
            tags:[],
            passstate:0,
            delstate:0
        },
        showdetail:false,
        goodslist:[
          {
            title:"多余的网球拍",
            gid:"34",
            upuser:"test",
            tags:["体育","户外","运动"],
            passstate:0,
            delstate:0
          },
          {
            title:"闲置的键盘",
            gid:"57",
            upuser:"test",
            tags:["编程","电脑","coding"],
            passstate:1,
            delstate:0
          },{
            title:"无用的作业",
            gid:"45",
            upuser:"test",
            tags:["废品","白送"],
            passstate:0,
            delstate:0
          }
        ]
    }
  },
  computed:{
  },
  filters: {
        splitsth: function (value) {
        if (!value) return ''
        value = value.toString()
        value=value.replaceAll(","," ")
        // console.log(value);
        return value
    }
    }, 
  created:function() {
    this.bigurl = this.urllist[0]
  },
  methods: {
      bigize:function(index) {
            this.bigurl=this.urllist[index]
        },
    detail:function(index) {
      this.showdetail = true
      this.currentgood = this.goodslist[index]
      let gid = this.goodslist[index].gid
      this.details = {
        title:this.goodslist[index].title,
        price:"233",
        phone:"19977777777",
        msg:"just sth for test"
      }
    },
    checkpass:function(index) {
      return this.goodslist[index].passstate == 0 ? true :false
    },
    checkblock:function(index) {
      return this.goodslist[index].delstate == 0 ? true :false
    },
    ok:function(index,goodslist) {
      // console.log(index)
      // console.log(this.goodslist)
      this.goodslist[index].passstate = this.goodslist[index].passstate == 0 ? 1 : 0
      this.goodslist.append(this.goodslist.splice(index,1))
      // goodslist[index].passstate == 0 ? 1 : 0
    },
    deletegood:function(index,goodslist) {
      this.goodslist[index].delstate = this.goodslist[index].delstate == 0 ? 1: 0
      // goodslist[index].delstate == 0 ? 1: 0
    }
  }

}
</script>
<style scoped>
.bigpic {
  height: 500px;
  width: 500px;
  margin: 0px auto;
}
.smallpic {
    width: 30px;
    height: 30px;
    display: inline;
}
.title {
    font-size: 35px;
    color: rgb(2, 2, 2);
    line-height: 70px;
    padding: 2px;
    margin: 20px 0px 5px 30px;
}
.price {
    padding: 5px;
    line-height: 50px;
    font-size: 20px;
    border-radius: 2px;
    margin: 0px 0px 5px 30px;
}
.detaileddetail {
    margin:10px 0px;
    padding: 20px;
    width: 90%;
    font-size: 14px;
    border-radius: 1px;
    color: #333333;
    background-color: rgb(240, 240, 240);
    margin: 0px 30px 5px 35px;
}
.detaileddetail:hover {
    box-shadow: 0px 0px 3px 4px rgb(245, 245, 245);
}
.address {
    padding: 10px;
    font-size: 20px;
    border-radius: 2px;
    margin: 0px 0px 5px 30px;
}
.block {
    display: inline;
    padding: 0px 5px;
    margin: 0px;
    width: 20%;
}
.el-image:hover {
    box-shadow: rgb(241, 191, 191) 0px 0px 2px 2px;
}
</style>>