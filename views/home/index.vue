<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card class="box_card">
					<div class="user">
						<img class="head" src="../../src/assets/bear.png" alt="">
						<div class="user_info">
							<p class="name">Admin</p>
							<p class="access">超级管理员</p>
						</div>
					</div>
					<div class="login_info">
						<p>管辖市:<span>{{this.$admin.state.cityName}}</span></p>
						<p>联系方式:<span>{{this.$admin.state.phone}}</span></p>
					</div>
				</el-card>
				<el-card class="calendar_card" style="margin-top: 10px;">
					<el-calendar>
						<template slot="dateCell" slot-scope="{date, data}">
							<p :class="data.isSelected ? 'is-selected' : ''">
								{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
							</p>
						</template>
					</el-calendar>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="about_cov">
					<div class="cov_title">
						科学防护 共渡难关
					</div>
					<div class="cov_subtitle">
						肺炎疫情实时数据播报
					</div>
					<el-card class="cov_card" style="border-radius: 20px;">
						<!-- 选择标签 -->
						<div class="card_tabs">
							<div class="card_tab active" @click="activeTab=true">
								全国疫情数据(含港澳台)
							</div>
							<div class="card_tab" @click="activeTab=false">
								<i></i>江苏疫情数据
							</div>
						</div>
						<!-- 全国疫情数据:六个部分 -->
						<div v-if="this.chinaCovData" v-show="activeTab==true" class="cov_data_china">
							<el-row>
								<el-col class="cov_input" style="background-color: rgb(255,250,247);" :span="8">
									<h4>境外输入</h4>
									<div class="number">{{this.chinaCovData.total.input}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.today.input}}</span></p>
								</el-col>
								<el-col class="cov_nosymptom" style="background-color: rgb(254,247,255);" :span="8">
									<h4>无症状感染者</h4>
									<div class="number">{{this.chinaCovData.extData.noSymptom}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.extData.incrNoSymptom}}</span></p>
								</el-col>
								<el-col class="cov_today_confirm" style="background-color: rgb(255, 244, 244);"
									:span="8">
									<h4 @click="openMessage">现有确诊<i></i></h4>
									<div class="number">
										{{this.chinaCovData.total.confirm-this.chinaCovData.total.dead-this.chinaCovData.total.heal}}
									</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.today.storeConfirm}}</span></p>
								</el-col>
							</el-row>
							<el-row>
								<el-col class="cov_confirm" style="background-color: rgb(255, 247, 247);" :span="8">
									<h4>累计确诊</h4>
									<div class="number">{{this.chinaCovData.total.confirm}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.today.confirm}}</span></p>
								</el-col>
								<el-col class="cov_dead" style="background-color: rgb(243, 246, 248);" :span="8">
									<h4>累计死亡</h4>
									<div class="number">{{this.chinaCovData.total.dead}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.today.dead}}</span></p>
								</el-col>
								<el-col class="cov_heal" style="background-color: #f1f8f4;" :span="8">
									<h4>累计治愈</h4>
									<div class="number">{{this.chinaCovData.total.heal}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.chinaCovData.today.heal}}</span></p>
								</el-col>
							</el-row>
							<el-row>
								<el-col class="cov_time">
									截至{{this.chinaCovData.lastUpdateTime}}
								</el-col>
								<el-col class="foot">
									<div @click="openNotify">数据说明<i></i></div>
								</el-col>
							</el-row>
						</div>
						<!-- 城市疫情数据:三个部分 -->
						<div v-if="this.cityCovData" v-show="activeTab==false" class="cov_data_province">
							<el-row>
								<el-col class="cov_province_confirm" style="background-color: rgb(255, 247, 247);">
									<h4>累计确诊</h4>
									<div class="number">{{this.cityCovData.confirm}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.cityCovData.newConfirm}}</span></p>
								</el-col>
								<el-col class="cov_province_dead" style="background-color: rgb(243, 246, 248);">
									<h4>累计死亡</h4>
									<div class="number">{{this.cityCovData.dead}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.cityCovData.newDead}}</span></p>
								</el-col>
								<el-col class="cov_province_heal" style="background-color: #f1f8f4;">
									<h4>累计治愈</h4>
									<div class="number">{{this.cityCovData.heal}}</div>
									<p class="added" style="display: block;">
										较昨日<span>+{{this.cityCovData.newHeal}}</span></p>
								</el-col>
							</el-row>
							<el-row>
								<el-col class="cov_time">
									截至{{myTimeToLocal(this.cityCovData._mtime)}}
								</el-col>
								<el-col class="foot">
									<div @click="openNotify">数据说明<i></i></div>
								</el-col>
							</el-row>
							<el-row class="cov_more">
								<el-col :span="12">
									<el-select class="cov_location_name" v-model="selecetedProvince" clearable
										filterable placeholder="请选择" @change="getCityCovData">
										<el-option v-for="item in provinces" :key="item.value" :label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="12">
									<el-button class="cov_province_go" size="small" plain round @click="knowMore">了解更多
									</el-button>
								</el-col>
							</el-row>
							<el-row class="toolbox">
								<el-col :span="8">
									<el-button type="primary" size="mini" icon="el-icon-s-check" circle
										@click="jumpPolicy" style="margin-left: 31px;"></el-button>
									<div class="toolbox_name">防疫政策</div>
								</el-col>
								<el-col :span="8">
									<el-button type="danger" size="mini" icon="el-icon-office-building" circle
										@click="jumpVaccine" style="margin-left: 30px;"></el-button>
									<div class="toolbox_name">疫苗点信息</div>
								</el-col>
								<el-col :span="8">
									<el-button type="warning" size="mini" icon="el-icon-reading" circle
										@click="jumpKnowledge" style="margin-left: 30px;"></el-button>
									<div class="toolbox_name">防疫知识</div>
								</el-col>
							</el-row>
						</div>
					</el-card>
					<div class="vaccine-data-wrap">
						<el-row class="title-wrap">
							<el-col class="left-wrap">
								实时接种数据
							</el-col>
							<el-col class="right-wrap">
								<div @click="openNotify">数据说明<i></i></div>
							</el-col>
						</el-row>
						<div v-if="this.vaccineTopData" class="data-wrap">
							<el-row class="world-data-row">
								<el-col class="all" style="background-color: #f1f8f4;" :span="8">
									<div class="title">全球累计接种</div>
									<div dclass="count">
										<span class="count-data">{{this.worldTotalVaccinations}}</span>
										<span class="unit">亿剂</span>
									</div>
								</el-col>
								<el-col class="add" style="background-color: rgb(255,250,247);" :span="8">
									<div class="title">全球较上日新增</div>
									<div class="count">
										<span class="count-data">{{this.worldNewVaccinations}}</span>
										<span class="unit"></span>
									</div>
								</el-col>
								<el-col class="per100" style="background-color: rgb(243, 246, 248);" :span="8">
									<div class="title">全球每百人接种</div>
									<div class="count">
										<span class="count-data">{{this.worldVaccinationsPer100}}</span>
										<span class="unit">剂</span>
									</div>
								</el-col>
							</el-row>
							<el-row class="china-data-row">
								<el-col class="all" style="background-color: #f1f8f4;" :span="8">
									<div class="title">中国累计接种</div>
									<div class="count">
										<span class="count-data">{{this.chinaTotalVaccinations}}</span>
										<span class="unit">亿剂</span>
									</div>
								</el-col>
								<el-col class="add" style="background-color: rgb(255,250,247);" :span="8">
									<div class="title">中国较上日新增</div>
									<div class="count">
										<span class="count-data">{{this.chinaNewVaccinations}}</span>
										<span class="unit">万剂</span>
									</div>
								</el-col>
								<el-col class="per100" style="background-color: rgb(243, 246, 248);" :span="8">
									<div class="title">中国每百人接种</div>
									<div class="count">
										<span class="count-data">{{this.chinaVaccinationsPer100}}</span>
										<span class="unit">剂</span>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>

				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card>
					<div class="map_div">
						<div class="title_china">
							中国疫情
						</div>
						<div class="cov_map" style="background-color: #f3f3f3; margin-top: -8px;">
							<div ref="chinaMap" style="height: 250px">
							</div>
						</div>
						<div>
							<el-button class="nowButton" :type="nowType" plain @click="nowClick">
								现有确诊
							</el-button>
							<el-button class="totalButton" :type="totalType" plain @click="totalClick"
								style="float: right;">
								累计确诊
							</el-button>
						</div>
					</div>
					<el-row class="china_provinces">
						<div class="china_provinces_tit">
							全国疫情
							<div class="mid_tip">
								累计确诊城市<span>374</span>
							</div>
						</div>
					</el-row>
					<el-row class="china_provinces_content">
						<el-col class="china_provinces_noconfirm" :span="5">
							<span>84</span>
							<p>零病例城市</p>
						</el-col>
						<el-col class="china_provinces_bar_wrap" :span="14">
						</el-col>
						<el-col class="china_provinces_confirm" :span="5">
							<span>290</span>
							<p>有病例城市</p>
						</el-col>
					</el-row>
					<el-row class="china_provinces_tip">
						全国累计确诊患者分布于374个城市，目前84个城市已实现现有确诊“清零”。注：此数据不包含境外输入病例。
					</el-row>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		getChinaMap,
		getChinaCovData,
		getVaccineTopData,
		getCityCovData
	} from "../../api/data.js";
	import "../../api/chinaMap.js";
	export default {
		name: 'home',
		data() {
			return {
				activeTab: true,
				selecetedProvince: '320000',
				provinces: [{
					value: '110000',
					label: '北京市'
				}, {
					value: '120000',
					label: '天津市'
				}, {
					value: '130000',
					label: '河北省'
				}, {
					value: '140000',
					label: '山西省'
				}, {
					value: '150000',
					label: '内蒙古'
				}, {
					value: '210000',
					label: '辽宁省'
				}, {
					value: '220000',
					label: '吉林省'
				}, {
					value: '230000',
					label: '黑龙江省'
				}, {
					value: '310000',
					label: '上海市'
				}, {
					value: '320000',
					label: '江苏省'
				}, {
					value: '330000',
					label: '浙江省'
				}, {
					value: '340000',
					label: '安徽省'
				}, {
					value: '350000',
					label: '福建省'
				}, {
					value: '360000',
					label: '江西省'
				}, {
					value: '370000',
					label: '山东省'
				}, {
					value: '410000',
					label: '河南省'
				}, {
					value: '420000',
					label: '湖北省'
				}, {
					value: '430000',
					label: '湖南省'
				}, {
					value: '440000',
					label: '广东省'
				}, {
					value: '450000',
					label: '广西省'
				}, {
					value: '460000',
					label: '海南省'
				}, {
					value: '500000',
					label: '重庆市'
				}, {
					value: '510000',
					label: '四川省'
				}, {
					value: '520000',
					label: '贵州省'
				}, {
					value: '530000',
					label: '云南省'
				}, {
					value: '540000',
					label: '西藏'
				}, {
					value: '610000',
					label: '陕西省'
				}, {
					value: '620000',
					label: '甘肃省'
				}, {
					value: '630000',
					label: '青海省'
				}, {
					value: '640000',
					label: '宁夏'
				}, {
					value: '650000',
					label: '新疆'
				}, {
					value: '710000',
					label: '台湾省'
				}, {
					value: '810000',
					label: '香港'
				}, {
					value: '820000',
					label: '澳门'
				}],
				chinaCovData: undefined,
				chinaCovAddData: undefined,
				cityCovData: {},
				mapAirDataNow: [],
				mapAirDataTotal: [],
				chinaMap: '',
				chinaMapNext: '',
				nowType: 'danger',
				totalType: '',
				vaccineTopData: undefined,
				chinaTotalVaccinations: "-",
				chinaNewVaccinations: "-",
				chinaVaccinationsPer100: "-",
				worldTotalVaccinations: "-",
				worldNewVaccinations: "-",
				worldVaccinationsPer100: "-"
			}
		},
		methods: {
			getMapData() {
				getChinaCovData().then(res => {
					this.chinaCovData = res.data.data.areaTree[2]; //中国
					this.chinaCovDataOld = res.data.data.chinaDayList[58];
					this.mapAirDataNow = this.chinaCovData.children.map(item => {
						return {
							name: item.name,
							value: item.today.confirm //现有确诊
						}
					});
					this.mapAirDataTotal = this.chinaCovData.children.map(item => {
						return {
							name: item.name,
							value: item.total.confirm //累计确诊
						}
					});
					this.drawMap(this.mapAirDataNow);
				});
			},
			getCityCovData() {
				getCityCovData(this.selecetedProvince).then(res => {
					this.cityCovData = res.data.data[0];
				})
			},
			getVaccineTopData() {
				getVaccineTopData().then(res => {
					this.vaccineTopData = res.data.data.VaccineTopData;
					console.log(this.vaccineTopData);
					this.chinaTotalVaccinations = (this.vaccineTopData['中国'].total_vaccinations / 100000000)
						.toFixed(1);
					this.chinaNewVaccinations = (this.vaccineTopData['中国'].new_vaccinations / 10000).toFixed(1);
					this.chinaVaccinationsPer100 = (this.vaccineTopData['中国'].total_vaccinations_per_hundred)
						.toFixed(2);
					this.worldTotalVaccinations = (this.vaccineTopData['全球'].total_vaccinations / 100000000)
						.toFixed(1);
					this.worldNewVaccinations = this.vaccineTopData['全球'].new_vaccinations > 0 ? (this
						.vaccineTopData['全球'].new_vaccinations / 10000).toFixed(1) : "-";
					this.worldVaccinationsPer100 = (this.vaccineTopData['全球'].total_vaccinations_per_hundred)
						.toFixed(2);
				});
			},
			drawMap(airData) {
				var map_div = this.$refs.chinaMap;
				let option = {
					// 提示浮窗样式
					tooltip: {
						show: true,
						trigger: 'item',
						alwaysShowContent: false,
						backgroundColor: '#0C121C',
						borderColor: 'rgba(0, 0, 0, 0.16);',
						hideDelay: 100,
						triggerOn: 'mousemove',
						enterable: true,
						textStyle: {
							color: '#DADADA',
							fontSize: '12',
							width: 20,
							height: 30,
							overflow: 'break'
						},
						formatter(params) {
							console.log(params)
							return `地区:${params.name}</br>确诊:${params.value}`
						},
						showDelay: 100
					},
					// 地图配置
					geo: {
						map: 'china',
						roam: true,
						zoom: 1.25,
						// 地图文字
						label: {
							// 通常状态下的样式
							show: true, // 默认是否显示地区名称
							fontSize: 6,
							color: 'black'
						},
						// 地图区域的样式设置
						itemStyle: {
							// 地图边界颜色
							borderColor: '#fff',
							// 地图区域背景颜色
							areaColor: '#e6e6e6',
							// 鼠标放上去高亮的样式

						},
						emphasis: {
							// 鼠标放上去的样式
							label: {
								color: 'black'
							},
							itemStyle: {
								// 鼠标放上去地图区域背景颜色
								areaColor: '#0984e3',
								borderWidth: 0,
							}
						}
					},
					series: [{
						data: airData,
						geoIndex: 0, //将空气质量的数据和第0个geo配置关联在一起
						type: 'map'
					}, ],
					// 视觉映射组件
					visualMap: {
						type: 'piecewise',
						pieces: [{
								min: 10000
							}, // 不指定 max，表示 max 为无限大（Infinity）。
							{
								min: 1000,
								max: 9999
							},
							{
								min: 100,
								max: 999
							},
							{
								min: 10,
								max: 99
							},
							{
								min: 0,
								max: 9
							}
						],
						inRange: {
							color: ['#fff', '#ffaa85', '#ff7b69', '#cc2929', '#8c0d0d', '#660208']
						},
						textGap: 5,
						itemWidth: 8,
						itemHeight: 8,
						itemGap: 2,
						left: '1%',
						bottom: '1%',
						textStyle: {
							fontSize: '10px'
						}
					}
				};
				if (map_div) {
					if (this.chinaMap != null && this.chinaMap != "" && this.chinaMap != undefined) {
						this.chinaMap.dispose();
					}
					this.chinaMap = this.$echarts.init(map_div)
					this.chinaMap.setOption(option)
				}
			},
			nowClick() {
				this.nowType = 'danger';
				this.totalType = '';
				this.drawMap(this.mapAirDataNow);
			},
			totalClick() {
				this.nowType = '';
				this.totalType = 'danger';
				this.drawMap(this.mapAirDataTotal);
			},
			openMessage() {
				const h = this.$createElement;
				this.$notify({
					title: '疫情数据说明',
					dangerouslyUseHTMLString: true,
					message: '1.数据含义:<p>"现有确诊数"为当前正在治疗中的确诊人数,此数值为随疫情数据的实时更新而发生变化。</p>2.计算方法:<br />现有确诊数=累计确诊数-累计死亡数-累计治愈数'
				});
			},
			openNotify() {
				const h = this.$createElement;
				this.$notify({
					title: '疫情数据说明',
					dangerouslyUseHTMLString: true,
					message: '1.数据来源：来自国家卫健委、各省市区卫健委、各省市区政府、港澳台官方渠道的公开数据。<br /> 2.数据更新时间：实时更新全国、各省区市数据，因需要追踪、核实计算时间，与官方发布时间相比，会存在一定的时间延迟。<br /> 3.实时数据统计原则：<br />①每日上午，全国数据会优先使用国家卫健委公布的数据，由于各省卫健委公布数据的发布时间和统计时间段各不相同，会出现全国数据大于各省份总和的情况；<br />②各省卫健委陆续公布数据，如果各省份数据总和超过国家卫健委公布的数据，则全国数据切换为各省数据总和；<br />③新增数据以国家卫健委公布的最新一日新增数据为准。'
				});
			},
			myTimeToLocal(inputTime) {
				if (!inputTime && typeof inputTime !== 'number') {
					return '';
				}
				var localTime = '';
				inputTime = new Date(inputTime).getTime();
				const offset = (new Date()).getTimezoneOffset();
				localTime = (new Date(inputTime - offset * 60000)).toISOString();
				localTime = localTime.substr(0, localTime.lastIndexOf('.'));
				localTime = localTime.replace('T', ' ');
				return localTime;
			},
			knowMore() {
				this.$router.replace('../nCov_data');
			},
			jumpVaccine() {
				this.$router.replace('../nCov_yimiao');
			},
			jumpPolicy() {
				this.$router.replace('../nCov_policy');
			},
			jumpKnowledge() {
				this.$router.replace('../rel_knowledge');
			}
		},
		created() {
			this.getVaccineTopData();
			this.getCityCovData();
			this.getMapData();
		}
	}
