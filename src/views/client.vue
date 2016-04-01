<template>
  <div class="demo">
    <div id="hand" class="hand hand-animate"></div>
    <shake @shake="shake" :threshold=15></shake>
  </div>
</template>
<script>
  import Shake from '../components/shake.vue'
  import store from '../store';
  export default{
    components: {
      Shake
    },
    data(){
      return {
        shakeId:'',
        userId:''
      }
    },
    route:{
      data (transition){
        const shakeId = transition.to.params.shakeId;
        const userId = (new Date().getTime()).toString(36);
        store.createUser(shakeId,userId);
        transition.next({
          'shakeId':shakeId,
          'userId':userId
        })
      }
    },
    methods: {
      shake: function () {
        store.listenShake(this.shakeId,this.userId)
      }
    }
  }
</script>
<style>
  .demo{width:320px; height: 300px; margin:auto auto; position: absolute; top:0; bottom: 0; left: 0; right: 0 }
  .hand { width: 190px; height: 300px; margin:0 auto; background: url(../asset/images/hand.png) no-repeat; }
  .hand-animate { -webkit-animation: hand_move infinite 2s; }
  .result { background: #393B3C; border: #2C2C2C 1px solid; box-shadow: inset #4D4F50 0 0 0 1px; border-radius: 10px; color: #fff; padding: 10px; width: 300px; opacity: 0;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -ms-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s; }
  .result-show { opacity: 1; margin-top: 50px; }

  @-webkit-keyframes hand_move {
    0% {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -o-transform: rotate(0);
      transform: rotate(0); }
    50% {
      -webkit-transform: rotate(15deg);
      -moz-transform: rotate(15deg);
      -ms-transform: rotate(15deg);
      -o-transform: rotate(15deg);
      transform: rotate(15deg); }
    100% {
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      -ms-transform: rotate(0);
      -o-transform: rotate(0);
      transform: rotate(0); }
  }
</style>