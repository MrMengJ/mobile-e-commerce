$(function () {
    $(window).resize();
    search();// 搜索框固定，变色
    secondKill();/*秒杀倒计时*/
    //轮播图
    // 初始化给一张轮播图加上过渡属性
    now();
    // 打开定时器自动轮播
    automateBanner = play(nextImg, 3000);
    //轮播图触摸事件
    bannerTouch();
    //页面加载完毕1秒钟后才加载轮播图未加载的图片
    setTimeout(function () {
        liDom.eq(imgIndex).siblings().find('img').each(function () {
            $(this).attr('src',$(this).data('src'))
        })
    },1000)

})

$(window).resize(function(){
    list[0].style.height = $('.banner').width() * 0.45 + 'px';//轮播框宽高比
    productMove();// 秒杀区商品滑动
})

// 搜索框固定，变色
var search = function () {
    /*搜索框对象*/
    var search = document.getElementsByClassName('header_box')[0];
    /*banner对象*/
    var banner = document.getElementsByClassName('banner')[0];
    /*高度*/
    var height = banner.offsetHeight;

    window.onscroll = function () {
        var top = document.body.scrollTop;
        /*当滚动高度大于banner的高度时候颜色不变*/
        if (top > height) {
            search.style.background = "rgba(201,21,35,0.85)";
        } else {
            var op = top / height * 0.85;
            search.style.background = "rgba(201,21,35," + op + ")";
        }
    };
};

/*秒杀倒计时*/
var secondKill = function () {
    /*父盒子*/
    var parentTime = document.getElementsByClassName('sk_time')[0];
    /*span时间*/
    var timeList = parentTime.getElementsByClassName('num');
    var times = 6 * 60 * 60;
    timer = setInterval(function () {
        times--;
        var h = Math.floor(times / (60 * 60));
        var m = Math.floor(times / 60 % 60);
        var s = times % 60;
        timeList[0].innerHTML = h > 10 ? Math.floor(h / 10) : 0;
        timeList[1].innerHTML = h % 10;
        timeList[2].innerHTML = m > 10 ? Math.floor(m / 10) : 0;
        timeList[3].innerHTML = m % 10;
        timeList[4].innerHTML = s > 10 ? Math.floor(s / 10) : 0;
        timeList[5].innerHTML = s % 10;
        if (times <= 0) {
            clearInterval(timer);
        }
    }, 1000);

}
// 秒杀区商品滑动
function productMove() {
    var parentDom = document.getElementsByClassName('product_bot')[0];//获取父盒子
    var childDom = parentDom.getElementsByTagName('ul')[0];//获取子盒子
    var liDom = $('.product_bot li');//li标签，商品列表
    var liW = parentDom.offsetWidth * 0.3;
    liDom.width(liW);//单个商品的宽
    var productWidth = 0;//所有商品总占用总宽度
    // 遍历设置商品总宽度
    liDom.each(function(index,element){
        productWidth += element.offsetWidth;
    })
    productWidth += 30;
    //获取父盒子宽度
    var parentW = parentDom.offsetWidth;

    //设置子盒子宽度
    // childDom.offsetWidth = productWidth; //无效
    // childDom.clientWidth = productWidth; //无效
    $(childDom).width(productWidth);//有效  这是为何？？
    var childW = childDom.offsetWidth;

    var startX = 0;//开始时的X坐标
    var endX = 0; //结束时的X坐标
    var moveX = 0;//手指滑动的距离
    var currentX = 0;//当前translateX值

    // 限制最大、最小滑动距离
    var minMoveX = -childW;
    var maxMoveX = 0;

    //touchstart 手指接触屏幕
    childDom.addEventListener('touchstart',function(event){
        startX = event.touches[0].clientX;//获取开始时的X坐标
    }, false)

    //touchmove  手指滑动屏幕
    childDom.addEventListener('touchmove', function (event) {
        // event.preventDefault();
        endX = event.touches[0].clientX; //获取结束时的X坐标
        moveX = endX - startX;
        if ((currentX + moveX) <= maxMoveX && (currentX + moveX) >= minMoveX) {
            childDom.style.webkitTransform = "translateX(" + (currentX + moveX) + "px)";
            childDom.style.mozTransform = "translateX(" + (currentX + moveX) + "px)";
            childDom.style.oTransform = "translateX(" + (currentX + moveX) + "px)";
            childDom.style.msTransform = "translateX(" + (currentX + moveX) + "px)";
            childDom.style.Transform = "translateX(" + (currentX + moveX) + "px)";
        }
    },false)

    //touchcannel touch事件意外中断
    childDom.addEventListener('touchcannel', function () {
        //记录当前的translateX值
        if ((currentX + moveX) >= -(childW - parentW) && (currentX + moveX) <= maxMoveX) {
            currentX = moveX + currentX;
        }
    },false)

    //touchend 手指离开屏幕
    childDom.addEventListener('touchend', function () {
        //记录当前的translateX值
        if ((currentX + moveX) >= -(childW - parentW) && (currentX + moveX) <= maxMoveX) {
            currentX = moveX + currentX;
        }
        //向左划过头就跳转到更多秒杀页面
        else if ((currentX + moveX) < -(childW - parentW)) {
            window.location = "goods.html"
        }

    },false)
}

