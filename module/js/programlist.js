// programlist.js
// 功能：
// 初始化节目单使用的Swiper

// https://www.swiper.com.cn/api/start/new.html
var ProgramListSwiper = new Swiper('#swiper', {
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
        rotate: 28
    },
    // https://www.swiper.com.cn/api/pagination/362.html
    pagination: {
        // https://www.swiper.com.cn/api/pagination/68.html
        el: '#pagination',
        // https://www.swiper.com.cn/api/pagination/69.html
        clickable :true,
        // https://www.swiper.com.cn/api/pagination/363.html
        dynamicBullets: true,
        // https://www.swiper.com.cn/api/pagination/414.html
        dynamicMainBullets:5
    }
});
