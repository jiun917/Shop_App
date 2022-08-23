<template>
  <div class="home">
    <div class="header">
      系統名稱
    </div>
    <div class="list_div">
      <div class="list">
        <router-link to="/GoodsInfo" style="text-decoration: none">
          <div class="goodsInfo">商品資訊</div>
        </router-link>
        <router-link to="/OrderInfo" style="text-decoration: none">
          <div class="order">訂單</div>
        </router-link>
      </div>
    </div>
  </div>
  
</template>

<script>

export default {
  name: 'HomeView',
}
</script>


<style lang="sass" scoped>
  .home
    height:0
    top:0
    left:0
    padding-bottom: 800px
    background-color: #FFBD0980
    .header
      font-size: 40px
      text-align: center
    .list_div
      border-radius: 30px
      background-color: #F5F5F5
      padding-bottom: 600px
      margin-top: 20px
      display: flex 
      flex-direction: column
      align-items: center
      .list 
        margin-top: 50px
        .goodsInfo,.order
          background-color: #fff
          color: black  
          border-radius: 15px
          width: 300px
          font-size: 35px
          margin-bottom: 20px
          text-align: center
</style>

