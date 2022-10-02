import { createStore } from 'vuex'

export default createStore({
  state: {
    click_order_num:0,
    scan_order_num:0
  },
  getters: {
    click_order_num: state => {
      return state.click_order_num
    },
    scan_order_num: state => {
      return state.scan_order_num
    }
  },
  mutations: {
    addclick_order_num(state,num){
      state.click_order_num = num
    },
    addscan_order_num(state,num){
      state.scan_order_num = num
    }
  },
  actions: {
    getadd_click_order_num(context,num){
      context.commit('addclick_order_num',num)
    },
    getadd_scan_order_num(context,num){
      context.commit('addscan_order_num',num)
    }
  },
  modules: {
  }
})
