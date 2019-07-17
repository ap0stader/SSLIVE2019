// programlist.js
// 功能：
// 初始化节目单使用的Swiper

// https://www.swiper.com.cn/api/start/new.html
var Swiper = new Swiper('#swiper', {
    // https://www.swiper.com.cn/api/parameters/59.html
    grabCursor: true,
    // https://www.swiper.com.cn/api/grid/50.html
    centeredSlides: true,
    // https://www.swiper.com.cn/api/grid/24.html
    slidesPerView: 'auto',
    // https://www.swiper.com.cn/api/clicks/207.html
    slideToClickedSlide: true,
    // https://www.swiper.com.cn/api/observer/218.html
    observer: true,
    // https://www.swiper.com.cn/api/observer/219.html
    observeParents: true,
    // https://www.swiper.com.cn/api/effects/193.html
    effect: 'coverflow',
    // https://www.swiper.com.cn/api/effects/196.html
    coverflowEffect: {
        // slide做3d旋转时Y轴的旋转角度
        rotate: 28,
    },
    // https://www.swiper.com.cn/api/pagination/362.html
    pagination: {
        // https://www.swiper.com.cn/api/pagination/68.html
        el: '#pagination',
        // https://www.swiper.com.cn/api/pagination/69.html
        clickable :true
    }
});

// 给定一个大于swiper-slide的数字，它会跳回第一张
var lastnow = 20;
var lastoriginal = false;

function querynow(){
    $.ajax({
        url: '/config/livestatus.json',
        dataType: "json",
        cache: false,
        success: function (data) {
            // 更新的条件，有正确的值且不等于之前的值
            if (data.Current >= 0 && data.Current != lastnow) {
                // 1.恢复之前节目本来的class
                lastoriginal == true ? $("#s" + lastnow + " h2").attr("class", "original") : $("#s" + lastnow + " h2").attr("class", " ");
                // 2.保存当前节目本来的class
                lastnow = data.Current;
                $("#s" + data.Current + " h2").attr("class") == undefined ? lastoriginal = false : lastoriginal = true;
                // 3.更改当前节目的class
                $("#s" + data.Current + " h2").attr("class", "now");
                // 4.Swiper切换至当前的节目
                // https://www.swiper.com.cn/api/methods/109.html
                Swiper.slideTo($("#s" + data.Current).index());
            }
        }
    });
}

// TODO 此处只是权宜之计
// 每3秒钟查询一次当前的节目
setInterval(querynow, 3000);
