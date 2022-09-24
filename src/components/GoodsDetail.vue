<template>
  <div class="goods_detail_div" v-show="isModifyGoods">
    <div class="goods_detail">
        <div class="back" @click="backpage">
            <span class="material-icons back_arrow">
                navigate_before
            </span>
        </div>
        <div class="title">修改商品資料</div>
    </div>
    <div class="goods_div">
        <div class="goods">
            <div class="goods_picture">
                <div class="pic">
                    <img class="goods_img" :src="'http://localhost:8080/api/Img/goods/' + goods_picture + '.jpg'">
                </div>
            </div>
            <div class="goods_name">*商品名稱</div>
            <input  type="text" v-model="goodsname" ref="refgoodsname" class="input" >
            <div class="goods_introduce">*商品描述</div>
            <input type="text" v-model="goodsdescription" class="input">
            <div class="goods_price">*價格</div>
            <input type="text" v-model="goodsprice" class="input">
        </div>
        <div class="button">
            <div class="renew_button" @click="alter">
                確認修改
            </div>
            <div class="delete_goods_button" @click="delete_goods">
                移除商品
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'GoodsDetail',
    data(){
        return {
            goodsname: '',
            goodsprice: '',
            goodsdescription: ''
        }
    },
    props:{
        isModifyGoods: Boolean,
        goods_name: String,
        goods_price: String,
        goods_description: String,
        goods_num:String,
        goods_picture: String
    },
    watch:{
        goods_name(val) {
            this.goodsname = val
        },
        goods_price(val) {
            this.goodsprice = val
        },
        goods_description(val) {
            this.goodsdescription = val
        }
    },
    methods:{
        alter(){
            axios.get('/api/shop_alter_goods.php',{
            params: {
                g_num:this.goods_num,
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
                    this.$emit("backpage",false)
                }
            })
        },
        delete_goods(){
            axios.get('/api/shop_delete_goods.php',{
            params: {
                g_num:this.goods_num
            }
            })
            .then(res => {
                if(res.data.err_msg=='系統錯誤'){
                    alert("系統錯誤")
                }
                else{
                    this.$emit("backpage",false)
                }
            })
        },
        backpage(){
            this.$emit("backpage",false)
        }
    }
}
</script>

<style lang="sass" scoped>
    .goods_detail_div
            position: absolute
            height:0
            top:0
            left:0
            width: 100%
            padding-bottom: 800px
            background-color: #FFBD0980
            font-size: 25px
            z-index: 99
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
                        .goods_img 
                            width: 445px
                            height: 250px

            .button
                display: flex
                flex-direction: row
                justify-content: center
                .renew_button,.delete_goods_button
                    margin-right: 20px
                    text-align: center
                    font-size: 25px
                    font-weight: bold
                    background-color: #FFBD09
                    color: #fff
                    width: 150px
                    border-radius: 25px

</style>