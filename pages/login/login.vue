<template>
	<view class="align-center justify-center">
		<view class="">
			<button type="default" @click="toTeacher">教师端</button>
		</view>
		
		<view class="">
			<button type="default" @click="toParent">家长端</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			uni.hideTabBar()
		},
		methods: {
			toTeacher(){
				uni.redirectTo({
					url:"../index/index"
				})
			},
			toParent(){
				uni.switchTab({
					url:"../parentIndex/parentIndex"
				})
			}
		}
	}
</script>

<style>
	@import "/colorui/main.css";
</style>
