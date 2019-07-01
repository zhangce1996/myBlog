String.prototype.endWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
	return true;
}

var chooseGoodsDivNumMax = 2;
var chooseYHQDivNumMax = 2;

var chajianInstall = false;//是否安装插件

$(function() {
	
	//判断插件是否安装
	setTimeout(function(){
		dispatchEvent("coupon.pluginTest", {});
	},2500);
	
	var ver = parseInt($("input[name='radiot']:checked").val());
	if(ver == 1 || ver == 5){
		$("#sfavDiv").show();
	}
	
	// 查看优惠券
	var yhj = $("#txtLink").val();
	if(yhj.endWith('activityId=')){
		$("#txtLink").val("");
	}
	
	$(".divyhq").hide();
	$(".divitem").hide();
	$("input[name='radiot']").change(function(i) {
		$(".type6").show();
		var v = parseInt($("input[name='radiot']:checked").val());
		$(".divitem").hide();
		$("#iffavDiv").hide();
		$("#sfavDiv").hide();
		$("#iffDiv").hide();
		if (v != 1) {
			$(".divitem").show();
		}
		
		if(v == 1 || v == 5){
			$("#sfavDiv").show();
		}
		if(v == 2){
			$("#iffDiv").show();
		}
		
		if(v == 4){//宝贝收藏
			$("#iffavDiv").show();
			$("#selectTitle").html("选择需要收藏的宝贝：");
		}else{
			if(v == 5){
				$("#iffavDiv").show();
			}else{
				$("#iffavDiv").hide();
			}
			if(v == 2 || v == 5){//加入购物车的宝贝：
				$("#selectTitle").html("加入购物车的宝贝："); 
			}
		}
		if(v == 8){//优惠券+访客旺旺
			$("#chooseGoodsDiv").hide();
		}
		
		//版本6
		$("#msg").hide();
		if(v == 6){
			$(".type6").hide();
			$("#msg").show();
		}
		
	});
	
	$("input[name='activityTypeRadio']").change(function(i) {
		var v = parseInt($("input[name='activityTypeRadio']:checked").val());
		if (v == 2) {
			$(".divyhq").show();
			$(".divtemp").hide();
		}else{
			$(".divyhq").hide();
			$(".divtemp").show();
		}
	});
	
	
	$("#jumpUrlCheckBox").change(function(i) {
		if(this.checked){
			$("#txtPageUrl").show();
		}else{
			$("#txtPageUrl").hide();
		}
	});
	
	//是否自动关注，如果点击，后面的超级模式自动跟着点击
	$("#sfav").change(function(i) {
		if(this.checked){
			$("#ssfav").prop("checked",true);
		}else{
			$("#ssfav").prop("checked",false);
		}
	});
	
	$("input[name='radiotemp']").change(function(i) {
		var pic = $("input[name='radiotemp']:checked")
				.attr("data-pic");
		$("#txtImgLink").val(pic);
	});
	
	//开始时间插件初始化
//	$('#activityStartTime').datepicker({
//		timepicker : false,
//		autoclose : true,
//		todayBtn : 'linked'
//	});
	
	$("#activityStartTime").val(new Date().format("yyyy-MM-dd"));

	//结束时间插件初始化
	$('#activityEndTime').datepicker({
		timepicker : false,
		autoclose : true, 
		startDate: new Date(Date.parse(new Date) + (86400000)),
	});
	
	// 开始时间和结束时间控制
//    $("#activityStartTime").bind("change",function(){
//        timeChangeShow();
//    });
    $("#activityEndTime").bind("change",function(){
        timeChangeShow();
    });
	
	
	//获取商品
	//search(1);
	
	if(loginSellerNick == ""){
		getMoney();
	}else{
		$("#totalFee").hide();
		$("#startPay").hide();
		$("#priceTable").hide();
		$("#tips").hide();
	}
	
	//版本控制
	if(loginSellerNick != ""){
		if(loginSellerType == 1){
			$("#radio_type2").hide();
			$("#radio_type4").hide();
			$("#radio_type5").hide();
		}else if(loginSellerType == 2){
			$("#radio_type1").hide();
			$("#radio_type4").hide();
			$("#radio_type5").hide();
			$("#typeRadio_2").click();
		}else if(loginSellerType == 4){
			$("#radio_type5").hide();
			//do nothing
			chooseGoodsDivNumMax = 4;
			chooseYHQDivNumMax = 4;
		}else if(loginSellerType == 3){
			$("#radio_type1").hide();
			$("#radio_type2").hide();
			$("#radio_type5").hide();
			$("#typeRadio_4").click();
		}else if(loginSellerType == 5){//显示全部
			$("#radio_type6").show();
			chooseGoodsDivNumMax = 4;
			chooseYHQDivNumMax = 4;
		}else if(loginSellerType == 8){//优惠券+访客旺旺
			$("#radio_type1").hide();
			$("#radio_type2").hide();
			$("#radio_type4").hide();
			$("#radio_type5").hide();
			$("#radio_type8").show();
			$("#typeRadio_8").click();
		}else{
			$("#radio_type1").hide();
			$("#radio_type2").hide();
			$("#radio_type4").hide();
			$("#radio_type5").hide();
			$("#radio_type8").hide();
		}
		//测试
//		if(loginSellerId == 14502574 || loginSellerId == 157781343){
//			$("#radio_type6").show();
//		}
		
	}
	
	//编辑初始化
	if($("#editId").val() != ''){
		//额外优惠券
		if($("#editYguiq2").val() != ''){
			var yhq2 = $("#editYguiq2").val().replace("['","").replace("']","").split(",");
			for(var i=0;i<yhq2.length;i++){
				//var yguiq = yhq2[i].replace("'","");
				var yguiq = "https://taoquan.taobao.com/coupon/unify_apply.htm?sellerId="+$("#sellerId").val()+"&activityId="+yhq2[i].replace("'","");
				//console.log(yguiq);
				addYHQDiv(yguiq);
			}
		}
		
		//隐藏type
		$("#typediv").hide();
		
		//根据type 点击类型
		$("#typeRadio_" + $("#editType").val()).click();
		
		//活动时间
		$("#activityStartTime").val(new Date($("#editStartTime").val()).format("yyyy-MM-dd"));
		$("#activityEndTime").val(new Date($("#editEndTime").val()).format("yyyy-MM-dd"));
		timeChangeShow();
		
		
		//如果优惠券链接不是null 则显示真实活动
		if($("#editCouponUrl").val() != ''){
			$("#activityTypeRadio_2").click();
		}
		
		//如果跳转链接不是null 则点击开启
		//if($("#editJumpUrl").val() != ''){
			//$("#jumpUrlCheckBox").click();
		//}
		
		//是否收藏宝贝
		if($("#editIffav").val() == '1'){
			$("#iffav").click();
		}
		
		//是否自动关注
		if($("#editSfav").val() == '1'){
			//$("#sfav").click();
			$("#sfav").prop("checked",true);
		}
		//是否加购
		if($("#editIff").val() == '1'){
			//$("#sfav").click();
			$("#iff").prop("checked",true);
		}
		//是否超强模式
		if($("#editSsfav").val() == '1'){
			//$("#ssfav").click();
			$("#ssfav").prop("checked",true);
		}
		
		//修改按钮绑定事件
		$("#commitBtu").attr("onclick","edit()");
		$("#commitBtu").text("修改");
	}

	
});


