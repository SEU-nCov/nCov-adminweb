<template>
	<div>
		<el-card class="covResult">
			<div class="title">
				核酸检测结果分析
				<el-button plain @click="output">核酸结果导出</el-button>
			</div>
			<el-table id="resultTable" :data="covResultData" v-show="false">
			</el-table>
			<el-row :gutter="20">
				<el-col :span="8">
					<!-- 本市接种防疫屏障 -->
					<el-card class="recent-card" style="margin-top: 10px;font-weight: bold;border-radius: 12px;">
						<div ref="recentResults" style="height: 200px;margin-top: 0px;"></div>
						<div ref="recentResults1" style="height: 180px"></div>
					</el-card>
				</el-col>
				<el-col :span="16" style="margin-top: 10px;">
					<el-card style="border-radius: 12px;">
						<el-row :gutter='20'>
							<el-col :span="16">
								<el-card class="statisticCard">
									<div class='title'> 核酸检测统计</div>
									<div>
										<el-row :gutter="20">
											<el-col :span="8">
												<el-button icon="el-icon-collection-tag" circle size="mini"
													style="border-color: #ffaa7f;color: #ffaa7f;"></el-button>
												<div class="number">
													{{this.totalCollect}}
												</div>
												<h4>已采集试管</h4>
											</el-col>
											<el-col :span="8">
												<el-button icon="el-icon-data-analysis" circle size="mini"
													style="border-color: #5555ff;color: #5555ff;"></el-button>
												<div class="number">
													{{this.totalTest}}
												</div>
												<h4>已检测试管</h4>
											</el-col>
											<el-col :span="8">
												<el-button icon="el-icon-check" circle size="mini"
													style="border-color: #aa0000;color: #aa0000;"></el-button>
												<div class="number">
													{{this.greenNum}}
													<i class="el-icon-star-on"
														style="color:green;margin-top: -10px;margin-bottom: -20px;"></i>
												</div>
												<h4>阴性试管</h4>
											</el-col>
										</el-row>
									</div>
								</el-card>
							</el-col>
							<el-col :span="8">
								<el-card class="dashboardCard">
									<div class='title'> 今日核酸检测进度</div>
									<div class="board">
										<el-progress type="dashboard" :percentage="percentage" :color="colors"
											:width='100'>
										</el-progress>
									</div>
								</el-card>
							</el-col>
						</el-row>
						<el-row :gutter="20" style="margin-top: 10px;">
							<el-col :span="12">
								<el-card>
									<h4 class="rankTitle">累计采样人次</h4>
									<div ref="totalTestRanking" style="height: 160px;"></div>
								</el-card>
							</el-col>
							<el-col :span="12">
								<el-card>
									<h4 class="rankTitle">今日采样人次</h4>
									<div ref="todayTestRanking" style="height: 160px;"></div>
								</el-card>
							</el-col>
						</el-row>
					</el-card>
				</el-col>

			</el-row>
		</el-card>
	</div>
