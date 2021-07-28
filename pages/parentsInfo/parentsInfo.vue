<template>
	<view>
		<view class="u-page">
			<view class="flex padding-xl bg-cyan">
				<image src="../../static/Cat_in_love.png" style="width: 160upx; height: 160upx; border-radius: 80upx;" mode=""></image>
				<view class="padding">
					<view class="">
						王五的妈妈
					</view>
					<view class="margin-top">
						小朋友已学习课程1年6个月
					</view>
				</view>
			</view>
			<view class="padding">
				<view class="flex padding align-center justify-between" @click="goToMessage">
					<view class="">
						消息列表
					</view>
					<view class="">
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<u-line hair-line="false" color="#909090"></u-line>
				<view class="flex padding align-center justify-between">
					<view class="">
						关于我们
					</view>
					<view class="">
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<u-line hair-line="false" color="#909090"></u-line>
				<view class="flex padding align-center justify-between">
					<view class="">
						隐私政策
					</view>
					<view class="">
						<text class="cuIcon-right"></text>
					</view>
				</view>
				<u-line hair-line="false" color="#909090"></u-line>
			</view>
		</view>
		<u-tabbar v-model="current" :list="list" active-color="blue" inactive-color="#606266"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this.list = this.$store.state.tabList;
		},
		methods: {
			goToMessage(){
				uni.navigateTo({
					url:"../message/message"
				})
			}
		}
	}
</script>

<style>
	@import "/colorui/main.css";
	@import "/colorui/icon.css";
</style>
