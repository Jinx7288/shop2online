<template>
    <div>
        <el-tag
            :key="tag.name"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.name}}
            </el-tag>
            <el-popover
              placement="top"
              width="400"
              trigger="click">
             <el-button  v-for="item in lbli"
                        :key="item.name"
                        :item='item'
                        type="danger"
                        plain
                        size="mini">
                        <div @click="addto(item)">
                        {{item.name}}
                        </div>
             </el-button>
            <el-button class="button-new-tag" size="small" @click="showInput" slot="reference">+ 添加</el-button>
            </el-popover>
    </div>    
</template>
<style scoped>
.el-popover > button {
  margin: 3px;
}
  .el-input {
      width:90px
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<script>
  export default {
    data() {
      return {
        dynamicTags: [{
          name:"示例"
        }, {
          name:"请删除"
        }],
        // inputVisible: false,
        inputValue: '',
        lbli:[
    {
        id: 1,
        fid: 0,
        name: "女装"
    },
    {
        id: 2,
        fid: 0,
        name: "男装"
    },
    {
        id: 3,
        fid: 0,
        name: "户外运动"
    },
    {
        id: 4,
        fid: 0,
        name: "手机数码"
    },
    {
        id: 5,
        fid: 0,
        name: "宿舍用品"
    },
    {
        id: 6,
        fid: 0,
        name: "箱包"
    },
    {
        id: 7,
        fid: 0,
        name: "化妆品"
    },
    {
        id: 8,
        fid: 0,
        name: "配饰"
    },
    {
        id: 9,
        fid: 0,
        name: "鞋帽"
    },
    {
        id: 10,
        fid: 0,
        name: "食品"
    },
    {
        id: 15,
        fid: 2,
        name: "男上装"
    },
    {
        id: 16,
        fid: 2,
        name: "男裤"
    },
    {
        id: 17,
        fid: 2,
        name: "男袜"
    },
    {
        id: 21,
        fid: 4,
        name: "手机"
    },
    {
        id: 22,
        fid: 4,
        name: "摄像机"
    },
    {
        id: 23,
        fid: 4,
        name: "充电宝"
    },
    {
        id: 24,
        fid: 4,
        name: "充电器"
    },
    {
        id: 25,
        fid: 4,
        name: "自拍杆"
    },
    {
        id: 11,
        fid: 1,
        name: "女裙"
    },
    {
        id: 12,
        fid: 1,
        name: "女上装"
    },
    {
        id: 13,
        fid: 1,
        name: "女裤"
    },
    {
        id: 14,
        fid: 1,
        name: "女袜"
    },
    {
        id: 26,
        fid: 5,
        name: "排插"
    },
    {
        id: 27,
        fid: 5,
        name: "洗衣机"
    },
    {
        id: 28,
        fid: 5,
        name: "电风扇"
    },
    {
        id: 29,
        fid: 5,
        name: "墙纸"
    },
    {
        id: 30,
        fid: 5,
        name: "洗发液"
    },
    {
        id: 31,
        fid: 5,
        name: "沐浴露"
    },
    {
        id: 44,
        fid: 9,
        name: "运动鞋"
    },
    {
        id: 45,
        fid: 9,
        name: "篮球鞋"
    },
    {
        id: 46,
        fid: 9,
        name: "休闲鞋"
    },
    {
        id: 47,
        fid: 9,
        name: "豆豆鞋"
    },
    {
        id: 48,
        fid: 9,
        name: "男帽"
    },
    {
        id: 49,
        fid: 9,
        name: "女帽"
    },
    {
        id: 50,
        fid: 9,
        name: "睡帽"
    }
]
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      returntags:function() {
        let that = this;
        this.$emit("givelbs",that.dynamicTags)
      },
      showInput() {
        // this.inputVisible = true;
        // this.$nextTick(_ => {
        //   this.$refs.saveTagInput.$refs.input.focus();
        // });
      },

      addto(item) {
        if (this.dynamicTags.length>=7) {
               this.$message({
                message: '最多只能添加七个标签哦',
                type: 'warning'
            });
        } else {
              this.dynamicTags.push(item)
        }
      }
    }
  }
</script>