</template>
<script>
	export default {
		name: 'ana_test',
		data() {
			return {
				covResultData: [],
				areaList: ['江宁区', '秦淮区', '栖霞区', '玄武区', '雨花台区', '建邺区', '六合区', '溧水区', '高淳区', '浦口区', '鼓楼区'],
				todayTestData: [1833, 1533, 691, 575, 463, 457, 373, 341, 274, 233, 101],
				totalTestData: [117853, 111533, 103690, 93535, 58763, 57773, 50364, 49441, 46174, 32333, 19701],
				greenNum: 28470,
				totalCollect: 29402,
				totalTest: 29171,
				percentage: 50,
				colors: [{
						color: '#f56c6c',
						percentage: 20
					},
					{
						color: '#e6a23c',
						percentage: 40
					},
					{
						color: '#5cb87a',
						percentage: 60
					},
					{
						color: '#1989fa',
						percentage: 80
					},
					{
						color: '#6f7ad3',
						percentage: 100
					}
				]
			}
		},
		methods: {
			output() {
				let tables = document.getElementById("resultTable");
				let table_book = this.$XLSX.utils.table_to_book(tables);
				var table_write = this.$XLSX.write(table_book, {
					bookType: "xlsx",
					bookSST: true,
					type: "array",
				});
				try {
					this.$FileSaver.saveAs(
						new Blob([table_write], {
							type: "application/octet-stream"
						}),
						"covResult.xlsx"
					);
				} catch (e) {
					if (typeof console !== "undefined") console.log(e, table_write);
				}
				return table_write;
			},
			drawRecent() {
				var x = ['2022-11-20', '2022-11-21', '2022-11-22', '2022-11-23', '2022-11-24', '2022-11-25',
					'2022-11-26', '2022-11-27', '2022-11-28', '2022-11-29'
				];
				var y = [2434, 2399, 2620, 2503, 2656, 2498, 3020, 4090, 6045, 6729];
				var div = this.$refs.recentResults;
				if (div) {
					var myChart = this.$echarts.init(div);
					// 指定图表的配置
					var option = {
						title: {
							text: "10天内检测数量",
							x: 'left',
							textStyle: {
								fontSize: 15,
								fontWeight: 600,
								fontFamily: 'Arial',
							},
						},
						grid: {
							top: '20%',
							left: '20%', //原来是10%，修改为20%
							right: '0%',
							bottom: '24%',
						},
						tooltip: {}, //提示框
						legend: {
							icon: 'circle',
							align: 'left',
							x: 'right',
							y: 'top',
							data: ['数量']
						},
						xAxis: {
							axisLabel: {
								rotate: 30
							},
							data: x //x轴
						},
						yAxis: {}, //不写的话，y轴默认就标出数字
						//=====图标的数据
						series: [{
							name: "数量", //鼠标放上去浮现的内容，跟data一样
							type: "bar", //指定条形图类型
							data: y //分别对应x轴的数值
						}]
					};
					// 对实例对象设置配置
					myChart.setOption(option);
				}
				var div1 = this.$refs.recentResults1;
				if (div1) {
					var mCharts = this.$echarts.init(div1);
					var option1 = {
						xAxis: {
							axisLabel: {
								rotate: 30
							},
							type: 'category',
							data: x
						},
						yAxis: {
							type: 'value'
						},
						series: [{
							type: 'line',
							data: y
						}],
						grid: {
							top: '15%',
							left: '20%', //原来是10%，修改为20%
							right: '2%',
							bottom: '25%',
						},
					};
					mCharts.setOption(option1);
				}
			},
			drawRanking() {
				var div = this.$refs.todayTestRanking;
				var option;
				if (div) {
					var myChart = this.$echarts.init(div);
					option = {
						title: {
							text: '',
							subtext: ''
						},
						tooltip: {
							trigger: 'item' //悬浮提示框不显示
						},
						grid: { //绘图区调整
							x: '21%', //左留白
							y: '0%', //上留白
							x2: '5%', //右留白
							y2: '0%' //下留白
						},
						xAxis: [{
							show: false,
							type: 'value',
							boundaryGap: [0, 0],
							position: 'top'
						}],
						yAxis: [{
							type: 'category',
							data: this.areaList,
							inverse: true, //倒叙
							axisLine: {
								show: false
							}, //坐标轴
							axisTick: [{ //坐标轴小标记
								show: false
							}],
							axisLabel: {
								fontSize: '10'
							}
						}],
						series: [{
							realtimeSort: true,
							name: '',
							type: 'bar',
							tooltip: {
								show: false
							},
							barWidth: 10, //柱宽度
							data: this.todayTestData,
							itemStyle: {
								//柱状图颜色
								borderRadius: 5,
								color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
										offset: 0,
										color: "#3977E6"
									},
									{
										offset: 1,
										color: "#37BBF8"
									},
								]),
							},
							label: {
								show: true, //显示文本
								position: 'outside', //数据值位置
								color: '#000',
								fontSize: '10'
							}
						}]
					};
					myChart.setOption(option);
				}
				var div1 = this.$refs.totalTestRanking;
				if (div1) {
					var myChart1 = this.$echarts.init(div1);
					myChart1.setOption(option);
					myChart1.setOption({
						grid: {
							right: '20%'
						},
						series: [{
							data: this.totalTestData
						}]
					})
				}
			}
		},
		mounted() {
			this.drawRecent();
			this.drawRanking();
		}
	}
</script>
<style scoped>
	.covResult {
		//display: flex;
		border-radius: 12px;
		background-image: linear-gradient(180deg, #84bac1 0%, #84bac1 60%, rgba(12, 134, 142, 0) 90%);
		background-repeat: no-repeat;
		background-size: contain;
	}

	.title {
		font-weight: 700;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 20px;
		color: #000000;
		margin-left: 5px;
		margin-bottom: 6px;
	}

	.title .el-button {
		margin-left: 20px;
		border-radius: 20px;
		color: #5c8387;
		border-color: #5c8387;
	}

	.statisticCard h4 {
		text-align: center;
		font: 15px/12px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #a5a5a5;
		font-weight: 600;
	}

	.statisticCard .title,
	.dashboardCard .title {
		margin-left: -10px;
		margin-top: -10px;
		margin-bottom: 20px;
		font: 12px/8px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #303030;
	}

	::v-deep .statisticCard .el-button {
		margin-left: 35px;
		margin-bottom: 6px;
	}

	.statisticCard .number {
		font: 700 20px/20px DIN Alternate, din_alternate_bold, -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		text-align: center;
		margin-top: 5px;
		margin-bottom: -3px;
		color: #00007f;
	}

	.statisticCard h4 {
		text-align: center;
		font: 12px/8px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #a5a5a5;
		font-weight: normal;
		margin-bottom: 0px;
		font-weight: 600;
	}

	.dashboardCard .board {
		text-align: center;
		margin-bottom: -24px;
		font: 12px/8px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
	}

	.rankTitle {
		margin-top: 0px;
		text-align: center;
		font: 13px/8px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: darkblue;
	}
</style>
