<template>
      <el-table :data="userlist" style="width: 100%" highlight-current-row >
                        <el-table-column prop="title" label="商品标题"></el-table-column>
                        <!-- <el-table-column prop="modifyTime" label="修改时间" width="180"></el-table-column> -->
                        <el-table-column prop="" label="上传用户"></el-table-column>
                        <el-table-column prop="checknumber" label="分类"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" plain size="mini" @click.native.prevent="detail(scope.index,userlist)">查看详情</el-button>
                                <el-button type="danger" plain size="mini" @click.native.prevent="deletegood(scope.$index,userlist)">删除</el-button>
                            </template>
                        </el-table-column>
                        </el-table>
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