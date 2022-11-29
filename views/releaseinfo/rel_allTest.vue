<template>
	<div>
		<el-card class="notifyTest_card" style="border-radius: 12px;height:100%;">
			<el-image class="header_picture" :src="require('../../src/assets/核酸.png')">
			</el-image>
			<div class="notifyTest_title">
				全员核酸通知发布
			</div>
			<div class="notifyTest_subtitle">
				配合做好大筛查 织密疫情防控网
			</div>
			<el-card class="header" style="border-radius:12x;width:75%;">
				检测区域:
				<el-cascader v-model="selectedAddress" :options="addressOptions" placeholder="请选择地址"
					style="width:56.5%;margin-left: 10px ">
				</el-cascader>
			</el-card>
			<el-card class="time" style="border-radius:12x;margin-top:10px;width:75%;">
				检测时间:
				<el-date-picker v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
			</el-card>
			<el-card class="info" style="border-radius:12x;margin-top:10px;width:75%;">
				注意事项:
				<el-input v-model="extraInfo" type="textarea" style="margin-top:5px;width:94%;">
				</el-input>
			</el-card>
			<el-button class="submitButton" @click="submit" style="margin-top:10px;">发布</el-button>
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
		notifyTest
	} from "../../api/data.js"
	export default {
		name: 'rel_allTest',
		data() {
			return {
				addressOptions: regionData,
				selectedAddress: '',
				time: new Date(),
				extraInfo: ''
			}
		},
		methods: {
			timeFormat(date) {
				var year = date.getFullYear();
				/* 在日期格式中，月份是从0开始的，因此要加0
				 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				 * */
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// 拼接
				return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			},
			submit() {
				if (this.selectedAddress == '' || this.time == '' || this.extraInfo == '') {
					this.$message({
						message: "请填写正确的核酸通知内容",
						type: "error",
					});
				} else {
					var param = {
						"area_code": this.selectedAddress[0],
						"start_time": this.timeFormat(this.time[0]),
						"end_time": this.timeFormat(this.time[1]),
						"extraInfo": this.extraInfo
					};
					console.log(param);
					notifyTest(param).then((res) => {
						if (res.data.code == 200) {
							this.$message({
								message: "发布成功",
								type: "success",
							});
						} else {
							console.log('error: submit one cov_allTest!!');
						}
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
		}
	}
</script>

<style scoped>
	.header_picture {
		float: right;
		height: 90%;
		width: 24%;
	}

	.notifyTest_card {
		display: flex;
		background-image: linear-gradient(180deg, #fbeede 0%, #fbeede 85%, rgba(251, 238, 222, 0) 99%);
		background-repeat: no-repeat;
		background-size: 100%;
	}

	::v-deep .notifyTest_card .el-card__body {
		width: 100%;
	}

	.notifyTest_title {
		font-weight: 700;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 20px;
		color: #000000;
		margin-left: 5px;
		margin-top: 5px;
		margin-bottom: 6px;
	}

	.notifyTest_subtitle {
		font-weight: 500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
		color: #000000;
		margin-left: 5px;
		margin-bottom: 14px;
	}

	.header,
	.time,
	.info {
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
		font-size: 15px;
	}

	.el-cascader {
		margin-left: 10px;
	}

	::v-deep .el-date-editor {
		margin-left: 10px;
	}

	.notifyTest_card .submitButton {
		color: #4a5bab;
		margin-top: 0px;
		margin-right: 8px;
		float: right;
	}
</style>
