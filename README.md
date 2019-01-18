# Automatic-text-extension

   * <p>文本域(textarea)自适应高度,当页面加载时,给textarea添加data-auto-height属性,会自动调用此方法,当手动调用$.val()赋值时,需要手动触      发"change()"事件</p>
   * @namespace jquery
   * @class textarea
   * @constructor 
   * @param    {Element}  element       文本域元素或选择器
   * @param    {Number}   extra         设置光标与输入框保持的距离(默认0)
   * @param    {Number}   maxHeight     设置最大高度(可选)
   * @param    {String}   resize        设置自由的伸展textarea的高宽,默认是"none",即不可伸展(可选值:"both","none")
  
### 使用方法
  $.fn.autoTextArea({
            element:"#abc"
  })
  > 至于为什么$.autoTextArea没有加到window下，我也不知道。奇葩:dog:
