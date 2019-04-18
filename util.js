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
 * @description 数组顺序打乱
 * @param arr
 * @returns {*}
 * upsetArr([1,2,3,4,5])
 */
const upsetArr = arr =>{
  let j,_item;
  for(let i=0;i<arr.length;i++){
    j = Math.floor(Math.random() * i);
    _item = arr[i];
    arr[i] = arr[j];
    arr[j] = _item;
  }
  return arr;
};
const upsetArrSimple = arr =>{
  return arr.sort(()=>{
    return Math.random() - 0.5;
  })
};

/**
 * 检测密码强度
 * @param str
 * @returns {number}
 */
const checkPwdLevelSimple = str =>{
  let nowLv = 0;
  if (str.length < 6)
    return nowLv;
  if (/[0-9]/.test(str))
    nowLv++;
  if (/[a-z]/.test(str))
    nowLv++;
  if (/[A-Z]/.test(str))
    nowLv++;
  if (/[\.|-|_]/.test(str))
    nowLv++;
  return nowLv;
};
const checkPwdLevel = str => {
  let nowLv = 0;
  if (str.length < 6)
    return nowLv;
  let rules=[/[0-9]/,/[a-z]/,/[A-Z]/,/[\.|-|_]/];
  for(let i=0;i<rules.length;i++){
    if(rules[i].test(str))
      nowLv++;
  }
  return nowLv;
};
/**
 * @description 设置cookie
 * @param name cookie名称
 * @param value 值
 * @param iDay 有效时间（天数）
 *
 * ecDo.setCookie(cookieName,'守候',1)//设置（有效时间为1天）
 * ecDo.getCookie(cookieName)//获取
 * ecDo.removeCookie(cookieName)//删除
 */
const setCookie = (name, value, iDay) => {
  let oDate = new Date();
  oDate.setDate(oDate.getDate() + iDay);
  document.cookie = name + '=' + value + ';expires=' + oDate;
};
/**
 * @description 获取cookie
 * @param name cookie名称
 */
const getCookie = name => {
  let arr = document.cookie.split('; '),arr2;
  for (let i = 0; i < arr.length; i++) {
    arr2 = arr[i].split('=');
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
  return '';
};
/**
 * @description 删除cookie
 * @param name cookie名称
 */
const removeCookie = name=> {
  this.setCookie(name, 1, -1);
};

/**
 * @description 降序返回数组（字符串）每个元素的出现次数
 * @param arr
 * @return {Array}
 */
const getCount = arr => {
  let obj = {}, k, arr1 = [];
  //记录每一元素出现的次数
  for (let i = 0, len = arr.length; i < len; i++) {
    k = arr[i];
    if (obj[k]) {
      obj[k]++;
    } else {
      obj[k] = 1;
    }
  }
  //保存结果{el-'元素'，count-出现次数}
  for (let o in obj) {
    arr1.push({el: o, count: obj[o]});
  }
  //排序（降序）
  arr1.sort(function (n1, n2) {
    return n2.count - n1.count
  });
  return arr1;
};
/**
 * @description 检测字符串
 */

const checkType = (function(){
  let rules={
    email(str){       return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);    },
    mobile(str){      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);    },
    tel(str){         return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);    },
    number(str){      return /^[0-9]$/.test(str);    },
    english(str){     return /^[a-zA-Z]+$/.test(str);    },
    text(str){        return /^\w+$/.test(str);    },
    chinese(str){     return /^[\u4E00-\u9FA5]+$/.test(str);    },
    lower(str){       return /^[a-z]+$/.test(str);    },
    upper(str){       return /^[A-Z]+$/.test(str);    }
  };
  return {
    /**
     * @description 检测接口
     * @param str 待处理字符串
     * @param type 待检测的类型
     */
    check(str, type){      return rules[type]?rules[type](str):false;    },
    /**
     * @description 添加规则扩展接口
     * @param type 规则名称
     * @param fn 处理函数
     */
    addRule(type,fn){      rules[type]=fn;    }
  }
})();
/**
 * @description 清除左右空格
 */
const trim = str => {  return str.replace(/(^\s*)|(\s*$)/g, "");};
/**
 * @description 清除所有空格
 */
const trimAll = str => {  return str.replace(/\s+/g, "");};
/**
 * @description 清除左空格
 */
const trimLeft = str=> {  return str.replace(/(^\s*)/g, "");};
/**
 * @description 清除右空格
 */
