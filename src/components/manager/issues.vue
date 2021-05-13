<template>
  <div>
      <el-dialog
          :visible.sync="showdetail"
          width="50%">
          <template slot="title" class="title">{{ currentissue.title}}</template>
            <el-button-group>
                <el-button type="primary" icon="el-icon-arrow-left" @click="plus">上一个</el-button>
                <el-button type="primary">下一个<i class="el-icon-arrow-right el-icon--right" @click="minus"></i></el-button>
            </el-button-group>
            <br>
          <span class="msg">
              {{ currentissue.msg }}
          </span>
            </el-dialog>
   <el-table :data="issuelist.slice(0+(pagenow-1)*10,10+(pagenow-1)*10)" style="width: 100%" highlight-current-row >
                        <el-table-column prop="title" label="商品标题" width="500px"></el-table-column>
                        <!-- <el-table-column prop="modifyTime" label="修改时间" width="180"></el-table-column> -->
                        <el-table-column prop="commituser" label="上传用户" width="200px"></el-table-column>
                        <el-table-column label="操作" width="500px">
                            <template slot-scope="scope">
                                <el-button type="primary" plain size="mini" @click.native.prevent="detail(scope.$index,issuelist)">查看详情</el-button>
                                <el-button type="primary" plain size="mini" @click.native.prevent="clear(scope.$index,issuelist)">已读</el-button>
                                <el-button type="primary" plain size="mini" @click.native.prevent="ontop(scope.$index,issuelist)">置顶</el-button>
                            </template>
                        </el-table-column>
                        </el-table>
                            <el-pagination
                            :current-page.sync="pagenow"
                            layout="total, prev, pager, next"
                            :total="issuelist.length">
                          </el-pagination>
  </div>
</template>

<script>
import Mock from "mockjs"
export default {
  data:function() {
    return {
        pagenow:1,
        showdetail:false,
        currentissue:{ 
            title:"",
            msg:""
        }
    }
  },
  computed:{
      issuelist:{
           get: function () {
                   let Random = Mock.Random;
                    let list = []
                    for(let i = 0;i<=20;i++) {
                        let issue = Mock.mock(
                        {
                        "title":"@cword(5,15)",
                        "msg":"@cparagraph(4,5)",
                        "phone":"@natural(13000000000,19900000000)",
                        "commituser":"@cname",
                        "index":i,
                        "rowindex":0
                        })
                        list.push(issue)
                    }
                return list
            },
            set: function (newValue) {
                
            }
      },
  },
  methods:{
      
      
      detail:function(i) {
          this.showdetail = true;
          this.currentissue = this.issuelist[i]
      },
      clear:function(i) {
          let listcache =  this.issuelist
      },
      ontop:function(i) {

      },
      plus:function() {
          let index = this.currentissue.index
          if(index == 0) {
              this.$message.info("已经是第一个")
          } else {
              this.currentissue = this.issuelist[index-1]
          }
      },
      minus:function() {
        //   console.log(this.issuelist)
          let index = this.currentissue.index
          if(index == this.issuelist.length) {
              this.$message.info("已经是最后一个")
          } else {
              this.currentissue = this.issuelist[index+1]
          }
      }
  },
  props:{
  }
}
</script>
<style scoped>
.el-dialog__header {
    color: salmon;
}
.msg {
    font-size: 20px;
    margin: 30px auto;
}
.el-dialog {
    height: 30%;
}
</style>>