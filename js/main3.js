
$(function () {
    list[0].style.height = $('.banner').width() * 0.45 + 'px';
    imgMove();
    dotLight();
    addEvent(dots,'click',btn)
    imgTimer = play(nextImg,3000)
    isEdgeTimer = play(isEdge,3050)//检测是否划到最边缘的一张轮播图，避免过渡效果被pass掉
    // bannerTouch();
})

/*轮播图部分*/

var list = $(".banner ul");//轮播图列表
var liDom = list.find('li')
var dots = $(".showNav");//轮播按钮
var dot = dots.find('li');//单个点按钮
var imgIndex = 1; //轮播图序号，默认赋值为1
var dotIndex = 0;//轮播按钮序号，默认为0
var liW = liDom.width();//轮播图宽度
var imgTimer = null;  //轮播图定时器
var isEdgeTimer = null; //判断轮播图是否边缘定时器
var left; //轮播图列表当前left值
var startX = 0;
var endX = 0;
var moveX = 0;
var minX = -liW*0.3;
var maxX = liW*0.3;
var isEdge = null;

// 下一张轮播图
function nextImg() {
    imgIndex++;
    dotIndex++;
    imgMove();
    if (imgIndex > liDom.length - 2) {
        imgIndex = 1;
        dotIndex = 0;
    } else if (imgIndex < 1) {
        imgIndex = liDom.length - 2;
        dotIndex = dot.length - 1;
    }
    dotLight();
}

//上一张轮播图
function lastImg() {
    imgIndex--;
    dotIndex--;
    imgMove();
    if (imgIndex > liDom.length - 2) {
        imgIndex = 1;
        dotIndex = 0;
    } else if (imgIndex < 1) {
        imgIndex = liDom.length - 2;
        dotIndex = dot.length - 1;
    }
    dotLight();
}

//点按钮点击函数
function btn(e) {
    e = window.e || e;
    var target = e.target ? e.target: e.srcElement;
    if(target.nodeName = "LI"){
        var indexNow = $(target).index();
        imgIndex += (indexNow - dotIndex);
        dotIndex = indexNow;
        imgMove();
        dotLight();
    }
}

//轮播图触摸事件
// function bannerTouch() {
//     //touchstart
//     liDom.on('touchstart',function (e) {
//         startX = e.touches[0].clientX;//获取当前startX值
//     })
//
//     //touchmove
//     liDom.on('touchmove',function (e) {
//         endX = e.touches[0].clientX;
//         moveX = endX - startX;
//         list.css(
//             'left',left+moveX
//         )
//         stop(imgTimer)
//         stop(isEdgeTimer)
//     })
//
//     //touchend
//     liDom.on('touchend',function () {
//
//         if (moveX > maxX){
//             lastImg();
//
//             isEdge = play(isEdge,100)
//         }
//
//         else if(moveX < minX){
//             nextImg();
//             console.log(left)
//             isEdge = play(isEdge,100)
//         }
//
//         else {
//             list.css(
//                 'left',left
//             )
//         }
//         stop(isEdge)
//         imgTimer = play(nextImg,3000)
//         isEdgeTimer = play(isEdge,3050)
//     })
// }


// 图片轮播
function imgMove() {
    addTransition();
    list.css(
        'left', -liW * imgIndex
    )
    //当前轮播图列表的translateX值
    left = parseInt(list[0].style.left);
}

//判断时候是否到最后一张或者最前面一张
function isEdge() {
    if (left < (-liW * (liDom.length - 2))) {
        removeTransition();
        list.css(
            'left', -liW
        )
    } else if (left > -liW) {
        removeTransition();
        list.css(
            'left', -liW * (liDom.length - 2)
        )
    }
    left = parseInt(list[0].style.left);
    console.log("hello")
}

//打开定时器
function play(fn,interval) {
    return setInterval(fn,interval);
}


//清除定时器
function stop(interval) {
    clearInterval(interval);
}

//添加过渡动画
function addTransition() {
    list.css({
        "webkitTransition": "all .3s linear 0s",
        "mozTransition": "all .3s linear 0s",
        "oTransition": "all .3s linear 0s",
        "msTransition": "all .3s linear 0s",
        "transition": "all .3s linear 0s",
    })
}

//删除过渡动画
function removeTransition() {
    list.css({
        "webkitTransition": "all 0s linear 0s",
        "mozTransition": "all 0s linear 0s",
        "oTransition": "all 0s linear 0s",
        "msTransition": "all 0s linear 0s",
        "transition": "all 0s linear 0s",
    })
}

//点亮点点按钮
function dotLight() {
    dot.eq(dotIndex).addClass('active').siblings().removeClass('active');
}

//事件监听函数
function addEvent(obj,event,fn) {
    obj.on(event,fn);
}