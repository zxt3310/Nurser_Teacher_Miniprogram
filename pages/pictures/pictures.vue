<template>
	<view>
		<view class="u-page padding">
			<view class="" v-for="(unit,key) in photos" :key="key" v-if="unit.length>0">
				<view class="" style="margin-left: 40upx;">
					{{key}}
				</view>
				<view class="contentarea">
					<view class="photo" v-for="(item,index) in unit" :key="index" @click="preview(item.upload_path)">
						<image class="image_style" :src="item.upload_path_thumb" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view style="display: flex; justify-content: center; align-items: center; padding: 40upx;">
				<button type="default" @click="loadMore">加载更多</button>
			</view>
		</view>
		<u-tabbar v-model="current" :list="list" active-color="blue" inactive-color="#606266"></u-tabbar>
	</view>
</template>

<script>
	import operateDate from "../../common/operateData.js"
	export default {
		data() {
			return {
				curPage:1,
				photos:null,
				list:[]
			}
		},
		onLoad() {
			this.list = this.$store.state.tabList;
			this.fetchPhotos();
		},
		methods: {
			fetchPhotos(){
				this.$u.get('/api/get_student_photo',{
					"team_id":2,
					"student_id":1,
					"page":this.curPage,
				}).then(e=>{
					this.photos = operateDate.operateData(e.data,this.photos);
					console.log(this.photos);
				});
			},
			loadMore(){
				this.curPage++;
				this.fetchPhotos();
			},
			preview(e){
				console.log(e)
				uni.previewImage({
					current:e,
					urls:[e]
				})
			}
		}
	}
</script>

<style>
	.contentarea{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 20upx;
	}
	.photo{
		padding: 10upx 30upx 10upx 30upx;
	}
	.image_style{
		width: 170upx;
		height: 170upx;
	}

</style>
