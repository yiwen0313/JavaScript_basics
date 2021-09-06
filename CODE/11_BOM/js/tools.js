// 创建一个可以执行简单动画的函数
/* 
 * 参数：
 *   obj：要执行动画的对象
 *   attr：要执行动画的样式  eg：left top width hieght
 *   target；执行动画的目标位置
 *   speed：移动的速度（正数向右移动， 负数向左移动）
 *   callback：回调函数，在动画执行完毕以后执行
 */
function move(obj, attr, target, speed, callback) {
    // 关闭上一个定时器 
    clearInterval(obj.timer);

    // 获取元素目前的位置
    var current = parseInt(getStyle(obj, attr));

    // 判断速度的正负值
    // 如果从0向800移动，则speed为正
    // 如果从800向0移动，则speed为负
    if (current > target) {
        // 此时速度应为负值
        speed = -speed;
    }

    // 开启一个定时器，用来执行动画效果
    // 向执行动画的对象中添加一个timer属性，用来保存它自己的定时器标识
    obj.timer = setInterval(function () {

        // 获取box1原来的left值
        var oldValue = parseInt(getStyle(obj, attr));

        // 在旧值基础上减少
        var newValue = oldValue + speed;

        // 判断newValue的值
        // 向左移动时：需要判断newValue是否小于target
        // 向右移动时：需要判断newValue是否大于target
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target;
        }

        // 将新值设置给box1
        obj.style[attr] = newValue + "px";

        // 当元素移动到0px时，停止
        if (newValue == target) {
            // 关闭定时器
            clearInterval(obj.timer);
            // 动画执行完毕，调用回调函数
            callback && callback();
        }

    }, 30);
}


/* 
 * 定义一个函数，用来获取指定元素当前样式
 * 参数：
 *   - 1.obj  要获取样式的元素
 *   - name   要获取的样式名
 */
function getStyle(obj, name) {

    if (window.getComputedStyle) {
        // 正常浏览器的方式，具有getComputedStyle()
        return getComputedStyle(obj, null)[name];
    } else {
        // IE8的方式，没有getComputedStyle()
        return obj.currentStyle[name];
    }

}