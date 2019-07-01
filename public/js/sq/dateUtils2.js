//扩展Date的format方法   
    Date.prototype.format = function (format) {  
        var o = {  
            "M+": this.getMonth() + 1,  
            "d+": this.getDate(),  
            "h+": this.getHours(),  
            "m+": this.getMinutes(),  
            "s+": this.getSeconds(),  
            "q+": Math.floor((this.getMonth() + 3) / 3),  
            "S": this.getMilliseconds()  
        }  
        if (/(y+)/.test(format)) {  
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
        }  
        for (var k in o) {  
            if (new RegExp("(" + k + ")").test(format)) {  
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
            }  
        }  
        return format;  
    } 

/**
 * js时间日期格式化
 * @param date new Date()
 * @param format yyyy-MM-dd HH:mm:ss
 * @returns {*}
 */
function formatDatetime (date, format) {
    if (typeof (date) != "object" || date == null) {
        throw "please input the correct date value !";
    }
    if (typeof (format) != "string" || format == null) {
        throw "please input the correct format value !";
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = fillZero(month);
    var days = date.getDate();
    days = fillZero(days);
    var hours = date.getHours();
    hours = fillZero(hours);
    var minutues = date.getMinutes();
    minutues = fillZero(minutues);
    var seconds = date.getSeconds();
    seconds = fillZero(seconds);

    var result = format;
    result = result.replace("yyyy", year);
    result = result.replace("MM", month);
    result = result.replace("dd", days);
    result = result.replace("HH", hours);
    result = result.replace("mm", minutues);
    result = result.replace("ss", seconds);

    return result;
}

/**
 * 个位数在前面添加0 : 2 --> "02"
 */
function fillZero (num) {
    if ( num < 10 && num >= 0 ) {
        num = "0" + num;
    }
    return num;
}

function getFormatDateByLong(l, pattern) {  
    return getFormatDate(new Date(l), pattern);  
}

/**   
 *转换日期对象为日期字符串   
 * @param l long值   
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss   
 * @return 符合要求的日期字符串   
 */    
 function getFormatDate(date, pattern) {  
     if (date == undefined) {  
         date = new Date();  
     }  
     if (pattern == undefined) {  
         pattern = "yyyy-MM-dd hh:mm:ss";  
     }  
     return date.format(pattern);  
 }  
 
/**
 * 验证时间字符串是否为 2012-01-31 09:00  这种格式
 */
function validateTimeString (timeString) {
	//var reDateTime = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
	var reDateTime = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/;
	//return reDateTime.test('2012-01-31 09:00');
	return reDateTime.test(timeString);
}

/**
 * 两个时间之间相差x天/小时/分钟/秒
 * -- 结果为小数时四舍五入
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @param filed 结果时间单位 天：days；小时：hours；分钟：minutes；秒：seconds
 */
function getTimeDifference (startTime, endTime, filed) {
    var distance = endTime.getTime() - startTime.getTime();// 毫秒数
    if (isNaN(distance) || typeof (filed) == "undefined") {
        return null;
    }
    var result;
    if (filed == "days") {
        result = distance / 1000 / 3600 / 24;
    } else if (filed == "hours") {
        result = distance / 1000 / 3600;
    } else if (filed == "minutes") {
        result = distance / 1000 / 60;
    } else if (filed == "seconds") {
        result = distance / 1000;
    }
    return Math.round(result);
}
