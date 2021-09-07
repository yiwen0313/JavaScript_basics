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





// 定义一个函数,用来向一个元素中添加指定的class属性值

/* 
 * 参数：
 *   obj：要添加class属性的元素
 *   cn： 要添加的class值
 */
function addClass(obj, cn) {

    // 检查obj中是否含有cn
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }

}

/* 
 * 判断一个函数中是否含有指定的class属性值
 * 参数：
 *    obj：要判断的元素
 *    cn：class值
 * 返回值：
 *    有该class：返回true; 否则返回false
 */
function hasClass(obj, cn) {
    // 判断obj中有没有cn class
    // 创建一个正则表达式
    // var reg = /\bb2\b/;
    var reg = new RegExp("\\b" + cn + "\\b");

    return reg.test(obj.className);
}


/* 
 * 删除一个元素中指定的class属性
 * 参数：
 *    obj：要判断的元素
 *    cn：class值
 */
function removeClass(obj, cn) {
    // 创建一个正则表达式
    var reg = new RegExp("\\b" + cn + "\\b");

    // 删除class
    obj.className = obj.className.replace(reg, " ")
}

/* 
 * 切换一个类
 *    - 如果元素中有该类，则删除
 *    - 如果元素中无该类，则添加
 */
function toggleClass(obj, cn) {
    // 判断obj中是否含有cn
    if (hasClass(obj, cn)) {
        // 有，删除
        removeClass(obj, cn);
    } else {
        // 没有，添加
        addClass(obj, cn);
    }
}