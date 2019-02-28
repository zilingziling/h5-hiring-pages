import "../css/index.styl";
import Swiper from "swiper";
import "../javascript/swiper.animate1.0.3.min.js";
import "../images/ad.mp4"
$(function() {
  let mySwiper = new Swiper(".swiper-container", {
    direction: "vertical",
    pagination: {
      el: ".swiper-pagination",
      bulletElement: "span",
      clickable: false,
      bulletClass: "my-bullet",
      bulletActiveClass: "my-bullet-active"
    },
    navigation: {
      nextEl: ".next",
      prevEl: ".last"
    },
    // $(".text-1").toggleClass('text-1-ani')
    on: {
      slideChangeTransitionEnd() {
        console.log(innerHeight,innerWidth)
        if (elementIsVisibleInViewport($(".homeWrapper")[0])){
          $(".homePage").addClass("home-ani");
          console.log($(".homePage")[0])
        }
        else $(".homePage").removeClass("home-ani");


        if (elementIsVisibleInViewport($(".first")[0]))
          $(".first").addClass("first-ani");
        else $(".first").removeClass("first-ani");

        if (elementIsVisibleInViewport($(".third")[0]))
          $(".third").addClass("third-ani");
        else $(".third").removeClass("third-ani");

        if (elementIsVisibleInViewport($(".fourth")[0]))
          $(".fourth").addClass("fourth-ani");
        else $(".fourth").removeClass("fourth-ani");

        if (elementIsVisibleInViewport($(".fifth")[0]))
          $(".fifth").addClass("fifth-ani");
        else $(".fifth").removeClass("fifth-ani");

        if (elementIsVisibleInViewport($(".second")[0]))
          $(".second").addClass("second-ani");
        else $(".second").removeClass("second-ani");
      }
    }
  });
  function elementIsVisibleInViewport(el, partiallyVisible = false) {
    const { top, left, bottom, right } = el.getBoundingClientRect();

    return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
          (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight+innerHeight/2 && right <= innerWidth+innerWidth/2;
  }
  $(".submitBtn").click(function() {
    let position = [];
    $("input[name='position']:checked").each(function() {
        position.push($(this).val());
    });
    console.log(position)
    $.ajax({
      type: "post",
      url: "/api/recruit",
      data: {
        name: $("#name").val(),
        phone: $("#phone").val(),
        position:position
      },
      success: function(data) {
        if (data.code === "201") {
          position = [];
          console.log(data);
          $(".mask").css("display", "block");
          $(".successModal").css("display", "block");
        } else if (data.code === "301") {
          $(".mask").css("display", "block");
          $(".failedModal").css("display", "block");
        } else if (data.code === "500") {
          $(".mask").css("display", "block");
          $("#repeat").css("display", "none");
          $(".failedModal").css("display", "block");
        }
      }
    });
  });
  $(".successConfirmBtn").click(function() {
    $(".successModal").css("display", "none");
    $(".mask").css("display", "none");
  });
  $(".failedConfirmBtn").click(function() {
    $(".failedModal").css("display", "none");
    $(".mask").css("display", "none");
  });

  //    雷达图
  const myChart = echarts.init(document.getElementById("myChart"));
  const option = {
    radar: {
      name: {
        textStyle: {
          color: "#3d468a",
          fontSize: 12
        }
      },
      indicator: [
        { name: "坚持", max: 100 },
        { name: "行动", max: 100 },
        { name: "格局", max: 300 },
        { name: "突破", max: 100 },
        { name: "生存", max: 100 }
      ],
      nameGap: 2,
      splitArea: {
        areaStyle: {
          color: ["#edeefe", "#edeefe", "#bcc0f8", "#8089f2", "#414de4"]
        }
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        // name: '预算 vs 开销（Budget vs spending）',
        itemStyle: {
          normal: {
            lineStyle: {
              color: "#fbbd15",
              width: 1
            }
          }
        },
        areaStyle:{
          normal: {
            color: "rgba(255,244,92,.58)",
          }
        },
        type: "radar",
        symbol: "none",
        data: [
          {
            value: [43, 10, 28, 35, 50]
          }
        ]
      }
    ]
  };

  myChart.setOption(option);
});
