<template>
  <div class="box">
        <el-form :model="backForm" :rules="rules" ref="backForm" label-width="100px" class="form" v-show="sbed">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="backForm.title" style="width: 60%" maxlength="25"></el-input>
                    </el-form-item>
                    <el-form-item label="详细描述">
                        <el-input v-model="backForm.msg" 
                        type="textarea" 
                        maxlength="70"
                        show-word-limit
                        rows="5"
                        resize="none"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="uploadtoserver">提 交</el-button>
                    </el-form-item>
        </el-form>
        <span v-show="!sbed">你的反馈已提交，请关注消息！</span>
  </div>
</template>

<script>
export default {
  data:function() {
    return {
        backForm:{
            title:"",
            msg:"",
        },
         sbed:true,
         rules:{
             title: [
                { required: true, message: '请输入问题标题', trigger: 'blur' },
                { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
            ],
            msg: [
                { required: true, message: '请输入问题详情', trigger: 'change' }
            ],
         }
    }
  },
  props:{
  },
  methods:{
      uploadtoserver:function() {
          this.$message.success("提交成功！")
          this.sbed = false
          this.backForm = {
              title:"",
              msg:""
          }
      }
  }
}
</script>
<style scoped>
.box {
    width: 60%;
    margin: 70px auto;
}
</style>>