//获取余额
function getMoney(){
	zkkj.asyncPost(ctx + "pay/getMoney", { 
		sellerNick : G_SellerNick,
	 } , function(result) {
		   if(result.success){
			   $("#totalFee").html(result.data.split("_")[0]);
			   $("#startPay").attr("href",result.data.split("_")[1]);
		   }
	}, function(e) {
		   return false;
	});
}
		
/**
 * 时间变化显示活动时长（多少天）
 */
function timeChangeShow () {
    var startTime = new Date($("#activityStartTime").val());
    var endTime = new Date($("#activityEndTime").val());
    var days = getTimeDifference(startTime, endTime, "days");
    days = (days == null || days < 0) ? "**" : days;
    $("#activity-time-scope").text(days);
}

//弹出框选择商品，只查询一次
var isFirst = true;
var currentChooseGoodsDiv = ''; // 当前弹出框对应div
function searchFirst(div){
	currentChooseGoodsDiv = div;
	if(isFirst){
		search(1);
		isFirst = false;
	}
}

var chooseGoodsDivNum = 0;
//新增选择商品div
function addChooseGoodsDiv(){
	if(chooseGoodsDivNum >= chooseGoodsDivNumMax){
	//if(chooseGoodsDivNum >= 4){
		$.alert("最多添加"+(chooseGoodsDivNumMax+1)+"个加购商品");
		return;
	}
	
	var id = new Date().getTime();
	var html = $("#chooseGoodsDivTemp").html().replace("templet_id","chooseGoodsDiv_" + id);
	html = html.replace("removeChooseGoodsDiv()","removeChooseGoodsDiv('chooseGoodsDiv_"+id+"')");
	html = html.replace("divCkItemTemp","divCkItem_" + id);
	html = html.replace("searchFirst()","searchFirst('divCkItem_"+id+"')");
	$("#chooseGoodsDiv").after(html);
	chooseGoodsDivNum ++;
	
	//弹出框
	searchFirst('divCkItem_'+id);
	$("#myModal").modal();
	
}
//删除选择商品div
function removeChooseGoodsDiv(id){
	$("#"+id).remove();
	chooseGoodsDivNum --;
	dynamicSku.remove(id.replace("chooseGoodsDiv","divCkItem"));
}


