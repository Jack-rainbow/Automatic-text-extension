/**
 * <p>文本域(textarea)自适应高度,当页面加载时,给textarea添加data-auto-height属性,会自动调用此方法,当手动调用$.val()赋值时,需要手动触发"change()"事件</p>
 * @namespace jquery
 * @class textarea
 * @constructor 
 * @param    {Element}  element       文本域元素或选择器
 * @param    {Number}   extra         设置光标与输入框保持的距离(默认0)
 * @param    {Number}   maxHeight     设置最大高度(可选)
 * @param    {String}   resize        设置自由的伸展textarea的高宽,默认是"none",即不可伸展(可选值:"both","none")
 */
;
(function ($) {

	$.fn.autoTextArea = function (params) {

		params == undefined || params.length == 0 ? params = '' : params;
		var defaults = {//参数,属性
			
			element: params.element,
			extra: params.extra,
			maxHeight: params.maxHeight,
			isResize: params.isResize
		}

		//将所有的方法都合并到defaults上边,defaults继承了options上的各种属性和方法,将所有的赋值给endOptions
		var endOptions = $.extend(defaults, params);
		var $elements;
		if (!endOptions) {
			return false;
		}
		$elements = $(endOptions.element);

		extra = endOptions.extra || 0;
		isResize = endOptions.isResize || "none";

		$elements.each(function () {
			var that = this;
			$(that).attr("data-auto-height", "true");
			that.style.resize = endOptions.isResize; //如果不希望使用者可以自由的伸展textarea的高宽可以设置其他值
			var minHeight = parseFloat(getStyle(that, 'height'));

			$(that).on("propertychange input focus change", function () {
				change(this, minHeight);
			})
			change(that, minHeight);
		});


		// 根据传入的文本域元素和样式名,返回对应的元素值
		var getStyle = function (thatElement, name) {
			if (thatElement.currentStyle) {
				var val = thatElement.currentStyle[name];
				if (name === 'height' && val.search(/px/i) !== 1) {
					var rect = thatElement.getBoundingClientRect();
					return rect.bottom - rect.top -
						parseFloat(getStyle(thatElement, 'paddingTop')) -
						parseFloat(getStyle(thatElement, 'paddingBottom')) + 'px';
				};
				return val;
			} else {
				return window.getComputedStyle(thatElement, null)[name];
			}
		}

		// 根据输入内容，修改对应的文本域高度
		var change = function (thatElement, minHeight) {
			var scrollTop, height,
				padding = 0,
				style = thatElement.style;

			if (thatElement._length === thatElement.value.length) return;
			thatElement._length = thatElement.value.length;

			padding = parseInt(getStyle(thatElement, 'paddingTop')) + parseInt(getStyle(thatElement, 'paddingBottom'));
			scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

			thatElement.style.height = minHeight + 'px';
			if (thatElement.scrollHeight > minHeight) {
				if (endOptions.maxHeight && thatElement.scrollHeight > endOptions.maxHeight) {
					height = endOptions.maxHeight - padding;
					style.overflowY = 'auto';
				} else {
					height = thatElement.scrollHeight - padding;
					style.overflowY = 'hidden';
				};
				style.height = height + extra + 'px';
				scrollTop += parseInt(style.height) - thatElement.currHeight;
				document.body.scrollTop = scrollTop;
				document.documentElement.scrollTop = scrollTop;
				thatElement.currHeight = parseInt(style.height);
			};
		};

		
	}

	// $.fn.autoTextArea.defaults = {
	// };
})(jQuery)