/*轮播图部分*/
// 本轮播图总体思路
// 轮播图分为三种状态，都加absoulte
// 左：transform:translateX(-100%)
// 中：transform:translateX(0)
// 右：transform:translateX(100%)
// 每次把当前显示的加为中间的状态， 小于当前的加左边的状态，大于的加右边的状态，当最后一个激活的时候，把第一个放右边。

var list = $(".banner ul");//轮播图列表
var liDom = list.find('li')
var liLength = liDom.length;
var dots = $(".showNav");//轮播按钮
var dot = dots.find('li');//单个点按钮
var dotLength = dot.length;
var imgIndex = 0; //轮播图序号，默认赋值为0
var dotIndex = 0;//点击之前圆点轮播按钮序号，默认为0
var indexNow;//点击的那个圆点轮播按钮序号
var liW = liDom.width();//轮播图宽度
var left; //轮播图列表当前left值
var startX = 0;//手指接触屏幕时接触点的x坐标
var endX = 0;//手指离开屏幕时接触点的x坐标
var moveX = 0;//手指在屏幕上x轴方向上滑动的距离(向左划为负)
var minX = -liW * 0.25;//滑动最小值
var maxX = liW * 0.25;//滑动最大值
var oldImgIndex;//轮播图虏轮播之前的序列号
var automateBanner;//自动轮播定时器

// 下一张轮播图
function nextImg() {
    oldImgIndex = imgIndex;//取未轮播之前的 序列号
    //当oldImgIndex为最后一张时，那么轮播下一张其实就是第一张，所以imgIndex = 0;dotIndex = 0;
    if (oldImgIndex > liLength - 2) {
        imgIndex = 0;
        dotIndex = 0;
    } else {
        imgIndex++;
        dotIndex++;
    }
    prevOne();//前面一个设为translateX(-100%)
    now();//当前的设为translateX(0)
    nextOne();//后面一个设为translateX(100%)
    // 当轮播后当前的图是最后一张时，将第一张设为translateX(100%)
    if (imgIndex > liLength - 2) {
        nextOne();
    }
    //点亮圆点按钮
    dotLight();
}

//上一张轮播图
function lastImg() {
    oldImgIndex = imgIndex;
    //当oldImgIndex为第一张时，那么向上轮播的那张其实就是最后张，所以imgIndex = liLength - 1;dotIndex = dotLength - 1;
    if (oldImgIndex < 1) {
        imgIndex = liLength - 1;
        dotIndex = dotLength - 1;
    } else {
        imgIndex--;
        dotIndex--;
    }
    prevOne();//前面一个设为translateX(-100%)
    now();//当前的设为translateX(0)
    nextOne();//后面一个设为translateX(100%)
    // 当轮播后当前的图是第一张时，将最后设为translateX(-100%)
    if (imgIndex < 1) {
        prevOne();
    }
    // 点亮圆点按钮
    dotLight();
}