var chooseYHQDivNum = 0;
//新增优惠券div
function addYHQDiv(v){
	if(chooseYHQDivNum >= chooseYHQDivNumMax){
		$.alert("最多添加"+(chooseYHQDivNumMax+1)+"个优惠券链接");
		return;
	}
	
	
	var id = new Date().getTime();
	var html = $("#yhqDivTemp").html().replace("yhq_div","yhq_div_" + id);
	html = html.replace("removeYHQDiv()","removeYHQDiv('yhq_div_"+id+"')");
	if(v != undefined && v != ''){
		html = html.replace('value=""','value="'+v+'"');
	}
	
	
	$("#yhqDiv").after(html);
	chooseYHQDivNum ++;
	
}
//删除优惠券div
function removeYHQDiv(id){
	$("#"+id).remove();
	chooseYHQDivNum --;
}


//分页搜索 
var G_PageNo = 1;
var G_HasInitPagination = false;
function search(pageNum) {
	G_PageNo = parseInt(pageNum);
	zkkj.asyncPost(ctx + "goods/getGoods", {
		sellerNick : G_SellerNick,
		keyword : $("#txtTitle").val(),
		pageNo : G_PageNo
	}, function(result) {
		showTable(result);
	}, function(e) {
		alert("获取商品列表失败，请使用链接的方式查询！");
		return false;
	});
}

function getGoodsById() {
	G_PageNo = 1;
	zkkj.asyncPost(ctx + "goods/getGoodsById", {
		sellerNick : G_SellerNick,
		goodsUrl : $("#goodsUrl").val(),
	}, function(result) {
		showTable(result);
	}, function(e) {
		alert("出错了！请刷新页面！");
		return false;
	});
}



function showTable(result){
	if(result.error){
		$.alert(result.error);
		return;
	}
	
	if (result.total_results > 0) {
		var resHtml = "";
	  	if (result.items != null) {
	  		var itemList= result.items;
	  		for (var i = 0; i < itemList.length; i++) {
	  			resHtml += '<tr onclick="ckRow(this)" data-id="'+itemList[i].numIid+'" data-pic="'+itemList[i].picUrl+'" data-title="'+itemList[i].title+'">'
		  					+ '<td><input name="radio1" id="raditem'+itemList[i].numIid+'" type="radio"></td>'
		  					+ '<td><img src="'+itemList[i].picUrl+'" style="width:40px;" /></td>'
		  					+ '<td><a href="https://item.taobao.com/item.htm?id='+itemList[i].numIid+'" target="_blank">'+itemList[i].title+'</a></td>'
		  					+ '<td>'+itemList[i].price+'</td>'
	  					+ '</tr>';
	  		}
	  	}
	  	
	  	$('#tb_grid').html(resHtml);
	  	
	  	var pageCount =result.total_results;
		if (G_HasInitPagination) {
			$('#myPageCountSpan').pagination().updatePages(pageCount, G_PageNo);
		} else {
			G_HasInitPagination = true;
			$('#myPageCountSpan').pagination({
				pages: pageCount,
				//showCtrl: true,
				displayPage: 6,
				onSelect: function (num) {
					search(num); 
				}        
			});
		}
		//alert("ok");
	} else {
		alert("查询失败，请重试");
	}
}





 function ckRow(r) {
    $(r).find("input")[0].checked = true;
    item_id = $(r).attr("data-id");
    item_title = $(r).attr("data-title");
    item_pic = $(r).attr("data-pic");
    loadsku($(r).attr("data-id"));
 }

