import "../css/index.styl";
import Swiper from "swiper";
import "../javascript/swiper.animate1.0.3.min.js";
import "../images/ad.mp4"
import "../music.mp3"
import "../css/media.styl"
$(function() {
  // $.get("获取微信signature的接口",
  //     {"url":location.href.split('#').toString()}).done(function (data) {
  //   // 注意这里的url，一定要这样写，也就是动态获取，不然也不会成功的。
  //   console.log(data);
  //   if (data.header.code == 200) {
  //     var wx_info = data.body.result.wx_info;
  //     if (wx_info.signature != null) {
  //       // 配置
  //       wx.config({
  //         debug: false,   // 测试阶段，可以写为true，主要是为了测试是否配置成功
  //         appId: wx_info.appId,
  //         timestamp: wx_info.timestamp,
  //         nonceStr: wx_info.nonceStr,
  //         signature: wx_info.signature,
  //         jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
  //           'onMenuShareQZone']
  //       });
  //
  //       var title = "我要跳槽";
  //       var desc = "我要跳槽";
  //       // 分享的图片，最好是正方形，不是也没关系，但是一定是http模式，即绝对路径，而不是服务器路劲
  //       var imgUrl = "../images/flag.png";
  //       // 这里的地址可以写死，也可以动态获取，但是一定不能带有微信分享后的参数，不然分享也是失败的
  //       var link=""
  //
  //       // 分享给朋友、QQ、微博
  //       var shareData = {
  //         "imgUrl": imgUrl,
  //         "title": title,
  //         "desc": desc,
  //         'link': link
  //       };
  //       // 分享到朋友圈
  //       var shareToTimeline = {
  //         "imgUrl": imgUrl,
  //         "title": title,
  //         'link': link,
  //         "desc": desc
  //       }
  //       wx.ready(function() {
  //         wx.onMenuShareTimeline(shareToTimeline);
  //         wx.onMenuShareAppMessage(shareData);
  //         wx.onMenuShareQQ(shareData);
  //         wx.onMenuShareQZone(shareData);
  //
  //         wx.error(function(res) {
  //           alert(res.errMsg);
  //         });
  //       });
  //     }
  //   }
  // }).fail(function (msg) {
  //   console.log("error:" + msg);
  // });












  document.addEventListener("WeixinJSBridgeReady", function () {
    let isPlay = true;
    const audio = document.querySelector("audio");
    audio.play();
    const musicBtn = document.querySelector("#musicBtn");
    musicBtn.addEventListener("click", function () {
      isPlay ? audio.pause() : audio.play();
      isPlay = !isPlay;
      musicBtn.classList.toggle("stop");
    })
  }, false);

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
        if (elementIsVisibleInViewport($(".homeWrapper")[0])){
          $(".homePage").addClass("home-ani");
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

  let isSuccess=0
  $(".submitBtn").click(function() {
    let position = [];
    $("input[name='position']:checked").each(function() {
      position.push($(this).val());
    });
    const name=$("#name").val()
    const phone= $("#phone").val()
    if(!name||!phone||position.length<=0){
      $(".mask").css("display", "block");
      $("#repeat").css("display", "none");
      $(".failedModal").css("display", "block");
      return
    }
    $.ajax({
      type: "post",
      url: "index.php/api/recruit",
      data: {
        name:name,
        phone:phone,
        position:position
      },
      success: function(data) {
        if (data.code === 201) {
          position = [];
          $(".mask").css("display", "block");
          $(".successModal").css("display", "block");
        } else if (data.code === 301) {
          $(".mask").css("display", "block");
          $("#resultTitle").text("号码重复")
          $(".failedModal").css("display", "block");
        } else if (data.code === 500) {
          $(".mask").css("display", "block");
          $("#repeat").css("display", "none");
          $(".failedModal").css("display", "block");
        }
      }
    });
  });
  $(".successConfirmBtn").click(function(e) {
    $(".successModal").css("display", "none");
    $(".mask").css("display", "none");
  });
  $(".failedConfirmBtn").click(function() {
    $(".failedModal").css("display", "none");
    $(".mask").css("display", "none");
  });
  $("#checkResult").click(function () {
    const first=$(".firstUl input:checked").val()
    const second=$(".secondUl input:checked").val()
    const third=$(".thirdUl input:checked").val()
    const fourth=$(".fourthUl input:checked").val()
    const fifth=$(".fifthUl input:checked").val()
    if(first&&second&&third&&fourth&&fifth){
      let articleArr=[
        {
          title:"深谋远虑的再世孔明",
          text:"年初你一直在为自己的新职业做计划，也可以说你对这次跳槽做足了准备，你也相信自己的能力是可以做到的，近期会跳槽的可能性很大。点击下方领取岗位试试"
        } ,
        {
          title: "乱世的人中吕布" ,
          text:      "你一直都很相信自己的能力，为什么会选择跳槽，也是因为你觉得你有更大的提升空间，来展现自己的价值，所以你在近期很有可能会跳槽成功。点击下方领取岗位试试",
        },
        {
          title:    "跃跃欲试的锦鲤" ,
          text:    "或许你对薪资状况不是很满意，或许是你对当下的工作状态不太喜欢，总之你很希望跳槽。点击下方领取岗位试试",
        },
        {
          title:     "尚待成长的绵羊" ,
          text:     "你还是比较适合跳槽的，而接下来的工作也会让你成长的很快。点击下方领取岗位试试" ,
        },
        {
          title:      "事业迷茫期的小白" ,
          text:      "你在事业上真正想要的是什么？连你自己也说不清吧，因此在你跳槽的过程中，一定要慎重的考虑。点击下方领取岗位试试"
        }
      ]
      let articleRandom=parseInt(Math.random()*5)
      $("#articleTitle").text(articleArr[articleRandom].title)
      $("#article").text(articleArr[articleRandom].text)
      $('.resultText').css("display","block")
      $('.echart').css("display","block")
      $(".notFinished").css("display",'none')
    }

  })

  // 播放按钮
  $(".playBtn").click(function () {
    $(".playBtn").css("display","none")
    $("#realVideo").css("display","block")
    $("#realMusic")[0].pause();
    $("#realVideo")[0].play()
  })
  //    雷达图
  const dataRandoom_1= parseInt(Math.random()*25+ 46);
  const dataRandoom_2= parseInt(Math.random()*25+ 58);
  const dataRandoom_3= parseInt(Math.random()*25+ 66);
  const dataRandoom_4= parseInt(Math.random()*25+ 40);
  const dataRandoom_5= parseInt(Math.random()*25+ 30);

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
            value: [dataRandoom_1, dataRandoom_2, dataRandoom_3, dataRandoom_4, dataRandoom_5]
          }
        ]
      }
    ]
  };

  myChart.setOption(option);
});