// 根据索引值设置translateX
// 前面一个translateX(-100%)
function prevOne() {
    // 如果当前轮播的是第一张，那么最后一张设为放在第一张的前面
    //(oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)表示是往前轮播一张或者前一张图是第一张
    if (imgIndex < 1) {
        if ((oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)) {
            liDom.eq(liLength - 1).removeTransition();
        } else {
            liDom.eq(liLength - 1).addTransition();
        }
        liDom[liLength - 1].style.webkitTransform = "translateX(-100%)";
        liDom[liLength - 1].style.mozTransform = "translateX(-100%)";
        liDom[liLength - 1].style.msTransform = "translateX(-100%)";
        liDom[liLength - 1].style.oTransform = "translateX(-100%)";
        liDom[liLength - 1].style.transform = "translateX(-100%)";
    }
    //(oldImgIndex == (imgIndex + 1) || (oldImgIndex == 0 && imgIndex !== 1))表示往前轮播一张或者往后轮播一张时imgIndex不为第二张的情况下
    else {
        if ((oldImgIndex == (imgIndex + 1) || (oldImgIndex == 0 && imgIndex !== 1))) {
            liDom.eq(imgIndex - 1).removeTransition();
        } else {
            liDom.eq(imgIndex - 1).addTransition();
        }
        liDom.get(imgIndex - 1).style.webkitTransform = "translateX(-100%)";
        liDom.get(imgIndex - 1).style.mozTransform = "translateX(-100%)";
        liDom.get(imgIndex - 1).style.msTransform = "translateX(-100%)";
        liDom.get(imgIndex - 1).style.oTransform = "translateX(-100%)";
        liDom.get(imgIndex - 1).style.transform = "translateX(-100%)";
    }
}


//当前设为translateX(0)，并添加过渡动画
function now() {
    liDom.eq(imgIndex).addTransition();
    liDom[imgIndex].style.webkitTransform = "translateX(0)";
    liDom[imgIndex].style.mozTransform = "translateX(0)";
    liDom[imgIndex].style.msTransform = "translateX(0)";
    liDom[imgIndex].style.oTransform = "translateX(0)";
    liDom[imgIndex].style.transform = "translateX(0)";
}


// 后面一个设为translateX(100%)
function nextOne() {
    // 如果当前是最后一张图，那么第一张设在最后一张的后面
    if (imgIndex > liLength - 2) {
        //(oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)表示是往前轮播一张或者前一张图是第一张
        if ((oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)) {
            liDom.eq(0).addTransition();
        } else {
            liDom.eq(0).removeTransition();
        }
        liDom[0].style.webkitTransform = "translateX(100%)";
        liDom[0].style.mozTransform = "translateX(100%)";
        liDom[0].style.msTransform = "translateX(100%)";
        liDom[0].style.oTransform = "translateX(100%)";
        liDom[0].style.transform = "translateX(100%)";
    } else if (imgIndex < 1) {
        for (i = 1; i < liLength - 1; i++) {
            //(oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)表示是往前轮播一张或者前一张图是第一张
            if ((oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)) {
                liDom.eq(i).addTransition();
            } else {
                liDom.eq(i).removeTransition();
            }
            liDom[i].style.webkitTransform = "translateX(100%)";
            liDom[i].style.mozTransform = "translateX(100%)";
            liDom[i].style.msTransform = "translateX(100%)";
            liDom[i].style.oTransform = "translateX(100%)";
            liDom[i].style.transform = "translateX(100%)";
        }
    } else {
        //(oldImgIndex == (imgIndex + 1) || (oldImgIndex == 0 && imgIndex !== 1))表示往前轮播一张或者往后轮播一张时imgIndex不为第二张的情况下
        if ((oldImgIndex == (imgIndex + 1) || (oldImgIndex == 0 && imgIndex !== 1))) {
            liDom.eq(imgIndex + 1).addTransition();
        } else {
            liDom.eq(imgIndex + 1).removeTransition();
        }
        liDom[imgIndex + 1].style.webkitTransform = "translateX(100%)";
        liDom[imgIndex + 1].style.mozTransform = "translateX(100%)";
        liDom[imgIndex + 1].style.msTransform = "translateX(100%)";
        liDom[imgIndex + 1].style.oTransform = "translateX(100%)";
        liDom[imgIndex + 1].style.transform = "translateX(100%)";
    }
}



