import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =new Vuex.Store({
    state:{
        goods:[],
        userinfo:{}
    },
    mutations:{
        shareGoods:function(state,li) {
            state.goods=li
        },
        getuserinfo:function(state,info) {
            state.userinfo=info
        }
    },
    getters:{

    }
})

export default store