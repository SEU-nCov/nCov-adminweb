<template>
	<div>
		<el-dialog title="出行防疫政策" :visible.sync="dialogFormVisible" :before-close="handleDialogClose">
			<el-form :model="form" :rules="rules" ref="policyForm">
				<el-form-item label="出发地" prop="from" v-model="this.selectedFromCity" :label-width="formLabelWidth"
					:disabled="true">
					<el-input v-model="form.from"></el-input>
				</el-form-item>
				<el-form-item label="目的地" prop="to" v-model="this.selectedToCity" :label-width="formLabelWidth"
					:disabled="true">
					<el-input v-model="form.to"></el-input>
				</el-form-item>
				<el-form-item prop="policy" :label-width="formLabelWidth">
					<template slot="label">
						<div>{{this.policyLabel}}</div>
					</template>
					<el-input v-model="form.policy" type="textarea" placeholder="请输入出行防疫政策"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleDialogClose">取 消</el-button>
				<el-button type="primary" @click="submit" ref="enter">确认修改</el-button>
			</div>
		</el-dialog>

		<el-card class="policy_card" style="border-radius: 12px;">
			<el-image class="header_picture" :src="url">
			</el-image>
			<div class="cov_title">
				出行防疫政策
			</div>
			<div class="cov_subtitle">
				科学防疫·伴你安全出行
			</div>
			<el-card class="header" style="border-radius: 12x;">
				出发地
				<el-cascader v-model="selectedAddressFrom" :options="addressOptions" @change="addressFromChange"
					placeholder="请选择地址" style="width: 40%;">
				</el-cascader>
				<i class="el-icon-sort" @click="addressExchange"></i>
				目的地
				<el-cascader v-model="selectedAddressTo" :options="addressOptions" @change="addressToChange"
					placeholder="请选择地址" style="width: 40%;">
				</el-cascader>
			</el-card>
			<el-card class="From" style="border-radius: 12x;">
				<i class="el-icon-location"></i>
				离开{{this.selectedFromCity}}
				<el-button size="mini" icon="el-icon-edit" circle @click="updateFromPolicy" :disabled="editFromFlag"></el-button>
				<div v-html="this.fromPolicy" class="content">
					{{this.fromPolicy}}
				</div>
			</el-card>
			<el-card class="To" style="border-radius: 12x;">
				<i class="el-icon-location"></i>
				进入{{this.selectedToCity}}
				<el-button size="mini" icon="el-icon-edit" circle @click="updateToPolicy" :disabled="editToFlag"></el-button>
				<div v-html="this.toPolicy" class="content">
					{{this.toPolicy}}
				</div>
			</el-card>
		</el-card>
	</div>
