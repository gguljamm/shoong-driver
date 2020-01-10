<template>
  <div class="nuxtWrapper">
    <nuxt/>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab');
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR');


  html {
    font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
    font-size: 16px;
    color: #4a4a4a;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body{
    background-color: rgb(243, 243, 243);
  }
  *:focus{
    outline: none;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .nuxtWrapper{
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
</style>
