<template>
	<view>
		<u-dropdown ref="dropDown" class="u-dropdown" menuIcon="arrow-down-fill">
			<u-dropdown-item v-model="curClass" :title="classMap[curClass].nickname" :options="classes" @change="changeClass"></u-dropdown-item>
		</u-dropdown>
		<view class="header">
			<image src="../../static/Cat_in_love.png" mode=""></image>
			<view class="">
				<text>{{classMap[curClass].nickname}}</text>
				<text>{{photoInfo.memberCount + '人，共' + photoInfo.totalPhotoCount + '张照片'}}</text>
			</view>
		</view>
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
</template>

<script>
	import operateDate from "../../common/operateData.js"
	export default {
		data() {
			return {
				curPage:1,
				curClass:0,
				back_color:{backgroundColor:'#716AB8'},
				//下拉选项的数组
				classes:[],
				//班级id与对象对应map
				classMap:{},
				photos:null,
				photoInfo:{}
			}
		},
		onLoad(e) {
			let classes = JSON.parse(e.classes);
			//console.log(classes);
			this.initClass(classes);
			this.getPhotos(classes[0].id);
			this.curClass = classes[0].id;
		},
		methods: {
			initClass(classes){
				let ary = [];
				let classmap = {};
				for(let item of classes){
					ary.push({
						label:item.nickname,
						value:item.id
						// name:item.name,
						// level:item.level,
						// coverImg:item.cover_img
					});
					classmap[item.id.toString()] = item;
				}
				console.log(classmap)
				this.classes = ary;
				this.classMap = classmap;
			},
			changeClass(e){
				this.curPage = 1;
				this.photos = null;
				this.getPhotos(e);
			},
			getPhotos(itemId){
				this.$u.get('/api/get_team_photo',{
					"team_id":itemId,
					"page":this.curPage
				}).then(e =>{
					this.photos = operateDate.operateData(e.data,this.photos);
					console.log(this.photos);
					let info = {};
					info.totalPhotoCount = e.photo_cnt;
					info.memberCount = e.students_cnt;
					this.photoInfo = info;
					
					if(e.data.length == 0){
						uni.showToast({
							title:'没有更多照片',
							icon:"none"
						})
					}
				});
			},
			preview(e){
				console.log(e)
				uni.previewImage({
					current:e,
					urls:[e]
				})
			},
			loadMore(){
				this.curPage++;
				this.getPhotos(this.curClass);
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
		width: 170upx;
		height: 170upx;
	}
	.photo_containor{
		
	}
</style>
