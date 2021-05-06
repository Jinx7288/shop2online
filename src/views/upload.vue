<template>
    <div>
        <el-container>
            <el-aside width="450px">
                <div class="uploadbox">
                    <el-upload
                        drag
                        action="/user/uploadGoodsPicture"
                        ref="upload"
                        :with-credentials="true"
                        :auto-upload='false'
                        :file-list="upfilelist"
                        :limit="5"
                        accept="iamge/jpeg,image/png,image/jpg"
                        :on-exceed="handleexceed"
                        :on-change="handlechange"
                        list-type="picture">
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div slot="tip" class="tip">*只能上传jpg/png文件，且不超过5张，第一张将被设为主图片
                        </div>
                    </el-upload>
                </div>
            </el-aside>
            <el-main>
                <el-form :model="upForm" :rules="rules" ref="upForm" label-width="100px" class="form">
                    <el-form-item label="商品标题" prop="title">
                        <el-input v-model="upForm.title" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="期望价格">
                           <el-input-number v-model="upForm.price" :precision="2" :step="0.1" :max="10000" :min="0" :controls="notctrl"></el-input-number>
                    </el-form-item>
                    <el-form-item label="标签">
                        <tags @givelbs="givelbs"></tags>
                    </el-form-item>
                    <el-form-item label="详细描述">
                        <el-input v-model="upForm.msg" 
                        type="textarea" 
                        maxlength="70"
                        show-word-limit
                        rows="5"
                        resize="none"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="uploadtoserver">提 交</el-button>
                        <el-button type="danger" @click="reset">重 置</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>   
<script>
import tags from "../components/tags"
export default {
    data:function() {
        return {
            notctrl:false,
              title:"",
            upForm: {
                goodsId:"0",
                labelIds:[],
                level:"0",
                price:"",
                msg:"",
            },
            rules: {
            title: [
                { required: true, message: '请输入商品标题', trigger: 'blur' },
                { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
            ],
            price: [
                { required: true, message: '请输入价格', trigger: 'change' }
            ],
            tag: [
                { required: true, message: '请选择标签', trigger: 'change' }
            ]
            },
            upfilelist:[]
        }
    },
    computed: {
        username:function() {
            return window.sessionStorage.getItem("userinfo")
        }
    },
    methods:{
        givelbs:function(items) {
            for( item in items) {
            this.upForm.labelIds.push(item.id)
            }
        },
        reset:function() {
            this.title="";
            this.upForm =   {
                goodsId:"0",
                labelIds:[],
                price:"",
                msg:"",
            },
            this.upfilelist=[]
        },
        handleexceed:function() {
            this.$message.error("只能上传五张哦")
            this.upfilelist.slice(4);
        },
        handlechange:function(file,upfilelist) {
            this.upfilelist.push(file)
            console.log(this.upfilelist)
        },
        handleRemove(file, fileList) {
            this.upist = fileList
        },
        uploadtoserver:function() {
            // this.$refs.upload.submit();
            let that = this;
            let token  = JSON.parse(window.sessionStorage.getItem("token"));
            console.log(that.upForm)
            this.$http
                .post("/user/createGoods", that.upForm, 
                { headers: {
                    'content-type': 'application/json',
                    "token":token
                }})
                .then(function (res) {
                // console.log(res);
                if (res.status == 200) {
                        that.$message.success(res.data.msg);
                        let fformdata= new FormData;
                        fformdata.append("goodsId","1");
                        fformdata.append("tag","1");
                        fformdata.append("file",that.upfilelist[0].raw);
                        this.$http
                        .post("/user/uploadGoodsPicture",fformdata, 
                        { headers: {
                            'content-type': 'application/x-www-form-urlencoded',
                            "token":token
                        }})
                        .then(function (res) {
                        console.log(res);
                        if (res.status == 200) {
                            that.$message.success(res.data.msg);
                        }
                        });
                        for(let i = 1;i<=that.upfilelist.length-1;i++) {
                            let formdata= new FormData;
                            formdata.append("goodsId",res.data.goodsId);
                            formdata.append("tag","0");
                            formdata.append("file",that.upfilelist[i].raw);
                            this.$http
                                .post("/user/uploadGoodsPicture",formdata, 
                                { headers: {
                                    'content-type': 'application/x-www-form-urlencoded',
                                    "token":token
                                }})
                                .then(function (res) {
                                console.log(res);
                                if (res.status == 200) {
                                    // that.$message.success(res.data.msg);
                                }
                                });
                                }
                        }
                        });
        },
        // rendertags:function() {
        //     this.upForm.tags=this.$refs['tags'].getVal();
        // }
    },
    components:{
        tags
    }
}
</script>
<style scoped>
.el-main {
    margin: 20px;
    padding: 0px;
    background-color: rgb(250, 250, 250);
}
.form {
    margin-top: 70px;
    margin-left: 40px;
    padding-right: 60px;
}
.uploadbox {
    margin: 50px 90px;
}
.tip {
    color: rgb(247, 157, 157);
    font-size: 12px;
}
</style>