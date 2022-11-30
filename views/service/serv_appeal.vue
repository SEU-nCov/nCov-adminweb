<template>
	<div>
		<el-dialog title="处理健康码申诉" :visible.sync="dialogVisible" width="30%">
			<span>将其健康码更改为：
				<el-radio-group v-model="radio" style="margin-top: 20px;">
					<el-radio class="radio1" :label="0" style="color:green;">绿码</el-radio>
					<el-radio class="radio2" :label="1" style="color:coral;">黄码</el-radio>
					<el-radio class="radio3" :label="2" style="color:red;">红码</el-radio>
				</el-radio-group>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleSubmit">确 定</el-button>
			</span>
		</el-dialog>
		<el-card class="appeal">
			<div class="title">
				健康码申诉
			</div>
			<div class="subtitle">
				健康码误判有我帮
			</div>
			<div class="header">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-card class="card1" style="border-radius: 12px;">
							<el-button icon="el-icon-bell"></el-button>
							<p>待处理<br />&nbsp;&nbsp;&nbsp;{{this.startAppeal}}</p>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card class="card3" style="border-radius: 12px;">
							<el-button icon="el-icon-turn-off"></el-button>
							<p>已处理<br />&nbsp;&nbsp;&nbsp;{{this.endAppeal}}</p>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card class="card4" style="border-radius: 12px;">
							<el-button icon="el-icon-set-up"></el-button>
							<p>总申诉<br />&nbsp;&nbsp;&nbsp;{{this.totalAppeal}}</p>
						</el-card>
					</el-col>
				</el-row>
			</div>
			<div class="body">
				<el-card style="margin-top: 15px;border-radius: 12px;">
					申诉记录:<br />
					<el-table class="record-card"
						:data="appealData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border
						style="width: 100%;margin-top: 10px;border-radius: 12px;"
						:default-sort="{prop: 'date', order: 'descending'}"
						:header-cell-style="{background:'#72a9cc',color:'white'}">
						<el-table-column prop="user_name" label="申诉者姓名" sortable>
						</el-table-column>
						<el-table-column prop="user_identify" label="身份证号" sortable>
						</el-table-column>
						<el-table-column prop="user_phone" label="手机号码" sortable>
						</el-table-column>
						<el-table-column prop="user_location" label="居住地" sortable>
						</el-table-column>
						<el-table-column prop="user_signcolor" label="申诉时健康码颜色" sortable>
							<template slot-scope="props">
								<el-tag
									:type="props.row.user_signcolor == '0' ? 'success' : props.row.user_signcolor == '1' ? 'warning' : 'danger'"
									disable-transitions>
									{{props.row.user_signcolor == '0' ?'绿码':props.row.user_signcolor == '1' ?'黄码':'红码'}}
								</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="appeal_reason" label="申诉理由">
						</el-table-column>
						<el-table-column prop="appeal_time" label="申诉日期" sortable>
						</el-table-column>
						<el-table-column prop="appeal_status" label="状态" sortable>
							<template slot-scope="scope">
								<el-button :type="scope.row.appeal_status == '0' ? 'primary' : 'warning'"
									@click="handle(scope.row)" :disabled="scope.row.appeal_status == '1'" size="small">
									{{scope.row.appeal_status == '0' ? '待处理' : '已处理'}}
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 页码 -->
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper" :total="appealData.length">
					</el-pagination>
				</el-card>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		getCityAppeal,
		handleAppeal,
		getAppealStatusvalue,
		setRedCode,
		setGreenCode,
		setYellowCode
	} from "../../api/data.js"
	export default {
		name: 'sev_appeal',
		data() {
			return {
				appealData: [],
				currentPage: 1,
				pageSize: 5,
				endAppeal: 0,
				startAppeal: 0,
				totalAppeal: 0,
				dialogVisible: false,
				radio: '0',
				userId: '',
				appealId: ''
			}
		},
		methods: {
			getAppeal() {
				var param = {
					"city_code": this.$admin.state.cityCode
				};
				getCityAppeal(param).then(res => {
					if (res.data.code == 200) {
						this.appealData = res.data.data.map(item => {
							this.totalAppeal++;
							if (item.appeal_status == '0')
								this.startAppeal++;
							else this.endAppeal++;
							return {
								"appeal_id": item.appeal_id,
								"user_id": item.user_id,
								"user_name": item.user_name,
								"user_identify": item.user_identify,
								"user_phone": item.user_phone,
								"user_location": item.user_location,
								"user_signcolor": item.user_signcolor,
								"appeal_reason": item.appeal_reason,
								"appeal_time": item.appeal_time != null ? item.appeal_time.slice(0, 10) :
									null, //"2022-11-27T16:22:39.000+08:00"
								"appeal_status": item.appeal_status
							}
						});
					} else {
						console.log('error:getCityAppeal!');
					}
				});
			},
			handle(row) {
				this.radio = row.user_signcolor;
				this.userId = row.user_id;
				this.appealId = row.appeal_id;
				this.dialogVisible = true;
			},
			handleSubmit() {
				var param = {
					"user_id": this.userId
				};
				if (this.radio == '0') {
					setGreenCode(param);
				} else if (this.radio == '1') {
					setYellowCode(param);
				} else if (this.radio == '2') {
					setRedCode(param);
				}
				var param1 = {
					appeal_id: this.appealId
				};
				handleAppeal(param1).then(res => {
					if (res.data.code == 200) {
						this.$message({
							type: 'success',
							message: '处理完毕'
						});
						this.getAppeal();
					} else {
						console.log('error:handleAppeal!');
					}
				});
				this.dialogVisible = false;
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
			this.getAppeal();
		}
	}
</script>

<style scoped>
	.appeal {
		border-radius: 12px;
		background-image: linear-gradient(180deg, #5b9dc6 10%, #5b9dc6 40%, rgba(12, 134, 142, 0) 90%);
		background-repeat: no-repeat;
		background-size: contain;
	}

	.title {
		font-weight: 700;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 20px;
		color: #ffffff;
		margin-left: 5px;
		margin-bottom: 6px;
	}

	.subtitle {
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
		color: #ffffff;
		margin-left: 5px;
		margin-bottom: 20px;
	}

	::v-deep .radio1 .el-radio__input.is-checked+.el-radio__label {
		color: green !important;
	}

	::v-deep .radio1 .el-radio__input.is-checked .el-radio__inner {
		background: green !important;
		border-color: green !important;
	}

	::v-deep .radio2 .el-radio__input.is-checked+.el-radio__label {
		color: coral !important;
	}

	::v-deep .radio2 .el-radio__input.is-checked .el-radio__inner {
		background: coral !important;
		border-color: coral !important;
	}

	::v-deep .radio3 .el-radio__input.is-checked+.el-radio__label {
		color: red !important;
	}

	::v-deep .radio3 .el-radio__input.is-checked .el-radio__inner {
		background: red !important;
		border-color: red !important;
	}

	.header .el-card p {
		float: right;
		margin-top: 5px;
		margin-right: 60px;
	}

	.header .el-card .el-button {
		font-size: 20px;
	}

	.header .card1 .el-button {
		background-color: #ddc4ff;
	}

	.header .card2 .el-button {
		background-color: #ffbe7d;
	}

	.header .card3 .el-button {
		background-color: #77c791;
	}

	.header .card4 .el-button {
		background-color: #dddddd;
	}

	.header,
	.body {
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
	}

	::v-deep .record-card .el-table__header tr,
	::v-deep .record-card .el-table__header th {
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		padding: 0;
		height: 40px;
	}

	::v-deep .el-pagination {
		margin-top: 10px;
	}
</style>
