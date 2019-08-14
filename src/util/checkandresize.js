// checkandresize.js

// 1.判断浏览器版本是否足够
// 2.提供rem数值
// 必须在引用jQuery和Browser.js、引用页面js文件之前引用本文件


function check() {
    var browser = new Browser();
    // 提醒用户珍惜生命远离IE
    if (browser.browser == 'IE') {
        window.location.href = 'IE.html';
    } else {
        return 1;
    }
}

function resize() {
    if ($(window).width() < 500) {
        $('html').css('font-size', $(window).width() / 31.25 + 'px')
    } else {
        $('html').css('font-size', '16px')
    }
}
