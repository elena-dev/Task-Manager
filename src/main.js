import Vue from 'vue'
import App from './App.vue'
import store from './store'
Vue.config.productionTip = false
import vuejsDatepicker from 'vuejs-datepicker';
import 'vue2-datepicker/index.css';
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import vSelect from 'vue-select'
import moment from 'moment'


Vue.use(BootstrapVue)
Vue.use(moment)
Vue.use(vuejsDatepicker)
Vue.use(Vuelidate)
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
