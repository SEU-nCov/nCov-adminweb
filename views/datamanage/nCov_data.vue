<template>
	<div>
		<el-card class="epidemicData">
			<div class="title">
				国内各地区疫情统计汇总
			</div>
			<div class="subtitle">
				数据来源于国家和省市卫健委
			</div>
			<el-image :src="require('../../src/assets/抗疫.jpg')"
				style="width:280px;margin-top: -90px;margin-bottom: -10px;float:right;"></el-image>
			<div class="header">
				<el-button type="primary" plain @click="getCovData">疫情数据更新</el-button>
			</div>
			<div class="cov_time">
				上次更新时间为：{{this.updateTime}}
			</div>
			<el-table v-loading="loading" :data="covData" style="width: 100%;margin-top: 10px;border-radius: 20px;"
				:header-cell-class-name="headerStyle" :cell-style="cellStyle">
				<el-table-column prop="province" label="地区">
				</el-table-column>
				<el-table-column prop="newConfirm" sortable label="新增确诊">
				</el-table-column>
				<el-table-column prop="nowConfirm" sortable label="现有确诊">
				</el-table-column>
				<el-table-column prop="confirm" sortable label="累计确诊">
				</el-table-column>
				<el-table-column prop="dead" sortable label="累计死亡">
				</el-table-column>
				<el-table-column prop="heal" sortable label="累计治愈">
				</el-table-column>
				<el-table-column type="expand" label="详情">
					<template slot-scope="props">
						<el-table :data="props.row.children" inline class="demo-table-expand">
							<el-table-column prop="name" label="地区">
							</el-table-column>
							<el-table-column prop="newConfirm" sortable label="新增确诊">
							</el-table-column>
							<el-table-column prop="nowConfirm" sortable label="现有确诊">
							</el-table-column>
							<el-table-column prop="confirm" sortable label="累计确诊">
							</el-table-column>
							<el-table-column prop="dead" sortable label="累计死亡">
							</el-table-column>
							<el-table-column prop="heal" sortable label="累计治愈">
							</el-table-column>
						</el-table>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	import {
		getChinaCovData
	} from "../../api/data.js";
	export default {
		name: 'nCov_data',
		data() {
			return {
				covData: [],
				loading: true,
				updateTime: ''
			}
		},
		methods: {
			headerStyle(rowindex) {
				if (rowindex.column.label == "地区") {
					return 'column1';
				}
				if (rowindex.column.label == "新增确诊") {
					return 'column2';
				}
				if (rowindex.column.label == "现有确诊") {
					return 'column3';
				}
				if (rowindex.column.label == "累计确诊") {
					return 'column4';
				}
				if (rowindex.column.label == "累计死亡") {
					return 'column5';
				}
				if (rowindex.column.label == "累计治愈") {
					return 'column6';
				}
				if (rowindex.column.label == "详情") {
					return 'column7';
				}
			},
			cellStyle(row, column, rowIndex, columnIndex) {
				var cellcolumn1 = {
					'border-color': '#178b50',
					'color': '#005500',
					'text-align': 'center',
					'font-weight': 650,
					'font-family': 'PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif'
				};
				var cellcolumn234567 = {
					'border-color': '#178b50',
					'text-align': 'center',
					'font-family': 'PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
					'color': '#222'
				};
				if (row.columnIndex == 0) {
					return cellcolumn1;
				}
				else{
					return cellcolumn234567;
				}
			},
			getCovData() {
				getChinaCovData().then(res => {
					this.loading = true;
					var china = res.data.data.areaTree[2];
					this.updateTime = china.lastUpdateTime;
					this.covData = china.children.map(item => {
						return {
							province: item.name,
							newConfirm: item.today.confirm, //新增确诊
							nowConfirm: item.total.confirm - item.total.dead - item.total.heal, //现有确诊
							confirm: item.total.confirm, //累计确诊
							dead: item.total.dead,
							heal: item.total.heal,
							children: item.children.map(iitem => {
								return {
									name: iitem.name,
									newConfirm: iitem.today.confirm, //新增确诊
									nowConfirm: iitem.total.confirm - iitem.total.dead - iitem
										.total.heal, //现有确诊
									confirm: iitem.total.confirm, //累计确诊
									dead: iitem.total.dead,
									heal: iitem.total.heal
								}
							})
						}
					});
					this.loading = false;
				});
			}
		},
		mounted() {
			this.getCovData();
		}
	}
</script>

