import "../css/index.styl"
import Swiper from 'swiper'
import "../javascript/swiper.animate1.0.3.min.js"
$(function () {
    let mySwiper=new Swiper('.swiper-container',{
        direction:'vertical',
        pagination:{
            el:'.swiper-pagination',
            bulletElement : 'span',
            clickable:false,
            // bulletClass:'my-bullet',
            // bulletActiveClass:'my-bullet-active'
        },
        on:{
            init: function(){
                swiperAnimateCache($(".text-1")); //隐藏动画元素
                swiperAnimate($(".text-1")); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function(){
                swiperAnimate($(".text-1")); //每个slide切换结束时也运行当前slide动画
                //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
            }
        }
    })


    // let top = $("#homepage")[0].getBoundingClientRect().top //元素顶端到可见区域顶端的距离
    // let se = document.documentElement.clientHeight //浏览器可见区域高度
    // if(top <= se ) {
    //     $(".text-1").addClass('text-1-ani')
    // }else $(".text-1").removeClass('text-1-ani')


})
