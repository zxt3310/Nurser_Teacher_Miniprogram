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
								姓名：{{childDetail.name}}
							</view>
							<view class="">
								班级：{{childDetail.nickname}}
							</view>
						</view>
					</view>
					<view class="flex flex-sub flex-direction align-center padding">
						<view class="">
							<view class="">
								老师：molily
							</view>
							<view class="">
								进度：Level {{childDetail.level}}
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
						今日问答：{{childDetail.today_question_score}}分
					</view>
					<view class="">
						语音测评：{{childDetail.today_audio_score}}分
					</view>
				</view>
			</view>
			<view class="padding">
				最新照片
				<view class="flex justify-around margin-top">
					<view v-for="(item,index) in pics" :key="index">
						<image class="image_style" :src="item.upload_path_thumb" mode=""></image>
					</view>
				</view>
				<view class="text-blue margin-top text-sm" @click="goToPics">
					查看更多
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
				current:0,
				childDetail:{},
				pics:[]
			}
		},
		onLoad() {
			this.list = this.$store.state.tabList;
			this.getChildData();
			this.getChildPic();
		},
		methods: {
			getChildData(){
				this.$u.get('/api/get_team_students_info',{
					"student_id":3
				}).then(e =>{
					this.childDetail = e.data;
				});
			},
			getChildPic(){
				this.$u.get('/api/get_student_photo',{
					"team_id":2,
					"student_id":1,
					"page":this.curPage,
					"work":this.current
				}).then(e=>{
					let picss = e.data;
					this.pics = picss.slice(0,3)
				});
			},
			goToPics(){
				uni.switchTab({
					url:'../pictures/pictures'
				})
			}
		}
	}
</script>

<style>
	@import "/colorui/main.css";
	.image_style{
		width: 170upx;
		height: 170upx;
	}
</style>
