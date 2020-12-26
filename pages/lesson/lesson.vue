<template>
	<view class="content">
		<view class="header">
			<image src="../../static/Cat_in_love.png" mode="aspectFill"></image>
			<view class="flex flex-direction justify-between margin-left-xl">
				<view class="text-xl">幼1班</view>
				<view class="text-sm">学生人数10</view>
				<view class="text-sm">当前进度 Level 1</view>
			</view>
		</view>
		<view class="">
			<u-subsection 
			@change="subsectionChange" 
			:bold="true" 
			 active-color="#716AB8" 
			:current="subCurrent" 
			 mode="button" 
			:list="['今天', '明天', '后天']">
			</u-subsection>
		</view>
		<view class="">
			<u-tabs-swiper
			active-color="#716AB8"
			ref="tabs" 
			:list="tablist"
			:current="current"
			@change="tabChange"
			:is-scroll="false"
			bar-width="105"
			swiper-width="750">
			</u-tabs-swiper>
		</view>
		<view class="">
			<swiper :indicator-dots="false" :is-scroll="true" :autoplay="false" :current="swiperCurrent" @change="swiperChange">
				<swiper-item>
					<view class="swiper-item">
						asdf
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						fewerwer
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tablist:[
					{name:"场景课程"},
					{name:"主题课程"},
				],
				current: 0,
				swiperCurrent: 0,
				subCurrent:0,
				sen_lesson:[
					{name:"入园"},
					{name:"排队"},
					{name:"洗手"},
					{name:"午餐"},
					{name:"午睡"},
					{name:"户外"},
					{name:"收拾"},
					{name:"离园"}
				],
				theme_lesson:[
					{name:"艺术"},
					{name:"唱跳"},
					{name:"科学"},
					{name:"读书"},
				],
			}
		},
		methods: {
			tabChange(e){
				this.current = e;
				this.swiperCurrent = e;
			},
			subsectionChange(e){
				this.subCurrent = e;
			},
			swiperChange(e){
				this.current = e.detail.current;
			}
		},
		onLoad(param) {
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
	}
	.header{
		background-color: #716AB8;
		padding: 40upx;
		display: flex;
		flex-direction: row;
		border-bottom-right-radius: 60upx;
		border-bottom-left-radius: 60upx;
		color: white;
	}
	.header image{
		width: 160upx;
		height: 160upx;
		background-color: white;
		border-radius: 10upx;
	}
	.swiper-item{
		display: flex;
		flex: 1;
		background-color: white;
		padding: 20upx 40upx;
	}
</style>
