<template>
	<div>
		<el-card class="survey" style="border-radius: 12px;">
			<div class='title'>人员流动管理</div>
			<el-row :gutter="20" style="margin-top: 20px;">
				<el-col :span="15">
					<el-card style="border-radius: 12px;">
						<div id="mapId" class="map" ref="Map" style="height: 400px;width:100%;"></div>
					</el-card>
				</el-col>
				<el-col :span="9">
					<el-card style="border-radius: 12px;">
						<div class="subtitle">{{CodeToText(this.$admin.state.cityCode)}}病例流调</div>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-card style="background-color:antiquewhite;margin-top: 10px;">
									<h4>累计确诊病例</h4>
									<div class="number">
										{{this.totalConfirm}}
									</div>
								</el-card>
							</el-col>
							<el-col :span="12">
								<el-card style="background-color:#fff7f7; margin-top: 10px;">
									<h4>今日确诊病例</h4>
									<div class="number">
										{{this.totalContain}}
									</div>
								</el-card>
							</el-col>
						</el-row>
						<el-row>
							<el-card style="background-color:#fffaf7; margin-top: 10px;">
								<div class="subsubtitle">病例详情</div>
								<el-table :data="surveyData" style="width: 100%; height:215px;">
									<el-table-column prop="id" label="病历号" width=65>
									</el-table-column>
									<el-table-column prop="name" label="姓名" width=65>
									</el-table-column>
									<el-table-column prop="address" label="流调区域">
									</el-table-column>
								</el-table>
							</el-card>
						</el-row>
					</el-card>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script src="https://webapi.amap.com/maps?v=1.4.15&key=bb72212abd13c223d440e76baec04319&plugin=AMap.MarkerClusterer">
