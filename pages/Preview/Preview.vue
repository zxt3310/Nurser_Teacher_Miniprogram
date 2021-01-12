<template>
	<view>
		<video :src="curVideoSrc[curIndex]" :direction="90" autoplay="true"></video>
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
		<swiper class="swiper" :indicator-dots="false" :autoplay="false" :current="swiperCurrent" @change="swiperChange">
			<swiper-item>
				<scroll-view scroll-y="true">
					<view>
						
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true">
					<view></view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true">
					<view v-for="(item_base,index) in videoAry" :key="index">
						<checkbox-group name="">
							<view v-for="(item_child,idx) in item_base.play_groups" :key="idx">
								<label>
									<checkbox :checked="checkBoxIsSelect(index,idx)" /><text></text>
								</label>
							</view>
						</checkbox-group>
						
					</view>
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
				current: 0,
				swiperCurrent: 0,
				curVideoSrc:[
					"http://81.70.232.219/uploads/material_upload/video/1.11_Elo开场视频及1.12Daily_routine开场视频.mp4",
					"http://81.70.232.219/uploads/material_upload/video/1.20__场景视频.mp4",
					"http://81.70.232.219/uploads/material_upload/video/2.21_步骤开场视频.mp4"
					],
				curIndex:0,
				curCheckTag:"1-1"
			}
		},
		onLoad(param) {
			this.playlistId = param.listid;
			this.getVideoData();
			},
		methods: {
			switchVideo(){
				this.curIndex++;
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
				});
			},
			checkBoxIsSelect(base_index,child_index){
				let data_base = this.videoAry[base_index];
				let data_child = data_base.play_groups[child_index];
				let tagStr = data_base.first_group.toString() + '-' + data_child.second_group.toString();
				return this.curCheckTag == tagStr;
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
	}
	scroll-view{
		height: 100%;
	}
</style>