const trimRight = str => {  return str.replace(/(\s*$)/g, "");};


/**
 * @description 加密字符串
 * @param regIndex 加密位置  （开始加密的索引，结束加密的索引）
 * @param ARepText 加密的字符 （默认*）
 */
const encryptStr = (str, regIndex, ARepText = '*') =>{
  let regtext = '',
    Reg = null,
    _regIndex=regIndex.split(','),
    replaceText = ARepText;
  //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
  _regIndex=_regIndex.map(item=>+item);
  regtext = '(\\w{' + _regIndex[0] + '})\\w{' + (1+_regIndex[1]-_regIndex[0]) + '}';
  Reg = new RegExp(regtext);
  let replaceCount = this.repeatStr(replaceText, (1+_regIndex[1]-_regIndex[0]));
  return str.replace(Reg, '$1' + replaceCount);
};
/**
 * @description 不加密字符串
 * @param regIndex 不加密位置  （开始加密的索引，结束加密的索引）
 * @param ARepText 不加密的字符 （默认*）
 */
const encryptUnStr = (str, regIndex, ARepText = '*') => {
  let regtext = '',
    Reg = null,
    _regIndex=regIndex.split(','),
    replaceText = ARepText;
  _regIndex=_regIndex.map(item=>+item);
  regtext = '(\\w{' + _regIndex[0] + '})(\\w{' + (1+_regIndex[1]-_regIndex[0]) + '})(\\w{' + (str.length-_regIndex[1]-1) + '})';
  Reg = new RegExp(regtext);
  let replaceCount1 = this.repeatStr(replaceText, _regIndex[0]);
  let replaceCount2 = this.repeatStr(replaceText, str.length-_regIndex[1]-1);
  return str.replace(Reg, replaceCount1 + '$2' + replaceCount2);
};
/**
 * @description 字符串开始位置加密
 * @param regIndex 加密长度
 * @param ARepText 加密的字符 （默认*）
 */
const encryptStartStr = (str,length,replaceText = '*') => {
  let regtext = '(\\w{' + length + '})';
  let Reg = new RegExp(regtext);
  let replaceCount = this.repeatStr(replaceText, length);
  return str.replace(Reg, replaceCount);
};
/**
 * @description 字符串结束位置加密
 * @param regIndex 加密长度
 * @param ARepText 加密的字符 （默认*）
 */
const encryptEndStr = (str,length,replaceText = '*') => {
  return this.encryptStartStr(str.split('').reverse().join(''),length,replaceText).split('').reverse().join('');
};

//console.log(`加密字符 ${ecDo.encryptStr('18819233362','3,7','+')}`)
//result:188+++++362
//console.log(`不加密字符 ${ecDo.encryptUnStr('18819233362','3,7','+')}`)
//result:+++19233+++
//console.log(`字符串开始位置加密 ${ecDo.encryptStartStr('18819233362','4')}`)
//result:****9233362
//console.log(`字符串结束位置加密 ${ecDo.encryptEndStr('18819233362','4')}`)
//result:1881923****
/**
 * json 转  Form
 */
const json2Form = json => {
  var str = []
  for(var p in json){
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]))
  }
  return str.join("&")
};
/**
 * 写cookie
 * @param {Object} name
 * @param {Object} value
 * @param {Object} hours
 */
function _writeCookie(name, value, hours) {
  var expire = "";
  if (hours != null) {
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = "; expires=" + expire.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expire + ";path=/;domain=.yesmywine.com";
}
/**
 * 设置domain
 */
   function setDomain() {
     var d = document.domain;
     if (d.indexOf('.')<0 || isIP(d)) return;
     var k = d.split('.'), d1=k[k.length-1], d2=k[k.length-2], d3=k[k.length-3];
     document.domain = (d2=='com' || d2=='net')?(d3+'.'+d2+'.'+d1):(d2+'.'+d1);
   }
   /**
    * ip正则
    * @param {Object} str
    */
function isIP(str) {
  var re = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
  return re.test(str);
}
/**
 * 获取domain
 * @param {Object} url
 */
function getDomain(url) {
  if (url.indexOf('http://')==0) return url.split('/')[2];
  if (url.indexOf('https://')==0) return url.split('/')[2];
  return '';
}
/**
 * 判断Object是不是空
 * @param {Object} obj
 */
const isEmptyObject = function (obj){
  return Object.getOwnPropertyNames(obj).length === 0;
}


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
