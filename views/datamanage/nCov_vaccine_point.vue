<template>
	<div>
		<!-- 疫苗接种单位 -->
		<div class="header">
			疫苗接种区域：
			<el-cascader v-model="selectedAddressOptions" :options="addressOptions" @change="addressChange"
				placeholder="请选择地址" style="width: 160px">
			</el-cascader>
		</div>
		<el-dialog title="疫苗接种点" :visible.sync="dialogFormVisible" :before-close="handleDialogClose">
			<el-form :model="form" :rules="rules" ref="vaccinePointForm">
				<el-form-item label="疫苗接种点名称" prop="vac_pointname" :label-width="formLabelWidth">
					<el-input v-model="form.vac_pointname" autocomplete="off" placeholder="请填写疫苗接种点名称"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="location" :label-width="formLabelWidth">
					<el-input v-model="form.location" placeholder="请输入详细地址" style="width: 240px;margin-left: 10px"
						:disabled="true">
					</el-input>
				</el-form-item>
				<el-form-item label="疫苗品种" prop="vac_kind" :label-width="formLabelWidth">
					<el-checkbox-group v-model="form.vac_kind">
						<el-checkbox v-for="vaccineType in vaccineOptions" :label="vaccineType.id"
							:key="vaccineType.id">{{vaccineType.name}}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="营业时间" prop="open_time" :label-width="formLabelWidth">
					<el-input v-model="form.open_time" placeholder="请输入营业时间"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="vac_pointphone" :label-width="formLabelWidth">
					<el-input v-model="form.vac_pointphone" placeholder="请输入联系电话"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="vac_extraInfo" :label-width="formLabelWidth">
					<el-input v-model="form.vac_extraInfo" type="textarea" placeholder="请输入额外备注信息"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleDialogClose()">取 消</el-button>
				<el-button type="primary" @click="submit()" ref="enter">确认修改</el-button>
			</div>
		</el-dialog>
		<div class="body">
			<el-row :gutter="20">
				<el-col :span="10">
					<!-- 本市接种防疫屏障 -->
					<el-card header="本市接种防疫屏障" class="record-card" style="margin-top: 20px;font-weight: bold;">
						<div id="map_div" ref="cityMap" style="height: 300px">
						</div>
					</el-card>
				</el-col>
				<el-col :span="5">
					<!-- 地区接种排行-->
					<el-card class="ranking-card" style="margin-top: 20px;">
						<div slot="header" class="clearfix">
							<span style="font-weight: bold;">地区接种排行</span>
							<i class="el-icon-refresh" @click="getVaccineTopTenArea" style="float: right;"></i>
						</div>
						<div style="height: 300px">
							<el-scrollbar style="height:100%">
								<div v-for="area in this.vaccineTopTenArea" :key="area" class="text item">
									{{area}}
									<el-divider></el-divider>
								</div>
							</el-scrollbar>
						</div>
					</el-card>
				</el-col>
				<el-col :span="9">
					<!-- 疫苗类型占比 -->
					<el-card header="疫苗类型占比" style="margin-top: 20px;font-weight: bold;">
						<div id="bar_div" ref="vaccineEchart" style="height: 300px">
						</div>
					</el-card>
				</el-col>
			</el-row>
			<!-- 疫苗接种点信息 -->
			<el-carousel :interval="4000" type="card" height="310px">
				<el-carousel-item v-for="item in this.vaccinePoints" :key="item.id">
					<el-card class="ranking-card" style="margin-top: 20px;">
						<el-descriptions :title="item.vac_pointname" :column="1" size="large">
							<template slot="extra">
								<el-button type="primary" size="small" @click="doEdit(item)" :disabled="editFlag">编辑
								</el-button>
							</template>
							<el-descriptions-item label="地址">{{item.location}}</el-descriptions-item>
							<el-descriptions-item label="开放时间">{{item.open_time}}</el-descriptions-item>
							<el-descriptions-item label="电话">{{item.vac_pointphone}}</el-descriptions-item>
							<el-descriptions-item label="疫苗品种">
								<div v-if="item.vac_kind">
									<el-tag v-show="item.vac_kind.indexOf('0')!=-1" size="mini">武汉生物</el-tag>
									<el-tag v-show="item.vac_kind.indexOf('1')!=-1" size="mini">北京科兴</el-tag>
									<el-tag v-show="item.vac_kind.indexOf('2')!=-1" size="mini">北京生物</el-tag>
									<el-tag v-show="item.vac_kind.indexOf('3')!=-1" size="mini">成都生物</el-tag>
									<el-tag v-show="item.vac_kind.indexOf('4')!=-1" size="mini">长春生物</el-tag>
								</div>
							</el-descriptions-item>
							<el-descriptions-item label="备注">{{item.vac_extraInfo}}</el-descriptions-item>
						</el-descriptions>
					</el-card>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
	import {
		provinceAndCityData,
		CodeToText,
		TextToCode
	} from "../../node_modules/element-china-area-data"
	import {
		getVaccineAreaRanking,
		getCityMap,
		getVaccinePoints,
		editVaccinePoint
	} from "../../api/data.js"
	const vaccineOptions = [{
		id: 0,
		name: '北京生物'
	}, {
		id: 1,
		name: '北京科兴'
	}, {
		id: 2,
		name: '武汉生物'
	}, {
		id: 3,
		name: '成都生物'
	}, {
		id: 4,
		name: '长春生物'
	}]
	export default {
		name: 'nCov_vaccine_point',
		data() {
			return {
				vaccineOptions: vaccineOptions,
				addressOptions: provinceAndCityData,
				selectedCityCode: 320100,
				selectedCity: CodeToText[320100],
				selectedAddressOptions: ['320000', '320100'],
				vaccineTopTenArea: [
					"北京市朝阳区", "北京市东城区", "北京市西城区", "北京市丰台区", "北京市怀柔区",
					"北京市昌平区", "北京市大兴区", "北京市顺义区", "北京市海淀区", "北京市通州区"
				],
				editFlag: this.selectedCityCode == this.$admin.state.cityCode ? false : true,
				vaccineEchart: '',
				echartData: [{
						value: 35,
						name: '北京生物',
						itemStyle: '#193f6e'
					},
					{
						value: 45,
						name: '北京科兴',
						itemStyle: '#3b6ba5'
					},
					{
						value: 30,
						name: '武汉生物',
						itemStyle: '#72a5d3'
					},
					{
						value: 20,
						name: '成都生物',
						itemStyle: '#b1d3e3'
					},
					{
						value: 15,
						name: '长春生物',
						itemStyle: '#e1ebec'
					}
				],
				mapData: {},
				cityMap: '',
				cityVacccinedData: [{
						name: '通州区',
						value: 38409
					}, {
						name: '海淀区',
						value: 20716
					}, {
						name: '大兴区',
						value: 20047
					},
					{
						name: '怀柔区',
						value: 21541
					}, {
						name: '西城区',
						value: 35649
					}, {
						name: '东城区',
						value: 39958
					},
					{
						name: '朝阳区',
						value: 39107
					}, {
						name: '石景山区',
						value: 59942
					}, {
						name: '丰台区',
						value: 119136
					},
					{
						name: '镇江市',
						value: 29701
					}, {
						name: '门头沟区',
						value: 62877
					}, {
						name: '房山区',
						value: 103338
					},
					{
						name: '顺义区',
						value: 153239
					}, {
						name: '密云区',
						value: 62734
					}, {
						name: '昌平区',
						value: 62734
					},
					{
						name: '平谷区',
						value: 15439
					}, {
						name: '延庆区',
						value: 52734
					}
				],
				vaccinePoints: [{
					vac_pointid: 0,
					vac_pointname: '南京同仁医院',
					location: '江宁区秣陵街道吉印大道2007号',
					vac_kind: "01234",
					open_time: '24小时',
					vac_pointphone: '无',
					vac_extraInfo: '8:00-24:00东北门停车场核酸采集处;次日0:00-8:00急诊门外核酸采集处'
				}],
				// 表单
				dialogFormVisible: false,
				formLabelWidth: '125px',
				form: {
					vac_pointid: '',
					vac_pointname: '',
					city_code: this.selectedCityCode,
					city_name: this.selectedCity,
					latitude: 120.184528,
					longitude: 30.262953,
					location: '',
					vac_kind: '',
					open_time: '',
					vac_pointphone: '',
					vac_extraInfo: ''
				},
				rules: {
					vac_pointname: [{
						required: true,
						message: '请输入疫苗接收点名称',
						trigger: 'blur'
					}],
					location: [{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}],
					vac_kind: [{
						required: true,
						message: '请选择疫苗品种',
						trigger: 'blur'
					}],
					open_time: [{
						required: true,
						message: '请输入营业时间',
						trigger: 'blur'
					}],
					vac_pointphone: [{
						required: true,
						message: '请输入联系方式',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			addressChange() {
				this.selectedCity = CodeToText[this.selectedAddressOptions[1]];
				this.selectedCityCode = this.selectedAddressOptions[1];
				if (this.selectedCity == "市辖区") {
					this.selectedCityCode = this.selectedAddressOptions[0];
					this.selectedCity = CodeToText[this.selectedAddressOptions[0]];
				}
				this.editFlag = !(this.selectedCityCode == this.$admin.state.cityCode);
				this.getMapData();
				this.getVaccinePointList();
				this.getVaccineTopTenArea();
				this.drawEchart();
			},
			getVaccineTopTenArea() {
				var param = {
					"city_code": this.selectedCityCode
				};
				getVaccineAreaRanking(param).then(res => {
					console.log(res.data.data);
					this.vaccineTopTenArea = res.data.data.map(item => this.selectedCity + item.area_name);
					this.cityVacccinedData = res.data.data.map(item => {
						return {
							name: item.area_name,
							value: item.vaccined_value
						}
					});
				});
			},
			drawEchart() {
				var bar_div = this.$refs.vaccineEchart;
				if (bar_div) {
					if (this.vaccineEchart != null && this.vaccineEchart != "" && this.vaccineEchart != undefined) {
						this.vaccineEchart.dispose();
					}
					this.vaccineEchart = this.$echarts.init(bar_div);
					this.vaccineEchart.setOption({
						title: {
							text: this.selectedCity, // 主标题
							subtext: '', // 副标题
							x: 'left' // x轴方向对齐方式
						},
						grid: {
							containLabel: true
						},
						tooltip: {
							trigger: 'item',
							formatter: '{a} <br/>{b} : {d}%'
						},
						color: ['#193f6e', '#3b6ba5', '#72a5d3', '#b1d3e3', '#e1ebec'],
						// backgroundColor: '#ffffff',
						legend: {
							//orient: 'vertical',
							icon: 'circle',
							align: 'left',
							x: 'center',
							y: 'bottom',
							data: ['北京生物', '北京科兴', '武汉生物', '成都生物', '长春生物']
						},
						series: [{
							name: '疫苗类别',
							type: 'pie',
							radius: ['30%', '50%'],
							avoidLabelOverlap: false,
							//center: ['50%', '50%'],
							itemStyle: {
								color: function(params) {
									// 自定义颜色
									var colorList = ['#193f6e', '#3b6ba5', '#72a5d3', '#b1d3e3',
										'#e1ebec'
									]
									return colorList[params.dataIndex]
								}
							},
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)',
								}
							},
							data: this.echartData
						}]
					})
				}
			},
			getMapData() {
				getCityMap(this.selectedCityCode).then(res => {
					this.mapData = res.data;
					console.log(this.mapData);
					this.getVaccineTopTenArea();
					this.drawMap();
				});
			},
			drawMap() {
				var map_div = this.$refs.cityMap;
				if (map_div) {
					if (this.cityMap != null && this.cityMap != "" && this.cityMap != undefined) {
						this.cityMap.dispose();
					}
					this.cityMap = this.$echarts.init(map_div)
					// console.log(this.mapData);
					this.$echarts.registerMap(this.selectedCity, this.mapData, {})
					//echarts提供的方法echarts.registerMap(名称，地图数据，其他配置)
					let airData = this.cityVacccinedData
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
								return `区域：${params.data.name}</br>累计接种人数：${params.data.value}`
							},
							showDelay: 100
						},
						// 地图配置
						geo: {
							map: this.selectedCity,
							roam: true,
							zoom: 1.25,
							// 地图文字
							label: {
								// 通常状态下的样式
								normal: {
									// 默认是否显示地区名称
									show: true,
									fontSize: 10,
									textStyle: {
										color: 'black'
									}
								},
								// 鼠标放上去的样式
								emphasis: {
									textStyle: {
										color: 'black'
									}
								}
							},
							// 地图区域的样式设置
							itemStyle: {
								normal: {
									// 地图边界颜色
									borderColor: '#fff',
									// 地图区域背景颜色
									areaColor: '#AAD5FF',
								},
								// 鼠标放上去高亮的样式
								emphasis: {
									// 鼠标放上去地图区域背景颜色
									areaColor: '#0984e3',
									borderWidth: 0
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
							min: 10000,
							max: 130000,
							// orient: "horizontal", //图例模式
							itemWidth: 10, //图例宽度
							itemHeight: 100, //图例高度
							inRange: {
								color: ['#e0ffff', '#006edd'] //控制颜色渐变的范围
							},
							//calculable: true //出现滑块
						}
					} // option报错改为let option就好了
					this.cityMap.setOption(option)
					// window.addEventListener('resize', function() {
					// 	this.cityMap.resize()
					// })
				}
			},
			handleDialogClose() {
				this.dialogFormVisible = false;
				this.$refs.vaccinePointForm.resetFields();
			},
			doEdit(item) {
				this.form = JSON.parse(JSON.stringify(item));
				this.form.vac_kind = [];
				if (item.vac_kind != null) {
					if (item.vac_kind.indexOf('0') != -1)
						this.form.vac_kind.push(0);
					if (item.vac_kind.indexOf('1') != -1)
						this.form.vac_kind.push(1);
					if (item.vac_kind.indexOf('2') != -1)
						this.form.vac_kind.push(2);
					if (item.vac_kind.indexOf('3') != -1)
						this.form.vac_kind.push(3);
					if (item.vac_kind.indexOf('4') != -1)
						this.form.vac_kind.push(4);
				}
				this.dialogFormVisible = true;
			},
			submit() {
				this.$refs.vaccinePointForm.validate((valid) => {
					if (valid) {
						var VaccineType = "";
						if (this.form.vac_kind != null) {
							if (this.form.vac_kind.includes(0))
								VaccineType += "0";
							if (this.form.vac_kind.includes(1))
								VaccineType += "1";
							if (this.form.vac_kind.includes(2))
								VaccineType += "2";
							if (this.form.vac_kind.includes(3))
								VaccineType += "3";
							if (this.form.vac_kind.includes(4))
								VaccineType += "4";
						}
						var editForm = {
							"vac_pointid": this.form.vac_pointid,
							"vac_pointname": this.form.vac_pointname,
							"open_time": this.form.open_time,
							"vac_pointphone": this.form.vac_pointphone,
							"vac_kind": VaccineType,
							"vac_extraInfo": this.form.vac_extraInfo
						}
						editVaccinePoint(editForm).then((res) => {
							if (res.data.code == 200) {
								this.$refs.vaccinePointForm.resetFields();
								this.dialogFormVisible = false;
								this.$message({
									message: "修改成功",
									type: "success",
								});
								this.getVaccinePointList();
							} else {
								console.log('error: edit one cov_Test!!');
							}
						});

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			getVaccinePointList() {
				var param = {
					city_code: this.selectedCityCode
				};
				getVaccinePoints(param).then(res => {
					console.log(res.data.data);
					this.vaccinePoints = res.data.data;
				});
			}
		},
		created() {
			//this.getMapData();
		},
		mounted() {
			this.drawEchart();
			this.getMapData();
			//this.drawMap();
		}
	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.el-divider {
		margin: 8px 0;
		background: 0 0;
		border-top: 1px solid #E6EBF5;
	}

	.el-scrollbar__wrap {
		overflow-x: hidden !important;
	}
</style>
