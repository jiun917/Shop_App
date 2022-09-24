<template>
  <div class="orderInfo">
    <div class="order_list">
        <router-link to="/">
            <div class="back" @click="back">
                <span class="material-icons back_arrow">
                    navigate_before
                </span>
            </div>
        </router-link>
        <div class="title">訂單</div>
    </div>
    <div class="list_div">
        <div class="order_state">
            <q-btn  class="not_accept" :class="{select: not_accept_state}" @click="changestate('未接單'),data()">
                未接單
                <q-badge color="red" floating class="notification" v-show="not_accept_quantity>0">{{not_accept_quantity}}</q-badge>
            </q-btn>
            <q-btn class="accepted" :class="{select: accepted_state}" @click="changestate('已接單')">
                已接單
                <q-badge color="red" floating class="notification" v-show="accepted_quantity>0">{{accepted_quantity}}</q-badge>
            </q-btn>
            <q-btn class="available" :class="{select: available_state}" @click="changestate('可取餐')">
                可取餐
                <q-badge color="red" floating class="notification" v-show="available_quantity>0">{{available_quantity}}</q-badge>
            </q-btn>
            
        </div>
        <div class="order_list" v-for="(item,index) in order_list" :key="index" v-show="item.o_state==state">
            <div class="order_title">
                <div class="user_name">{{item.name}}</div>
                <div class="order_number">訂單編號:{{item.o_num}}</div>
            </div>
            <div class="order_datetime">訂單生成時間:{{item.o_datetime}}</div>
            <div class="order_content">訂單內容</div>
            <div class="goods_list" v-show="item.o_num">
                <div class="goods_content" v-for="(item,index) in item.goods" :key="index">
                    <div class="goods_quantity">X{{item.g_quantity}}</div>
                    <div class="goods_name">{{item.g_name}}</div>
                    <div class="goods_price">${{item.g_price*item.g_quantity}}</div>
                </div>
                <q-separator style="margin:10px 0px"  />
                <div class="discount">
                    <div class="string">折扣金額</div>
                    <div class="number">-${{item.o_discount}}</div>
                </div>
                <div class="total">
                    <div class="string">總額</div>
                    <div class="price">${{item.total-item.o_discount}}</div>
                </div>
            </div>
            <div class="order_button">
                <div class="accept_order" @click="click_accept_btn(item.o_num)" v-show="state=='未接單'">接受</div>
                <div class="reject_order" @click="click_reject_btn(item.o_num)" v-show="state=='未接單'">拒絕</div>
                <div class="available_order" @click="click_available_btn(item.o_num)" v-show="state=='已接單'">可取餐</div>
                <div class="cancel_order" @click="click_cancel_btn(item.o_num)" v-show="state=='已接單'">取消訂單</div>
                <div class="finish_order" @click="click_finish_btn(item.o_num)" v-show="state=='可取餐'">完成訂單</div>
            </div>
        </div>
    </div>
    <q-dialog class="alert" v-model="alert">
        <q-card class="alert_card">
            <q-card-section>
                <div class="text-h5 text-weight-bold">訂單拒絕原因</div>
            </q-card-section>

            <q-card-section class="q-pt-none" style="max-width: 700px;width:400px">
                <q-option-group
                :options="options"
                type="radio"
                v-model="rejection_reason"
                label="Size 'md'"
                />
                <q-input v-model="option_other" v-show="disable_other"/>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn class="text-h6 text-weight-bold" flat label="確認" color="warning" v-close-popup @click="confirm_reject"></q-btn>
                <q-btn class="text-h6 text-weight-bold" flat label="取消" color="warning" v-close-popup ></q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
  </div>
  
</template>

