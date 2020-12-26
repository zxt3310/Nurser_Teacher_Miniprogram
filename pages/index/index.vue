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
				<text class="u-font-sm">12月25日 星期五</text>
			</view>
			<view class="u-font-sm" style="margin-top: 30upx;">
				保持微笑，用包容心对待每一位小朋友~
			</view>
		</view>
		<view class="padding">
			<text>班级</text>
			<view class="classItem" v-for="item in childClass" :key="item.id">
				<view class="align-center">
					<image src="../../static/logo.png" mode=""></image>
					<view>{{item.className}}</view>
				</view>
				<view class="flex-direction align-center">
					<view class="">{{item.prograss}}</view>
					<view class="text-sm">
						课程进度
					</view>
				</view>
				<view class="" @click="prepareLesson(item.id)">
					<image src="../../static/cc-copy.png" style="width: 45upx;height: 45upx;" mode=""></image>
					<view class="text-sm">
						备课
					</view>
				</view>
			</view>
		</view>
		<view class="line"/>
		<view class="padding">
			<text>实用功能</text>
			<view class="u-flex justify-between">
				<view class="icon-func">
					<image src="../../static/photo.png" mode=""></image>
					<text>相册</text>
				</view>
				<view class="icon-func">
					<image src="../../static/notify.png" mode=""></image>
					<text>通知</text>
				</view>
				<view class="icon-func">
					<image src="../../static/setting.png" mode=""></image>
					<text>设置</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					childClass:[
						{
							id:0,
							className:"幼1班",
							prograss:"Level 1",
						},
						{
							id:1,
							className:"幼2班",
							prograss:"Level 2",
						}
					]
				}
		},
		onLoad() {
			
		},
		methods: {
			prepareLesson(e){
				uni.navigateTo({
					url:"../lesson/lesson?lesson=" + e
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
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
		padding: 20upx 70upx;
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
