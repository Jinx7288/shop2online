<template>
      <el-table :data="goodslist" style="width: 100%" highlight-current-row >
                        <el-table-column prop="title" label="商品标题" width="300px"></el-table-column>
                        <!-- <el-table-column prop="modifyTime" label="修改时间" width="180"></el-table-column> -->
                        <el-table-column prop="upuser" label="上传用户" width="200px"></el-table-column>
                        <el-table-column prop="tags" label="标签">
                              <template slot-scope="scope">
                                <div v-for="item in goodslist[scope.index].tags" :key="item">
                                  <el-tag type="danger" style="margin:3px"> {{ item }}</el-tag>
                                </div>
                                  <!-- <el-tag type="danger" v-for="item in goodslist[].tags" :key="item" style="margin:3px">{{ item }}</el-tag> -->
                              </template>
                        </el-table-column>
                        <el-table-column label="操作" width="500px">
                            <template slot-scope="scope">
                                <el-button type="primary" plain size="mini" @click.native.prevent="detail(scope.index,goodslist)">查看详情</el-button>
                                <el-button type="primary" plain size="mini" @click.native.prevent="ok(scope.index,goodslist)">通过</el-button>
                                <!-- <el-button type="danger" plain size="mini" @click.native.prevent="deletegood(scope.$index,goodslist)">删除</el-button> -->
                                <el-button type="danger" size="mini" @click.native.prevent="deletegood(scope.$index,goodslist)">屏蔽</el-button>
                            </template>
                        </el-table-column>
                        </el-table>
</template>

<script>
export default {
  name: 'test',
  data:function() {
    return {
        goodslist:[
          {
            title:"多余的网球拍",
            gid:"34",
            upuser:"test",
            tags:["体育","户外","运动"]
          }
        ]
    }
  },
  methods: {
    
  }

}
</script>
<style scoped>
</style>>