<script>
import axios from 'axios'
axios.defaults.timeout = 1000
export default {
    name: 'OrderInfo',
    data(){
        return{
            shop_num: '',
            order_list: [],
            order_content: [],
            data_change: false,
            order_num:'',
            state: '未接單',
            not_accept_state: true,
            accepted_state: false,
            available_state: false,
            not_accept_quantity: 0,
            accepted_quantity: 0,
            available_quantity:0,
            alert: false,
            disable_other:false,
            option_other:'',
            rejection_reason:'material_supply',
            options: [
                { label: '原料供應不足', value: 'material_supply', color:'warning' },
                { label: '訂單目前數量無法負荷', value: 'order_quantity', color: 'warning' },
                { label: '營業時間已結束', value: 'time', color: 'warning' },
                { label: '其他', value: 'other', color: 'warning' }
            ]
        }
    },
    methods:{
        async get_orderlist(){
            await axios.get('/api/shop_order_list.php',{
                params:{
                    shop_num:this.shop_num
                }
            })
            .then(res => {
                if(res.data.length != this.order_list.length || this.data_change){
                    console.log('aaa')
                    this.data_change = true
                    this.order_list = res.data
                }
            })
            
        },
        async get_order_content(){
            await axios.get('/api/shop_order_content.php',{
                params:{
                    shop_num:this.shop_num
                }
            })
            .then(res => {
                if(this.data_change){
                    this.data_change = false
                    console.log('bbb')
                    this.order_content = res.data
                }
            })
        },
        changestate(state){
            this.not_accept_state = false
            this.accepted_state = false
            this.available_state = false

            this.state = state

            if(this.state == '未接單'){
                this.not_accept_state = true
            }else if(this.state == '已接單'){
                this.accepted_state = true
            }else if(this.state == '可取餐'){
                this.available_state = true
            }
        },
        click_accept_btn(num){
            axios.get('/api/shop_accept_order.php',{
            params: {
                o_num:num
            }
            })
            .then(res => {
                console.log(res.data)
                if(res.data.err_msg=='系統錯誤'){
                    alert("系統錯誤")
                }
                else{
                    console.log("送出")
                }
            })
            this.data_change = true
        },
        click_reject_btn(num){
            this.alert = true
            this.order_num = num
            this.data_change = true
        },
        confirm_reject(){
            axios.get('/api/shop_reject_order.php',{
            params: {
                o_num:this.order_num,
                o_state: this.state
            }
            })
            .then(res => {
                console.log(res.data)
                if(res.data.err_msg=='系統錯誤'){
                    alert("系統錯誤")
                }
                else{
                    console.log("送出")
                }
            })
            this.data_change = true
        },
        click_available_btn(num){
            axios.get('/api/shop_available_order.php',{
            params: {
                o_num:num
            }
            })
            .then(res => {
                console.log(res.data)
                if(res.data.err_msg=='系統錯誤'){
                    alert("系統錯誤")
                }
                else{
                    console.log("送出")
                }
            })
            this.data_change = true
        },
        click_cancel_btn(num){
            this.alert = true
            this.order_num = num
            this.data_change = true
        },
        click_finish_btn(num){
            axios.get('/api/shop_finish_order.php',{
            params: {
                o_num:num
            }
            })
            .then(res => {
                console.log(res.data)
                if(res.data.err_msg=='系統錯誤'){
                    alert("系統錯誤")
                }
                else{
                    console.log("送出")
                }
            })
            this.data_change = true
        },
        back(){
            this.cleanTimeOut()
        },
        setTimeoutFun(){
            this.timeOutRefresh = window.setInterval(() => {
                this.data()
            },1000)
        },
        cleanTimeOut(){
            window.clearInterval(this.timeOutRefresh)
        },
        async data(){
            await this.get_orderlist()
            if(this.data_change){
                await this.get_order_content()
                for(var i=0;i<=this.order_list.length-1;i++){
                    Object.assign(this.order_list[i],{goods:[],total:0}) 
                    for(var j=0;j<=this.order_content.length-1;j++){
                        if(this.order_list[i].o_num==this.order_content[j].o_num){
                            this.order_list[i].goods.push(this.order_content[j])
                            this.order_list[i].total = this.order_list[i].total+this.order_content[j].g_price*this.order_content[j].g_quantity
                        }
                    }
                }
                    this.not_accept_quantity = 0
                    this.accepted_quantity = 0
                    this.available_quantity = 0
                    for(var k=0;k<=this.order_list.length-1;k++){
                        if(this.order_list[k].o_state=='未接單')
                            this.not_accept_quantity++
                        else if(this.order_list[k].o_state=='已接單')
                            this.accepted_quantity++
                        else if(this.order_list[k].o_state=='可取餐')
                            this.available_quantity++
                    }
                }
            }
    },
    watch:{
        rejection_reason(value){
            if(value=="other")
                this.disable_other = true
            else
                this.disable_other = false
        }
    },
    async mounted(){
        this.shop_num = localStorage.getItem('token')
        await this.get_orderlist()
        await this.get_order_content()
        await this.setTimeoutFun()
        for(var i=0;i<=this.order_list.length-1;i++){
            Object.assign(this.order_list[i],{goods:[],total:0})
            for(var j=0;j<=this.order_content.length-1;j++){
                if(this.order_list[i].o_num==this.order_content[j].o_num){
                    this.order_list[i].goods.push(this.order_content[j])
                    this.order_list[i].total = this.order_list[i].total+this.order_content[j].g_price*this.order_content[j].g_quantity
                }
            }
        }
        console.log(this.order_list)
        for(var k=0;k<=this.order_list.length-1;k++){
            if(this.order_list[k].o_state=='未接單')
                this.not_accept_quantity++
            else if(this.order_list[k].o_state=='已接單')
                this.accepted_quantity++
            else if(this.order_list[k].o_state=='可取餐')
                this.available_quantity++
        }
        
        
    }
}
</script>

