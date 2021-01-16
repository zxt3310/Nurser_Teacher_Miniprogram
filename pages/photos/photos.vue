<template>
	<view>
		<u-dropdown ref="dropDown" class="u-dropdown" menuIcon="arrow-down-fill">
			<u-dropdown-item v-model="curClass" :title="classes[curClass-1].label" :options="classes" @change="changeClass"></u-dropdown-item>
		</u-dropdown>
		<view class="header">
			<image src="../../static/Cat_in_love.png" mode=""></image>
			<view class="">
				<text>{{classes[curClass-1].label}}</text>
				<text>xx人 共xxx張照片，本周拍攝x張</text>
			</view>
		</view>
		<view class="contentarea">
			<view class="photo" v-for="(item,index) in photos" :key="index" @click="preview(item.upload_path)">
				<image class="image_style" :src="item.upload_path" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curClass:1,
				back_color:{backgroundColor:'#716AB8'},
				classes:[],
				photos:[]
			}
		},
		onLoad(e) {
			let classes = JSON.parse(e.classes);
			console.log(classes);
			this.initClass(classes);
			this.getPhotos(classes[0].id);
		},
		methods: {
			initClass(classes){
				let ary = [];
				for(let item of classes){
					console.log(item)
					ary.push({
						label:item.nickname,
						value:item.id
					})
				}
				console.log(ary)
				this.classes = ary;
			},
			changeClass(e){
				this.getPhotos(e);
			},
			getPhotos(itemId){
				this.$u.get('/api/get_team_photo',{
					"team_id":itemId
				}).then(e =>{
					this.photos = e.data;
					console.log(this.photos);
				});
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
	.navibar{
		display: flex;
		flex:1;
	}
	.header{
		padding: 0upx 40upx 20upx 40upx;
		display: flex;
		flex-direction: row;
	}
	.header image{
		width: 120upx;
		height: 120upx;
		background-color: white;
		border-radius: 10upx;
	}
	.header view{
		display: flex;
		flex-direction: column;
		margin-left: 30upx;
	}
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
		width: 160upx;
		height: 160upx;
	}
</style>
