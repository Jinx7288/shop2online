<template>
    <el-dialog title="上传文件" :visible.sync="dialogVisble" width="30%">
                    <el-upload
                        drag
                        accept="iamge/jpeg,image/png,image/jpg"
                        :auto-upload="false"
                        action=" "
                        limit="1"
                        file-list="upfilelist"
                        :on-change="handlechange"
                        >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件,每次一个╮(╯-╰)╭</div>
                    </el-upload>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisble=false">取消</el-button>
                      <el-button type="primary" @click.native.prevent="uploadPoststh">确定</el-button>
                    </span>
                </el-dialog>    
</template>
<script>
export default {
    data:function() {
        return {

        }
    },
    methods:{
        
    }
}
</script>
<style scoped>

</style>