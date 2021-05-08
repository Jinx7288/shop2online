<template>
  <div>
      <el-container class="msgbox">
          <el-aside width="150px">
                <el-menu  class="el-menu-vertical-demo" :collapse="isCollapse">
                    <el-menu-item index="managenotice">
                        <span slot="title">管理员通知</span>
                    </el-menu-item>
                    <el-menu-item index="othernotice">
                        <span slot="title">其他通知</span>
                    </el-menu-item>
                    </el-menu>
          </el-aside>
          <el-main>
             <managenotice v-show="false"></managenotice>
             <othernotice></othernotice>
          </el-main>
      </el-container>
  </div>
</template>

<script>
import managenotice from "../personalcenter/inboxcps/managenotice"
import othernotice from "../personalcenter/inboxcps/othernotice"
export default {
  data:function() {
    return {
        isCollapse:false
    }
  },
  components:{
      managenotice,
      othernotice
  }

}
</script>

    Managenotice<style scoped>
.msgbox {
    width:80%;
    margin: 0px auto;
}
.el-container {
    height: 100%;
}
</style>>