function bannerTouch() {
    //touchstart
    liDom.on('touchstart',function(event) {
        startX = event.originalEvent.targetTouches[0].clientX;//获取开始x坐标
    })

    //touchmove
    liDom.on('touchmove',function (event) {
        event.preventDefault();
        endX = event.originalEvent.targetTouches[0].clientX;//获取滑动结束时x坐标
        moveX = endX - startX;//手指移动的距离
        //图片偏移距离
        liDom[imgIndex].style.webkitTransform = "translateX("+moveX*0.75+"px)";
        liDom[imgIndex].style.mozTransform = "translateX("+moveX*0.75+"px)";
        liDom[imgIndex].style.msTransform = "translateX("+moveX*0.75+"px)";
        liDom[imgIndex].style.oTransform = "translateX("+moveX*0.75+"px)";
        liDom[imgIndex].style.transform = "translateX("+moveX*0.75+"px)";
        // 滑动过程中关闭定时器，暂停自动轮播
        stop(automateBanner);
    })

    //touchcannel
    liDom.on('touchcannel',function () {
        if (moveX > maxX){
            lastImg();
        }
        else if(moveX < minX){
            nextImg();
        }
        // 如果滑动距离不够,图片回弹
        else {
            liDom[imgIndex].style.webkitTransform = "translateX(0)";
        }
        // 先关闭定时器然后在开启定时器
        stop(automateBanner);
        // 手指离开后，打开定时器，开始自动轮播
        automateBanner = play(nextImg,3000)

        //结束后重置各项参数
        startX = 0;
        endX = 0;
        moveX = 0;
    })


    //touchend
    liDom.on('touchend',function () {
        if (moveX > maxX){
            lastImg();
        }
        else if(moveX < minX){
            nextImg();
        }
        // 如果滑动距离不够,图片回弹
        else {
            liDom[imgIndex].style.webkitTransform = "translateX(0)";
        }
        // 先关闭定时器然后在开启定时器
        stop(automateBanner);
        // 手指离开后，打开定时器，开始自动轮播
        automateBanner = play(nextImg,3000)

        //结束后重置各项参数
        startX = 0;
        endX = 0;
        moveX = 0;
    })
}




//打开定时器
function play(fn, interval) {
    return setInterval(fn, interval)
}

//清除定时器
function stop(returnVal) {
    clearInterval(returnVal);
    returnVal = null;
}

//添加过渡动画
$.fn.addTransition = function () {
    var $_this = $(this)
    $_this.css({
        "webkitTransition": "all 0.3s linear 0s",
        "mozTransition": "all 0.3s linear 0s",
        "oTransition": "all 0.3s linear 0s",
        "msTransition": "all 0.3s linear 0s",
        "transition": "all 0.3s linear 0s",
    })
}

//删除过渡动画
$.fn.removeTransition = function () {
    var $_this = $(this)
    $_this.css({
        "webkitTransition": "all 0s linear 0s",
        "mozTransition": "all 0s linear 0s",
        "oTransition": "all 0s linear 0s",
        "msTransition": "all 0s linear 0s",
        "transition": "all 0s linear 0s",
    })
}

//点亮点点按钮
function dotLight() {
    dot.eq(imgIndex).addClass('active').siblings().removeClass('active');
}

//事件监听函数
function addEvent(obj, event, fn) {
    obj.on(event, fn);
}