</template>
<script>
	import {
		provinceAndCityData,
		CodeToText,
		TextToCode
	} from "../../node_modules/element-china-area-data"
	import {
		editPolicy,
		getCityCovData,
		getPolicy,
		getSingleCityPolicy
	} from "../../api/data.js"
	export default {
		name: 'nCov_policy',
		data() {
			return {
				addressOptions: provinceAndCityData,
				selectedFromCity: '南京市',
				selectedFromCode: 320000,
				selectedToCity: '南京市',
				selectedToCode: 320000,
				selectedAddressFrom: ['320000', '320100'],
				selectedAddressTo: undefined,
				editParam: {
					from_code: 320000,
					come_policy: '',
					leave_policy: ''
				},
				fromPolicy: '在京党政机关、国有企事业单位人员带头执行，除重要公务活动需要外原则上不出京，确需出京的严格审批管理。提倡市民群众减少出京活动，确需出京的，要防范旅途疫情风险，全程规范佩戴口罩，做好个人防护，不前往有疫情的县（市、区、旗）。如途中出现涉疫风险，就地配合落实防疫措施，暂缓进返京。严控本地中高风险区及其他涉疫风险人员出京。',
				toPolicy: '1.加强机场口岸防疫管理，严格落实入境人员和高风险岗位工作人员全流程闭环管理要求。入境人员严格执行“7天集中隔离+3天居家健康监测”措施。<br><br>2.7天内出现本土疫情的县（市、区、旗）人员严格限制进返京，已抵京的分类落实隔离观察、健康监测、核酸检测等措施，居家期间不外出。其他人员持48小时内核酸阴性证明和“北京健康宝”绿码正常进返京，在抵京后以及出现涉疫风险、疑似症状时，都要第一时间通过电话、微信等方式主动向社区（村）、酒店或单位报告，本人及同住人员配合做好排查管理、健康监测。<br><br>3.进返京人员抵京后居家健康监测3天，开展3天2检（抵京24小时内完成一次核酸检测，间隔24小时后、抵京72小时内完成第二次核酸检测），7天内不聚餐、不聚会、不前往人群密集场所。涉疫风险人员配合落实居家（店）健康监测等防疫措施。居家隔离、居家健康监测及其同住人员，要严格居家、不外出。<br><br>4.严格落实快递、外卖、冷链、医疗机构等重点行业、重点场所、重点区域人群常态化核酸筛查，确保“应检尽检”。进入党政机关、企事业单位、公共场所及社区（村），乘坐公共交通工具，严格扫码、测温、查验72小时内核酸检测阴性证明。各小区（村）加强卡口管理，严格落实查验要求。<br><br>5.压实疫情防控“四方责任”。各行业主管部门坚持“管行业必须管防疫、管业务必须管防疫”，加强日常检查指导，发现问题及时督促整改。在京单位严格落实防疫主体责任，动态完善人员台账，强化内部管理，抓实抓细各项防疫措施。各区对属地疫情防控工作负总责，统筹各方资源力量，确保各项防疫措施落实落位。个人要当好自身健康管理第一责任人，主动报告个人涉疫情况，自觉履行核酸检测、扫码查验等防疫义务。对于违反首都防疫政策，造成不良后果的，依法追究责任并通报曝光。',
				comePolicy: '',
				leavePolicy: '',
				url: 'https://t14.baidu.com/it/u=452294415,938983906&amp;fm=179&amp;app=35&amp;size=w931&amp;n=0&amp;f=PNG?s=7BA25C6CCDAACF7E02165613020080DE&amp;sec=1668272400&amp;t=5b8bd2031e51f4e2006b459def6172b0',
				// 表单
				dialogFormVisible: false,
				formLabelWidth: '170px',
				policyLabel: '',
				editFromFlag:false,
				editToFlag:false,
				form: {
					to: '',
					from: '',
					fromFlag: true,
					policy: ''
				},
				rules: {
					policy: [{
						required: true,
						message: '请输入出行防疫政策',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			getToAndFromPolicy() {
				var toAndFrom={
					from_city: this.selectedFromCity,
					to_city: this.selectedToCity
				}
				getPolicy(toAndFrom).then((res) => {
					if (res.data.code == 200) {
						this.fromPolicy = res.data.data.from_policy;
						this.toPolicy = res.data.data.to_policy;
					} else { // 未收录
						console.log(res.data.msg);
					}
				});
			},
			addressFromChange() {
				this.selectedFromCity = CodeToText[this.selectedAddressFrom[1]];
				this.selectedFromCode = this.selectedAddressFrom[1];
				if (this.selectedFromCity == "市辖区") {
					this.selectedFromCode = this.selectedAddressFrom[0];
					this.selectedFromCity = CodeToText[this.selectedAddressFrom[0]];
				}
				if (this.selectedAddressTo == undefined){
					this.selectedToCity = this.selectedFromCity;
					this.selectedToCode = this.selectedFromCode;
				}
				this.editFromFlag=this.selectedFromCode!=this.$admin.state.cityCode;
				this.editToFlag=this.selectedToCode!=this.$admin.state.cityCode;
				this.getToAndFromPolicy();
			},
			addressToChange() {
				this.selectedToCity = CodeToText[this.selectedAddressTo[1]];
				this.selectedToCode = this.selectedAddressTo[1];
				if (this.selectedToCity == "市辖区") {
					this.selectedToCode = this.selectedAddressTo[0];
					this.selectedToCity = CodeToText[this.selectedAddressTo[0]];
				}
				if (this.selectedAddressFrom == undefined){
					this.selectedFromCity = this.selectedToCity;
					this.selectedFromCode = this.selectedToCode;
				}
				console.log(this.selectedToCity);
				this.editToFlag=this.selectedToCode!=this.$admin.state.cityCode;
				this.editFromFlag=this.selectedFromCode!=this.$admin.state.cityCode;
				this.getToAndFromPolicy();
			},
			addressExchange() {
				var tmp1 = this.selectedFromCity;
				var tmp2 = this.selectedFromCode;
				var tmp3 = this.selectedAddressFrom;
				this.selectedFromCity = this.selectedToCity;
				this.selectedFromCode = this.selectedToCode;
				this.selectedAddressFrom = this.selectedAddressTo;
				this.selectedToCity = tmp1;
				this.selectedToCode = tmp2;
				this.selectedAddressTo = tmp3;
				this.editFromFlag=this.selectedFromCode!=this.$admin.state.cityCode;
				this.editToFlag=this.selectedToCode!=this.$admin.state.cityCode;
				this.getToAndFromPolicy();
			},
			formWrite() {
				this.form.to = this.selectedToCity;
				this.form.from = this.selectedFromCity;
			},
			updateFromPolicy() {
				this.formWrite();
				this.policyLabel = "离开" + this.selectedFromCity + "出行防疫政策";
				this.form.policy = this.fromPolicy;
				this.form.fromFlag = true;
				this.dialogFormVisible = true;
			},
			updateToPolicy() {
				this.formWrite();
				this.policyLabel = "进入" + this.selectedToCity + "出行防疫政策";
				this.form.policy = this.toPolicy;
				this.form.fromFlag = false;
				this.dialogFormVisible = true;
			},
			handleDialogClose() {
				this.dialogFormVisible = false;
				this.$refs.policyForm.resetFields();
			},
			submit() {
				this.$refs.policyForm.validate((valid) => {
					if (valid) {
						var cityCode = this.form.fromFlag ? this.selectedFromCode : this.selectedToCode;
						console.log(cityCode);
						var param = {
							from_code: cityCode
						};
						getSingleCityPolicy(param).then((res) => {
							if (res.data.code == 200) {
								this.comePolicy = res.data.data.come_policy;
								this.leavePolicy = res.data.data.leave_policy;
								var param1 = {
									from_code: cityCode,
									come_policy: this.form.fromFlag ? this.comePolicy : this.form.policy,
									leave_policy: this.form.fromFlag ? this.form.policy : this.leavePolicy
								};
								console.log(param1);
								editPolicy(param1).then((res) => {
									if (res.data.code == 200) {
										if (this.form.fromFlag)
											this.fromPolicy = this.form.policy;
										else
											this.toPolicy = this.form.policy;
										this.$refs.policyForm.resetFields();
										this.dialogFormVisible = false;
										this.$message({
											message: "修改成功",
											type: "success",
										});
									} else {
										console.log('error: edit one cov_Policy!!');
									}
								});
							} else {
								console.log(res.data.code);
							}
						});
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		mounted() {
			this.getToAndFromPolicy();
		}
	}
</script>

<style scoped>
	::v-deep .el-form-item__label {
		line-height: 20px;
	}

	.policy_card {
		background-image: linear-gradient(180deg, #0c868e 0%, #0c868e 30%, rgba(12, 134, 142, 0) 60%);
		background-repeat: no-repeat;
		background-size: contain;
	}

	.header_picture {
		margin-top: -15px;
		float: right;
		height: 85px;
		width: 414px;
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

	.header {
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
	}

	.el-icon-sort {
		transform: rotate(90deg);
		margin-left: 20px;
		margin-right: 15px;
	}

	.el-cascader {
		margin-left: 10px;
	}

	.To,
	.From {
		margin-top: 10px;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
	}

	.el-icon-location {
		color: #0c868e;
		font-size: 22px;
		border-bottom: 1px;
	}

	.policy_card .el-button {
		color: #0c868e;
		border-color: #0c868e;
		margin-top: -5px;
		float: right;
	}

	.content {
		font-size: 12px;
		color: #5e616d;
		margin-top: 10px;
	}
</style>
