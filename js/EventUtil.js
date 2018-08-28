(function () {
	function addListener(obj, ev, fn) {
	if (typeof obj.addEventListener == 'function') {
		 obj.addEventListener(ev, fn, false);
	} else if(typeof attachEvent == 'object') { /*IE8-*/
		 obj.attachEvent('on'+ev, fn);
	} else { 
		 obj['on'+ev] = fn;
	}
}


function removeListener(obj, ev, fn) {
	if (typeof obj.removeEventListener == 'function') {
		 obj.removeEventListener(ev, fn, false);
	} else if(typeof detachEvent == 'object') { /*IE8-*/
		 obj.detachEvent('on'+ev, fn);
	} else { 
		 obj['on'+ev] = null;
	}
}

function getTarget(ev) {
	return  ev.target || ev.srcElement;
}

function getEvent(ev) {
	return ev ? ev : window.event;
}


function preventDefault(ev) {
	if (typeof ev.preventDefault == 'function') {
		ev.preventDefault();
	} else { // IE
		ev.returnValue = false;
	}
}

function stopPropagation(ev) {
	if (typeof ev.stopPropagation == 'function') {
		ev.stopPropagation();
	} else {
		ev.cancelBubble = true;
	}
}

/* 兼容 IE5+ Firefox Chrome Safari Opera */
var EventUtil = {
	addHandler: addListener,//添加监听
	removeHandler: removeListener,//移除监听
	getTarget: getTarget, //获得事件目标
	getEvent: getEvent, //获得事件
	preventDefault: preventDefault, //阻止默认事件
	stopPropagation: stopPropagation //阻止冒泡
};
	window.EventUtil = EventUtil;
})();

// module.exports = EventUtil;