//sku  目的是用于展示， 保存数据时不用这个数据
var item_pic = "";
var item_title = "";
var item_id = "";
var item_skuid = "";
var item_skuname = "";
 function loadsku(itemid) { $.getJSON(ctx + "goods/getSku",{ 
	 sellerNick : G_SellerNick,
	 itemId: itemid 
 },  function (data) {
          if (data.skus.length > 0) {
              var resHtml = "";
			  if (data.skus != null) {
		  		var itemList = data.skus;
		  		for (var i = 0; i < itemList.length; i++) {
		  			resHtml += '<tr>'
			  					+ '<td> <input name="radio2" id="radsku'+itemList[i].skuId+'" data-skuid="'+itemList[i].skuId+'" type="radio"><label for="radsku'+itemList[i].skuId+'">'+itemList[i].propertiesName+'</label>  </td>'
		  					+ '</tr>';
		  		}
			  } 
			  	
			  $('#skuTable').html(resHtml);
              
          } else {
        	  $('#skuTable').html("");
              //$.alert("没有数据");
          }
      });
  }

 
 //第一个sku  保存数据时用这个数据  
 var item_pic_useful = "";
 var item_title_useful = "";
 var item_id_useful = "";
 var item_skuid_useful = "";
 //动态sku 保存数据时用这个数据
 var dynamicSku = new Map();
 
   function ckItemSku() {
        var sk = $(".skutable input:checked");
        var skall = $(".skutable input");
        item_skuid = sk.attr("data-skuid");
    	if (skall.length > 0) {
    		if (item_skuid == undefined || item_skuid == "") {
    			$.alert("请选择SKU");
    			return;
    		}
    		item_skuname = sk.next("label").html();
    	}else{
    		item_skuid = "";
    		item_skuname = "";
    	}
    	
        if(currentChooseGoodsDiv == 'divCkItem'){ //第一个商品div选择
        	 item_pic_useful = item_pic;
        	 item_title_useful = item_title;
        	 item_id_useful = item_id;
        	 item_skuid_useful = item_skuid;
        }else{ //动态商品div选择
        	//添加到动态数据，后台保存为ssc 
        	dynamicSku.put(currentChooseGoodsDiv,item_id+"^"+item_skuid);
        }
       
        $("#myModal").modal('hide');
        $("."+currentChooseGoodsDiv).html("<img width='50' src='" + item_pic + "'/><br/><a href='https://item.taobao.com/item.htm?id=" + item_id + "' target='_blank' >" + item_title + "</a><br/>" + item_skuname);
        
        //如果是版本2
        var v = parseInt($("input[name='radiot']:checked").val());
        if(v == 2 || v == 5){
        	$("#addChooseBtn").show();
        }
        
    }

