<template>
  <div class="goodsInfo_div" v-show="!isModifyGoods">
    <div class="goodsInfo">
        <router-link to="/">
            <div class="back">
                <span class="material-icons back_arrow">
                    navigate_before
                </span>
            </div>
        </router-link>
        <div class="title">商品資料</div>
    </div>
    <div class="goodslist_div">
        <div class="goodslist">
            <div class="goods" v-for="(item,index) in goodslist" :key="index">
                <div class="goods_left">
                    <div class="goods_picture">商品圖片</div>
                </div>
                <div class="goods_right">
                    <div class="goods_name">{{item.g_name}}</div>
                    <div class="goods_introduce ">{{item.g_description}}</div>
                    <div class="goods_price">${{item.g_price}}</div>
                </div>
                <span class="material-icons edit" @click="modify_goods(index)">
                    edit
                </span>
            </div>
            <div class="goods">
                <router-link to="/AddGoods">
                    <span class="material-icons goods_add">
                        add_circle_outline
                    </span>
                </router-link>
            </div>
        </div>
    </div>
  </div>
  <goods-detail
    :isModifyGoods="isModifyGoods"
    :goods_num="goods_num"
    :goods_name="goods_name"
    :goods_price="goods_price"
    :goods_description="goods_description"
    @backpage="backpage"
  >
  </goods-detail>
</template>

<script>
import GoodsDetail from '../components/GoodsDetail.vue'
import axios from 'axios'
export default {
    name: 'GoodsInfo',
    data(){
        return{
            isModifyGoods: false,
            goodslist: [],
            goods_num: '',
            goods_name: '',
            goods_price: '',
            goods_description: ''
        }
    },
    mounted(){
      axios.get('/api/shop_goods_list.php')
        .then(res => {
          this.goodslist = res.data
          console.log(this.goodslist)
        })
      
    },
    methods:{
        modify_goods(index){
            this.goods_num = this.goodslist[index].g_num
            this.goods_name = this.goodslist[index].g_name
            this.goods_price = this.goodslist[index].g_price
            this.goods_description = this.goodslist[index].g_description
            this.isModifyGoods = true
        },
        backpage(isback) {
            axios.get('/api/shop_goods_list.php')
            .then(res => {
                this.goodslist = res.data
            })
            this.isModifyGoods = isback
        },
    },
    components: {
        GoodsDetail
    }
}
</script>

<style lang="sass" scoped>
    .goodsInfo_div
        height:0
        top:0
        left:0
        padding-bottom: 800px
        background-color: #FFBD0980
        font-size: 25px
        .goodsInfo
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
        .goodslist_div
            border-radius: 30px
            background-color: #F5F5F5
            padding-bottom: 500px
            margin-top: 20px
            .goodslist
                padding: 30px
                display: flex
                flex-direction: row
                flex-wrap: wrap
                .goods
                    position: relative
                    height:140px
                    width:350px
                    background-color: #fff
                    border-radius: 10px
                    margin:10px
                    padding: 20px
                    display: flex
                    flex-direction: row
                    align-items: center
                    font-size: 20px
                    .goods_add
                        font-size: 80px
                        color: #FFBD09
                        position: absolute
                        top: 50%
                        left: 50%
                        transform: translate(-50%,-50%)
                    .goods_left
                        margin-right: 30px
                        border: solid 1px #FFBD09
                        border-radius: 50%
                        height: 95px
                        width: 95px
                        display: flex
                        justify-content: center
                        align-items: center
                        flex-shrink: 0
                    .goods_right
                        display: flex
                        flex-direction: column
                        font-weight: bold
                        .goods_introduce
                            font-size: 15px
                    .edit
                        position: absolute
                        font-size: 25px
                        color: #FFBD09
                        top:5px
                        right:5px
                

    
</style>