<template>
    <div class="goods_detail_div">
    <div class="goods_detail">
        <router-link to="/GoodsInfo">
            <div class="back">
                <span class="material-icons back_arrow">
                    navigate_before
                </span>
            </div>
        </router-link>
        <div class="title">修改商品資料</div>
    </div>
    <div class="goods_div">
        <div class="goods">
            <div class="goods_picture">
                <div class="pic"></div>
            </div>
            <div class="goods_name">*商品名稱</div>
            <input  type="text" v-model="goodsname"  class="input" >
            <div class="goods_introduce">*商品描述</div>
            <input type="text" v-model="goodsdescription" class="input">
            <div class="goods_price">*價格</div>
            <input type="text" v-model="goodsprice" class="input">
        </div>
        <router-link to="/GoodsInfo" style="text-decoration: none">
            <div class="renew_button" @click="add_goods">
                送出
            </div>
        </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'AddGoods',
    data(){
        return {
            shop_num: '',
            goodsname: '',
            goodsprice: '',
            goodsdescription: ''
        }
    },
    methods:{
        add_goods(){
            this.shop_num = localStorage.getItem('token')
            axios.get('/api/shop_add_goods.php',{
            params: {
                s_num:this.shop_num,
                new_g_name: this.goodsname,
                new_g_description: this.goodsdescription,
                new_g_price: this.goodsprice
            }
            })
            .then(res => {
                if(res.data.err_msg=='資料表名稱不可為空'){
                    alert("資料表不可為空")
                }
                else{
                    console.log("送出")
                }
            })
        }
    }
}
</script>

<style lang="sass" scoped>

    .goods_detail_div
        height:0
        top:0
        left:0
        padding-bottom: 800px
        background-color: #FFD40080
        font-size: 25px
        font-weight: bold
        .goods_detail
            padding-top: 25px
            display: flex
            flex-direction: row
            .title
                top: 0          
                bottom: 0          
                left: 0       
                right: 0
                margin: auto
            .back
                position: relative
                left: 5px
                border-radius: 50%
                background-color: #fff
                height: 30px
                width: 30px
                .back_arrow
                    position: absolute
                    top: 50%
                    left: 50%
                    transform: translate(-50%,-50%)
                    font-size: 0.5rem
                    padding: 0
                    font-size: 25px
        .goods_div
            border-radius: 30px
            background-color: #F5F5F5
            padding-bottom: 500px
            margin-top: 20px
        .goods
            position: relative
            padding: 50px
            display: flex
            flex-direction: column
            .input
                border-radius: 15px
                border-color: #FFBD09
                margin-top: 10px
            .goods_name,.goods_introduce,.goods_price
                margin-top: 10px
            .goods_picture
                display: flex
                justify-content: center
                .pic
                    width: 445px
                    height: 250px
                    background-color: black
        .renew_button
            position: relative
            top: 50%
            left: 50%
            transform: translate(-50%,-50%)
            text-align: center
            font-size: 25px
            font-weight: bold
            background-color: #FFBD09
            color: #fff
            width: 150px
            border-radius: 25px

</style>