//保存
function saveFunc() {
	var activityName = $("#activityName").val();;
	var activityStartTime = $("#activityStartTime").val();//开始时间
	var activityEndTime = $("#activityEndTime").val();//结束时间
	
	var iffav = $("#iffav").is(':checked') ? 1:0;//收藏宝贝
	var sfav = $("#sfav").is(':checked') ? 1:0;//自动关注
	var iff = $("#iff").is(':checked') ? 1:0;//是否加购
	var ssfav = $("#ssfav").is(':checked') ? 1:0;//超强模式
	
	if(activityName.trim() == ''){
		$.alert("请输入活动名称");
		return;
	}
	if(activityStartTime.trim() == ''){
		$.alert("请输入活动开始时间");
		return;
	}
	if(activityEndTime.trim() == ''){
		$.alert("请输入活动结束时间");
		return;
	}
	//判断天数是否正确
	var days = $("#activity-time-scope").html();
	if(days == "" || days == "**" ||  days == "0"){
		$.alert("请选择正确的活动天数");
		return;
	}
	
	var v = parseInt($("input[name='radiot']:checked").val());
	var yhq = "";
	var itemid = "";
	var skuid = "";
	if (v != 1 && v != 6) {
		itemid = item_id_useful;
		var skall = $(".skutable input");
//		var sk = $(".skutable input:checked");
//		skuid = sk.attr("data-skuid");
		skuid = item_skuid_useful;
		
		if(v == 4){
			if (itemid == "") {
				$.alert("请选择需要收藏的宝贝");
				return;
			}
		}else{
			if(v != 8){//优惠券+访客旺旺
				if (itemid == "") {
					$.alert("请选择加购物车的宝贝");
					return;
				}
			}
		}
		
		
//		if (skall.length > 0) {
//			if (skuid == "") {
//				$.alert("请选择加购物车宝贝的SKUID");
//				return;
//			}
//		}
	}
	
	var link = $("#txtLink").val();
	if (link != "") {
		if(link.indexOf("taoquan.taobao.com") != -1){
			if (!/=[a-z0-9]{32}/.test(link)) {
				$.alert("请输入正确的优惠券页面链接");
				return;
			}
			try {
				yhq = link.match(/=([a-z0-9]{32})/)[1];
			} catch (e) {
				$.alert("请输入正确的优惠券页面链接");
				return; 
			}
		}else{ 
			if (link.length != 32) {
				$.alert("请输入正确的优惠券页面链接");
				return;
			}
		}
	}
	//额外优惠券
	var yguiq2 = new Array();
	$('.yguiq2').each(function(i,n){
		if($(n).val() != ''){
			link = $(n).val();
			if (link != "") {
				if(link.indexOf("taoquan.taobao.com") != -1){
					if (!/=[a-z0-9]{32}/.test(link)) {
						$.alert("请输入正确的优惠券页面链接");
						return;
					}
					try {
						var yguiq = link.match(/=([a-z0-9]{32})/)[1];
						yguiq2.push(yguiq);
					} catch (e) {
						$.alert("请输入正确的优惠券页面链接");
						return; 
					}
				}else{ 
					if (link.length != 32) {
						$.alert("请输入正确的优惠券页面链接");
						return;
					}
				}
			}
		}
	}); 
	
	var imgurl = $("#txtImgLink").val();
	var pagelink = $("#txtPageUrl").val();
	
	if(pagelink.length > 0){
		if(pagelink.substring(0,4) != 'http'){
			$.alert("跳转链接必须以http或https开头");
			return;
		}
	}
	
	
	//loading
	$("#commitBtu").addClass("disabled");
	
	//额外的购物车宝贝
	var paramArray = new Array();
	for(var key in dynamicSku.elements) { 
	    //console.log(recommendData.elements[key].key); 
		var values = dynamicSku.elements[key].value.split("^");
		paramArray.push({
			"quantity": 1,
			"itemId": values[0],
			"skuId": values[1],
			"exParams": "{'id':'"+values[0]+"'}",
		});
	} 
	//console.log(JSON.stringify(paramArray));
	
	zkkj.asyncPostJson(ctx + "activity/addActivity",{
		activityName : activityName,
		startTime : activityStartTime,
		endTime : activityEndTime,
		type : v,
		itemId : itemid,
		itemName : item_title_useful,
		itemImg : item_pic_useful,
		skuId : skuid,
		couponUrl : yhq,
		templetImgUrl : imgurl,
		jumpUrl : pagelink,
		iffav : iffav,
		sfav : sfav,
		iff : iff,
		ssfav : ssfav,
		sellerNick : G_SellerNick,
		ssc : JSON.stringify(paramArray),
		yguiq2 : yguiq2.toString(),
	//skulength: $(".skutable input").length,
	},
	function(result) {
		if (result.success) {
			$.confirm({
						body : "生成的链接：<br/><div class='blue'>"
								+ result.message
								+ "</div><br/> <br/><center>把该链接放到详情页或者店铺首页吧！</center>",
						hidden : function() {
							window.location.href = $("#backBtu").attr("href");
						}
					}); 
		
		} else {
			$.alert(result.message);
		}
		//loading
		$("#commitBtu").removeClass("disabled");
	}, function(e) {
		alert("出错了！请刷新页面！");
		//loading
		$("#commitBtu").removeClass("disabled");
		return false;
	});
}

