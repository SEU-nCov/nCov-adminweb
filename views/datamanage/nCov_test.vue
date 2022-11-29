<template>
	<div>
		<el-dialog title="核酸采样点" :visible.sync="dialogFormVisible" :before-close="handleDialogClose">
			<el-form :model="form" :rules="rules" ref="testForm">
				<el-form-item label="核酸采样点名称" prop="nat_pointname" :label-width="formLabelWidth">
					<el-input v-model="form.nat_pointname" autocomplete="off" placeholder="请填写核酸采样点名称"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="location" :label-width="formLabelWidth">
					<el-select v-model="form.area_code" size="medium" placeholder="请选择地址" style="width: 210px">
						<el-option v-for="item in addressOptions" :key="item.value" :label="item.label"
							:value="item.value" :disabled="operationType">
						</el-option>
					</el-select>
					<el-input v-model="form.location" placeholder="请输入详细地址" style="width: 240px;margin-left: 10px"
						:disabled="operationType">
					</el-input>
				</el-form-item>
				<el-form-item label="采样点类型" prop="nat_type" :label-width="formLabelWidth">
					<el-radio v-model="form.nat_type" :label="0">公立</el-radio>
					<el-radio v-model="form.nat_type" :label="1">民营</el-radio>
					<el-radio v-model="form.nat_type" :label="2">临时</el-radio>
				</el-form-item>
				<el-form-item label="出报告时间" prop="nat_turnaroundTime" :label-width="formLabelWidth">
					<el-select v-model="form.nat_turnaroundTime">
						<el-option v-for="item in turnaroundTimeOptions" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否可预约" prop="nat_reservation" :label-width="formLabelWidth">
					<el-switch v-model="form.nat_reservation" active-color="#13ce66">
					</el-switch>
				</el-form-item>
				<el-form-item label="营业时间" prop="open_time" :label-width="formLabelWidth">
					<el-input v-model="form.open_time" placeholder="请输入营业时间"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="nat_pointphone" :label-width="formLabelWidth">
					<el-input v-model="form.nat_pointphone" placeholder="请输入联系电话"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="nat_extraInfo" :label-width="formLabelWidth">
					<el-input v-model="form.nat_extraInfo" type="textarea" placeholder="请输入额外备注信息"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleDialogClose()">取 消</el-button>
				<el-button type="primary" @click="submit()" ref="enter">立即新增</el-button>
			</div>
		</el-dialog>

		<el-card class="covTest">
			<div class="title">
				积极配合核酸检测
			</div>
			<div class="subtitle">
				共同筑牢防疫屏障
			</div>
			<!-- 搜索表头 -->
			<el-card class="testHeader" style="border-radius: 12px;height: 80px;">
				<div style="margin-top: -10px;">
					核酸采样点名称:&thinsp;
					<el-autocomplete v-model="selectedName" style="width: 200px;margin-right: 20px;" size="medium"
						@input="nameChange" :fetch-suggestions="testSearchByName" placeholder="核酸采样点名称">
					</el-autocomplete>
					地址:&thinsp;
					<el-select v-model="selectedAddress" size="medium" placeholder="所在区域" style="width: 200px"
						@change="addressChange">
						<el-option v-for="item in addressOptions" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<el-button icon="el-icon-search" style="margin-left: 30px;" @click="doSearch">搜索
					</el-button>
					<el-button icon="el-icon-switch-button" style="margin-left: 10px;" @click="remake">重置
					</el-button>
				</div>
			</el-card>
			<el-card class="testHeader" style="margin-top: 20px;border-radius: 12px;height: 80px;">
				<div style="margin-top: -10px;">
					<!-- 选择器 value保存到v-model中-->
					采样点类型:&thinsp;
					<el-select v-model="selectedType" clearable placeholder="采样点类型" style="width: 125px" size="medium"
						@change="filterChange">
						<el-option v-for="item in typeOptions" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					&nbsp;出报告时间:&thinsp;
					<el-select v-model="selectedTurnaroundTime" clearable placeholder="出报告时间" style="width: 135px"
						size="medium" @change="filterChange">
						<el-option v-for="item in turnaroundTimeOptions" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					&nbsp;是否可预约:&thinsp;
					<el-select v-model="selectedReservation" clearable placeholder="是否可预约" style="width: 125px"
						size="medium" @change="filterChange">
						<el-option v-for="item in reservationOptions" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<el-button icon="el-icon-search" style="margin-left: 30px;" @click="doFilter">过滤
					</el-button>
				</div>
			</el-card>

			<!-- 表格 -->
			<el-card style="margin-top: 20px;border-radius: 12px;">
				<el-table ref="multipleTable" :data="testingSites.slice((currentPage-1)*pageSize,currentPage*pageSize)"
					style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column type="expand">
						<template slot-scope="props">
							<el-form label-position="left" inline class="demo-table-expand">
								<el-form-item label="核酸采样点名称">
									<span>{{ props.row.name }}</span>
								</el-form-item>
								<el-form-item label="地址">
									<span>{{ props.row.province+props.row.city+props.row.address }}</span>
								</el-form-item>
								<!-- 公立;民营;临时 -->
								<el-form-item label="采样点类型">
									<el-tag
										:type="props.row.type == '0' ? 'primary' : props.row.type == '1' ? 'success' : 'warning'"
										disable-transitions>
										{{props.row.type == '0' ?'公立':props.row.type == '1' ?'民营':'临时'}}
									</el-tag>
								</el-form-item>
								<!-- 6小时出报告,12小时出报告,24小时出报告 -->
								<el-form-item label="出报告时间">
									<span>{{ props.row.turnaroundTime =='0'?'6小时出报告':props.row.turnaroundTime =='1'?'12小时出报告':'24小时出报告' }}</span>
								</el-form-item>
								<!-- 可线上预约 -->
								<el-form-item label="是否可预约">
									<span>{{ props.row.reservation=='1'? "可线上预约":"否" }}</span>
								</el-form-item>
								<!-- 例:周一至周日8:30-11:00,14:00-16:00 -->
								<el-form-item label="营业时间">
									<span>{{ props.row.openingTime }}</span>
								</el-form-item>
								<!-- 例:52721644 -->
								<el-form-item label="电话">
									<span>{{ props.row.telephone }}</span>
								</el-form-item>
								<!-- 例:只做应检尽检 -->
								<el-form-item label="备注">
									<span>{{ props.row.extraInfo }}</span>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="核酸采样点名称">
					</el-table-column>
					<el-table-column prop="province" label="省份" width="80">
					</el-table-column>
					<el-table-column prop="city" label="市" width="80">
					</el-table-column>
					<el-table-column prop="area" label="区" width="80">
					</el-table-column>
					<el-table-column prop="address" label="地址">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button @click="doEdit(scope.row)" type="text" icon="el-icon-edit" size="small">编辑
							</el-button>
							<el-button @click="deleteOne(scope.row.id)" type="text" icon="el-icon-delete" size="small">
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 增删 -->
				<el-button class="editButton" @click="doAdd">+ 新增</el-button>
				<el-button class="editButton" @click="batchDelete()">批量删除</el-button>
				<!-- 页码 -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper" :total="testingSites.length">
				</el-pagination>
			</el-card>
		</el-card>
	</div>
