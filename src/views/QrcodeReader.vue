<template>
  <div>
       <!-- <p class="error">{{ error }}</p> -->
       <!--錯誤資訊-->
 
       <p class="decode-result">
           掃描結果:
           {{order_num}}
           <b>{{ result }}</b>
           <b>{{ error }}</b>
       </p> 
       <!--掃描結果-->
 
       <qrcode-stream
           @decode="onDecode"
           @init="onInit"
       >
           <div>
               <div class="qr-scanner">
                   <div class="box">
                       <div class="line"></div>
                       <div class="angle"></div>
                   </div>
                   <div class="txt">
                       將二維條碼/條碼放入框內，即自動掃描
                       <div class="myQrcode">QRCODE</div>
                   </div>
               </div>
           </div>
       </qrcode-stream>
   </div>
 </template>
   
<script>
import { QrcodeStream } from 'vue3-qrcode-reader'
import axios from 'axios'
   export default {
     name:'QrcodeReader',
     components: { QrcodeStream },
     data () {
       return {
          order_num:'',
          result: '', // 掃碼結果資訊
           error: '', // 錯誤資訊
       }
     },
     mounted(){
       this.order_num = this.$store.getters.click_order_num
       
     },
     methods: {
       onDecode(result) {
           this.result = result;
           if(this.result == this.order_num)
           {
             axios.get('/api/shop_finish_order.php',{
             params: {
                 o_num: result
             }
             })
             .then(res => {
                 console.log(res.data)
                 this.data_change = true
                 if(res.data.err_msg=='系統錯誤'){
                     alert("系統錯誤")
                 }
                 else{
                     console.log("送出")
                 }
             })
             this.$router.push('/')
           }
       }, 
       async onInit (promise) {
         try {
           await promise
         } catch (error) {
           if (error.name === 'NotAllowedError') {
             this.error = "ERROR: you need to grant camera access permission"
           } else if (error.name === 'NotFoundError') {
             this.error = "ERROR: no camera on this device"
           } else if (error.name === 'NotSupportedError') {
             this.error = "ERROR: secure context required (HTTPS, localhost)"
           } else if (error.name === 'NotReadableError') {
             this.error = "ERROR: is the camera already in use?"
           } else if (error.name === 'OverconstrainedError') {
             this.error = "ERROR: installed cameras are not suitable"
           } else if (error.name === 'StreamApiNotSupportedError') {
             this.error = "ERROR: Stream API is not supported in this browser"
           } else if (error.name === 'InsecureContextError') {
             this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
           } else {
             this.error = `ERROR: Camera error (${error.name})`;
           }
         }
       },
       // openCamera() {
           
       // },
       // closeCamera() {
           
       // }
     }
   }
   </script>
   
   <style  scoped>
     .error {
         font-weight: bold;
         color: red;
       }
       .cameraMessage {
         width: 100%;
         height: 60px;
       }
       .qr-scanner {
         background-image: linear-gradient(
                 0deg,
                 transparent 24%,
                 rgba(32, 255, 77, 0.1) 25%,
                 rgba(32, 255, 77, 0.1) 26%,
                 transparent 27%,
                 transparent 74%,
                 rgba(32, 255, 77, 0.1) 75%,
                 rgba(32, 255, 77, 0.1) 76%,
                 transparent 77%,
                 transparent
             ),
             linear-gradient(
                 90deg,
                 transparent 24%,
                 rgba(32, 255, 77, 0.1) 25%,
                 rgba(32, 255, 77, 0.1) 26%,
                 transparent 27%,
                 transparent 74%,
                 rgba(32, 255, 77, 0.1) 75%,
                 rgba(32, 255, 77, 0.1) 76%,
                 transparent 77%,
                 transparent
             );
         background-size: 3rem 3rem;
         background-position: -1rem -1rem;
         width: 100%;
         /* height: 100%; */
         height: 100vh;
         /* height: 288px; */
         position: relative;
         background-color: #1110;
       
         /* background-color: #111; */
       }
       /* .qrcode-stream-wrapper {
         display: flex;
         justify-content: center;
         align-items: center;
         margin-top: 82px;
         clear: both;
       } */
       /* .qrcode-stream-wrapper >>> .qrcode-stream-camera {
         width: 213px;
         height: 210px;
         clear: both;
         margin-top: 39px;
       } */
       .qr-scanner .box {
         width: 213px;
         height: 213px;
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%, -50%);
         overflow: hidden;
         border: 0.1rem solid rgba(0, 255, 51, 0.2);
         /* background: url('http://resource.beige.world/imgs/gongconghao.png') no-repeat center center; */
       }
       .qr-scanner .txt {
         width: 100%;
         height: 35px;
         line-height: 35px;
         font-size: 14px;
         text-align: center;
         /* color: #f9f9f9; */
         margin: 0 auto;
         position: absolute;
         top: 70%;
         left: 0;
       }
       .qr-scanner .myQrcode {
         text-align: center;
         color: #00ae10;
       }
       .qr-scanner .line {
         height: calc(100% - 2px);
         width: 100%;
         background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
         border-bottom: 3px solid #00ff33;
         transform: translateY(-100%);
         animation: radar-beam 2s infinite alternate;
         animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
         animation-delay: 1.4s;
       }
       
       .qr-scanner .box:after,
       .qr-scanner .box:before,
       .qr-scanner .angle:after,
       .qr-scanner .angle:before {
         content: '';
         display: block;
         position: absolute;
         width: 3vw;
         height: 3vw;
       
         border: 0.2rem solid transparent;
       }
       
       .qr-scanner .box:after,
       .qr-scanner .box:before {
         top: 0;
         border-top-color: #00ff33;
       }
       
       .qr-scanner .angle:after,
       .qr-scanner .angle:before {
         bottom: 0;
         border-bottom-color: #00ff33;
       }
       
       .qr-scanner .box:before,
       .qr-scanner .angle:before {
         left: 0;
         border-left-color: #00ff33;
       }
       
       .qr-scanner .box:after,
       .qr-scanner .angle:after {
         right: 0;
         border-right-color: #00ff33;
       }
       
       @keyframes radar-beam {
         0% {
             transform: translateY(-100%);
         }
       
         100% {
             transform: translateY(0);
         }
       }
   </style>