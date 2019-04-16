/*
 * 每三位加上逗号,适用于金钱格式化
 * 123456789 => 123,456,789
*/
function addCommas(value) {
  return parseFloat(value || 0).toLocaleString();
}

/**
 * 文本转html
 */
function parseHtml(htmlBlock) {
    var parser = new DOMParser();
    return parser.parseFromString(htmlBlock, "text/html");
}
/**
 * json转Form
 */
function json2Form(json) {
    var str = [];
    for(var p in json){
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}
/**
 * 获取URL
 */

function GetURL(message){
   var reg =  /(http[s]?:\/\/([\w-]+.)+([:\d+])?(\/[\w-\.\/\?%&=]*)?)/gi;
   var done_message = message.match(reg);
   return done_message[0]
}

/*'yyyy-MM-dd HH:mm:ss'格式的字符串转日期*/
function stringToDate(str){
    var tempStrs = str.split(" ");
    var dateStrs = tempStrs[0].split("-");
    var year = parseInt(dateStrs[0], 10);
    var month = parseInt(dateStrs[1], 10) - 1;
    var day = parseInt(dateStrs[2], 10);
    var timeStrs = tempStrs[1].split(":");
    var hour = parseInt(timeStrs [0], 10);
    var minute = parseInt(timeStrs[1], 10);
    var second = parseInt(timeStrs[2], 10);
    var date = new Date(year, month, day, hour, minute, second);
    return date;
}



//计算小时数后剩余的毫秒数
function TimeDiff(date1, date2) {
    var date3 = date2.getTime()-date1.getTime()  //时间差的毫秒数
    //计算出相差天数
    var days=Math.floor(date3/(24*3600*1000))
    //计算出小时数
    var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
    var hours=Math.floor(leave1/(3600*1000))
    //计算相差分钟数
    var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
    var minutes=Math.floor(leave2/(60*1000))
    //计算相差秒数
    var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    var seconds=Math.round(leave3/1000)
    var time = {
      "days": days,
      "hours": hours,
      "minutes": minutes,
      "seconds": seconds
    }
    return time
}
/**
 * 函数防抖
 * 禁止短时间内多次点击
 */
function debounce (func, wait = 50, immediate = true) {
    let timer,context,args;
    const later = () => setTimeout(() => {
        timer = null;
        if(!immediate){
            func.apply(context,args);
            context = args = null;
        }
    },wait)
    return function (...params) {
        if(!timer){
            timer = later();
            if(!immediate){
                func.apply(this,param)
            }else{
                context = this;
                args = params;
            }
        }else{
            clearTimeout(timer);
            timer = later();
        }
    }
}