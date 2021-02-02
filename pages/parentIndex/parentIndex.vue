<template>
	<view>
		<view class="u-page">
			<view class="flex-direction">
				<view class="flex justify-center align-center padding">
					<image src="../../static/Cat_in_love.png" style="width: 200upx; height: 200upx;" mode=""></image>
				</view>
				<view class="flex">
					<view class="flex flex-sub flex-direction align-center padding">
						<view class="">
							<view class="">
								宝宝：啊仔
							</view>
							<view class="">
								班级：大班方法
							</view>
						</view>
					</view>
					<view class="flex flex-sub flex-direction align-center padding">
						<view class="">
							<view class="">
								老师：molily
							</view>
							<view class="">
								进度：Level3
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-line hair-line="false" margin="20upx"></u-line>
			<view class="padding">
				今日学习情况
				<view class="flex justify-between padding">
					<view class="">
						今日问答：100分
					</view>
					<view class="">
						语音测评：100分
					</view>
				</view>
				
			</view>
		</view>
		<u-tabbar v-model="current" :list="list" active-color="blue" inactive-color="#606266"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				current:0
			}
		},
		onLoad() {
			this.list = this.$store.state.tabList;
		},
		methods: {
			
		}
	}
</script>

<style>
	@import "/colorui/main.css";
</style>
