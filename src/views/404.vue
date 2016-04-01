<template>
  <div class="nopage">
    <div class="nopage-bd">
      <h1>404</h1>
      <p>您访问的页面不存在！</p>
    </div>
  </div>
</template>
<style>
  .nopage{
    position: absolute;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    background: #f0f0f0;
  }
  .nopage-bd{
    position: absolute;
    margin: auto;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    height:200px;
  }
  .nopage h1,.nopage p{
    font-family:"黑体";
    text-align: center;
    color: transparent;
    background-color : #666;
    text-shadow : rgba(255,255,255,0.5) 0 5px 6px, rgba(255,255,255,0.2) 1px 3px 3px;
    -webkit-background-clip : text;
  }
  .nopage h1{
    font-size:96px;}
  .nopage p{
    font-size:20px;}
</style>