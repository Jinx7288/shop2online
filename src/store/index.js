import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =new Vuex.Store({
    state:{
        goods:[1,2,3,4,5]
    },
    mutations:{
        shareGoods:function(state,li) {
            state.goods=li
        }
    },
    getters:{

    }
})

export default store