<style scoped>
	.epidemicData {
		border-radius: 12px;
		border-color: #178b50;
		background-repeat: no-repeat;
		background-image: linear-gradient(180deg, #d4efe8 0%, #d4efe8 40%, rgba(12, 134, 142, 0) 90%);
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
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
		color: #000;
		margin-left: 5px;
		margin-bottom: 15px;
	}

	.header .el-button {
		margin-bottom: 10px;
		border-radius: 36px;
		border-color: #178b50;
		color: #005500;
	}

	.cov_time {
		width: 50%;
		margin-left: 12px;
		font-size: 11px;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		color: #999999;
	}

	.epidemicData>>>.column1,
	.epidemicData>>>.column7 {
		color: #000;
		background-color: #f5f5f5;
		text-align: center;
	}

	.epidemicData>>>.column2 {
		background-color: #fcf2e8;
		color: #ff5d00;
		text-align: center;
	}

	.epidemicData>>>.column3 {
		background-color: #fdeeee;
		color: #f55253;
		text-align: center;
	}

	.epidemicData>>>.column4 {
		background-color: #faf2f6;
		color: #ca3f81;
		text-align: center;
	}

	.epidemicData>>>.column5 {
		background-color: #f3f6f8;
		color: #4e5a65;
		text-align: center;
	}

	.epidemicData>>>.column6 {
		background-color: #f1f8f4;
		color: #178b50;
		text-align: center;
	}
	
	/deep/ .descending .sort-caret.descending{
	  border-top-color:#4d4d4d;
	}
	/deep/ .ascending  .sort-caret.ascending{
	  border-bottom-color:#4d4d4d;
	}
	
	::v-deep .epidemicData .demo-table-expand td,
	::v-deep .epidemicData .demo-table-expand th {
		text-align: center;
		border-bottom: 0px;
	}

	::v-deep .epidemicData .demo-table-expand::before {
		height: 0px;
	}

	::v-deep .epidemicData .demo-table-expand .el-table__header-wrapper {
		margin-top: -15px;
		margin-bottom: -10px;
	}

	::v-deep .epidemicData .el-table__header-wrapper .el-table_1_column_2 {
		.sort-caret.descending {
			border-top-color: #ffaa7f;
		}

		.sort-caret.ascending {
			border-bottom-color: #ffaa7f;
		}
	}

	::v-deep .epidemicData .el-table_1_column_2.ascending.is-leaf.is-sortable.el-table__cell .sort-caret.ascending {
		border-bottom-color: #ff5d00;
	}

	::v-deep .epidemicData .el-table_1_column_2.descending.is-leaf.is-sortable.el-table__cell .sort-caret.descending {
		border-top-color: #ff5d00;
	}

	::v-deep .epidemicData .el-table__header-wrapper .el-table_1_column_3 {
		.sort-caret.descending {
			border-top-color: #f9c5c1;
		}

		.sort-caret.ascending {
			border-bottom-color: #f9c5c1;
		}
	}

	::v-deep .epidemicData .el-table_1_column_3.ascending.is-leaf.is-sortable.el-table__cell .sort-caret.ascending {
		border-bottom-color: #f55253;
	}

	::v-deep .epidemicData .el-table_1_column_3.descending.is-leaf.is-sortable.el-table__cell .sort-caret.descending {
		border-top-color: #f55253;
	}

	::v-deep .epidemicData .el-table__header-wrapper .el-table_1_column_4 {
		.sort-caret.descending {
			border-top-color: #fad1e6;
		}

		.sort-caret.ascending {
			border-bottom-color: #fad1e6;
		}
	}

	::v-deep .epidemicData .el-table_1_column_4.ascending.is-leaf.is-sortable.el-table__cell .sort-caret.ascending {
		border-bottom-color: #ca3f81;
	}

	::v-deep .epidemicData .el-table_1_column_4.descending.is-leaf.is-sortable.el-table__cell .sort-caret.descending {
		border-top-color: #ca3f81;
	}

	::v-deep .epidemicData .el-table__header-wrapper .el-table_1_column_5 {
		background-color: #f3f6f8;
		color: #4e5a65;
		text-align: center;
	}

	::v-deep .epidemicData .el-table_1_column_5.ascending.is-leaf.is-sortable.el-table__cell .sort-caret.ascending {
		border-bottom-color: #4e5a65;
	}

	::v-deep .epidemicData .el-table_1_column_5.descending.is-leaf.is-sortable.el-table__cell .sort-caret.descending {
		border-top-color: #4e5a65;
	}

	::v-deep .epidemicData .el-table__header-wrapper .el-table_1_column_6 {
		.sort-caret.descending {
			border-top-color: #a1c7b2;
		}

		.sort-caret.ascending {
			border-bottom-color: #a1c7b2;
		}
	}

	::v-deep .epidemicData .el-table_1_column_6.ascending.is-leaf.is-sortable.el-table__cell .sort-caret.ascending {
		border-bottom-color: #178b50;
	}

	::v-deep .epidemicData .el-table_1_column_6.descending.is-leaf.is-sortable.el-table__cell .sort-caret.descending {
		border-top-color: #178b50;
	}

</style>
