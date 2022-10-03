<template>
  <div>
    <div class="block" style="width: 67%;float: left;height:300px">
    <el-carousel trigger="click" height="300px">
        <el-carousel-item class="image" v-for="gurl in gurls" :key="gurl.id">
          <img :src="gurl.url" lazy class="el-image__inner"
                style="height: 300px" alt="无图片"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <div style="float: right;width: 30%;height:600px;background-color: lightgray;overflow: auto">
      <el-image v-for="url in urls" :key="url" :src="url" lazy class="el-image__inner"
                style="height: 250px"></el-image>
    </div>
    <div class="block" style="width: 67%;float: left;height:350px" ref="echarts"></div>
  </div>
</template>

<script>
import seu1 from "@/../src/assets/SEU1.jpg";
import seu2 from "@/../src/assets/SEU2.jpg";
import seu3 from "@/../src/assets/SEU3.jpg";
import seu4 from "@/../src/assets/SEU4.jpg";
import seu5 from "@/../src/assets/SEU5.jpg";
import gg1 from "@/../src/assets/gg1.jpg";
import gg2 from "@/../src/assets/gg2.jpg";
import gg3 from "@/../src/assets/gg3.jpg";
import gg4 from "@/../src/assets/gg4.jpg";
import axios from 'axios'
import { getHotelList } from '../../api/data'
import * as echarts from 'echarts';
export default {
    name: 'home',
    data() {
        return {
          urls: [
            seu1,seu4,seu3,seu2,seu5,
          ],
          gurls:[
            {id:1,url:gg1},
            {id:2,url:gg2},
            {id:3,url:gg3},
            {id:4,url:gg4},
          ],
        }
    },
    methods: {
    },
    mounted(){
      // 基于准备好的dom，初始化echarts实例
        var e = echarts.init(this.$refs.echarts);
        var date=new Date();

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '近日系统用户（住户）人数'
          },
          tooltip: {},
          legend: {
            data: ['人数']
          },
          xAxis: {
            data: [date.getFullYear()+'/'+(date.getMonth()+1).toString()+'/'+(date.getDate()-5).toString(), 
              date.getFullYear()+'/'+(date.getMonth()+1).toString()+'/'+(date.getDate()-4).toString(),
              date.getFullYear()+'/'+(date.getMonth()+1).toString()+'/'+(date.getDate()-3).toString(), 
              date.getFullYear()+'/'+(date.getMonth()+1).toString()+'/'+(date.getDate()-2).toString(), 
              date.getFullYear()+'/'+(date.getMonth()+1).toString()+'/'+(date.getDate()-1).toString(), 
              date.getFullYear()+'/'+(date.getMonth()+1).toString()+'/'+date.getDate()]
          },
          yAxis: {},
          series: [
            {
              name: '人数',
              type: 'line',
              smooth:true,
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        e.setOption(option);
    },
    beforeCreate() {
      // 在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem('store1')) {
        this.$store.replaceState(
            Object.assign(
                {},
                this.$store.state,
                JSON.parse(sessionStorage.getItem('store1'))
            )
        )
      }
      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      // beforeunload事件在页面刷新时先触发
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store1', JSON.stringify(this.$store.state))
      })
      //sessionStorage.setItem('store1', JSON.stringify(this.$store.state))
    },
    /*beforeUpdate(){
      sessionStorage.setItem('store1', JSON.stringify(this.$store.state))
    },*/
    beforeDestroy() {
      sessionStorage.removeItem('store1')
    },
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 600px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>