<template>
  <a class="creatBtn" href="javascript:;" @click="creatShake">创建活动</a>
</template>

<script>
  import store from '../store'
  import _ from 'underscore'

  export default {
    data(){
      return {
        ids:store.shakeKeys
      }
    },
    computed:{

    },
    methods:{
      creatShake:function(){
        var router = this.$route.router;
        var nId = this.verifyId();
        store.listenUser()
        store.createShake(nId).then(
          function(){
            router.go({name:'screen',params:{shakeId:nId}});
          },
          function(err){
            console.log(err);
          }
        );
      },
      verifyId:function(){
        var id = Math.random().toString(36).substr(2,6);
        if(_.indexOf(this.ids,id) == -1){
          return id;
        }else{
          return this.verifyId();
        }
      }
    }
  }
</script>

<style>
  .creatBtn{
    position: absolute;
    left:0;
    top:0;
    right: 0;
    bottom: 0;
    display: block;
    height:120px;
    line-height: 120px;
    width:300px;
    margin: auto;
    border:1px solid #5a5a5a;
    text-align: center;
    font-size:36px;
    font-weight:800;
    text-decoration: none;
  }
</style>