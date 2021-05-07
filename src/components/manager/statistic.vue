<template>
    <div class="paint">
        <div>
            <el-button size="medium" @click="todialylog">用户日活跃</el-button>
            <el-button size="medium" @click="toregis">用户注册数</el-button>
            <el-button size="medium" @click="togu">日上传商品数</el-button>
        </div>
        <div class="daytimes">
            <canvas ref="daytimesc"></canvas>
        </div>
    </div>    
</template>
<script>
import Chart from 'chart.js/auto';
export default {
    data:function() {
        return {
            dataset:[],
            dailylog:[
                {
                    id:"2021-4-29",
                    nb:"156"
                },
                {
                    id:"2021-4-30",
                    nb:"178"
                },{
                    id:"2021-5-01",
                    nb:"100"
                },{
                    id:"2021-5-02",
                    nb:"32"
                },{
                    id:"2021-5-03",
                    nb:"45"
                },{
                    id:"2021-5-04",
                    nb:"56"
                },
            ],
        }
    },
    methods: {
        
    },
    computed:{
     
    },
    mounted:function() {
        let that = this;
        let ctx = this.$refs.daytimesc;
        let myChart = new Chart(ctx, 
        {   
            type:"line",
            data:{
                datasets:[
                {
                    data:that.dailylog,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                }
            ]                
            },
            options:{
            parsing: {
                xAxisKey: 'id',
                yAxisKey: 'nb'
            }
            }

        });
  

    }
}
</script>
<style scoped>
.daytimesc {
    width: 70%;
    height: 70%;
}
</style>