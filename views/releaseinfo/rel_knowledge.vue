<template>
	<div>
		<el-drawer title="口罩应该怎么选?" :visible.sync="drawer1" :direction="direction">
			<el-card style="width: 80%;margin-left: 40px;">
				<span>一次性使用医用口罩:<br /><br />公众在非人员密集的公共场所可使用一次性使用医用口罩</span>
				<el-image title="一次性使用医用口罩" :src="require('../../src/assets/一次性使用医用口罩.webp')">
				</el-image>
				<span><br />医用外科口罩:<br /><br />推荐疑似病例、公共交通司医用外科口罩乘人员、出租车司机、环卫工人、公共场所服务人员等在岗期间佩戴</span>
				<el-image title="医用外科口罩" :src="require('../../src/assets/医用外科口罩.webp')">
				</el-image>
				<span><br />KN95/N95及以上 颗粒物防护口罩:<br /><br />推荐现场调查、采样、和检测人员使用，公共在人员高度密集场所或密闭公共场所也可佩戴</span>
				<el-image title="KN95/N95及以上 颗粒物防护口罩" :src="require('../../src/assets/N95.webp')">
				</el-image>
				<span><br />医用防护口罩:<br /><br />推荐发热门诊、隔离病房医护人员及确诊患者转移时佩戴</span>
				<el-image title="医用防护口罩" :src="require('../../src/assets/医用防护口罩.webp')">
				</el-image>
			</el-card>
		</el-drawer>

		<el-drawer title="口罩怎么戴才正确?" :visible.sync="drawer2" :direction="direction">
			<el-card style="width: 80%;margin-left: 40px;">
				<span>1.购买正规厂家生产、正规渠道销售的口罩，并且学会正确佩戴，如果佩戴不正确，防护力度会大大减弱。<br /><br />
					2.使用口罩前需清洁双手。<br /><br />
					3.一次性医用口罩的佩戴<br />一次性口罩有里外之分，浅色面有吸湿功能，应该贴着嘴鼻，深色面朝外。<br />一次性医用口罩最好每2-4小时就更换一次，尽量不要重复使用。<br /><br />
					4.防护型口罩的佩戴<br />以N95口罩为例，口罩有标识的一面向外，有金属片的一边向上。
				</span>
			</el-card>
		</el-drawer>

		<el-drawer title="口罩什么情况需要更换?" :visible.sync="drawer3" :direction="direction">
			<el-card style="width: 80%;margin-left: 40px;">
				<span>
					1.口罩在变形、弄湿或弄脏导致防护性能降低时需及时更换。<br /><br />
					2.口罩清洗、加热或消毒处理后不能使用。<br /><br />
					3.未接触过疑似或确诊患者且外观完好、无异味或脏污的口罩，可放置于居室通风干燥处，以备下次使用。
				</span>
			</el-card>
		</el-drawer>

		<el-drawer title="用过的口罩怎么处理?" :visible.sync="drawer4" :direction="direction">
			<el-card style="width: 80%;margin-left: 40px;">
				<span>
					1.健康人群佩戴过的口罩,没有新型冠状病毒传播的风险，使用后的口罩，可按照生活垃圾分类的要求处理。<br /><br />
					2疑似病例或确诊患者佩戴的口罩,不可随意丢弃，应视作医疗废弃物，严格按照医疗废弃物有关流程处理，不得进入流通市场。
				</span>
			</el-card>
		</el-drawer>

		<el-drawer title="儿童戴口罩需要注意什么?" :visible.sync="drawer5" :direction="direction">
			<el-card style="width: 80%;margin-left: 40px;">
				<span>
					1.建议儿童选用符合国家标准GB2626-2006 KN95，并标注儿童或青少年颗粒物防护口罩的产品。<br /><br />
					2家长应随时关注儿童口罩佩戴情况，如儿童在佩戴口罩过程中感觉不适，应及时调整或停止使用。<br /><br />
					3.因儿童脸型较小，与成人口罩边缘无法充分密合，不建议儿童佩戴具有密合性要求的成人口罩。
				</span>
			</el-card>
		</el-drawer>


		<el-row class="this" :gutter="20">
			<el-col :span="8">
				<el-card class="picture">
				</el-card>
				<el-card class="knowledge" style="border-radius: 12px;margin-top: 10px;">
					<p class="title">新冠肺炎预防须知</p>
					<div class="body_card" style="margin-top: -5px;">
						<div class="fanghu_title_warp">
							<img src="https://puui.qpic.cn/vupload/0/1580113954413_67dj6qw9r34.png/0"
								class="fanghu_icon">
							<div class="fanghu_title">个人清洁</div>
						</div>
						<div class="fanghu_item">
							<div class="fanghu_item_point"></div>
							<div class="fanghu_item_text">经常保持双手清洁，尤其在触摸口、鼻或眼之前。</div>
						</div>
						<div class="fanghu_item">
							<div class="fanghu_item_point"></div>
							<div class="fanghu_item_text">经常用洗手液和清水清洗双手，搓手最少20秒，并用纸巾擦干。</div>
						</div>
						<div class="fanghu_item">
							<div class="fanghu_item_point"></div>
							<div class="fanghu_item_text"> 打喷嚏或咳嗽时应用纸巾掩盖口鼻，把用过的纸巾弃置于有盖垃圾箱内，然后彻底清洁双手。
							</div>
						</div>
						<div class="fanghu_title_warp">
							<img src="https://puui.qpic.cn/vupload/0/1580113954413_b3dr1w759hr.png/0"
								class="fanghu_icon">
							<div class="fanghu_title">尽量避免</div>
						</div>
						<div class="fanghu_item">
							<div class="fanghu_item_point"></div>
							<div class="fanghu_item_text">减少前往人流密集的场所。如不可避免，应戴上外科口罩。</div>
						</div>
						<div class="fanghu_item">
							<div class="fanghu_item_point"></div>
							<div class="fanghu_item_text">避免到访医院。如有必要到访医院，应佩戴外科口罩及时刻注重个人和手部卫生。</div>
						</div>
						<div class="fanghu_item">
							<div class="fanghu_item_point"></div>
							<div class="fanghu_item_text">避免接触动物（包括野味）、禽鸟或其粪便；避免到海鲜、活禽市场或农场。</div>
						</div>
						<div class="fanghu_item">
							<div class="fanghu_item_point"></div>
							<div class="fanghu_item_text">切勿进食野味及切勿光顾有提供野味的餐馆。</div>
						</div>
						<div class="fanghu_item">
							<div class="fanghu_item_point"></div>
							<div class="fanghu_item_text"> 注意食物安全和卫生，避免进食或饮用生或未熟透的动物产品，包括奶类、蛋类和肉类。 </div>
						</div>
						<div class="fanghu_title_warp"><img title
								src="https://puui.qpic.cn/vupload/0/1580113954413_qs8jz3v8m7.png/0" class="fanghu_icon">
							<div class="fanghu_title">尽快就诊</div>
						</div>
						<div class="fanghu_item">
							<div class="fanghu_item_point"></div>
							<div class="fanghu_item_text">如有身体不适，特别是有发烧或咳嗽，应戴上外科口罩并尽快就诊。</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="telephone">
					<div class="title">疫情防控咨询电话</div>
					<div class="subtitle">防控新冠肺炎疫情</div>
					<el-button class="jumpButton" @click="jumpPolicy">
						<i class="el-icon-s-promotion"></i>
						<p>点击查看各地疫情防控政策 &nbsp; > </p>
					</el-button>
					<div class="address">
						<div style="margin-top: 10px;color: aliceblue;">区域：</div>
						<el-cascader v-model="selectedAddress" :options="addressOptions" @change="addressChange"
							placeholder="请选择区域" style="width: 230px">
						</el-cascader>
					</div>
					<el-card class="phone-card" style="margin-top: 10px;">
						<div slot="header" class="clearfix">
							<span style="font-weight: bold;"> 疫情防控电话本 </span>
							<i class="el-icon-refresh" @click="getCovTelephone" style="float: right;"></i>
						</div>
						<div style="height: 236px">
							<el-scrollbar style="height:100%;overflow-x: hidden">
								<div v-for="item in this.covTelephone" :key="item.code">
									<div>
										{{item.name}}
										<el-button size="mini" icon="el-icon-edit" round class="editButton"
											@click="updateTelephone(item.code)" :disabled="editFlag"></el-button>
									</div>
									<div style="float:right;color:#146ebc;margin-top: 6px;">{{item.telephone}}</div>
									<div style="color:grey;margin-top: 2px;">服务时间:{{item.time}}</div>
									<el-divider></el-divider>
								</div>
							</el-scrollbar>
						</div>
					</el-card>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="mask">
					<p class="title">口罩使用指南</p>
					<el-button @click="drawer1=true">
						<i class="el-icon-s-flag"></i>
						<p>1. 口罩应该怎么选? &nbsp; > </p>
					</el-button>
					<el-button @click="drawer2=true">
						<i class="el-icon-s-flag"></i>
						<p>2. 口罩怎么戴才正确? &nbsp; > </p>
					</el-button>
					<el-button @click="drawer3=true">
						<i class="el-icon-s-flag"></i>
						<p>3. 口罩什么情况需要更换? &nbsp; > </p>
					</el-button>
					<el-button @click="drawer4=true">
						<i class="el-icon-s-flag"></i>
						<p>4. 用过的口罩怎么处理? &nbsp; > </p>
					</el-button>
					<el-button @click="drawer5=true">
						<i class="el-icon-s-flag"></i>
						<p>5. 儿童戴口罩需要注意什么? &nbsp; > </p>
					</el-button>
				</el-card>
				<el-card class="footer_picture">
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		provinceAndCityData,
		CodeToText,
		TextToCode
	} from "../../node_modules/element-china-area-data"
	import {
		getCovTelephone,
		updateCovTelephone
	} from "../../api/data.js"
	export default {
		name: 'rel_knowledge',
		data() {
			return {
				addressOptions: provinceAndCityData,
				selectedCode: 320100,
				selectedAddress: ['320000','320100'],
				editFlag: false,
				covTelephone: [{
						code: 320000,
						name: "江苏省",
						time: '全天24小时',
						telephone: '025 - 12320'
					},
					{
						code: 320100,
						name: "南京市",
						time: '全天24小时',
						telephone: '025 - 12320'
					},
					{
						code: 320104,
						name: "秦淮区",
						time: '全天24小时',
						telephone: '025 - 83682072'
					},
					{
						code: 320102,
						name: "玄武区",
						time: '全天24小时',
						telephone: '025 - 87753722'
					},
					{
						code: 320105,
						name: "建邺区",
						time: '全天24小时',
						telephone: '025 - 87778911'
					},
					{
						code: 320106,
						name: "鼓楼区",
						time: '全天24小时',
						telephone: '025 - 83401049'
					},
				],
				drawer1: false,
				drawer2: false,
				drawer3: false,
				drawer4: false,
				drawer5: false,
				direction: 'rtl'
			}
		},
		methods: {
			jumpPolicy() {
				this.$router.replace('../nCov_policy');
			},
			getCovTelephone() {
				getCovTelephone(this.selectedCode).then(res => {
					this.covTelephone = res.data.data;
				})
			},
			addressChange() {
				var name = CodeToText[this.selectedAddress[1]];
				this.selectedCode = this.selectedAddress[1];
				if (name == "市辖区") {
					this.selectedCode = this.selectedAddress[0];
				}
				this.editFlag = this.selectedCode == this.$admin.state.cityCode ? false:true,
				this.getCovTelephone();
			},
			updateTelephone(code) {
				this.$prompt('请输入修改后的联系电话', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /^((0\d{2,3}(-)?\d{7,8})|(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8})$/,
				 inputErrorMessage: '联系电话格式不正确'
				}).then(({
					value
				}) => {
					updateCovTelephone(code, value).then(res => {
						if (res.code == "10000") {
							this.$message({
								message: "修改成功",
								type: "success",
							});
							this.getCovTelephone();
						} else {
							console.log('error: edit one cov_Telephone!!');
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			}
		},
		mounted() {
			//this.getCovTelephone();
		}
	}
</script>

<style scoped>
	.this .picture {
		min-height: 83px;
		border-radius: 12px;
		background-image: url("../../src/assets/抗疫.webp");
		background-position-y: 21%;
		background-position-x: 30%;
		background-repeat: no-repeat;
		background-size: 113%;
	}

	.this .footer_picture {
		margin-top: 10px;
		height: 160px;
		border-radius: 12px;
		background-position-y: 45%;
		background-image: url("../../src/assets/告别疫情.webp");
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.knowledge .title {
		margin-top: -5px;
		margin-bottom: 5px;
		color: #222;
		font-size: 18px;
		text-align: center;
		font-weight: 600;
		font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
	}

	.mask .title {
		margin-top: -5px;
		margin-bottom: -5px;
		color: #222;
		font-size: 18px;
		text-align: center;
		font-weight: 600;
		font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
	}

	.fanghu_title_warp {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: flex-start;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.fanghu_icon {
		width: 15px;
		margin-left: 2px;
		margin-top: 9px;
	}

	.fanghu_title {
		margin-top: 8px;
		font-size: 13px;
		font-weight: 500;
		margin-left: 8px;
		font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
	}

	.fanghu_item_point {
		width: 5px;
		height: 5px;
		margin-top: 4px;
		margin-left: 5px;
		background: #005dff;
		position: absolute;
	}

	.fanghu_item_text {
		margin-top: 8px;
		font-weight: 400;
		font-size: 10px;
		color: #222;
		margin-left: 16px;
		font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
	}

	.telephone {
		background-image: linear-gradient(180deg, #146ebc 0%, #146ebc 30%, rgba(12, 134, 142, 0) 60%);
		background-repeat: no-repeat;
		background-size: contain;
		border-radius: 12px;
		font-size: 13px;
		font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
	}

	.telephone .title {
		margin-bottom: 5px;
		font-size: 18px;
		text-align: center;
		font-weight: 600;
		font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
		background-image: linear-gradient(180deg, #b8eaff 0%, #b8eaff 35%, white 70%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.telephone .subtitle {
		margin-top: 5px;
		font-size: 10px;
		font-weight: 500;
		font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
		color: #b8eaff;
		text-align: center;
		letter-spacing: 6px;
	}

	::v-deep .telephone .jumpButton {
		display: flex;
		margin-top: 10px;
		margin-left: 40px;
		width: 180px;
		height: 20px;
		line-height: 100%;
		font-size: 10px;
		font-display: center;
		background-color: #719ed5;
		border-color: #719ed5;
	}

	::v-deep .telephone .jumpButton span {
		margin-top: -10px;
		color: #cbe9fc;
	}

	::v-deep .telephone .jumpButton span .el-icon-s-promotion {
		font-size: 24px;
		margin-top: -2px;
		margin-left: -163px;
		border-radius: 3px;
		background-color: #146ebc !important;
		color: aliceblue !important;
	}

	::v-deep .telephone .jumpButton span p {
		margin-top: -18px;
		margin-left: 12px;
	}

	::v-deep .telephone .address {
		margin-top: 10px;
		display: flex;
		text-align: center;
	}

	::v-deep .el-cascader .el-input .el-input__inner {
		height: 28px;
		font-size: 13px;
		font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
	}

	::v-deep .telephone .el-scrollbar__wrap {
		overflow-x: auto;
		height: calc(100% + 20px);
	}

	::v-deep .telephone .editButton {
		display: flex;
		height: 5px;
		float: right;
		border-color: #146ebc;
	}

	::v-deep .telephone .editButton .el-icon-edit {
		margin-top: -6px;
		color: #146ebc;
	}

	::v-deep .mask .el-button {
		display: flex;
		margin-top: 16px;
		margin-left: 0px;
		width: 270px;
	}

	::v-deep .mask .el-button .el-button-s-flag {
		color: #146ebc;
	}

	::v-deep .mask .el-button p {
		color: #146ebc;
		float: right;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 10px;
	}
</style>
