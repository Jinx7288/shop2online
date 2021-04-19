<template>
    <div class="showpanel">
        <headbar></headbar>
        
        <goodcard v-for="(item,index) in goodlist"
                    :key="index"
                    :item='item'
                    class="goodcard"></goodcard>
        <test v-for="item in goodlist" :key="item" :item="item">

        </test>
    </div>
    
</template>
<script>
import goodcard from '../components/goodcard.vue'
import headbar from '../components/headbar.vue'
import test from '../components/test'
export default {
    data:function() {
        return {
            goodlist:[]
        }
    },
    components:{
        goodcard,
        headbar,
        test
    },
    created:function() {
        this.goodlist=this.$store.state.goods;
    },
    methods:{

    }
}
</script>
<style scoped>
.showpanel {
    margin-top: 40px;
}
.goodcard {
    display: inline-block;
    margin: 11px 20px;

}
</style>