//保存，通过type type6 保存 需要通过插件
function save(){
	var v = parseInt($("input[name='radiot']:checked").val());
	if(v == 6){
		//调用插件
		if(!chajianInstall){
			$.alert("该类型的活动需要安装浏览器插件。<a href='' target='_blank'>下载</a>,安装后请刷新页面！");
		}else{
			dispatchEvent("coupon.createPoster", {activityName: "送流量啦~", uid: loginSellerId});
		}
	}else{
		saveFunc();
	}
}
//创建海报测试
//dispatchEvent("coupon.createPoster", {activityName: "送流量啦~", uid: 1450257411})
// 修改海报测试
//dispatchEvent("coupon.createPoster", {activityName: "送流量啦~", uid: 14502574, activityId: 166186, rsid: 28781402, proid: 33005702})
//type6 保存 需要通过插件
function dispatchEvent (eventName, eventData) {
    var event = new CustomEvent(eventName, {
        detail: eventData
    });
    document.dispatchEvent(event);
}
document.addEventListener('coupon.createPoster.callback', function(event){
    var detail = event.detail;
    console.log("插件返回:", detail);
    if(detail.success) {
    	$("#txtPageUrl").val(detail.data.publishUrl);
    	saveFunc();
    }else{
    	if(detail.message.indexOf("商家未签约流量平台") != -1){
    		$.alert(detail.message+"  <a href='https://partner.aliqin.tmall.com' target='_blank'>前往淘宝签约</a>");
    	}else if(detail.message.indexOf("余额不足") != -1){
    		$.alert(detail.message+" 请确保 余额 >= 20元 <br> <a href='https://partner.aliqin.tmall.com' target='_blank'><font style='text-decoration:underline;font-size:20px;color:red;'>现在充值</font></a>");
    	}else if(detail.message.indexOf("登录淘宝") != -1){
    		$.alert(detail.message+" <a href='https://login.taobao.com' target='_blank'>去登录淘宝</a>");
    	}else{
    		$.alert(detail.message);
    	}
    }
});
//插件是否安装
document.addEventListener('coupon.pluginTest.callback', function(event){
    var detail = event.detail;
    console.log("插件返回:", detail);
    chajianInstall = true;
});


