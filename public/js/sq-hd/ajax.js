if (!this.zkkj) {
	zkkj = {};
}
if (!this.zkkj.config) {
	zkkj.config = {};
}

/**
 * 同步 JqueryAjax，application/x-www-form-urlencoded;charset=utf-8
 * 
 * @param url
 *            请求url
 * @param data
 *            数据
 * @param success
 *            请求成功回调函数
 * @param errback
 *            请求失败回调函数
 */
zkkj.post = function(url, data, callback, errback) {
	zkkj.ajaxPost(url, data, callback, errback, false);
};

/**
 * 异步 JqueryAjax，application/x-www-form-urlencoded;charset=utf-8
 * 
 * @param url
 *            请求url
 * @param data
 *            数据
 * @param success
 *            请求成功回调函数
 * @param errback
 *            请求失败回调函数
 */
zkkj.asyncPost = function(url, data, callback, errback) {
	zkkj.ajaxPost(url, data, callback, errback, true);
};

/**
 * 同步 JqueryAjax，contentType : "application/json"
 * 
 * @param url
 *            请求url
 * @param data
 *            数据
 * @param success
 *            请求成功回调函数
 * @param errback
 *            请求失败回调函数
 */
zkkj.postJson = function(url, data, callback, errback) {
	zkkj.ajaxPostJson(url, data, callback, errback, false);
};

/**
 * 异步 JqueryAjax，contentType : "application/json"
 * 
 * @param url
 *            请求url
 * @param data
 *            数据
 * @param success
 *            请求成功回调函数
 * @param errback
 *            请求失败回调函数
 */
zkkj.asyncPostJson = function(url, data, callback, errback) {
	zkkj.ajaxPostJson(url, data, callback, errback, true);
};

/**
 * JqueryAjax，"application/x-www-form-urlencoded;charset=utf-8"
 * 
 * @param url
 *            请求url
 * @param data
 *            数据
 * @param success
 *            请求成功回调函数
 * @param errback
 *            请求失败回调函数,如果发生了错误，错误信息（第二个参数）textStatus 除了得到 null 之外，还可能是
 *            "timeout", "error", "notmodified" 和 "parsererror"。
 * @param async
 *            是否异步
 */
zkkj.ajaxPost = function(url, data, success, errback, async) {
	$.ajax({
		type : "post",
		url : url,
		dataType : "json",
		async : async,
		contentType : "application/x-www-form-urlencoded;charset=utf-8",
		data : data,
		success : success,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if(XMLHttpRequest.responseText.indexOf("timeout") !=-1){
			jqAlert("登录超时，请重新登录");
				window.location.href= ctx;
				return false;
			}
			if (errback) {
				errback(XMLHttpRequest, textStatus);
			} else if (XMLHttpRequest.responseText.length > 0) {
			jqAlert(XMLHttpRequest.responseText);
			}
		}
	});
};

/**
 * JqueryAjax，contentType : "application/json",
 * 
 * @param url
 *            请求url
 * @param data
 *            数据
 * @param success
 *            请求成功回调函数
 * @param errback
 *            请求失败回调函数
 * @param async
 *            是否异步
 */
zkkj.ajaxPostJson = function(url, data, callback, errback, async) {
	$.ajax({
		type : "post",
		url : url,
		dataType : "json",
		async : async,
		contentType : "application/json",
		data : JSON.stringify(data),
		success : callback,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if(XMLHttpRequest.responseText.indexOf("timeout") !=-1){
			jqAlert("登录超时，请重新登录");
				window.location.href= ctx;
				return false;
			}
			if (errback) {
				errback(XMLHttpRequest, textStatus);
			} else if (XMLHttpRequest.responseText.length > 0) {
			jqAlert(XMLHttpRequest.responseText);
			}
		}
	});
};
