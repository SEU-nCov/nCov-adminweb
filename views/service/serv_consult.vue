<template>
	<div>
		<el-card class="consult">
			<div class="title">
				健康咨询
			</div>
			<div class="subtitle">
				尽心为大家服务
			</div>
			<div class="header">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-card class="card1" style="border-radius: 12px;">
							<el-button icon="el-icon-bell"></el-button>
							<p>待处理<br />&nbsp;&nbsp;&nbsp;{{this.startConsult}}</p>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card class="card3" style="border-radius: 12px;">
							<el-button icon="el-icon-turn-off"></el-button>
							<p>已处理<br />&nbsp;&nbsp;&nbsp;{{this.endConsult}}</p>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card class="card4" style="border-radius: 12px;">
							<el-button icon="el-icon-set-up"></el-button>
							<p>总申诉<br />&nbsp;&nbsp;&nbsp;{{this.totalConsult}}</p>
						</el-card>
					</el-col>
				</el-row>
			</div>
			<div class="body">
				<el-card style="margin-top: 15px;border-radius: 12px;">
					咨询事宜:<br />
					<el-table class="record-card"
						:data="consultData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border
						style="width: 100%;margin-top: 10px;border-radius: 12px;"
						:default-sort="{prop: 'date', order: 'descending'}"
						:header-cell-style="{background:'#cbe4eb',color:'#000'}">
						<el-table-column prop="user_name" label="咨询者姓名" sortable>
						</el-table-column>
						<el-table-column prop="user_identify" label="身份证号" sortable>
						</el-table-column>
						<el-table-column prop="user_phone" label="手机号码" sortable>
						</el-table-column>
						<el-table-column prop="user_location" label="居住地" sortable>
						</el-table-column>
						<el-table-column prop="consult_content" label="咨询内容">
						</el-table-column>
						<el-table-column prop="consult_time" label="咨询日期" sortable>
						</el-table-column>
						<el-table-column prop="consult_status" label="处理状态" sortable>
							<template slot-scope="scope">
								<el-tag :type="scope.row.consult_status == '0' ? 'primary' : 'warning'"
									disable-transitions @click="handle(scope.row)">
									{{scope.row.consult_status == '0' ? '待处理' : '已处理'}}
								</el-tag>
							</template>
						</el-table-column>
					</el-table>
					<!-- 页码 -->
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper" :total="consultData.length">
					</el-pagination>
				</el-card>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		getCityConsult,
		handleConsult,
		getConsultStatusvalue
	} from "../../api/data.js"
	export default {
		name: 'sev_consult',
		data() {
			return {
				consultData: [],
				currentPage: 1,
				pageSize: 5,
				endConsult: 0,
				startConsult: 0,
				totalConsult: 0
			}
		},
		methods: {
			handle(row) {
				this.$prompt('请输入咨询回答内容', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
					inputErrorMessage: '回答内容不能为空'
				}).then(({
					value
				}) => {
					var param = {
						consult_id: row.consult_id,
						consult_answer: value
					};
					handleConsult(param).then(res => {
						if (res.data.code == 200) {
							this.$message({
								type: 'success',
								message: '处理完毕'
							});
							this.getConsult();
						} else {
							console.log('error:handleConsult!');
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消处理'
					});
				});
			},
			getConsult() {
				var param = {
					"city_code": this.$admin.state.cityCode
				};
				getCityConsult(param).then(res => {
					if (res.data.code == 200) {
						console.log(res.data.data);
						this.totalConsult = 0;
						this.startConsult = 0;
						this.endConsult = 0;
						this.consultData = res.data.data.map(item => {
							this.totalConsult++;
							if (item.consult_status == '0')
								this.startConsult++;
							else this.endConsult++;
							return {
								"consult_id": item.consult_id,
								"user_id": item.user_id,
								"user_name": item.user_name,
								"user_identify": item.user_identify,
								"user_phone": item.user_phone,
								"user_location": item.user_location,
								"consult_content": item.consult_content,
								"consult_time": item.consult_time != null ? item.consult_time.slice(0,
									10) : null, //"2022-11-27T16:22:39.000+08:00"
								"consult_status": item.consult_status
							}
						});
					} else {
						console.log('error:getCityConsult!');
					}
				});
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
			this.getConsult();
		}
	}
</script>

<style scoped>
	.consult {
		border-radius: 12px;
		background-image: linear-gradient(180deg, #cbe4eb 10%, #cbe4eb 40%, rgba(12, 134, 142, 0) 90%);
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

	.header .el-card p {
		float: right;
		margin-top: 5px;
		margin-right: 60px;
	}

	.header .el-card .el-button {
		font-size: 20px;
	}

	.header .card1 .el-button {
		background-color: #fad8d4;
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
