<template>
	<el-menu class="el-menu-vertical-demo" background-color="#5976ae" text-color="#ffffff" active-text-color="#d5cede"
		@open="handleOpen" @close="handleClose" :collapse="isCollapse">
		<h3>{{isCollapse ? '后台':'后台管理系统'}}</h3>
		<el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path+''" :key="item.path">
			<i :class="'el-icon-'+item.icon"></i>
			<span slot="title">{{item.label}}</span>
		</el-menu-item>
		<el-submenu v-for="item in hasChildren" :index="item.path+''" :key="item.path">
			<template slot="title">
				<i :class="'el-icon-'+item.icon"></i>
				<span slot="title">{{item.label}}</span>
			</template>
			<el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
				<el-menu-item @click="clickMenu(subItem)" :index="subIndex.toString()">
					{{subItem.label}}
				</el-menu-item>
			</el-menu-item-group>
			
			<!-- 三级导航目录
			<el-submenu>
				<el-menu-item @click="clickMenu(subItem)" v-for="subItem in noNextChildren(item.children)" :index="subItem.path+''" :key="subItem.path">
					<i :class="'el-icon-'+subItem.icon"></i>
					<span slot="title">{{subItem.label}}</span>
				</el-menu-item>
				<el-submenu v-for="subItem in hasNextChildren(item.childre)" :index="subItem.path+''" :key="subItem.path">
					<template slot="title">
						<span slot="title">{{subItem.label}}</span>
					</template>
					<el-menu-item-group v-for="(subsubItem,subsubIndex) in subItem.children" :key="subsubItem.path">
						<el-menu-item @click="clickMenu(subsubItem)" :index="subsubIndex.toString()">
							{{subsubItem.label}}
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-submenu>
			 -->
			
		</el-submenu>
	</el-menu>
</template>

<style lang="less" scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 250px;
		min-height: 400px;
	}
	
	.el-menu-vertical-demo{
		font-weight:500;
		font-family: -apple-system-font, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
	}
	
	.el-menu {
		height: 100%;
		border: none;

		h3 {
			color: white;//后台管理系统的颜色
			text-align: center;
			line-height: 48px
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				menu: []
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			clickMenu(item) {
				this.$router.push({
					name: item.name
				})
				this.$store.commit('selectMenu', item)
			}
		},
		computed: {
			noChildren() {
				return this.asyncMenu.filter(item => !item.children)
			},
			hasChildren() {
				return this.asyncMenu.filter(item => item.children)
			},
			/*
			noNextChildren(childItem){
				return childItem.filter(item => !item.children)
			},
			hasNextChildren(childItem){
			 	return childItem.filter(item => item.children)
			},
			*/
			isCollapse() {
				return this.$store.state.tab.isCollapse
			},
			asyncMenu() {
				return this.$store.state.tab.menu
			}
		}
	}
</script>
