<template>
	<view class="content">
		<view class="header">
			<view class="u-flex">
				<image class="" src="" mode=""></image>
				<view class="u-flex-1 margin-left">
					<text>王老师您好</text>
					<view class="margin-top-sm u-font-11 align-start">
						<text class="bg-white" 
							  style="border-radius: 20upx; padding:5upx 10upx;"
					    >个人资料</text>
					</view>
				</view>
				<text class="u-font-sm">{{today}}</text>
			</view>
			<view class="u-font-sm" style="margin-top: 30upx;">
				保持微笑，用包容心对待每一位小朋友~
			</view>
		</view>
		<view class="padding" style="flex:2;">
			<text>班级</text>
			<view class="classItem">
				<view class="align-center text-center" style="width: 33%;">
					<image src="../../static/logo.png" mode=""></image>
					<view>{{childClass.nickname}}</view>
				</view>
				<view class="flex-direction align-center text-center" style="width: 33%;">
					<view class="">{{childClass.level}}</view>
					<view class="text-sm">
						班级水平
					</view>
				</view>
				<view class="flex-direction align-center text-center" @click="prepareLesson(childClass.id)" style="width: 33%;">
					<image src="../../static/cc-copy.png" style="width: 45upx;height: 45upx;" mode=""></image>
					<view class="text-sm">
						备课
					</view>
				</view>
			</view>
		</view>
		<view class="line"/>
		<view class="padding" style="flex: 1;">
			<text>实用功能</text>
			<view class="u-flex">
				<view class="icon-func" @click="goToPhotos">
					<image src="../../static/photo.png" mode=""></image>
					<text>相册</text>
				</view>
				<view class="icon-func" @click="goToNotify">
					<image src="../../static/notify.png" mode=""></image>
					<text>通知</text>
				</view>
				<view class="icon-func" style="margin-left: 80px;" @click="logout">
					<image src="../../static/logout.png" mode=""></image>
					<text>注销</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import timeFormat from "../../uview-ui/libs/function/timeFormat.js"
	export default {
		data() {
			return {
					today:"",
					childClass:[
						{
							id:0,
							nickname:"幼1班",
							name:"Level 1",
						},
						{
							id:1,
							nickname:"幼2班",
							name:"Level 2",
						}
					],
					classId:0
				}
		},
		onShow() {
			wx.hideHomeButton({
				success: function () {
					console.log("hide home success");
				},
			});
		},
		onLoad() {
			this.classId = uni.getStorageSync("teamid");
			this.getClassInfo();
		},
		onReady(){
			this.today = timeFormat(Date.now(),"mm月dd日 星期w");
		},
		methods: {
			prepareLesson(e){
				uni.navigateTo({
					url:"../lesson/lesson?lesson=" + e
				})
			},
			getClassInfo(){
				this.$u.get('/api/get_team_info',{
					team_id:this.classId
				}).then(e =>{
					if(e.code == 0){
						this.childClass = e.data[0];
					}
				});
			},
			goToPhotos(){
				uni.navigateTo({
					url:'../photos/photos?classes=' + JSON.stringify(this.childClass)
				})
			},
			goToNotify(){
				uni.navigateTo({
					url:"../notification/notification"
				})
			},
			logout(){
				uni.clearStorageSync();
				uni.switchTab({
					url:"../login/login",
					fail(e) {
						console.log(e)
					}
				})
			}
		}
	}
</script>

<style>
	@import "/colorui/main.css";
	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.header{
		background-color: #716AB8;
		padding: 20upx 40upx 40upx 40upx;
		color: white;
		border-bottom-right-radius: 200upx;
	}
	.header image{
		height: 100upx;
		width: 100upx;
		background-color: white;
		border-radius: 50upx;
	}
	
	.classItem{
		display: flex;
		padding: 20upx 0upx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.classItem image{
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
	}
	
	.line{
		height: 10upx;
		background-color:#E7EBED;
	}
	
	.icon-func{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20upx;
		padding: 30upx;
	}
	.icon-func image{
		width: 90upx;
		height: 90upx;
	}
	.icon-func text{
		font-size: 28upx;
		margin-top: 10upx;
	}
</style>