//修改
function edit() {
	var activityName = $("#activityName").val();;
	var activityStartTime = $("#activityStartTime").val();//开始时间
	var activityEndTime = $("#activityEndTime").val();//结束时间
	var iffav = $("#iffav").is(':checked') ? 1:0;//收藏宝贝
	var sfav = $("#sfav").is(':checked') ? 1:0;//自动关注
	var iff = $("#iff").is(':checked') ? 1:0;//是否加购
	var ssfav = $("#ssfav").is(':checked') ? 1:0;//超强模式
	if(activityName.trim() == ''){
		$.alert("请输入活动名称");
		return;
	}
	if(activityStartTime.trim() == ''){
		$.alert("请输入活动开始时间");
		return;
	}
	if(activityEndTime.trim() == ''){
		$.alert("请输入活动结束时间");
		return;
	}
	//判断天数是否正确
	var days = $("#activity-time-scope").html();
	if(days == "" || days == "**" ||  days == "0"){
		$.alert("请选择正确的活动天数");
		return;
	}
	
	var v = parseInt($("input[name='radiot']:checked").val());
	var yhq = "";
	var itemid = "";
	var skuid = "";
	if (v != 1) {
		//宝贝id 可以不输入，不输代表 不变
		itemid = item_id_useful;
		skuid = item_skuid_useful;
	}
	var link = $("#txtLink").val();
	if (link != "") {
		if(link.indexOf("taoquan.taobao.com") != -1){
			if (!/=[a-z0-9]{32}/.test(link)) {
				$.alert("请输入正确的优惠券页面链接");
				return;
			}
			try {
				yhq = link.match(/=([a-z0-9]{32})/)[1];
			} catch (e) {
				$.alert("请输入正确的优惠券页面链接");
				return; 
			}
		}
		/*else if(link.indexOf("m.tb.cn") != -1){
			var flag = false;
			//通过接口去获取真实的优惠券id
			zkkj.post("specialCouponUrl",{
				url : link,
			},
			function(result) {
				if(result.message != ''){
					yhq = result.message;
					flag = true;
				}
			}, function(e) {
			});
			if(!flag){
				$.alert("请输入正确的优惠券页面链接");
				return;
			}
		}*/
		else{ 
			if (link.length != 32) {
				$.alert("请输入正确的优惠券页面链接");
				return;
			}
		}
		
	}
	var imgurl = $("#txtImgLink").val();
	var pagelink = $("#txtPageUrl").val();
	
	//额外的购物车宝贝
	var paramArray = new Array();
	for(var key in dynamicSku.elements) { 
	    //console.log(recommendData.elements[key].key); 
		var values = dynamicSku.elements[key].value.split("^");
		paramArray.push({
			"quantity": 1,
			"itemId": values[0],
			"skuId": values[1],
			"exParams": "{'id':'"+values[0]+"'}",
		});
	} 
	
	//额外优惠券
	var yguiq2 = new Array();
	$('.yguiq2').each(function(i,n){
		if($(n).val() != ''){
			link = $(n).val();
			if (link != "") {
				if(link.indexOf("taoquan.taobao.com") != -1){
					if (!/=[a-z0-9]{32}/.test(link)) {
						$.alert("请输入正确的优惠券页面链接");
						return;
					}
					try {
						var yguiq = link.match(/=([a-z0-9]{32})/)[1];
						yguiq2.push(yguiq);
					} catch (e) {
						$.alert("请输入正确的优惠券页面链接");
						return; 
					}
				}else{ 
					if (link.length != 32) {
						$.alert("请输入正确的优惠券页面链接");
						return;
					}
				}
			}
		}
	}); 
	
	zkkj.asyncPostJson(ctx + "activity/editActivity",{
		id : $("#editId").val(),
		activityName : activityName,
		startTime : activityStartTime,
		endTime : activityEndTime,
		type : v,
		itemId : itemid,
		itemName : item_title_useful,
		itemImg : item_pic_useful,
		skuId : skuid,
		couponUrl : yhq,
		templetImgUrl : imgurl,
		jumpUrl : pagelink,
		iffav : iffav,
		sfav : sfav,
		iff : iff,
		ssfav : ssfav,
		sellerNick : G_SellerNick,
		ssc : JSON.stringify(paramArray),
		yguiq2 : yguiq2.toString(),
		//skulength: $(".skutable input").length,
	},
	function(result) {
		if (result.success) {
			$.confirm({
				body : "修改成功",
					hidden : function() {
						window.location.href = $("#backBtu").attr("href");
					}
			});
		} else {
			$.alert(result.message);
		}
		
	}, function(e) {
		alert("出错了！请刷新页面！");
		return false;
	});
}



//日期快捷标签(日期+时间格式)
function dateTag(day) {
    var da = new Date().format("yyyy-MM-dd");
    var addDate = new Date(Date.parse(da) + (86400000 * day)).format("yyyy-MM-dd");
    
    $("#activityEndTime").val(addDate);
    timeChangeShow();
}


/*更多文章显示隐藏效果 start*/
var showpage = document.getElementById("showpage");
var welfarePage = document.getElementById("welfarePage");
var speed = 1;
var timer = null;
var alpha=0;

showpage.onmouseover = function(){
	welfarePage.style.display="block";
	showpage.setAttribute("class", "on");
	startrun(100);
}

showpage.onmouseout = function(){
	startrun(0);
	showpage.setAttribute("class", "out");
}

welfarePage.onmouseover = function(){
	welfarePage.style.display="block";
	showpage.setAttribute("class", "on");
	startrun(100);
}

welfarePage.onmouseout = function(){
	startrun(0);
	showpage.setAttribute("class", "out");
}

//渐变消失和显示
function startrun(target){
  clearInterval(timer);
  timer = setInterval(function(){
    if(target > alpha){
      speed = 1;
    }else{
      speed = -1;
    }
    
    if(alpha == target){
      clearInterval(timer);
    }
    else{
      alpha = alpha + speed;
      welfarePage.style.filter = 'alpha(opacity='+alpha+')';
      welfarePage.style.opacity = alpha/100;
		if(alpha==0){
			welfarePage.style.display="none";
		}
    }
  },0)
}
/*更多文章显示隐藏效果 end*/