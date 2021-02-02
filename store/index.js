import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		tabList:[{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						isDot: true,
						customIcon: false,
						pagePath:"/pages/parentIndex/parentIndex"
					},
					{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '相册',
						isDot: true,
						customIcon: false,
						pagePath:"/pages/pictures/pictures"
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						isDot: false,
						customIcon: false,
						pagePath:"/pages/parentsInfo/parentsInfo"
					},
				],
	},
    mutations: {},
    actions: {}
})
export default store