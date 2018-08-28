/* Display album cover */
// var albums = require('data');

(function () {
	function createImgTitle(imgTitle) {
	var o = document.createElement('h3');
	var title = document.createTextNode(imgTitle);
	o.appendChild(title);
	return o;
}


function createImgCount(count) {
	var o = document.createElement('small');
	o.innerHTML = '('+ count + '张图片)';
	return o;
}

function createLinkedImg(imgSrc) {
	var o = document.createElement('a'),
	img = document.createElement('img');
	o.href = 'javascript:';
	img.src = imgSrc;
	o.appendChild(img);
	return o;
}


function createAlbumCover(data) {
	var albums = document.getElementById('album-cover'),
	docFra    = document.createDocumentFragment(),
	cover, imgTitle;
	for (var i = 0, length = data.length; i < length; i++) {
		cover = document.createElement('div');
		cover.className = 'album-cover';
		cover.appendChild(createLinkedImg(data[i].coverUrl));
		imgTitle = createImgTitle(data[i].title);
		imgTitle.appendChild(createImgCount(data[i].length));
		cover.appendChild(imgTitle);
		docFra.appendChild(cover);
	}
	albums.appendChild(docFra);
}
	// expose to window
	window.createAlbumCover = createAlbumCover;
})();



