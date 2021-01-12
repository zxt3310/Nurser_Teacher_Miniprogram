<template>
	<view>
		<video :src="curVideo.url" :direction="90" autoplay="true" @ended="play">
			<!-- <cover-image src="http://81.70.232.219/uploads/material_upload/video/1.13_现场老师讲解场景图片.png"></cover-image> -->
		</video>
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
		<swiper class="swiper" :indicator-dots="false" :autoplay="false" :current="current" @change="swiperChange">
			<swiper-item>
				<scroll-view scroll-y="true">
					<view>
						
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true">
					<view>
						
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view style="padding:10upx 30upx 10upx 30upx; width: 100%;" scroll-y="true">
					视频列表
					<radio-group name="" @change="switchVideo">
						<view v-for="(item_base,index) in videoAry" :key="index">
							<view v-for="(item_child,idx) in item_base.play_groups" :key="idx">
								<view class="" style="padding: 10upx;">
									<radio class="radio" :checked="index+idx == 0" :value="index + '-' + idx" :disabled="false" color="#716AB8"/>
									<text>{{'  ' + item_base.first_group + '-' + item_child.second_group + '  ' + item_child.name}}</text>
									<text style="float:right; padding-right: 30px; color: #AAAAAA;">{{item_child.time_info == ''?'不计时':item_child.time_info}}</text>
								</view>
							</view>
							<view class="line">
								
							</view>
						</view>
					</radio-group>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playlistId:0,
				videoAry:[],
				tablist:[
					{name:"教学指导"},
					{name:"语言点"},
					{name:"视频列表"}
				],
				current: 2,
				//播放列表
				videos:[],
				curVideo:{},
				curIndex:0,
			}
		},
		onLoad(param) {
				this.playlistId = param.listid;
				this.current = parseInt(param.tabidx);
				this.getVideoData();
			},
		methods: {
			play(){
				if(this.videos.length>0){
					this.curVideo = this.videos.shift();
				}
			},
			switchVideo(e){
				let ary = e.detail.value.split('-');
				let index_father = ary[0];
				let index_child = ary[1];
				let child = this.videoAry[index_father].play_groups;
				let videos = child[index_child].plays;
				this.videos = videos.slice();
				this.play();
			},
			
			tabChange(e){
				this.current = e;
				this.swiperCurrent = e;
			},
			swiperChange(e){
				this.current = e.detail.current;
			},
			getVideoData(){
				this.$u.get('/api/get_play_list',{
					"play_list_id":this.playlistId
				}).then(e => {
					this.videoAry = e.data;
					this.switchVideo({
						detail:{
							value:'0-0'
						}
					})
				});
			}
			
		}
	}
</script>

<style>
	video{
		width: 100%;
	}
	.swiper{
		height: 400px;
		width: 100%;
	}
	scroll-view{
		height: 100%;
	}
	.line{
		height: 2upx;
		background-color:#E7EBED;
	}
</style>
