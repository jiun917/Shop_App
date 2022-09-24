<template>
    <div class="login_div">
        <div class="login_top">
            <div class="logo">
                <img class="logo_img" src="http://localhost:8080/api/Img/AppLogo.png">
            </div>
        </div>
        <div class="login_bottom">
            <p class="welcome">歡迎!</p>
            <br>
            <p>請登入帳號及密碼</p>
            <q-input class="account" color="yellow" v-model="account" placeholder="帳號">
                <template v-slot:prepend>
                    <q-icon name="account_circle" style="color:#FFBD09;font-size:40px;"></q-icon>
                </template>
            </q-input>
            <q-input class="password" color="yellow" v-model="password" placeholder="密碼" type="password">
                <template v-slot:prepend>
                    <q-icon name="lock" style="color:#FFBD09;font-size:40px;"></q-icon>
                </template>
            </q-input>
            <div class="msg">{{msg}}</div>
            <div class="login_btn" @click="login">登入</div>
            <div class="forgot_password">忘記密碼</div>
            <div class="sign_up">註冊</div>
        </div>
    </div>
    </template>
    
    <script>
    import axios from 'axios'
    export default {
        name:'LoginPage',
        data(){
            return{
                s_num:'',
                account:'',
                password:'',
                msg:'',
                state: false
            }
        },
        methods:{
            async login(){
                await axios.get('/api/shop_login.php',{
                params: {
                    account: this.account,
                    password: this.password
                }
                })
                .then(res => {
                    console.log(res.data)
                    this.msg = res.data.err_msg
                    this.s_num = res.data.s_num
                    this.state = res.data.ok
                })
                if(!this.state){
                    this.clear()
                }
                
                if(this.state){
                    
                    localStorage.setItem('token',this.s_num)
                    this.$router.push('/')
                } else {
                    this.$router.push('/login')
                }
    
            },
            clear(){
                this.account = ''
                this.password = ''
            },
            
        }
    }
    </script>
    
    <style lang="sass" scoped>
        .login_div
            position: absolute
            height:0
            top:0
            left:0
            padding-bottom: 800px
            width: 100%
            background-color: #FFD40080
            .login_top
                padding-top: 30px
                display: flex
                justify-content: center
                .logo
                    width: 250px
                    height: 250px
                    .logo_img
                        width: 250px
                        height: 250px
            .login_bottom
                position: relative
                height:0
                top:0
                left:0
                border-radius: 30px 30px 0 0
                background-color: #F5F5F5
                padding: 40px 30px 520px 20px
                margin-top: 20px
                overflow: hidden
                font-size: 20px
                .welcome
                    font-size: 30px
                    font-weight: bold
                .account
                    margin-top: 30px
                .password 
                    margin-top: 30px
                .login_btn
                    margin: 0 auto
                    margin-top: 2rem
                    width: 100px
                    line-height: 30px
                    background-color: #FFBD09
                    border-radius: 0.4rem
                    text-align: center
                    font-size: 20px
                    font-weight: bold
                    color: #fff
                .forgot_password
                    margin: 0 auto
                    text-align: center
                    margin-top: 0.5rem
                    font-size: 15px
                .sign_up
                    margin: 0.5rem auto
                    width: 100px
                    line-height: 30px
                    background-color: #FFBD09
                    border-radius: 0.4rem
                    text-align: center
                    font-size: 20px
                    font-weight: bold
                    color: #fff
                .msg
                    font-weight: bold
                    color: red
                    text-align: center
                    margin-top: 0.3rem
            
    </style>