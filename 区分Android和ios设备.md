## 区分安卓、ios、设备
```
<!DOCTYPE html>

<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="apple-mobile-web-app-title" content="title" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<meta content="telephone=no" name="format-detection" />
		<title>客户端下载</title>
	</head>

	<body>
		<a href="javascript:download();">点击我</a>
	</body>

</html>
<script type="text/javascript">
		/*
		 * 立即下载
		 */
		function download(){
			//ios的苹果商店地址和安卓的应用宝地址
			var iosPath = "https://itunes.apple.com/cn/app/%E6%AD%8C%E5%BE%B7%E8%80%81%E9%85%92%E8%A1%8C-%E6%AD%A3%E5%93%81%E8%80%81%E9%85%92%E6%94%B6%E8%97%8F%E8%B4%AD%E4%B9%B0%E5%B9%B3%E5%8F%B0/id1128285390?mt=8";
			var androidPath = "http://a.app.qq.com/o/simple.jsp?pkgname=com.yek.android.gede";

			//应用宝
//			var androidYyb = "http://android.myapp.com/myapp/detail.htm?apkName=com.sound.haolei.android";
//			var iosYyb = "http://a.app.qq.com/o/simple.jsp?pkgname=com.sound.haolei.android";

			function isWeiXin() {
				var ua = window.navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i) == 'micromessenger') {
					return true;
				} else {
					return false;
				}
			}

			/*
			 * 智能机浏览器版本信息:
			 */
			var browser = {
				versions: function() {
					var u = navigator.userAgent,
						app = navigator.appVersion;
					return { //移动终端浏览器版本信息
						trident: u.indexOf('Trident') > -1, //IE内核
						presto: u.indexOf('Presto') > -1, //opera内核
						webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
						gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
						mobile: !!u.match(/AppleWebKit.*Mobile.*/) ||
							!!u.match(/AppleWebKit/), //是否为移动终端
						ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
						android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
						iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
						iPad: u.indexOf('iPad') > -1, //是否iPad
						webApp: u.indexOf('Safari') == -1
						//是否web应该程序，没有头部与底部
					};
				}(),
				language: (navigator.browserLanguage || navigator.language)
					.toLowerCase()
			}

			if(isWeiXin()) {
				//如果是微信则跳转应用宝
				window.location = androidPath;
			} else {
				if(browser.versions.ios || browser.versions.iPhone ||
					browser.versions.iPad) {
					window.location = iosPath;
				} else if(browser.versions.android) {
					if(window.apk_file_path != '') {
						window.location = androidPath;
					} else {
						window.location = androidPath;
					}
				} else {
					window.location = androidPath;
				}
			}
		}
</script>

```