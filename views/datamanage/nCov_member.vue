<template>
	<div>
		<el-dialog title="核酸检测机构" :visible.sync="dialogFormVisible" :before-close="handleDialogClose">
			<el-form :model="form" :rules="rules" ref="testForm">
				<el-form-item label="核酸检测机构名称" prop="tp_name" :label-width="formLabelWidth">
					<el-input v-model="form.tp_name" autocomplete="off" placeholder="请填写核酸检测机构名称"></el-input>
				</el-form-item>
				<el-form-item label="地址" prop="tp_location" :label-width="formLabelWidth">
					<el-select v-model="form.area_code" size="medium" placeholder="请选择区域" style="width: 210px">
						<el-option v-for="item in addressOptions" :key="item.value" :label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<el-input v-model="form.tp_location" placeholder="请输入详细地址" style="width: 240px;margin-left: 10px">
					</el-input>
				</el-form-item>
				<el-form-item label="电话" prop="tp_phone" :label-width="formLabelWidth">
					<el-input v-model="form.tp_phone" placeholder="请输入联系电话"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleDialogClose()">取 消</el-button>
				<el-button type="primary" @click="submit()" ref="enter">立即新增</el-button>
			</div>
		</el-dialog>

		<el-card class="member">
			<div class="title">
				核酸检测机构管理
			</div>
			<div class="subtitle">
			</div>
			<el-row :gutter="20">
				<el-col :span="7">
					<el-card class="picture">
					</el-card>
					<el-card class="important" style="border-radius: 12px;">
						<el-carousel :interval="4000" indicator-position="none">
							<el-carousel-item v-for="(item, index) in urls" :key="index">
								<img :src="item.url" style="width: 100%;height: 100%">
							</el-carousel-item>
						</el-carousel>
					</el-card>
				</el-col>
				<el-col class="body" :span="17">
					<el-card class="mainBody" style="border-radius: 12px;">
						核酸检测机构管理:<br />
						<el-table class="memberCard" :data="memberData" border
							style="width: 100%;margin-top: 10px;border-radius: 12px;"
							:default-sort="{prop: 'date', order: 'descending'}"
							:bodyHeader-cell-style="{background:'#d5cede',color:'#000'}"
							@selection-change="handleSelectionChange">
							<el-table-column type="selection" width="35">
							</el-table-column>
							<el-table-column prop="tp_id" label="机构号" sortable width="90">
							</el-table-column>
							<el-table-column prop="tp_name" label="机构名称" sortable>
							</el-table-column>
							<el-table-column prop="area_code" label="区" sortable>
								<template slot-scope="scope">
									{{codeToText(scope.row.area_code)}}
								</template>
							</el-table-column>
							<el-table-column prop="tp_location" label="具体地址" sortable>
							</el-table-column>
							<el-table-column prop="tp_phone" label="机构电话" sortable>
								<template slot-scope="scope">
									{{scope.row.tp_phone}}
									<el-button @click="doEdit(scope.row)" type="text" icon="el-icon-edit" size="small"
										style="margin-left: 5px;"> 修改
									</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-button class="searchButton" icon="el-icon-search" @click="doSearch">搜索</el-button>
						<el-button class="editButton" @click="doAdd">+ 新增</el-button>
						<el-button class="editButton" @click="doDelete">批量删除</el-button>
						<!-- 页码 -->
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
							:current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper" :total="memberData.length">
						</el-pagination>
					</el-card>
				</el-col>
			</el-row>
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
		getAllTestPoint,
		deleteTestPoints,
		addTestPoint,
		editTestPoint,
		searchTestPoint
	} from "../../api/data.js"
	export default {
		name: 'nCov_member',
		data() {
			return {
				addressOptions: [],
				multipleSelection: [],
				memberData: [{
					tp_id: '09019204',
					tp_name: 'czy',
					tp_location: '江苏省南京市江宁区',
					tp_phone: '11111666'
				}],
				currentPage: 1,
				pageSize: 5,
				urls: [{
						url: require('../../src/assets/加油.webp')
					},
					{
						url: require('../../src/assets/张嘴.webp')
					},
					{
						url: require('../../src/assets/通知.webp')
					},
					{
						url: require('../../src/assets/长高高.webp')
					},
					{
						url: require('../../src/assets/睡一会.webp')
					},
					{
						url: require('../../src/assets/我可以.webp')
					},
					{
						url: require('../../src/assets/坚持.webp')
					},
				],
				dialogFormVisible: false,
				formLabelWidth: '135px',
				form: {
					"city_code": this.$admin.state.cityCode,
					"area_code": "",
					"tp_location": "",
					"tp_name": "",
					"tp_phone": ""
				},
				rules: {
					tp_name: [{
						required: true,
						message: '请输入核酸采样点名称',
						trigger: 'blur'
					}],
					tp_location: [{
						required: true,
						message: '请选择城市区域,并输入详细地址',
						trigger: 'blur'
					}],
					tp_phone: [{
						required: true,
						message: '请输入联系电话',
						trigger: 'blur'
					}]
				},
				selectedArea:''
			}
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			handleDialogClose() {
				this.dialogFormVisible = false;
				this.form = Object.assign({}, undefined);
			},
			codeToText(id) {
				return CodeToText[id];
			},
			getAllTestPoints() {
				var param = {
					city_code: this.$admin.state.cityCode
				};
				getAllTestPoint(param).then(res => {
					this.memberData = res.data.data;
				});
			},
			doAdd() {
				this.dialogFormVisible = true;
			},
			submit() {
				addTestPoint(this.form).then((res) => {
					if (res.data.code == 200) {
						this.$message({
							message: "添加成功",
							type: "success",
						});
						this.getAllTestPoints();
						this.dialogFormVisible = false;
						this.form = Object.assign({}, undefined);
					} else {
						console.log('error:add test point!');
					}
				});
			},
			doSearch() {
				const h = this.$createElement;
				this.$msgbox({
					title: '按照区域搜索',
					message: h('p', null, [h('span', null, '区域： '),
						h('el-select', {
								props: {
									value: this.selectedArea,
									filterable: true,
								},
								ref: 'selectView',
								on: {
									change: e => {
										this.selectedArea = e
										this.$refs.selectView.value = e // select下拉框值改变，回显到页面上
									},
								},
							},
							[
								this.addressOptions.map(it => {
									return h('el-option', {
										props: {
											label: it.label,
											key: it.value,
											value: it.value,
										},
									});
								})
							]
						)
					]),
					showCancelButton: true,
					closeOnClickModal: false,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(action => {
					var param={
						"area_code":this.selectedArea
					};
					searchTestPoint(param).then(res=>{
						this.memberData = res.data.data;
						if (res.data.code == 200) {
							this.$message({
								message: "查找成功",
								type: "success",
							});
						} else {
							console.log('error:find one test pointphone!!');
						}
					});
				});
			},
			doEdit(row) {
				this.$prompt('请输入修改后的联系电话', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /^((0\d{2,3}(-)?\d{7,8})|(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8})$/,
					inputErrorMessage: '联系电话格式不正确'
				}).then(({
					value
				}) => {
					var param = {
						"tp_id": row.tp_id,
						"tp_phone": value
					};
					editTestPoint(param).then(res => {
						if (res.data.code == 200) {
							this.$message({
								message: "修改电话号码成功",
								type: "success",
							});
							this.getAllTestPoints();
						} else {
							console.log('error: edit one test pointphone!!');
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			doDelete() {
				if (this.multipleSelection == "") {
					this.$message({
						message: "请先选择需要删除的条目",
						type: "warning",
					});
				} else {
					// 删除前的提示
					this.$confirm("确认删除这些核酸检测机构吗?", "提示", {
						type: "warning",
					}).then(() => {
						this.multipleSelection.map((item) => {
							var param = {
								"tp_id": item.tp_id
							};
							deleteTestPoints(param).then((res) => {
								if (res.data.code == 200) {
									this.$message({
										message: "删除成功",
										type: "success",
									});
									this.getAllTestPoints();
								} else {
									console.log('error:delte one test point!');
								}
							});
						});
					});
				}
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
			this.getAllTestPoints();
		}
	}
</script>

<style scoped>
	.member {
		border-radius: 12px;
		background-image: linear-gradient(180deg, #d5cede 10%, #d5cede 40%, rgba(12, 134, 142, 0) 90%);
		background-repeat: no-repeat;
		background-size: contain;
	}

	.title {
		font-weight: 700;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 20px;
		color: #000;
		margin-left: 5px;
		margin-bottom: 6px;
	}

	.subtitle {
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
		color: #000;
		margin-left: 5px;
		margin-bottom: 20px;
	}

	.body {
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
	}

	.picture {
		min-height: 60px;
		margin-bottom: 10px;
		border-radius: 12px;
		background-image: url("../../src/assets/抗疫.webp");
		background-position-y: 97%;
		background-position-x: 30%;
		background-repeat: no-repeat;
		background-size: 100%;
	}

	::v-deep .memberCard {
		height: 245px;
		overflow: auto;
	}

	::v-deep .memberCard .-webkit-scrollbar-thumb {
		background: #ccc;
		border-radius: 1vh;
	}

	::v-deep .el-table::before {
		display: none !important;
	}

	.el-table--border {
		border-bottom: 1px solid #ebeef5 !important;
	}

	::v-deep .memberCard .-webkit-scrollbar-track {
		background: rgba(#ccc, 0.3);
	}

	::v-deep .memberCard .el-table__bodyHeader tr,
	::v-deep .memberCard .el-table__bodyHeader th {
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		padding: 0;
		height: 40px;
	}

	.editButton,.searchButton {
		margin-top: 15px;
		border-radius: 20px;
		border-color: #d5cede;
	}

	::v-deep .el-pagination {
		margin-top: 10px;
	}
</style>
