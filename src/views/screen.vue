<template>
  <div class="wrap">
    <div v-if="!isStart" class="page-step1" :class="{'page-active':!isStart}" transition="stop" >
      <ul class="user-list">
        <li v-for="user in users" class="user-head" :style="{background:user.pic}" track-by="$index"></li>
      </ul>
    </div>
    <div v-if="isStart" class="page-step2" :class="{'page-active':isStart}" transition="play" >开始了</div>
    <button @click="start" class="btn">{{ btnStr }}吧</button>
  </div>
</template>

<script>
  import store from '../store';

  export default {
    data(){
      return {
        isStart : false,
        btnStr : "开始",
        shakeId:''
      }
    },
    route:{
      data (transition){
        var shakeId = transition.to.params.shakeId;
        store.listenUser(shakeId);
        transition.next({
          'shakeId':shakeId
        })
      }
    },
    computed:{
      users: function(){
        var arr = Array(16);
        for(var i = 0;i<arr.length;i++){
          arr[i] = {};
          arr[i].pic = this.randColor();
        }
        return arr;
      }
    },
    created () {
      store.on('userUpdated', this.upUsers);
    },
    destroyed () {
      store.removeListener('userUpdated', this.upUsers);
    },
    methods:{
      start:function(){
        this.isStart = !this.isStart;
        this.btnStr = this.isStart?"结束":"开始";
      },
      randColor:function(){
        return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6)
      },
      upUsers:function(){
        console.log('update',this.shakeId)
        store.fetchUsers(this.shakeId).then(function(data){
          console.log(data);
        })
      }
    }
  }
</script>

<style>
  .wrap{
    position: absolute;
    height:80%;
    width: 80%;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    margin: auto;
  }
  .page {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  .page1{
    background:#6699cc;
  }
  .page2{
    background: #008080;
  }

  .page-step1{
    padding: 10px;
  }

  .page-step2{

  }

  .user-head{
    height: 100px;
    width: 100px;
    border-radius: 50%;
    display: inline-block;
    margin: 0 10px 10px 0;
    border:4px solid #fff;
  }

  .stop-transition,.play-transition{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  .stop-enter,.stop-enter{
    visibility: visible;
    z-index: 10;
  }

  .stop-transition{
    background:#6699cc;
  }
  .play-transition{
    background: #008080;
  }

  .stop-leave{
    -webkit-animation: moveToLeft .2s ease both;
    -moz-animation: moveToLeft .2s ease both;
    animation: moveToLeft .2s ease both;
  }

  .stop-enter{
    -webkit-animation: moveFromLeft .2s ease both;
    -moz-animation: moveFromLeft .2s ease both;
    animation: moveFromLeft .2s ease both;
  }

  .play-leave{
    -webkit-animation: moveToRight .2s ease both;
    -moz-animation: moveToRight .2s ease both;
    animation: moveToRight .2s ease both;
  }

  .play-enter{
    -webkit-animation: moveFromRight .2s ease both;
    -moz-animation: moveFromRight .2s ease both;
    animation: moveFromRight .2s ease both;
  }

  .page-active{
    visibility: visible;
    z-index: 1;
  }
  .btn{position: absolute; right: 10px; top:20px; display: inline-block; height: 30px; line-height:30px; width: 60px;
    text-align: center;z-index: 30;}

  .page-ontop {
    z-index: 19;
  }


  .page-moveToLeft {
    -webkit-animation: moveToLeft .2s ease both;
    -moz-animation: moveToLeft .2s ease both;
    animation: moveToLeft .2s ease both;
  }
  .page-moveFromLeft {
    -webkit-animation: moveFromLeft .2s ease both;
    -moz-animation: moveFromLeft .2s ease both;
    animation: moveFromLeft .2s ease both;
  }

  .page-moveToRight {
    -webkit-animation: moveToRight .2s ease both;
    -moz-animation: moveToRight .2s ease both;
    animation: moveToRight .2s ease both;
  }
  .page-moveFromRight {
    -webkit-animation: moveFromRight .2s ease both;
    -moz-animation: moveFromRight .2s ease both;
    animation: moveFromRight .2s ease both;
  }


  @-webkit-keyframes moveToLeft {
    to { -webkit-transform: translateX(-100%); }
  }
  @-moz-keyframes moveToLeft {
    to { -moz-transform: translateX(-100%); }
  }
  @keyframes moveToLeft {
    to { transform: translateX(-100%); }
  }

  @-webkit-keyframes moveFromLeft {
    from { -webkit-transform: translateX(-100%); }
  }
  @-moz-keyframes moveFromLeft {
    from { -moz-transform: translateX(-100%); }
  }
  @keyframes moveFromLeft {
    from { transform: translateX(-100%); }
  }

  @-webkit-keyframes moveToRight {
    to { -webkit-transform: translateX(100%); }
  }
  @-moz-keyframes moveToRight {
    to { -moz-transform: translateX(100%); }
  }
  @keyframes moveToRight {
    to { transform: translateX(100%); }
  }

  @-webkit-keyframes moveFromRight {
    from { -webkit-transform: translateX(100%); }
  }
  @-moz-keyframes moveFromRight {
    from { -moz-transform: translateX(100%); }
  }
  @keyframes moveFromRight {
    from { transform: translateX(100%); }
  }





</style>