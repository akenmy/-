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
/**、
 * 时间格式化
 * 年/月/日  时:分:秒
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/**
 * 数字格式化  防止显示错误
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 函数节流   间隔时间1500ms
 */
const throttle = (fn, gapTime) => {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500;
  }
  let _lastTime = null;
  return function () {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments);
      _lastTime = _nowTime;
    }
  }
};

/**
 * trim 正则
 * @param {Object} str
 */
const trim = function (str) {
  return str.replace(/(^\s*)|(\s*$)/g,"");
};
/**
 * 输入框检测
 */
const checkInput = (value) => {
  var regEmoji = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
  var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/g;
  var regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/g;
  var regBlack = /(^\s*)|(\s*$)/g;
  if (regEmoji.test(value)) {
    wx.showToast({
      title: '不允许使用表情',
      icon: 'none',
      duration: 2000
    });
    return false;
  }
  if (regBlack.test(value)) {
    wx.showToast({
      title: '不允许使用空格',
      icon: 'none',
      duration: 2000
    });
    return false;
  }
  if (regEn.test(value) || regCn.text(value)) {
    wx.showToast({
      title: '不允许使用符号',
      icon: 'none',
      duration: 2000
    });
    return false;
  }
  return true;
};
/**
 * 清楚所有定时器
 */
const clearAllInterval = () => {
  var last = setInterval();
  for(;last >= 0;last--){
    clearInterval(last);
  }
};
/**
 * 金钱格式化 保留小数点后两位小数
 */
const moneyFormat = (value) => {
  if(!value)
    return "0.00";
  value = parseFloat(value).toFixed(2);
  var numsArr = value.toString().split(".");
  var num1 = numsArr[1].substring(0,2);
return  numsArr[0] + "." +  num1
};
/**
 * 模块抛出
 */
module.exports = {
  cartInof: cartInof,
  formatTime: formatTime,
  sumCart: sumCart,
  throttle: throttle,
  logsnew: logsnew,
  beginloading: beginloading,
  endloading: endloading,
  networkType: networkType,
  networkChange: networkChange,
  trim:trim,
  checkInput:checkInput,
  clearAllInterval:clearAllInterval,
  moneyFormat:moneyFormat
};