</script>
<script>
	import "echarts/extension/bmap/bmap";
	import "echarts-extension-amap";
	//require('echarts/extension/bmap/bmap');
	import {
		provinceAndCityData,
		CodeToText,
		TextToCode
	} from "../../node_modules/element-china-area-data"
	import {
		getTotalTodayConfirm,
		getSurveyData
	} from "../../api/data.js"
	export default {
		name: 'ana_people',
		data() {
			return {
				totalConfirm: 245,
				totalContain: 657,
				center: [118.767413, 32.041544],
				surveyData: [{
					id: 1,
					name: 'zqw',
					address: "南京市,扬州市"
				}, {
					id: 2,
					name: 'czy',
					address: "南京市,南通市"
				}, {
					id: 3,
					name: 'lzj',
					address: "南京市,盐城市"
				}, {
					id: 4,
					name: 'gy',
					address: "南京市,宁波市"
				}],
				linesdata: [{
						fromName: "南京",
						toName: "杭州",
						coords: [
							[118.767413, 32.041544],
							[120.2, 30.3]
						]
					},
					{
						fromName: "南京",
						toName: "南通",
						coords: [
							[118.767413, 32.041544],
							[120.86, 32.01]
						]
					},
					{
						fromName: "南京",
						toName: "上海",
						coords: [
							[118.767413, 32.041544],
							[121.472644, 31.231706]
						]
					},
					{
						fromName: "南京",
						toName: "盐城",
						coords: [
							[118.767413, 32.041544],
							[120.139998, 33.377631]
						]
					},
					{
						fromName: "南京",
						toName: "泰州",
						coords: [
							[118.767413, 32.041544],
							[119.915176, 32.484882]
						]
					},
					{
						fromName: "南京",
						toName: "合肥",
						coords: [
							[118.767413, 32.041544],
							[117.283042, 31.86119]
						]
					},
					{
						fromName: "南京",
						toName: "宣城",
						coords: [
							[118.767413, 32.041544],
							[118.757995, 30.945667]
						]
					}
				]
			}
		},
		methods: {
			CodeToText(id) {
				return CodeToText[id];
			},
			getData() {
				var param = {
					city_code: this.$admin.state.cityCode
				};
				getTotalTodayConfirm(param).then(res => {
					if (res.data.code == 200) {
						this.totalConfirm = res.data.data.totalConfirm;
						this.totalContain = res.data.data.todayConfirm;
					} else {
						console.log('error:get totalTodayConfirm!');
					}
				});
				getSurveyData(param).then(res => {
					console.log(res);
					if (res.data.code == 200) {
						let idArr = [];
						let arr = res.data.data.map(item => {
							if(item.city_code==this.$admin.state.cityCode)
								this.center=[parseInt(item.city_longitude),parseInt(item.city_latitude)];
							return {
								id: item.user_id,
								name: item.user_name,
								address: item.city_name
							}
						});
						for (let i = 0; i < arr.length; i++) {
							let index = idArr.indexOf(arr[i].id)
							if (index > -1) { //有相同id存在的话,获取index索引位置
								this.surveyData[index].address += "," + arr[i].address //取相同id的address拼接
							} else {
								idArr.push(arr[i].id)
								this.surveyData.push(arr[i])
							}
						};
						res.data.data.map(item => {
							if(item.city_code!=this.$admin.state.cityCode){
								this.linedata.push({
									fromName: this.$admin.state.cityName,
									toName: item.city_name,
									coords: [
										this.center,
										[parseInt(item.city_longitude),parseInt(item.city_latitude)]
									]
								});
							}
						});
						console.log(this.surveyData);
						console.log(this.linedata);
						this.drawMap();
					} else {
						console.log('error:get SurveyData! Reason:'+res.data.msg);
						this.drawMap();
					}
				});
			},
			drawMap() {
				var map = new AMap.Map("mapId", {
					zoom: 6,
					center: this.center,
					mapStyle: "amap://styles/whitesmoke",
					pitch: 0,
				});
				map.on('complete', function() {
					document.getElementsByClassName('amap-mcode')[0].innerHTML = ''
				})
				var myChart = this.$echarts.init(document.getElementById('mapId'));
				myChart.setOption({
					title: {
						text: '',
						subtext: ''
					},
					amap: {
						pitch: 0, //45 俯仰角
						zoom: 6,
						mapStyle: "amap://styles/whitesmoke",
						center:this.center, //中心点
						resizeEnable: true,
					},
					animation: false,
					series: [{
						coordinateSystem: "amap", // 该系列使用的坐标系是高德地图的坐标系
						type: "lines", // 该类型用于地图上路线的绘制
						zlevel: 1, // 相当于z-index
						effect: { // 线特效的配置
							show: true, // 是否显示特效
							period: 5, // 特效动画的时间
							trailLength: 0.7, // 特效尾迹的长度 0-1
							color: "#55aaff", // 特效的颜色
							symbolSize: 3 // 特效的大小
						},
						lineStyle: { // 线的颜色
							color: "rgba(0, 0, 127, 0.3)",
							width: 1,
							curveness: 0.2
						},
						data: this.linesdata,
					}]
				});
			}
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style scoped>
	.survey {
		//display: flex;
		border-radius: 12px;
		background-image: linear-gradient(180deg, #b8d2b9 0%, #b8d2b9 60%, rgba(12, 134, 142, 0) 90%);
		background-repeat: no-repeat;
		background-size: contain;
	}

	::v-deep .map .ec-extension-amap-amap-container {
		width: 100%;
		height: 100%;
	}

	.title {
		font-weight: 700;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 20px;
		color: #000000;
		margin-left: 5px;
		margin-bottom: 6px;
	}

	.subtitle {
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
		color: #000000;
	}

	.subsubtitle {
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 14px;
		margin-top: -5px;
		margin-left: -5px;
		color: #000000;
	}

	.survey .number {
		font: 700 20px/20px DIN Alternate, din_alternate_bold, -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		text-align: center;
		margin-top: 5px;
		color: #b13d35;
	}

	.survey h4 {
		text-align: center;
		font: 15px/8px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #737356;
		font-weight: normal;
		margin-top: 10px;
		margin-bottom: 10px;
		font-weight: 600;
	}

	::v-deep .survey .el-table,
	.el-table__expanded-cell,
	.el-table--enable-row-transition .el-table__body td,
	.el-table .cell {
		background-color: transparent;
	}
	
	::v-deep .el-table::before {
		display: none !important;
	}
	
	::v-deep .el-table {
		overflow: auto;
		overflow-x: hidden !important;
	}
	
	::v-deep .el-table th,
	::v-deep .el-table tr,
	::v-deep .el-table td {
		background-color: transparent;
	}

</style>
