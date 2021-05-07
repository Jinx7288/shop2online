<template>
    <div class="card">
        <span class="title"></span><br>
        <span class="price">价格:￥ </span><br>
        <div class="detaileddetail">描述：</div><br>
        <span class="address">联系方式：</span>
        <div class="btdiv" v-show="!justshow">
                <el-button type="danger" class="wideer" @click="buyit">购买</el-button>
                <el-button type="danger" plain class="wideer" @click="report"  v-show="!reported">举报</el-button>
                <el-button type="danger" plain class="wideer" v-show="reported" disabled>已举报</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data:function() {
        return {
            reported:false
        }
    },
    methods:{
        buyit:function() {
            this.$emit('ordertoggle')
        },
        report:function() {
            this.reported=true;
             this.$http
            .post("/auth/user/report", {
            email: that.resetpw.email,
            username:that.resetpw.username
            })
            .then(function (res) {
                console.log(res);
                if (res.status == 200) {
                     this.$message.warning("已举报，待工作人员审核")
                }
            });
        }
    },
    props:{
        detail: {
            type: Object,
            default:() => {}   
        },
        justshow:{
            type:Boolean
        }
    }
}
</script>
<style scoped>
.card {
    background-color: rgb(250, 250, 250);
    border: none;
}
.card:hover {
    box-shadow:  0px 0px 10px 2px rgb(233, 233, 233);
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
.btdiv {
    margin: 20px;
    padding: 30px;
}
.wideer {
    width: 100px;
}
</style>