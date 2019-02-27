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
        // on:{
        //     init: function(){
        //         swiperAnimateCache($(".text-1")); //隐藏动画元素
        //         swiperAnimate($(".text-1")); //初始化完成开始动画
        //     },
        //     slideChangeTransitionEnd: function(){
        //         swiperAnimate($(".text-1")); //每个slide切换结束时也运行当前slide动画
        //         //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
        //     }
        // }
    })


    // let top = $("#homepage")[0].getBoundingClientRect().top //元素顶端到可见区域顶端的距离
    // let se = document.documentElement.clientHeight //浏览器可见区域高度
    // if(top <= se ) {
    //     $(".text-1").addClass('text-1-ani')
    // }else $(".text-1").removeClass('text-1-ani')
    $(".selectLi").each(function () {
        $(this).click(function () {
            const inputBtn=$(".firstCircle")
            console.log(inputBtn)
            if(inputBtn.hasClass("selected")){
                $("").removeClass("selected")
            }else  $(inputBtn).addClass("selected")
        })
    })


//    雷达图
    const myChart = echarts.init(document.getElementById('myChart'));
   const  option = {
        tooltip: {},
        legend: {
            data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                { name: '坚持', max: 6500},
                { name: '行动', max: 16000},
                { name: '格局', max: 30000},
                { name: '突破', max: 38000},
                { name: '生存', max: 52000},
            ]
        }
    };
    myChart.setOption(option);
})
