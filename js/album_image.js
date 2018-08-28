(function () {
	var EU       = EventUtil, //事件模块
	album        = document.getElementById('album'), //相册
	albumCover   = document.getElementById('album-cover'), //相册封面
	albumContent = document.getElementById('album-content'), //相册内容
	data         = albums, //相册数据
	imagesLength, //单个相册相片数量
	pattern = /\s\([0-9]+\)\./; //图片名称正则表达式
	imgClass     = "col-xs-12 col-sm-6 col-md-4 col-lg-3", //相片墙css类
	modal        = document.getElementById('modal'); //模态框显示相片大图

	/*事件处理*/
	EU.addHandler(window, 'load', function () {
		createAlbumCover(albums); //显示相册列表
		EU.addHandler(albumCover, 'click', displayAlbumContent);
		EU.addHandler(albumContent, 'click', displayAlbumImage);
		EU.addHandler(modal, 'click', showModal);
	});

	EU.addHandler(window, 'unload', function () {
		EU.removeHandler(albumCover, 'click', displayAlbumContent);
		EU.removeHandler(albumContent, 'click', displayAlbumImage);
		EU.removeHandler(modal, 'click', showModal);
	});


	function displayAlbumContent(ev) {	/* show images wall */
		ev = EU.getEvent(ev);
		var target = EU.getTarget(ev);
		// 确定点击哪张相册，显示相册内容
		for (var i = 0, len = data.length; i < len; i++) {
			var a = decodeURI(data[i].coverUrl).match(pattern);
			var b = decodeURI(target.src).match(pattern);
			if (a[0] == b[0]) {
				showImages(data[i]); 
				break;
			}
		}
	}

	function showImages(v) {
		var docFra = document.createDocumentFragment();
		imagesLength = v.length; //保存相册图片数量
		for (var i = 0; i < v.length; i++) {
			var img = document.createElement('img');
			img.className = imgClass;
			img.src = v.imageFolder + "/"+ v.prefix + (i + 1) + v.postfix;
			img.title = v.title;
			// console.log(decodeURI(img.src));
			docFra.appendChild(img);
		}
		albumContent.innerHTML = '';
		albumContent.appendChild(docFra);
		docFra = null;
	}

	function displayAlbumImage(ev) {
		ev = EU.getEvent(ev);
		var target = EU.getTarget(ev);
		// alert(target.src);
		/* 把target这张图片用一个弹窗展示出来 */
		var modalBody = modal.getElementsByTagName('div')[1];
		modalBody.innerHTML = '';
		var img = document.createElement('img');
			img.src = target.src;
			modalBody.appendChild(img);
			modal.style.display = 'block';
	}

function showModal(ev) {
	ev = EU.getEvent(ev);
	var target = EU.getTarget(ev);
	switch(target.id){
		case 'icon-close': modal.style.display = 'none'; break;
		case 'icon-prev': ;
		case 'icon-next': showSiblingImage(target.id); break;
		default: alert("showModal Error!");
	}
}

function showSiblingImage(id) {
	var img = modal.getElementsByTagName('img')[1],
	// pattern = /\([0-9]+\)/,
	imgSrc = decodeURI(img.src);
	src = imgSrc.match(pattern)[0],
	order = parseInt(src.match(/[0-9]+/));
	switch(id){
		case 'icon-prev':
			if (order-- > 1) {
			img.src = imgSrc.replace(pattern, ' ('+ order + ').');
				} else {
			alert("已经是最前面一张了！");
			}
			break;
		case 'icon-next':
		if (order++ < imagesLength) {
			img.src = imgSrc.replace(pattern, ' ('+ order + ').');
				} 
			else {
				alert("已经是最后面一张了！");
			}
			break;
		default: alert("showSiblingImage error!");
	}
}
})();