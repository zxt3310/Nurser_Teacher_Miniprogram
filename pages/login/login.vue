<template>
	<view class="align-center justify-center" style="padding:0 25px">
		<view class="header">
			欢迎登陆 Lingo
		</view>
		<view class="" v-if="isTeacher == 1">
			<u-form :model="info" ref="uForm">
				<u-form-item> <u-input v-model="info.account" placeholder="请输入账号" placeholderStyle="font-size:18px;"></u-input> </u-form-item>
				<u-form-item> <u-input v-model="info.password" placeholder="请输入密码"></u-input> </u-form-item>
			</u-form>
			<button style="background-color: #F9DF87; color: white;margin-top: 20px;" type="default" @click="toTeacher">登录</button>
		</view>

		<view class="" v-else>
			<u-form :model="info" ref="uForm">
				<u-form-item label="手机"> <u-input v-model="info.mobile"></u-input> </u-form-item>
			</u-form>
			<button style="background-color: #F9DF87;color: white;margin-top: 20px;" type="default" @click="toParent">登录</button>
		</view>
		<view class="" style="padding: 20px; display: flex;justify-content: space-around; margin-top: 20px;">
			<radio-group class="" @change="switchStatus">
				<label class="radio"><radio class="radio" :checked="true" value="1" :disabled="false" color="#F4C438"/>教师登录</label>
				<label class="radio" style="margin-left: 80px;"><radio class="radio" :checked="false" value="0" :disabled="false" color="#F4C438"/>家长登录</label>	
			</radio-group>
		</view>
		<!-- <button @click="subscribe">订阅</button>
		<button open-type="contact">进入客服</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
					style:{"font-size":"30px"},
					account:"2020-2",
					password:"123456",
					mobile:"13800138000"
				},
				isTeacher:1
			}
		},
		onLoad() {
			uni.hideTabBar();
			let student = uni.getStorageSync("student");
			if(student){
				uni.switchTab({
					url:'../parentIndex/parentIndex'
				})
			}
			let team = uni.getStorageSync("teamid");
			if(team){
				uni.redirectTo({
					url: "../index/index"
				})
			}
			
		},
		methods: {
			subscribe(){
				uni.requestSubscribeMessage({
					tmplIds:["0ohakSTvTzVTkiFmseeqI9i7cGjCEqbfNXpTAAs9ZKM"],
					fail:(e) =>{
						console.log(e);
					},
					success:(e) =>{
						console.log(e);
					}
				})
			},
			switchStatus(e){
				this.isTeacher = parseInt(e.detail.value);
			},
			toTeacher() {
				uni.clearStorageSync();
				this.$u.get('/api/user_login',{
					"user":this.info.account,
					"passwd":this.info.password
				}).then(e => {
					if(e.code == 0){
						let teamId = e.data.team_id;
						uni.setStorageSync("teamid",teamId);
						uni.redirectTo({
							url: "../index/index"
						})
					}
				});
			},
			toParent(e) {
				console.log(e)
				uni.clearStorageSync();
				if(this.info.mobile.length < 11){
					uni.showToast({
						icon:"none",
						title:"请输入正确的手机号"
					})
					return;
				}
				uni.login({
					success: (res) => {
						console.log(res)
						this.$u.post('/api/wx_login',{
							"phone":"123456",
							"wxopenid":res.code
						}).then(e => {
							if(e.code == 0){
								uni.setStorageSync("student",e.data);
								uni.switchTab({
									url:'../parentIndex/parentIndex'
								})
							}
						})
					},
					fail(e) {
						console.log("登录失败");
					}
				})
			},
			teachLogin(){
				
				this.$u.get('/api/user_login',{
					"user":this.info.account,
					"passwd":this.info.password
				}).then(e =>{
					if(e.code == 0){
						let teamId = e.data.team_id;
						console.log(teamId)
						uni.setStorageSync("teamid",teamId);
						// uni.redirectTo({
						// 	url: "../index/index"
						// })
					}
				});
			},
		}
	}
</script>

<style>
	.header{
		font-size: 50upx;
		margin-top: 80upx;
	}
</style>
