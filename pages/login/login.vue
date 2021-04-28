<template>
	<view class="align-center justify-center" style="padding:0 15px">
		<view class="" v-if="isTeacher == 1">
			<u-form :model="info" ref="uForm">
				<u-form-item label="账号"> <u-input v-model="info.account"></u-input> </u-form-item>
				<u-form-item label="密码"> <u-input v-model="info.password"></u-input> </u-form-item>
			</u-form>
			<button type="default" @click="toTeacher">登录</button>
		</view>

		<view class="" v-else>
			<u-form :model="info" ref="uForm">
				<u-form-item label="手机"> <u-input v-model="info.mobile"></u-input> </u-form-item>
			</u-form>
			<button type="default" @click="toParent">登录</button>
		</view>
		<view class="" style="padding: 20px; display: flex;justify-content: center;">
			<radio-group class="" @change="switchStatus">
				<label class="radio"><radio class="radio" :checked="true" value="1" :disabled="false" color="#716AB8"/>教师登录</label>
				<label class="radio" style="margin-left: 20px;"><radio class="radio" :checked="false" value="0" :disabled="false" color="#716AB8"/>家长登录</label>	
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
					account:"2020-2",
					password:"123456",
					mobile:"13800138000"
				},
				isTeacher:1
			}
		},
		onLoad() {
			uni.hideTabBar()
			setInterval()
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
				this.$u.get('/api/user_login',{
					"user":this.info.account,
					"passwd":this.info.password
				}).then(e => {
					uni.redirectTo({
						url: "../index/index"
					})
				});
			},
			toParent(e) {
				console.log(e)
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
							console.log(e);
						})
						uni.switchTab({
							url:'../parentIndex/parentIndex'
						})
					}
				})
			},
			teachLogin(){
				
				this.$u.get('/api/user_login',{
					"user":this.info.account,
					"passwd":this.info.password
				}).then(e =>{
					if(e.code == 0){
						uni.redirectTo({
							url: "../index/index"
						})
					}
				});
			}
		}
	}
</script>

<style>
</style>