</template>


<script>
	import {
		regionData,
		CodeToText,
		TextToCode
	} from "../../node_modules/element-china-area-data"
	import {
		getTests,
		editTest,
		addTest,
		deleteTests,
		searchTestByName,
		searchTestByArea,
		filterTest
	} from "../../api/data.js"
	export default {
		name: 'nCov_test',
		data() {
			return {
				addressOptions: [],
				selectedAddressOption: [],
				typeOptions: [{
					value: '0',
					label: '公立'
				}, {
					value: '1',
					label: '民营'
				}, {
					value: '2',
					label: '临时'
				}],
				turnaroundTimeOptions: [{
					value: '0',
					label: '6小时出报告'
				}, {
					value: '1',
					label: '12小时出报告'
				}, {
					value: '2',
					label: '24小时出报告'
				}],
				reservationOptions: [{
					value: "1",
					label: '可线上预约'
				}],
				// 表单
				dialogFormVisible: false,
				formLabelWidth: '125px',
				form: {
					nat_pointid: '',
					nat_pointname: '',
					city_code: this.$admin.state.cityCode.toString(),
					area_code: '',
					location: '',
					open_time: '',
					nat_pointphone: '',
					latitude: "31.880585", //
					longitude: "118.819619", //
					nat_unusualcolor: '1', //
					nat_type: '',
					nat_turnaroundTime: '',
					nat_reservation: '0',
					nat_extraInfo: ''
				},
				adminCity: {
					city_name: CodeToText[this.$admin.state.cityCode] //前两位为省编码，中间两位为市编码，后两位为区编码
				},
				testPointNames: '',
				testingSites: [{
					id: 0,
					name: '南京同仁医院',
					province: '江苏省',
					city: '南京市',
					area: '江宁区',
					address: '吉印大道2007号',
					type: 0,
					turnaroundTime: '24小时出报告',
					reservation: false,
					openingTime: '24小时',
					telephone: '无',
					extraInfo: '8:00-24:00东北门停车场核酸采集处;次日0:00-8:00急诊门外核酸采集处'
				}],
				multipleSelection: [],
				currentPage: 1,
				pageSize: 10,
				selectedName: '',
				selectedAddress: [],
				selectedType: '',
				selectedReservation: '',
				selectedTurnaroundTime: '',
				operationType: false, //false:新增,true:编辑
				rules: {
					nat_pointname: [{
						required: true,
						message: '请输入核酸采样点名称',
						trigger: 'blur'
					}],
					location: [{
						required: true,
						message: '请选择城市区域,并输入详细地址',
						trigger: 'blur'
					}],
					nat_type: [{
						required: true,
						message: '请选择类型',
						trigger: 'blur'
					}],
					open_time: [{
						required: true,
						message: '请输入营业时间',
						trigger: 'blur'
					}],
					nat_turnaroundTime: [{
						required: true,
						message: '请选择出报告时间',
						trigger: 'blur'
					}],
					nat_pointphone: [{
						required: true,
						message: '请输入联系电话',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.currentPage = 1;
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
			},
			remake() {
				this.selectedName = null;
				this.selectedAddress = null;
				this.selectedReservation = null;
				this.selectedTurnaroundTime = null;
				this.selectedType = null;
				this.getTestList();
			},
			nameChange() {
				this.selectedAddress = null;
			},
			addressChange() {
				this.selectedName = null;
			},
			filterChange() {
				this.selectedAddress = null;
				this.selectedName = null;
			},
			doSearch() {
				var param;
				if (this.selectedAddress == null && this.selectedName != null) {
					param = {
						city_code: this.$admin.state.cityCode,
						nat_pointname: this.selectedName
					};
					console.log(param);
					searchTestByName(param).then(res => {
						this.testingSites = res.data.data.map(item => {
							return {
								id: item.nat_pointid,
								name: item.nat_pointname,
								province: CodeToText[Math.floor(item.city_code / 10000) * 10000], //省级
								city: CodeToText[item.city_code], //市级
								area: CodeToText[item.area_code], //区级
								address: item.location,
								type: item.nat_type,
								turnaroundTime: item.nat_turnaroundTime,
								openingTime: item.open_time,
								telephone: item.nat_pointphone,
								reservation: item.nat_reservation,
								extraInfo: item.nat_extraInfo
							}
						});
					});
				} else if (this.selectedAddress != null && this.selectedName == null) {
					param = {
						city_code: this.$admin.state.cityCode,
						area_code: this.selectedAddress
					};
					console.log(param);
					searchTestByArea(param).then(res => {
						if (res.data.code == 200) {
							this.testingSites = res.data.data.map(item => {
								return {
									id: item.nat_pointid,
									name: item.nat_pointname,
									province: CodeToText[Math.floor(item.city_code / 10000) * 10000], //省级
									city: CodeToText[item.city_code], //市级
									area: CodeToText[item.area_code], //区级
									address: item.location,
									type: item.nat_type,
									turnaroundTime: item.nat_turnaroundTime,
									openingTime: item.open_time,
									telephone: item.nat_pointphone,
									reservation: item.nat_reservation,
									extraInfo: item.nat_extraInfo
								}
							});
						} else {
							this.$message({
								message: "查找失败",
								type: "warning",
							});
						}
					});
				}
			},
			doFilter() {
				var param = {
					city_code: this.$admin.state.cityCode,
					nat_type: this.selectedType == "" ? null : this.selectedType,
					nat_turnaroundTime: this.selectedTurnaroundTime == "" ? null : this.selectedTurnaroundTime,
					nat_reservation: this.selectedReservation == "" ? null : this.selectedReservation
				};
				console.log(param);
				filterTest(param).then(res => {
					if (res.data.code == 200) {
						console.log(res.data.data);
						this.testingSites = res.data.data.map(item => {
							return {
								id: item.nat_pointid,
								name: item.nat_pointname,
								province: CodeToText[Math.floor(item.city_code / 10000) * 10000], //省级
								city: CodeToText[item.city_code], //市级
								area: CodeToText[item.area_code], //区级
								address: item.location,
								type: item.nat_type,
								turnaroundTime: item.nat_turnaroundTime,
								openingTime: item.open_time,
								telephone: item.nat_pointphone,
								reservation: item.nat_reservation,
								extraInfo: item.nat_extraInfo
							}
						});
					} else {
						this.$message({
							message: "查找失败",
							type: "warning",
						});
					}
				});
			},
			doEdit(row) {
				this.operationType = true;
				this.$refs.enter.$el.innerText = "确认修改";
				this.form.nat_pointid = row.id;
				this.form.nat_pointname = JSON.parse(JSON.stringify(row.name));
				this.form.city_code = this.$admin.state.cityCode.toString();
				this.form.area_code = JSON.parse(JSON.stringify(row.area));
				this.form.location = JSON.parse(JSON.stringify(row.address));
				this.form.nat_type = JSON.parse(JSON.stringify(row.type));
				this.form.nat_turnaroundTime = row.turnaroundTime == "0" ? '6小时出报告' : row.turnaroundTime == '1' ?
					'12小时出报告' : '24小时出报告';
				this.form.nat_reservation = row.reservation ? true : false;
				this.form.open_time = JSON.parse(JSON.stringify(row.openingTime));
				this.form.nat_pointphone = JSON.parse(JSON.stringify(row.telephone));
				this.form.nat_extraInfo = JSON.parse(JSON.stringify(row.extraInfo));
				this.dialogFormVisible = true;
			},
			doAdd() {
				this.operationType = false;
				this.$refs.enter.$el.innerText = "立即新增";
				this.dialogFormVisible = true;
			},
			doResertForm() {
				this.form.nat_pointid = "";
				this.form.nat_pointname = "";
				this.form.area_code = [];
				this.form.loation = "";
				this.form.nat_type = "";
				this.form.nat_turnaroundTime = "";
				this.form.nat_reservation = false;
				this.form.open_time = "";
				this.form.nat_pointphone = "";
				this.form.nat_extraInfo = "";
			},
			handleDialogClose() {
				this.dialogFormVisible = false;
				this.form = Object.assign({}, undefined);
			},
			submit() {
				this.$refs.testForm.validate((valid) => {
					if (valid) {
						if (this.operationType == false) {
							var addForm = {
								nat_pointid: this.form.nat_pointid,
								nat_pointname: this.form.nat_pointname,
								city_code: this.$admin.state.cityCode,
								area_code: this.form.area_code,
								latitude: Math.random() * (32.26 - 32.14) + 32.14, //纬度
								longitude: Math.random() * (119.14 - 118.22) + 118.22, //经度
								location: this.form.location,
								open_time: this.form.open_time,
								nat_pointphone: this.form.nat_pointphone,
								nat_unusualcolor: '0',
								nat_type: this.form.nat_type,
								nat_turnaroundTime: this.form.nat_turnaroundTime?'1':'0',
								nat_reservation: this.form.nat_reservation,
								nat_extraInfo: this.form.nat_extraInfo
							};
							console.log(addForm);
							addTest(addForm).then((res) => {
								if (res.data.code == 200) {
									// this.doResetForm();
									this.form = Object.assign({}, undefined);
									this.dialogFormVisible = false;
									this.$message({
										message: "添加成功",
										type: "success",
									});
									this.getTestList();
								} else {
									console.log('error: add one cov_Test!!');
								}
							});
						} else {
							var editForm = {
								"nat_pointid": this.form.nat_pointid.toString(),
								"nat_pointname": this.form.nat_pointname,
								"open_time": this.form.open_time,
								"nat_pointphone": this.form.nat_pointphone,
								"nat_unusualcolor": this.form.nat_unusualcolor,
								"nat_type": this.form.nat_type.toString(),
								"nat_turnaroundTime": this.form.nat_turnaroundTime == '6小时出报告' ? '0' : this
									.form.nat_turnaroundTime == '12小时出报告' ? '1' : '2',
								"nat_reservation": this.form.nat_reservation?'1':'0',
								"nat_extraInfo": this.form.nat_extraInfo == null ? "无" : this.form
									.nat_extraInfo
							};
							editTest(editForm).then((res) => {
								console.log(res.data);
								if (res.data.code == 200) {
									//this.doResertForm();
									this.form = Object.assign({}, undefined);
									this.dialogFormVisible = false;
									this.$message({
										message: "修改成功",
										type: "success",
									});
									this.getTestList();
								} else {
									console.log('error: edit one cov_Test!!');
								}
							});
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			doDelete(ids) {
				// 请求接口
				deleteTests(ids).then((res) => {
					if (res.data.code == 200) {
						this.$message({
							message: "删除成功",
							type: "success",
						});
						this.getTestList();
					}
				});
			},
			// 删除一条
			deleteOne(id) {
				//this.testingSites.splice(index, 1);
				this.$confirm("确认删除这条记录吗?", "提示", {
					type: "warning",
				}).then(() => {
					var param = {
						"nat_pointid": id
					};
					this.doDelete(param);
				});
			},
			// 批量删除
			batchDelete() {
				if (this.multipleSelection == "") {
					this.$message({
						message: "请先选择需要删除的条目",
						type: "warning",
					});
				} else {
					// 删除前的提示
					this.$confirm("确认删除这些记录吗?", "提示", {
						type: "warning",
					}).then(() => {
						this.multipleSelection.map((item) => {
							var param = {
								"nat_pointid": item.id
							};
							this.doDelete(param);
						});
					});
				}
			},
			testSearchByName(name, cb) {
				var points = this.testPointNames;
				var results = name ? points.filter(this.nameFilter(name)) : points;

				clearTimeout(this.timeout);
				this.timeoutP = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
			nameFilter(name) {
				return (filterdName) => {
					return (filterdName.value.toLowerCase().match(name.toLowerCase()));
				};
			},
			getTestList() {
				getTests(this.adminCity).then(res => {
					var resdata = Array.from(res.data.data);
					this.testingSites = resdata.map(item => {
						return {
							id: item.nat_pointid,
							name: item.nat_pointname,
							province: CodeToText[Math.floor(item.city_code / 10000) * 10000], //省级
							city: CodeToText[item.city_code], //市级
							area: CodeToText[item.area_code], //区级
							address: item.location,
							type: item.nat_type,
							turnaroundTime: item.nat_turnaroundTime,
							openingTime: item.open_time,
							telephone: item.nat_pointphone,
							reservation: item.nat_reservation,
							extraInfo: item.nat_extraInfo
						}
					});
					this.testPointNames = resdata.map(item => {
						return {
							value: item.nat_pointname
						}
					});
				});
			}
		},
		mounted() {
			for (let i = 0, len = regionData.length; i < len; i++) {
				if (regionData[i].value == this.$admin.state.provinceCode) {
					for (let j = 0, len1 = regionData[i].children.length; j < len1; j++) {
						if (regionData[i].children[j].value == this.$admin.state.cityCode) {
							this.addressOptions = regionData[i].children[j].children;
							this.addressOptions.splice(0, 1);
							break;
						}
					}
					break;
				}
			}
			this.getTestList();
		}
	}
</script>

<style scoped>
	.covTest {
		border-radius: 12px;
		background-image: linear-gradient(180deg, #68b69c 0%, #68b69c 40%, rgba(12, 134, 142, 0) 90%);
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

	.subtitle {
		font-weight: 700;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 14px;
		color: #000000;
		margin-left: 5px;
		margin-bottom: 20px;
	}

	.testHeader .el-button,
	.editButton {
		margin-top: 10px;
		margin-right: 20px;
		margin-bottom: 10px;
		border-radius: 20px;
		border-color: #68b69c;
	}

	.testHeader .el-input {
		margin-right: 20px;
	}

	.demo-table-expand {
		font-size: 0;
	}

	::v-deep .demo-table-expand label {
		width: 120px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 100%;
	}
</style>