</script>

<style lang="less" scoped>
	::v-deep .box_card .el-card__body {
		padding-top: 10px;
		padding-bottom: 15px;
	}

	.head {
		margin-right: 30px;
		/* 与文字的距离 */
		font-size: 10px;
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}

	.name {
		font-size: 30px;
		margin-left: 10px;
		font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
	}

	.access {
		margin-top: -25px;
		margin-left: 30px;
		color: #999999;
	}

	.box_card .user {
		border: 1px solid #ccc;
		border-top: none;
		border-right: none;
		border-left: none;
		display: flex;
		align-items: center;
		padding-bottom: 8px;
	}

	.login_info {
		margin-top: 5px;
	}

	::v-deep .login_info p {
		margin-top: 8px;
		margin-bottom: 0px;
		font-size: 14px;
		color: #999999;
	}

	::v-deep .login_info p span {
		color: #966666;
		float: right;
	}

	::v-deep .calendar_card .el-calendar {
		background-color: #fff;
		margin-top: -5px;
		background-position: bottom;
		background-image: url("../../src/assets/众志成城.jpg");
		background-repeat: no-repeat;
		background-size: 100%;
	}

	::v-deep .calendar_card .el-card__body {
		padding-bottom: 17px;
	}

	::v-deep .calendar_card .el-calendar__header {
		display: flex;
		justify-content: space-between;
		padding: 4px 3px;
		border-bottom: 1px solid #EBEEF5;
	}

	::v-deep .calendar_card .el-calendar__title {
		margin-top: -5px;
		font-size: 12px;
		font-weight: 600;
		color: #636e95;
		line-height: 10px;
		text-align: center;
	}

	::v-deep .calendar_card .el-calendar__body {
		padding: 8px 8px 0px;
	}

	::v-deep .calendar_card .el-button-group>.el-button:first-child,
	::v-deep .calendar_card .el-button-group>.el-button:not(:first-child):not(:last-child),
	::v-deep .calendar_card .el-button-group>.el-button:last-child {
		font-size: 9px;
		margin-bottom: 5px;
	}

	::v-deep .calendar_card .el-calendar-table thead th {
		padding-top: 2px;
		padding-bottom: 6px;
		color: #606266;
		font-weight: 400;
		font-size: 13px;
	}

	::v-deep .calendar_card .el-calendar-table .el-calendar-day {
		font-size: 10px;
		text-align: center;
		margin: -5px;
		height: 45px;
	}

	::v-deep .calendar_card .is_selected {
		color: #1989FA;
	}

	.about_cov {
		/* background-image:url("https://static.ws.126.net/163/f2e/news/virus_report/static/images/banner.53e59fc.png"); */
		background-image: url("../../src/assets/background.jpg");
		background-repeat: no-repeat;
		background-size: 100%;
	}

	::v-deep .cov_card .el-card__body {
		padding: 0px;
	}

	.cov_title {
		font-weight: 700;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 20px;
		color: #000000;
		margin-left: 5px;
		margin-top: 5px;
		margin-bottom: 6px;
	}

	.cov_subtitle {
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
		color: #000000;
		margin-left: 5px;
		margin-bottom: 14px;
	}

	::v-deep .cov_card .card_tabs {
		overflow: hidden;
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
	}

	/* 全国疫情数据 */
	::v-deep .cov_card .card_tab.active {
		/* width: 50%; */
		font-size: 12px;
		background: #f1f1f1;
	}

	/* 地区疫情数据 */
	::v-deep .cov_card .card_tab {
		float: left;
		width: 50%;
		font: 12px/45px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #333;
		text-align: center;
		background: #ffffff;
	}

	/* 地区疫情数据icon */
	.cov_card .card_tab i {
		display: inline-block;
		margin: 16px 5px 0 0;
		width: 10px;
		height: 13px;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAMAAACAXYxPAAAAgVBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzNi1y5rAAAAKnRSTlMAuQ/daEsK+eTDoUTvycGojVc/Oh4U88+ygHosJQXg1NKscDPqlmJdKRh9lJelAAAA8ElEQVQoz12QiXKDMAxE1wFCIEBDbgq5mp7v/z+wwh5Dp28GeSUseW0FdpsV5E36o4nBAXWRAK+xlkG5k3FoE5w8a9gqsgnVBew1U5JaPPt9uwZOrYwcaU9hKoW6ho3JN1r7bOPAdW+DCjKLvKhhITkOMi6sLJKIo62WeBxLaYWoxuHv8hSE4mlcH/TePElo73iOFnK7Un9jGw56eh8tJLdw80++pAoZfQluLePKZfSd6g/fPGQc7dfMKVjObPLEOiaOTJGKZRDLnIUCH6Rzzz2KQhMdZXhva5k5e9+1Hz5zt7ykUyQcduSM0z+GiibqX4FjFj/TNw/kAAAAAElFTkSuQmCC);
		background-size: auto;
		background-size: 100% 100%;
		vertical-align: top;
	}

	.cov_card .cov_confirm,
	.cov_card .cov_dead,
	.cov_card .cov_heal,
	.cov_card .cov_input,
	.cov_card .cov_nosymptom,
	.cov_card .cov_province_confirm,
	.cov_card .cov_province_dead,
	.cov_card .cov_province_heal,
	.cov_card .cov_severe,
	.cov_card .cov_suspect,
	.cov_card .cov_today_confirm {
		float: left;
		position: relative;
		width: 33.3%;
	}

	.cov_card .cov_confirm::before,
	.cov_card .cov_dead::before,
	.cov_card .cov_heal::before,
	.cov_card .cov_input::before,
	.cov_card .cov_nosymptom::before,
	.cov_card .cov_province_confirm::before,
	.cov_card .cov_province_dead::before,
	.cov_card .cov_province_heal::before,
	.cov_card .cov_severe::before,
	.cov_card .cov_suspect::before,
	.cov_card .cov_today_confirm::before {
		content: "";
		position: absolute;
		right: 0;
		top: 46px;
		width: 1px;
		height: 10px;
		background: #e8e8e8;
	}

	/* 字体风格 */
	.cov_card .cov_confirm .number,
	.cov_card .cov_dead .number,
	.cov_card .cov_heal .number,
	.cov_card .cov_input .number,
	.cov_card .cov_nosymptom .number,
	.cov_card .cov_province_confirm .number,
	.cov_card .cov_province_dead .number,
	.cov_card .cov_province_heal .number,
	.cov_card .cov_severe .number,
	.cov_card .cov_suspect .number,
	.cov_card .cov_today_confirm .number {
		font: 700 15px/10px DIN Alternate, din_alternate_bold, -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		text-align: center;
	}

	/*较昨日*/
	.cov_card .cov_confirm .added,
	.cov_card .cov_dead .added,
	.cov_card .cov_heal .added,
	.cov_card .cov_input .added,
	.cov_card .cov_nosymptom .added,
	.cov_card .cov_province_confirm .added,
	.cov_card .cov_province_dead .added,
	.cov_card .cov_province_heal .added,
	.cov_card .cov_severe .added,
	.cov_card .cov_suspect .added,
	.cov_card .cov_today_confirm .added {
		display: none;
		font: 8px/2 -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #999;
		text-align: center;
	}

	/* 境外输入 */
	.cov_card .cov_input .added span,
	.cov_card .cov_input .number {
		color: #ffa352;
	}

	/* 无症状感染 */
	.cov_card .cov_nosymptom .added span,
	.cov_card .cov_nosymptom .number,
	.cov_card .cov_severe .added span,
	.cov_card .cov_severe .number {
		color: #791618;
	}

	/* 现有确诊icon? */
	.cov_card .cov_today_confirm i {
		display: inline-block;
		margin-bottom: -1px;
		margin-left: 3px;
		width: 10px;
		height: 10px;
		background: url(https://mat1.gtimg.com/news/worldvaccine/question.png);
		background-size: auto;
		background-size: 100% 100%;
	}

	/* 六板块文字大小 */
	.cov_card .cov_input h4,
	.cov_card .cov_confirm h4,
	.cov_card .cov_nosymptom h4,
	.cov_card .cov_today_confirm h4,
	.cov_card .cov_severe h4,
	.cov_card .cov_dead h4,
	.cov_card .cov_heal h4,
	.cov_card .cov_province_confirm h4,
	.cov_card .cov_province_heal h4,
	.cov_card .cov_province_dead h4 {
		text-align: center;
		font: 12px/15px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		font-weight: normal;
		font-weight: 600;
		color: #333;
	}

	/* 现有确诊 */
	.cov_card .cov_today_confirm .added span,
	.cov_card .cov_today_confirm .number {
		color: #e44a3d;
	}

	/* 累计确诊 */
	.cov_card .cov_confirm .added span,
	.cov_card .cov_confirm .number,
	.cov_card .cov_province_confirm .added span,
	.cov_card .cov_province_confirm .number {
		color: #a31d13;
	}

	/* 累计死亡 */
	.cov_card .cov_dead .added span,
	.cov_card .cov_dead .number,
	.cov_card .cov_province_dead .added span,
	.cov_card .cov_province_dead .number {
		color: #333;
	}

	/* 累计治愈 */
	.cov_card .cov_heal .added span,
	.cov_card .cov_heal .number,
	.cov_card .cov_province_heal .added span,
	.cov_card .cov_province_heal .number {
		color: #34aa70;
	}

	/* 数据更新时间 */
	.cov_time {
		width: 50%;
		margin-left: 12px;
		margin-top: 5px;
		margin-bottom: 5px;
		font-size: 11px;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		color: #999999;
	}

	.foot {
		float: right;
		width: 30%;
		font-size: 11px;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		color: #7c7c7c;
		text-align: center;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.cov_more {
		margin-top: 5px;
		margin-bottom: 10px;
	}

	/* 白色框框 */
	::v-deep .cov_card .cov_location_name {
		margin-left: 25px;
		border-radius: 40px;
		width: 80%;
	}

	/* 了解更多的红框 */
	::v-deep .cov_province_go {
		float: right;
		margin-right: 20px;
		width: 70%;
		border: 1px solid #c60000;
		border-radius: 36px;
		font: 11px/11px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #c60000;
		text-align: center;
	}

	::v-deep .cov_location_name .el-input__inner {
		margin-top: 1px;
		border-radius: 36px;
		border-color: #8e8ec1;
		color: #1a418c;
		text-align: center;
		font-size: 11px;
		height: 30px;
		width: 92%
	}

	::v-deep .cov_location_name .el-input .el-select__caret {
		margin-right: 10px;
		margin-top: 5px;
		color: #C0C4CC;
		font-size: 14px;
		transition: transform .3s;
		transform: rotateZ(180deg);
		cursor: pointer;
	}

	.toolbox_name {
		text-align: center;
		margin-top: 2px;
		margin-bottom: 8px;
		font: 10px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #333;
	}

	/* 中国疫情地图 */
	.title_china {
		height: 44px;
		padding-left: 28px;
		position: relative;
		font: 500 14px/26px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #333;
	}

	.title_china::before {
		content: "";
		width: 8px;
		height: 14px;
		background-color: #e10000;
		position: absolute;
		left: 12px;
		top: 6px;
	}

	.map_div .nowButton,
	.map_div .totalButton {
		width: 129px;
		margin-top: 10px;
	}

	.el-button--danger {
		border-color: #ce4733;
		background-color: #fef7f7;
		color: #ce2c1e;
	}

	/* 实时接种数据 */
	.title-wrap .left-wrap {
		width: 50%;
		font-weight: 700;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
		color: #222;
		margin-top: 12px;
		margin-left: 5px;
		margin-bottom: 12px;
	}

	/* 数据说明 */
	.title-wrap .right-wrap {
		float: right;
		width: 30%;
		font-size: 11px;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		color: #7c7c7c;
		text-align: center;
		margin-top: 15px;
		margin-bottom: 12px;
	}

	/* 问号 */
	.title-wrap .right-wrap i,
	.foot i {
		display: inline-block;
		margin-bottom: -1px;
		margin-left: 3px;
		width: 10px;
		height: 10px;
		background: url(https://mat1.gtimg.com/news/worldvaccine/question.png);
		background-size: auto;
		background-size: 100% 100%;
	}

	.data-row .data-item .title {
		font-size: 10px;
		color: #222;
		letter-spacing: 0;
		line-height: 2.933vw;
		margin-bottom: 1.6vw;
	}

	.data-wrap .world-data-row,
	.data-wrap .china-data-row {
		text-align: center;
	}

	.data-wrap .world-data-row .all .title,
	.data-wrap .world-data-row .add .title,
	.data-wrap .world-data-row .per100 .title,
	.data-wrap .china-data-row .all .title,
	.data-wrap .china-data-row .add .title,
	.data-wrap .china-data-row .per100 .title {
		margin-top: 10px;
		font: 11px/15px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		font-weight: normal;
		font-weight: 600;
		color: #333;
	}

	.data-wrap .world-data-row .all .count-data,
	.data-wrap .world-data-row .add .count-data,
	.data-wrap .world-data-row .per100 .count-data,
	.data-wrap .china-data-row .all .count-data,
	.data-wrap .china-data-row .add .count-data,
	.data-wrap .china-data-row .per100 .count-data {
		font: 700 18px/35px DIN Alternate, din_alternate_bold, -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
	}

	.data-wrap .world-data-row .all .count-data,
	.data-wrap .china-data-row .all .count-data,
	.data-wrap .world-data-row .all .unit,
	.data-wrap .china-data-row .all .unit {
		color: #34aa70;
	}

	.data-wrap .world-data-row .add .count-data,
	.data-wrap .china-data-row .add .count-data,
	.data-wrap .world-data-row .add .unit,
	.data-wrap .china-data-row .add .unit {
		color: #ffa352;
	}

	.data-wrap .world-data-row .per100 .count-data,
	.data-wrap .china-data-row .per100 .count-data,
	.data-wrap .world-data-row .per100 .unit,
	.data-wrap .china-data-row .per100 .unit {
		color: #333;
	}

	.data-wrap .world-data-row .all .unit,
	.data-wrap .world-data-row .add .unit,
	.data-wrap .world-data-row .per100 .unit,
	.data-wrap .china-data-row .all .unit,
	.data-wrap .china-data-row .add .unit,
	.data-wrap .china-data-row .per100 .unit {
		margin-left: 2px;
		font: 11px/15px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		font-weight: normal;
		font-weight: 600;
	}

	/* 全国疫情 */
	.china_provinces_tit {
		position: relative;
		font: 14px/41px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		font-size: 14px;
		margin-bottom: 3px;
		font-size: 16px;
		color: #333;
	}

	/* 累计确诊城市 */
	.china_provinces_tit .mid_tip {
		display: inline-block;
		margin-left: 8px;
		font-size: 14px;
		color: #666;
		font-weight: 400;
	}

	/* 累计确诊城市数字 */
	.china_provinces_tit .mid_tip>span {
		margin-left: 4px;
		font-size: 14px;
		color: #e10000;
	}

	.china_provinces_content {
		width: 100%;
		background: #f4f4f4;
		border-radius: 4px;
	}

	.china_provinces_confirm,
	.china_provinces_noconfirm {
		margin-top: 18px;
		text-align: center;
		font-size: 14px;
	}

	/* 两个城市数字 */
	.china_provinces_confirm span,
	.china_provinces_noconfirm span {
		font: 16px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #1d8ee9;
	}

	.china_provinces_confirm span {
		color: #e10000;
	}

	/* 两个城市数字下标"x病例城市" */
	.china_provinces_confirm p,
	.china_provinces_noconfirm p {
		margin-top: 3px;
		margin-bottom: 15px;
		font: 10px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #666;
	}

	/* 对比条 */
	.china_provinces_bar_wrap {
		margin-top: 25px;
		height: 8px;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApQAAAAUCAMAAAAEPl3/AAAAe1BMVEUdjunhAAD09PTz8vPr8PTT5PN9vO5cre0+nussluoikOnkJibiCgrg6vPE3fK52PGt0vCjzvCZye+Nw+9utO3z7OxNpevz5+fy39/y1NTxycnwvb3vsrLupqbtmJjsjY3rgYHqdXXpZ2foXFznUFDmQ0PlNzfjFxfhBATTDo3zAAAArklEQVRo3u3ax41CARRDUfwY4mRyzqn/CpFMCfyFF/fUcCVv3EJD+mUr4V0tNGRcdhSIMkXHTbY/BaIMMStbC0SZYlR2EogyxPD7td53gShD9Mo2AlGm+C87C0QZYvjhJqdfAlGG6JVtBaJM8Vd2EYgyxOC13nPWmyhjTMp2AlGm+C27CkQZYtB2k4uHQJQhumV7gShT/JTdBKIM0S9bCkSZolt2EIgyRaeMe29TnoW+HdyCFLH0AAAAAElFTkSuQmCC) no-repeat 0 -2px;
		background-position-x: -262.086px;
		background-size: auto;
		border-radius: 8px;
	}

	/* 城市分布说明 */
	.china_provinces_tip {
		margin-top: 10px;
		font: 10px -apple-system-font, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Arial;
		color: #999;
	}
</style>
