<template>
	<view>
		<view class="notify_content">
			<block v-for="(item,key) in notifications" :key="key">
				<view class="notify_content_unit">
					<view style="font-size: 16px; font-weight: bold;">
						教师：{{item.teacher_name}}
					</view>
					<view style="width: 70%;">
						{{item.content}}
					</view>
					<view style="position: absolute; right: 10px; bottom: 0px; font-size: 12px; color: #999;">
						{{item.created_at}}
					</view>
				</view>
				<view style="width: 100%; height: 1px; background-color: #9e9e9e">
					
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				student:"",
				notifications:[]
			}
		},
		onLoad() {
			let student = uni.getStorageSync("student");
			this.student = student[0];
			this.getNotification(); 
		},
		methods: {
			getNotification(){
				this.$u.get('/api/get_team_notification',{
					"student_id":this.student.id
				},{
					teamid:this.student.team_id
				}).then(e => {
					if(e.code == 0){
						this.notifications = e.data;
					}
				});
				
			}
		}
	}
</script>

<style>
	.notify_content{
		padding: 15px;
		
	}
	.notify_content_unit{
		position: relative;
		margin: 10px 0;
		line-height: 150%;
	}
</style>
