# nrm的安装
	npm install -g nrm
# ls 列出可选的源
	```
	nrm ls
	* npm ---- https://registry.npmjs.org/
	  cnpm --- http://r.cnpmjs.org/
	  taobao - https://registry.npm.taobao.org/
	  nj ----- https://registry.nodejitsu.com/
	  rednpm - http://registry.mirror.cqupt.edu.cn/
	  npmMirror  https://skimdb.npmjs.com/registry/
	  edunpm - http://registry.enpmjs.org/
	带*的是当前使用的源，上面的输出表明当前源是官方源。
	```
# test 测试所有源的相应时间
	```
	nrm test
	* npm ---- Fetch Error
	  cnpm --- 382ms
	  taobao - Fetch Error
	  nj ----- Fetch Error
	  rednpm - 1383ms
	  npmMirror  Fetch Error
	  edunpm - 5470ms
	```
# use 切换源
	```
	nrm use edunpm
	Registry has been set to: http://registry.enpmjs.org/
	```
	
# 查看当前源
	```
	npm config get registry
	换
	npm config set registry http://registry.enpmjs.org/
	```
	