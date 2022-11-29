<template>
	<div>
		<el-card class="vaccinePeople">
			<div class="title">
				疫苗接种记录
				<el-button icon="el-icon-search" size="small" style="float: right;" @click="searchChange">搜索
				</el-button>
				<el-button icon="el-icon-switch-button" size="small" style="float: right;" @click="remake">重置
				</el-button>
			</div>
			<!-- 疫苗接种记录 -->
			<div class="header">
				<el-row :gutter="20">
					<el-col :span="6">
						<el-card class="name-card">
							受种者姓名:<br />
							<el-autocomplete v-model="selectedPerson" style="margin-top: 10px;"
								:fetch-suggestions="vaccineSearchByName" placeholder="请输入内容" >
							</el-autocomplete>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card class="date-card">
							接种日期:<br />
							<el-date-picker v-model="selectedDate" style="margin-top: 10px" type="date"
								placeholder="选择日期" align="right" :picker-options="pickerOptions">
							</el-date-picker>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card class="address-card">
							接种地点:<br />
							<el-autocomplete v-model="selectedAddress" style="margin-top: 10px;"
								:fetch-suggestions="vaccineSearchByAddress" placeholder="请输入内容" >
							</el-autocomplete>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card class="dose-card">
							剂次:<br />
							<el-checkbox-group size="mini" style="margin-top: 10px;" v-model="selectedDose">
								<el-checkbox label="第一剂次" :value='0'></el-checkbox>
								<el-checkbox label="第二剂次" :value='1'></el-checkbox>
								<el-checkbox label="第三剂次" :value='2'></el-checkbox>
							</el-checkbox-group>
						</el-card>
					</el-col>
				</el-row>
			</div>
			<div class="body">
				<el-card class="record-card" style="margin-top: 15px;">
					疫苗接种记录:<br />
					<el-table :data="vaccinePeopleData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border
						style="width: 100%;margin-top: 10px" :default-sort="{prop: 'date', order: 'descending'}"
						:header-cell-style="{background:'#f5f7fa',color:'#606266'}">
						<el-table-column prop="name" label="受种者姓名" sortable width='120px'>
						</el-table-column>
						<el-table-column prop="identify" label="身份证号" sortable width='150px'>
						</el-table-column>
						<el-table-column prop="telephone" label="手机号码" sortable width='105px'>
						</el-table-column>
						<el-table-column prop="sex" label="性别" sortable width='75px'>
							<template slot-scope="scope">
								{{scope.row.sex == 0 ? '男':'女'}}
							</template>
						</el-table-column>
						<el-table-column prop="birthday" label="出生日期" sortable width='105px'>
						</el-table-column>
						<el-table-column prop="age" label="年龄" sortable width='75px'>
						</el-table-column>
						<el-table-column prop="vaccinedDate" label="接种日期" sortable width='105px'>
						</el-table-column>
						<el-table-column prop="address" label="接种地点" sortable>
						</el-table-column>
						<el-table-column prop="dose" label="接种剂次" sortable fixed="right">
							<template slot-scope="scope">
								<el-tag
									:type="scope.row.dose == 0 ? 'primary' : scope.row.dose == 2 ? 'warning' :'success'"
									disable-transitions>
									{{scope.row.dose == 0 ? '第一剂次' : scope.row.dose == 2 ? '第三剂次' :'第二剂次'}}
								</el-tag>
							</template>
						</el-table-column>
					</el-table>
					<!-- 页码 -->
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper" :total="vaccinePeopleData.length">
					</el-pagination>
				</el-card>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		getVaccinedPeopleName,
		getVaccinePointName,
		searchVaccineByNameDateAddressDose
	} from "../../api/data.js"
	export default {
		name: 'nCov_vaccine_people',
		data() {
			return {
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				vaccinePeople: [{
					value: "张三"
				}, {
					value: "李四"
				}],
				vaccinePoints: [{
					value: "同仁医院"
				}, {
					value: "明基医院"
				}, {
					value: "南京大学仙林校区"
				}, {
					value: "东南大学九龙湖校区"
				}],
				selectedPerson: null,
				selectedDate: null,
				selectedAddress: null,
				selectedDose: [],
				vaccinePeopleData: [{
					id: 0,
					name: '张三',
					identify: '320611200106126666',
					telephone: '18362155818',
					sex: 1, //0：男；1：女
					birthday: '2001-06-12',
					age: 21,
					vaccinedDate: '2021-11-5',
					address: '东南大学九龙湖校区',
					dose: 2 //0:第一剂次，1：第二剂次，2:第三剂次
				}],
				currentPage: 1,
				pageSize: 10,
				timeoutP: null,
				timeoutA: null
			}
		},
		methods: {
			timeFormat(date) {
				if (date == null) return null;
				var year = date.getFullYear();
				/* 在日期格式中，月份是从0开始的，因此要加0
				 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				 * */
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				// 拼接
				return year + "-" + month + "-" + day;
			},
			initVaccineDate(){
				var param = {
					"city_code": this.$admin.state.cityCode,
					"user_name": null,
					"vac_time": null,
					"vac_pointname": null,
					"dose": null
				};
				searchVaccineByNameDateAddressDose(param).then(
					res => {
						if (res.data.code == 200) {
							console.log(res.data.data);
							let nowdate = new Date();
							var nowyear = nowdate.getFullYear();
							this.vaccinePeopleData = res.data.data.map(item => {
								return {
									id: item.v_id,
									name: item.user_name,
									identify: item.user_identify,
									telephone: '18362155818',
									sex: item.user_identify[16] % 2 == 0 ? 1 : 0, //0：男；1：女
									birthday: item.user_identify.slice(6, 10) + "-" + item.user_identify
										.slice(10, 12) + "-" + item.user_identify.slice(12, 14),
									age: (nowyear - parseInt(item.user_identify.slice(6, 10))),
									vaccinedDate: item.vac_time==null?'':item.vac_time.slice(0, 10),
									address: item.address,
									dose: item.dose //0:第一剂次，1：第二剂次，2:第三剂次
								}
							});
						} else {
							console.log('error:get vaccine records!');
						}
					});
			},
			getAll() {
				var param = {
					"city_code": this.$admin.state.cityCode
				}
				// e.g., res=["zhangsan","lisi"]->vaccinePeople=[{value:"zhangsan"},{value:"lisi"}]
				getVaccinedPeopleName().then(res => {
					this.vaccinePeople = res.data.data.map(item => {
						return {
							value: item
						}
					});
				});
				getVaccinePointName(param).then(res => {
					this.vaccinePoints = res.data.data.map(item => {
						return {
							value: item
						}
					});
				});
				this.initVaccineDate();
			},
			remake() {
				this.selectedDose = [];
				this.selectedPerson = null;
				this.selectedDate = null;
				this.selectedAddress = null;
				this.initVaccineDate();
			},
			searchChange() {
				var dose = "";
				if (this.selectedDose.includes('第一剂次'))
					dose += "0";
				if (this.selectedDose.includes('第二剂次'))
					dose += "1";
				if (this.selectedDose.includes('第三剂次'))
					dose += "2";
				if (dose == "") dose = null;
				var param = {
					"city_code": this.$admin.state.cityCode,
					"user_name": this.selectedPerson == "" ? null : this.selectedPerson,
					"vac_time": this.timeFormat(this.selectedDate),
					"vac_pointname": this.selectedAddress == "" ? null : this.selectedAddress,
					"dose": dose
				};
				console.log(param);
				searchVaccineByNameDateAddressDose(param).then(
					res => {
						if (res.data.code == 200) {
							this.vaccinePeopleData = res.data.data.map(item => {
								return {
									id: item.v_id,
									name: item.user_name,
									identify: item.user_identify,
									telephone: '18362155818',
									sex: item.user_identify[16] % 2 == 0 ? 1 : 0, //0：男；1：女
									birthday: item.user_identify.slice(6, 10) + "-" + item.user_identify
										.slice(10, 12) + "-" + item.user_identify.slice(12, 14),
									age: new Date().getFullYear() - parseInt(item.user_identify.slice(6, 10)),
									vaccinedDate: item.vac_time.slice(0, 10),
									address: item.address,
									dose: item.dose //0:第一剂次，1：第二剂次，2:第三剂次
								}
							});
						} else {
							console.log('error:find one vaccine record!');
						}
					});
			},
			vaccineSearchByName(name, cb) {
				var people = this.vaccinePeople;
				var results = name ? people.filter(this.nameFilter(name)) : people;

				clearTimeout(this.timeoutP);
				this.timeoutP = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			nameFilter(name) {
				return (filterdName) => {
					return (filterdName.value.toLowerCase().match(name.toLowerCase()));
				};
			},
			vaccineSearchByAddress(addr, cb) {
				var points = this.vaccinePoints;
				var results = addr ? points.filter(this.addressFilter(addr)) : points;

				clearTimeout(this.timeoutA);
				this.timeoutA = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			addressFilter(addr) {
				return (filterdAddr) => {
					return (filterdAddr.value.toLowerCase().match(addr.toLowerCase()));
				};
			},
			handleSelect(item) {
				console.log(item);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.currentPage = 1;
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
			}
		},
		mounted() {
			this.getAll();
		}
	}
</script>

<style scoped>
	.vaccinePeople {
		border-radius: 12px;
		background-image: linear-gradient(180deg, #3275b3 10%, #3275b3 40%, rgba(12, 134, 142, 0) 90%);
		background-repeat: no-repeat;
		background-size: contain;
	}

	.title {
		font-weight: 700;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 20px;
		color: #000000;
		margin-left: 5px;
		margin-bottom: 20px;
	}
	
	.title .el-button{
		margin-left:20px;
	}
	
	.subtitle {
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
		color: #000000;
		margin-left: 5px;
		margin-bottom: 14px;
	}

	::v-deep .el-date-editor.el-input,
	::v-deep .el-date-editor.el-input__inner {
		width: 180px;
	}

	::v-deep .el-table__header tr,
	::v-deep .el-table__header th {
		padding: 0;
		height: 40px;
	}

	::v-deep .el-pagination {
		margin-top: 10px;
	}
</style>
