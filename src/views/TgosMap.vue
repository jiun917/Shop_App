<template>
  <div class="title">更改營業地址</div>
  <div class="tgosmap">
      <div
      id="TGMap1"
      class="map"
      v-show="TGMap1"
      ></div>
      <div
      id="TGMap2"
      class="map"
      v-show="TGMap2"
      ></div>
  </div>
  
  <div v-show="false">
    <p id='x'></p><p></p><p id="y"></p>
  </div>
  <button @click="getmap">重新定位</button>
  <div class="button_div">
      <div class="button" @click="confirm">確定</div>
  </div>

</template>

<script>  
import axios from 'axios'
export default {
  name: "MapTgos",
  data () {
    return {
      s_num: '',
      TGMap1: true,
      TGMap2: false,
      shop_info: '',
      location:null,
      twd97x:'',
      twd97y:'',
      imgUrl:"https://api.tgos.tw/TGOS_API/images/marker2.png"
    }
  },
  methods: {
      async main() {
          /* eslint-disable */
          var mDiv,map
          var markerPoint = new TGOS.TGPoint(this.shop_info.s_longitude,this.shop_info.s_latitude)
          mDiv = document.getElementById("TGMap1");
          var mapOptions = {
          disableDefaultUI: true		//關閉所有地圖操作介面
          };
          map = new TGOS.TGOnlineMap(mDiv, TGOS.TGCoordSys.EPSG3826, mapOptions);
          map.setZoom(8);
          map.setCenter(markerPoint)
          
          var markerImg = new TGOS.TGImage(this.imgUrl, new TGOS.TGSize(38,33), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
          var marker = new TGOS.TGMarker(map,new TGOS.TGPoint(this.shop_info.s_longitude,this.shop_info.s_latitude),'', markerImg);
          
      },
      async locateMe() {
          try{
              this.location = await this.getLocation()
          } catch(e) {
              console.log("error")
              console.log(e)
          }
         
      },
      async getLocation() {
          return new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(position => {
              resolve(position);
              }, err =>{
              reject(err);
              })
          })
      }, 
      changelocation() {
          var changeinfo = new TGOS.TGTransformation()
          changeinfo.wgs84totwd97(this.location.coords.longitude,this.location.coords.latitude)
          this.twd97x = changeinfo.transResult.x
          this.twd97y = changeinfo.transResult.y
      },
      async show_map(){
           /* eslint-disable */
           var mDiv,map
          var markerPoint = new TGOS.TGPoint(this.twd97x,this.twd97y)
          mDiv = document.getElementById("TGMap2");
          var mapOptions = {
          disableDefaultUI: true		//關閉所有地圖操作介面
          };
          map = new TGOS.TGOnlineMap(mDiv, TGOS.TGCoordSys.EPSG3826, mapOptions);
          map.setZoom(8);
          map.setCenter(markerPoint)
          
          var markerImg = new TGOS.TGImage(this.imgUrl, new TGOS.TGSize(38,33), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
          var marker = new TGOS.TGMarker(map,new TGOS.TGPoint(this.twd97x,this.twd97y),'', markerImg);
      },
      async getmap(){
          await this.locateMe()
          await this.changelocation()
          await this.show_map()
          this.TGMap1 = false
          this.TGMap2 = true
      },
      confirm(){
          console.log(this.twd97x,this.twd97y)
          axios.get('/api/shop_change_location.php',{
              params:{
                s_num : this.s_num,
                x: this.twd97x,
                y: this.twd97y
              }
          })
          .then(res => {
              console.log(res.data)
          })
          this.$router.push('/')
      }
  },
  async mounted(){
      this.s_num  = localStorage.getItem('token')
      await axios.get('/api/shop_info.php',{
          params:{
              s_num : this.s_num
          }
      })
      .then(res => {
          this.shop_info = res.data
          console.log(this.shop_info)
      })
      await this.main()
  },
  
  
}
</script>

<style lang="sass" scoped>
  .title
      font-size: 20px 
      font-weight: bold
      text-align: center   
  .tgosmap
    position: relative 
    display: flex 
    justify-content: center
    align-items: center
    width: 100%
    height: 450px
    top: 0
    left: 0
    background-color: #F5F5F5
    .map
      width: 450px
      height: 100%
  .address
      position: relative
      width:100px
      height:25px
      border: 1px solid #C0C0C0
  .button_div
      display: flex 
      justify-content: center
      .button
          font-size: 20px
          width: 120px
          background-color: #FFBD09
          color: #fff
          border-radius: 10px
          margin-top: 20px
          margin-right: 30px
          text-align: center
</style>