<template>
	<view class="content">
		<view class="header">
			<image src="../../static/Cat_in_love.png" mode="aspectFill"></image>
			<view class="flex flex-direction justify-between margin-left-xl">
				<view class="text-xl">{{classInfo.nickname}}</view>
				<view class="text-sm">年级：{{classInfo.grade}}</view>
				<view class="text-sm">进度：Level {{classInfo.level}}</view>
			</view>
		</view>
		<u-dropdown>
			<u-dropdown-item v-model="value1" :title="title" :options="options1" @change="opch"></u-dropdown-item>
		</u-dropdown>
		<!-- <view class="">
			<u-subsection 
			@change="subsectionChange" 
			:bold="true" 
			 active-color="#716AB8" 
			:current="subCurrent" 
			 mode="button" 
			:list="['今天', '明天', '后天']">
			</u-subsection>
		</view> -->
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
			<swiper style="height: 700upx;" :indicator-dots="false" :is-scroll="true" :autoplay="false" :current="swiperCurrent" @change="swiperChange">
				<swiper-item >
					<view class="swiper-item">
						<view class="item" v-for="(item,index) in sen_lesson" :key="index">
							<text>{{item.name}} 步骤{{item.step}} 循环{{item.exposure_1}}</text>
							<view @click="prepareLesson(item.play_list_id,0,item.course_detail_id)">
								教师指导
							</view>
							<!-- <view @click="prepareLesson(item.play_list_id,1)">
								语言点
							</view>
							<view @click="prepareLesson(item.play_list_id,2)">
								播放视频
							</view> -->
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="item" v-for="(item,index) in theme_lesson" :key="index">
							<text>{{item.name}}</text>
							<view @click="prepareLesson(item.play_list_id,0,item.course_detail_id)">
								教师指导
							</view>
							<!-- <view @click="prepareLesson(item.play_list_id,1)">
								语言点
							</view>
							<view @click="prepareLesson(item.play_list_id,2)">
								播放视频
							</view> -->
						</view>
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
				//班级id
				classId:0,
				//班级信息
				classInfo:{},
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
				value1:0,
				title:"当前课程",
				options1:[
					{label:'当前课程',value:0},
					{label:'后续课程',value:1}
				]
			}
		},
		methods: {
			getClassInfo(){
				this.$u.get('/api/get_team_info',{
					"team_id":this.classId
				}).then(e => {
					this.classInfo = e.data[0];
				});
			},
			opch(e){
				if(e==0){
					this.title = "当前课程";
				}else{
					this.title = "后续课程";
				}
			},
			getLesson(){
				this.$u.get('/api/get_teacher_course',{
					"campus_id":1,
					"team_id":this.classId,
					"course_type":0
				}).then(e =>{
					if(this.value1 == 0){
						this.sen_lesson = e.data.current_course;
					}else{
						this.sen_lesson = e.data.next_course;
					}
				});
				
				this.$u.get('/api/get_teacher_course',{
					"campus_id":1,
					"team_id":this.classId,
					"course_type":1
				}).then(e =>{
					if(this.value1 == 0){
						this.theme_lesson = e.data.current_course;
					}else{
						this.theme_lesson = e.data.next_course;
					}
				});
				
			},
			tabChange(e){
				this.current = e;
				this.swiperCurrent = e;
			},
			subsectionChange(e){
				this.subCurrent = e;
			},
			swiperChange(e){
				this.current = e.detail.current;
			},
			prepareLesson(play_list_id,tabidx,detail_id){
				uni.navigateTo({
					url:'../Preview/Preview?listid='+ play_list_id + '&tabidx=' + tabidx + '&course_detail_id=' + detail_id
				})
			}
		},
		onLoad(param) {
			this.classId = param.lesson;
			this.getLesson();
			this.getClassInfo();
		}
	}
</script>

<style lang="scss">
	@import "/colorui/main.css";
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
		flex-direction: column;
		flex: 1;
		background-color: white;
		padding: 20upx 40upx;
	}
	.item{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		color: #716AB8;
		margin-bottom: 15upx;
	}
	.item view{
		padding: 6upx 15upx;
		border: solid #909399 2upx;
		border-radius: 12upx;
	}
	.item text{
		width: 50%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
