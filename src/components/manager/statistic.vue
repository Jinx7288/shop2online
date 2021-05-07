<template>
    <div class="paint">
        <div>
            <el-button size="medium" @click="todialylog">用户日活跃</el-button>
            <el-button size="medium" @click="toregis">用户注册数</el-button>
            <el-button size="medium" @click="togu">日上传商品数</el-button>
        </div>
        <div class="daytimes">
            <canvas ref="c1" v-show="show1"></canvas>
            <canvas ref="c2" v-show="show2"></canvas>
            <canvas ref="c3" v-show="show3"></canvas>
        </div>
    </div>    
</template>
<script>
import Chart from 'chart.js/auto';
export default {
    data:function() {
        return {
            show1:true,
            show2:false,
            show3:false,
            dataset:[],
            data1:[
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
            data2:[
                {
                    id:"2021-4-29",
                    nb:"2"
                },
                {
                    id:"2021-4-30",
                    nb:"3"
                },{
                    id:"2021-5-01",
                    nb:"2"
                },{
                    id:"2021-5-02",
                    nb:"1"
                },{
                    id:"2021-5-03",
                    nb:"0"
                },{
                    id:"2021-5-04",
                    nb:"5"
                },
            ],
            data3:[
                {
                    id:"2021-4-29",
                    nb:"44"
                },
                {
                    id:"2021-4-30",
                    nb:"32"
                },{
                    id:"2021-5-01",
                    nb:"22"
                },{
                    id:"2021-5-02",
                    nb:"13"
                },{
                    id:"2021-5-03",
                    nb:"33"
                },{
                    id:"2021-5-04",
                    nb:"22"
                },
            ]
        }
    },
    methods: {
        todialylog:function() {
           this.show1 = true;
           this.show2 = false;
           this.show3 = false;
        },
        toregis:function() {
            this.show1 = false;
           this.show2 = true;
           this.show3 = false;
        },
        togu:function() {
            this.show1 = false;
           this.show2 = false;
           this.show3 = true;
        }
    },
    computed:{
     
    },
  
    mounted:function() {
        let that = this;
        let c1 = this.$refs.c1;
        let ct1 = new Chart(c1, 
        {   
            type:"line",
            data:{
                datasets:[
                {
                    data:that.data1,
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
        let c2 = this.$refs.c2;
        let ct2 = new Chart(c2, 
        {   
            type:"line",
            data:{
                datasets:[
                {
                    data:that.data2,
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
         let c3 = this.$refs.c3;
        let ct3 = new Chart(c3, 
        {   
            type:"line",
            data:{
                datasets:[
                {
                    data:that.data3,
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