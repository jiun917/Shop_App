<template>
  <div class="home">
    <div class="header">
      EASYGO逸利購
    </div>
    <div class="list_div">
      <span class="material-icons" style="position: absolute;font-size:40px;right: 15px" @click="logout">
        logout
      </span>
      <div class="list">
        <router-link to="/GoodsInfo" style="text-decoration: none">
          <div class="goodsInfo">商品資訊</div>
        </router-link>
        <router-link to="/OrderInfo" style="text-decoration: none">
          <div class="order">訂單</div>
        </router-link>
      </div>
      <div class="button">
        <div class="shop_open">開始營業</div>
        <div class="shop_close">結束營業</div>
      </div>
    </div>
    <q-dialog class="alert" v-model="alert">
        <q-card class="alert_card">
            <q-card-section>
                <div class="text-h5 text-weight-bold">確定要登出嗎?</div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn class="text-h6 text-weight-bold" flat label="確認" color="warning" v-close-popup @click="confirm_logout"></q-btn>
                <q-btn class="text-h6 text-weight-bold" flat label="取消" color="warning" v-close-popup ></q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
  </div>
  
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      alert: false
    }
  },
  methods:{
    logout(){
      this.alert = true
    },
    confirm_logout(){
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>


<style lang="sass" scoped>
  .home
    height:0
    top:0
    left:0
    padding-bottom: 800px
    background-color: #FFD40080
    .header
      padding-top: 25px
      font-size: 40px
      text-align: center
      font-weight: bold
    .list_div
      border-radius: 30px
      background-color: #F5F5F5
      padding-bottom: 600px
      margin-top: 20px
      display: flex 
      flex-direction: column
      align-items: center
      font-weight: bold
      .list 
        margin-top: 150px
        .goodsInfo,.order
          background-color: #fff
          color: black  
          border-radius: 15px
          width: 300px
          font-size: 35px
          margin-bottom: 20px
          text-align: center
      .button
        margin-top: 150px
        display: flex 
        flex-direction: row   
        justify-content: center
        align-items: center
        font-size:20px
        .shop_open,.shop_close
          width: 100px
          border-radius: 5px
          border: solid 2px #FFBD09
          margin-right: 20px
          text-align: center
          background-color: #fff
          .click_button
            color: white
            background-color: #FFBD09
</style>

