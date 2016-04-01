import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter);

var router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
});

router.map({
  '/':{
    name:'home',
    component:require('./views/home.vue')
  },
  '/screen/:shakeId':{
    name:'screen',
    component:require('./views/screen.vue')
  },
  '/client/:shakeId':{
    name:'client',
    component:require('./views/client.vue')
  },
  '/404':{
    name:'404',
    component:require('./views/404.vue')
  }
});


router.beforeEach(function () {
  window.scrollTo(0, 0);
})

router.redirect({
  '*': '/404'
})

router.start(App,'#app');