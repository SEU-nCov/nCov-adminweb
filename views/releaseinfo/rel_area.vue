<template>
	<div>
		<el-dialog title="风险区变更" :visible.sync="dialogFormVisible" :before-close="handleDialogClose">
			<el-form :model="form" :rules="rules" ref="areaForm">
				<el-form-item label="等级" prop="level">
					<el-cascader v-model="form.risk_level" :options="levelOptions" placeholder="请选择等级"
						style="width: 120px;margin-left: 16px;">
					</el-cascader>
				</el-form-item>
				<el-form-item label="具体地址" prop="address" >
					<el-input v-model="form.address" style="width: 400px;" :disabled="true" >
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleDialogClose()">取 消</el-button>
				<el-button type="primary" @click="submit()" ref="enter">确认修改</el-button>
			</div>
		</el-dialog>

		<el-card class="area_card" style="border-radius: 12px;">
			<div class="cov_title">
				{{this.$admin.state.cityName}}高中低风险地区管理
			</div>
			<div class="cov_subtitle">
				查询{{this.$admin.state.cityName}}高中低风险区域，提前做好出行准备
			</div>
			<el-card class="header" style="border-radius: 12x;">
				<el-button class="addButton" @click="addArea">新增</el-button>
				等级:
				<el-cascader v-model="selectedLevel" :options="levelOptions" placeholder="请选择等级"
					style="width: 120px;margin-right: 10px;">
				</el-cascader>
				具体地址:
				<el-cascader v-model="selectedAddress" :options="addressOptions" placeholder="请选择区域"
					style="width: 200px;margin-left: 10px ">
				</el-cascader>
				<el-input v-model="address" placeholder="请输入详细地址" style="width: 340px;margin-left: 10px;">
				</el-input>
			</el-card>
			<el-card style="border-radius: 12x;margin-top:10px ;">
				<el-table class="content" :data="areaData" style="width: 100%">
					<el-table-column fixed="left" label="操作" width="100">
						<template slot-scope="scope">
							<el-button @click="doEdit(scope.row)" size="mini" icon="el-icon-edit" type="text"
								style="color: #00007f;">
							</el-button>
							<el-button @click="doDelete(scope.row)" size="mini" icon="el-icon-delete" type="text"
								style="color: #00007f;">
							</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="level" label="等级" width="120">
					</el-table-column>
					<el-table-column prop="area" label="区域" width="120">
					</el-table-column>
					<el-table-column prop="address" label="具体位置">
					</el-table-column>
				</el-table>

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
		getArea,
		deleteArea,
		editArea,
		addArea
	} from "../../api/data.js"
	export default {
		name: 'rel_area',
		data() {
			return {
				addressOptions: regionData,
				selectedLevel: '',
				selectedAddress: '',
				address: '',
				dialogFormVisible: false,
				levelOptions: [{
					value: '0',
					label: '低风险区'
				}, {
					value: '1',
					label: '中风险区'
				},{
					value: '2',
					label: '高风险区'
				},],
				areaData: [{
					id: 0,
					level: '高风险区',
					area: '北京',
					address: '丰台区太平桥街道精图雅苑'
				}, {
					id: 1,
					level: '高风险区',
					area: '北京',
					address: '大兴区亦庄（地区）镇三羊里小区11-31号楼'
				}, {
					id: 2,
					level: '高风险区',
					area: '北京',
					address: '大兴区亦庄（地区）镇三羊里小区11-31号楼'
				}, {
					id: 3,
					level: '高风险区',
					area: '北京',
					address: '大兴区亦庄（地区）镇三羊里小区11-31号楼'
				}],
				form: {
					risk_id: '',
					risk_level: '',
					address: ''
				},
				rules: {
					level: [{
						required: true,
						message: '请新增风险区',
						trigger: 'blur'
					}]
				},
				visible: false,
				deleteFlag: false
			}
		},
		methods: {
			getRiskArea() {
				getArea().then((res) => {
					this.areaData = res.data.data.map(item => {
						return {
							id: item.risk_id,
							level: item.risk_level == 2 ? '高风险区' : item.risk_level == 1 ? '中风险区' : '低风险区',
							address: item.risk_address,
							area: CodeToText[item.area_code]
						}
					});
				});
			},
			handleDialogClose() {
				this.dialogFormVisible = false;
				this.$refs.areaForm.resetFields();
			},
			addArea() {
				if (this.address == '' || this.selectedAddress == '') {
					this.$message({
						message: "请填写正确的区域地址",
						type: "error",
					});
				} else if (this.selectedLevel == '') {
					this.$message({
						message: "请选择区域风险级别",
						type: "error",
					});
				} else {
					var param = {
						"area_code": this.selectedAddress[0],
						"risk_address": this.address,
						"risk_level": this.selectedLevel[0]
					};
					console.log(param)
					addArea(param).then((res) => {
						if (res.data.code == 200) {
							this.$message({
								message: "添加成功",
								type: "success",
							});
							this.getRiskArea();
							this.selectedAddress = [];
							this.address = "";
							this.selectedLevel = [];
						} else {
							console.log('error: add one cov_Area!!');
						}
					});
				}
			},
			doEdit(row) {
				this.form.risk_id = row.id;
				this.form.risk_level = row.level=='高风险区'?'2': row.level=='中风险区'?'1':'0';
				this.form.address = this.$admin.state.cityName+(row.area==undefined?"":row.area)+row.address;
				this.dialogFormVisible = true;
			},
			doDelete(row) {
				this.$confirm('此确定删除该风险区吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var param = {
						risk_id:row.id
					};
					deleteArea(param).then((res) => {
						if (res.data.code == 200) {
							this.$message({
								message: "删除成功",
								type: "success",
							});
							this.getRiskArea();
						} else {
							console.log('error: delete one cov_Area!!');
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			submit() {
				var param={
					"risk_id": this.form.risk_id,
					"risk_level": this.form.risk_level[0]
				};
				console.log(param)
				editArea(param).then((res) => {
					if (res.data.code == 200) {
						this.dialogFormVisible = false;
						this.$message({
							message: "修改成功",
							type: "success",
						});
						this.getRiskArea();
						this.$refs.areaForm.resetFields();
					} else {
						console.log('error: edit one cov_Area!!');
					}
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
			this.getRiskArea();
		}
	}
</script>

<style scoped>
	.area_card {
		background-image: url('../../src/assets/战疫.webp');
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.cov_title {
		font-weight: 700;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 20px;
		color: #ffffff;
		margin-left: 5px;
		margin-top: 5px;
		margin-bottom: 6px;
	}

	.cov_subtitle {
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
		color: #ffffff;
		margin-left: 5px;
		margin-bottom: 14px;
	}

	.header {
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
	}

	.el-cascader {
		margin-left: 10px;
	}

	.el-icon-location {
		color: #0c868e;
		font-size: 22px;
		border-bottom: 1px;
	}

	.area_card .addButton {
		color: #00007f;
		border-color: #00007f;
		margin-top: 0px;
		float: right;
	}

	.content {}
</style>
