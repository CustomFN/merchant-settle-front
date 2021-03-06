// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

import VueCookies from 'vue-cookies'
import Axios from 'axios'
import qs from 'qs'
import AMap from 'vue-amap'
import moment from 'moment'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/iconfont/iconfont.css'
import '@/styles/index.scss' // global css

Vue.use(Vuex)
Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.use(AMap)
Vue.prototype.$moment = moment
Vue.prototype.$qs = qs
Vue.prototype.$axios = Axios
Vue.config.productionTip = false

AMap.initAMapApiLoader({
  key: '4941757d2d8d9a21017936b95e9be40a',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Geolocation', 'Geocoder', 'AMap.MouseTool'],
  v: '1.4.4'
})

Vue.filter('dateformat', function (datatime, pattern = 'YYYY-MM-DD') {
  if (datatime) {
    return moment.unix(datatime).format(pattern)
  } else {
    return datatime
  }
})

const store = new Vuex.Store({
  state: {
    customerId: localStorage.getItem('customerId') || 0,
    contractId: localStorage.getItem('contractId') || 0,
    physicalPoiId: localStorage.getItem('physicalPoiId') || 0,
    wmPoiId: localStorage.getItem('wmPoiId') || 0,
    auditTaskId: localStorage.getItem('auditTaskId') || 0,
    auditPassStatus: localStorage.getItem('auditPassStatus') || 203,
    auditRejectStatus: localStorage.getItem('auditRejectStatus') || 202
  },
  mutations: {
    setCustomerId (state, val) {
      localStorage.setItem('customerId', val)
      state.customerId = val
    },
    setContractId (state, val) {
      localStorage.setItem('contractId', val)
      state.contractId = val
    },
    setWmPoiId (state, val) {
      localStorage.setItem('wmPoiId', val)
      state.wmPoiId = val
    },
    setPhysicalPoiId (state, val) {
      localStorage.setItem('physicalPoiId', val)
      state.physicalPoiId = val
    },
    setAuditTaskId (state, val) {
      localStorage.setItem('auditTaskId', val)
      state.auditTaskId = val
    }
  },
  actions: {
    setCustomerIdAction (context, val) {
      context.commit('setCustomerId', val)
    },
    setContractIdAction (context, val) {
      context.commit('setContractId', val)
    },
    setWmPoiIdAction (context, val) {
      context.commit('setWmPoiId', val)
    },
    setPhysicalPoiIdAction (context, val) {
      context.commit('setPhysicalPoiId', val)
    },
    setAuditTaskIdAction (context, val) {
      context.commit('setAuditTaskId', val)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