<style lang="sass" scoped>
    .orderInfo
        height:0
        top:0
        left:0
        padding-bottom: 800px
        background-color: #FFD40080
        font-size: 25px
        .order_list
            padding-top: 25px
            display: flex
            flex-direction: row
            .title
                top: 0          
                bottom: 0          
                left: 0       
                right: 0
                margin: auto
                font-weight: bold
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
        .list_div
            border-radius: 30px
            background-color: #F5F5F5
            padding-bottom: 100px
            margin-top: 20px
            display: flex 
            flex-direction: column
            align-items: center
            .order_state
                display: flex
                flex-direction: row
                padding-top: 35px
                .not_accept,.accepted,.available
                    font-size: 20px
                    width: 160px
                    border: solid 1px #FFBD09
                    border-radius: 15px
                    margin-right: 50px
                    text-align: center
                    font-weight: bold
                .select
                    background-color: #FFBD09
                .notification
                    font-size: 15px
                    padding: 5px
            .order_list
                background-color: #fff
                margin-top: 30px
                padding: 30px
                padding-right: 50px
                width: 695px
                border: solid 1px #FFBD09
                border-radius: 15px
                display: flex
                flex-direction: column
                font-weight: bold
                .order_title
                    display: flex
                    flex-direction: row
                    .user_name
                        line-height: 30px
                        font-size: 30px
                        margin-right: 30px
                    .order_number
                        line-height: 40px
                        font-size: 18px
                .order_datetime
                    font-size: 18px
                    color: #707070
                .order_content
                    font-size: 18px
                .goods_list
                    display: flex
                    flex-direction: column
                    .goods_content,.discount,.total
                        position: relative
                        margin-left: 30px
                        display: flex
                        flex-direction: row
                        font-size: 18px
                        color: #707070
                        .goods_quantity   
                            margin-right: 20px
                        .goods_price
                            position: absolute
                            right: 0
                            color: #FFBD09
                    .discount,.total
                        color: black
                        .number
                            position: absolute
                            right: 0
                            color: #FFBD09
                        .price
                            position: absolute
                            right: 0
                            color: #FFBD09
                .order_button
                    display: flex
                    flex-direction: row
                    font-size: 20px
                    justify-content: center
                    .accept_order,.reject_order,.available_order,.cancel_order,.finish_order
                        width: 120px
                        background-color: #FFBD09
                        color: #fff
                        border-radius: 10px
                        margin-top: 20px
                        margin-right: 30px
                        text-align: center
                          
            

</style>