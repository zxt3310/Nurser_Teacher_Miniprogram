
let lib = ["本周","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

var operateData = (data,curPhoto)=>{
	let today = new Date();
	//本周第一天
	let curFirstWeekDay = getFirstOfCurWeek();
	//最后一天
	let curLastWeekDay = getLastOfCurWeek();
	
	let resDic = {"本周":[],"1月":[],"2月":[],"3月":[],"4月":[],"5月":[],"6月":[],"7月":[],"8月":[],"9月":[],"10月":[],"11月":[],"12月":[]};
	
	if(curPhoto != null){
		resDic = curPhoto;
		console.log("向下拉去更多")
	}
	for (var unit of data){
		//小程序中 不识别2020-01-25  正确格式 2020/01/25
		let pic_date = new Date(unit.created_at.replace(/-/g,'/'));
		// if(pic_date.getYear() == today.getYear()){
			let month = pic_date.getMonth() + 1;
			resDic[lib[month]].push(unit);
			if(curLastWeekDay > pic_date > curFirstWeekDay){
				resDic[0].push(unit);
			}
		// }
	}
	return resDic;
}

var getFirstOfCurWeek = ()=>{
	let today = new Date();
	var first = today.getDate()-today.getDay() + 1;
	var firstDay = new Date(today.setDate(first));
	firstDay.setHours(0);
	firstDay.setMinutes(0);
	firstDay.setSeconds(0);
	return firstDay;
}

var getLastOfCurWeek = ()=>{
	let today = new Date();
	var first = today.getDate()-today.getDay() + 1;
	var firstDay = new Date(today.setDate(first + 6));
	firstDay.setHours(23);
	firstDay.setMinutes(59);
	firstDay.setSeconds(59);
	return firstDay;
}


export default{
	operateData
}