// 导航栏下的点击切换
var privilege_left = document.querySelector('.privilege_left');
var privilege_right = document.querySelector('.privilege_right');
var privilege_content = document.querySelector('.privilege_content');
var privilege_content_width = document.querySelector('.privilege_content_width');

// 插入一组元素
var privilege_clone = privilege_content_width.children[0].cloneNode(true);
privilege_content_width.appendChild(privilege_clone);
var privilege_content_switchALL = document.querySelectorAll('.privilege_content_switch');
var privilege_index = 0;
// 点击换页

privilege_right.onclick = function(){
    privilege_index++;
    if(privilege_index >= privilege_content_switchALL.length){
        privilege_index = 1;
        privilege_content.scrollLeft = 0;
    }
    animate(privilege_content,{'scrollLeft':privilege_index*privilege_content_switchALL[0].clientWidth})
}
privilege_left.onclick = function(){
    privilege_index--;
    if(privilege_index < 0){
        privilege_index = privilege_content_switchALL.length-2;
        privilege_content.scrollLeft = privilege_content_switchALL.length*privilege_content_switchALL[0].clientWidth;
    }
    animate(privilege_content,{'scrollLeft':privilege_index*privilege_content_switchALL[0].clientWidth})
}
// top1198二级菜单
var top_navControl = document.querySelector('.headerRight li:nth-child(5)');
var top_nav  = document.querySelector('.top_nav');
top_navControl.onmouseenter = function(){
    top_nav.style.display = "block"
}
top_navControl.onmouseleave = function(){
    top_nav.style.display = "none"
}
// 搜索框点击切换店铺
var dianPu = document.querySelector('.dianPu i');
var dianPu_list = document.querySelectorAll('.dianPu_hid li');
for(let ii = 0;ii<dianPu_list.length;ii++){
    dianPu_list[ii].onclick = function(ii){
        dianPu.innerText = dianPu_list[ii].innerText;
    }.bind(this,ii);
}
// 右侧文字轮播
var titleRight_top = document.querySelector('.titleRight_top');
var titleRight_bottom = document.querySelector('.titleRight_bottom');
var titleRight_scroll = document.querySelector('.titleRight_scroll');
var  titleRight_height = document.querySelector('.titleRight_height');
var titleRight_clone = titleRight_height.firstElementChild.cloneNode(true);
titleRight_height.appendChild(titleRight_clone);
var titleRight_cont = document.querySelectorAll('.titleRight_cont');

// 创建下标
var titleRight_index = 0,titleRight_timer= null;
// 自执行
titleRight_auto();
function titleRight_auto(){
    clearInterval(titleRight_timer);
    titleRight_timer = setInterval(function(){
        titleRight_move();
    },1000)
}
// 运动
function titleRight_move(){
    titleRight_index++;
    if(titleRight_index>=titleRight_cont.length){
        titleRight_index = 1;
        titleRight_scroll.scrollTop = 0;
    }
    animate(titleRight_scroll,{'scrollTop':titleRight_scroll.clientHeight*titleRight_index});
}
function titleRight_moveTop(){
    titleRight_index--;
    if(titleRight_index<0){
        titleRight_index = titleRight_cont.length-2;
        titleRight_scroll.scrollTop = titleRight_scroll.clientHeight*(titleRight_index+1);
    }
    animate(titleRight_scroll,{'scrollTop':titleRight_scroll.clientHeight*titleRight_index});
}

titleRight_bottom.onclick = function(){
    clearInterval(titleRight_timer);
    titleRight_move();
    titleRight_auto();
}
titleRight_top.onclick = function(){
    clearInterval(titleRight_timer);
    titleRight_moveTop();
    titleRight_auto();
}
//             一屏轮播图              
var main_slider_bots = document.querySelectorAll('.main_slider_bot li');
var MainWrap = document.querySelector('.MainWrap');
var main_slider_imgs = document.querySelectorAll('.main_slider img');
var main_slider_left = document.querySelector('.main_slider_left');
var main_slider_right = document.querySelector('.main_slider_right');
var main_slider_timer = null,main_slider_index = 0, main_slider_preIndex =0;

animate(main_slider_imgs[main_slider_index],{'opacity':1},function(){
    main_slider_time();
    if(main_slider_index == 0){  MainWrap.style.background = '#f7e0d6' }
});
// 定时器函数
function main_slider_time(){
    clearInterval(main_slider_timer);
    main_slider_timer = setInterval(function(){
        main_slider_auto();
    },1500)
}
// 运动
function main_slider_auto(){
    // 清除上一页样式
    main_slider_bots[main_slider_preIndex].className = '';
    main_slider_imgs[main_slider_preIndex].style.opacity = '0.02';
    // 下标自增及临界判断
    main_slider_index++;
    if(main_slider_index >= main_slider_bots.length){
        main_slider_index = 0
    }
    if(main_slider_index == 0){  MainWrap.style.background = '#f7e0d6' }
    if(main_slider_index == 1){  MainWrap.style.background = '#9bbc75' }
    if(main_slider_index == 2){  MainWrap.style.background = '#83dda0' }
    if(main_slider_index == 3){  MainWrap.style.background = '#ffa265' }
    if(main_slider_index == 4){  MainWrap.style.background = '#79bcd6' }
    if(main_slider_index == 5){  MainWrap.style.background = '#ffebc6' }
    if(main_slider_index == 6){  MainWrap.style.background = '#ffee56' }
    if(main_slider_index == 7){  MainWrap.style.background = '#ffa696' }
    // 添加状态
    main_slider_bots[main_slider_index].className = 'bot_show';
    animate(main_slider_imgs[main_slider_index],{'opacity':1});
    main_slider_preIndex = main_slider_index;
}
// 左点击运动
function main_slider_autoLeft(){
    // 清除上一页样式
    main_slider_bots[main_slider_preIndex].className = '';
    main_slider_imgs[main_slider_preIndex].style.opacity = '0.02';
    // 下标自增及临界判断
    main_slider_index--;
    if(main_slider_index < 0){
        main_slider_index = main_slider_bots.length-1;
    }
    if(main_slider_index == 0){  MainWrap.style.background = '#f7e0d6' }
    if(main_slider_index == 1){  MainWrap.style.background = '#9bbc75' }
    if(main_slider_index == 2){  MainWrap.style.background = '#83dda0' }
    if(main_slider_index == 3){  MainWrap.style.background = '#ffa265' }
    if(main_slider_index == 4){  MainWrap.style.background = '#79bcd6' }
    if(main_slider_index == 5){  MainWrap.style.background = '#ffebc6' }
    if(main_slider_index == 6){  MainWrap.style.background = '#ffee56' }
    if(main_slider_index == 7){  MainWrap.style.background = '#ffa696' }
    // 添加状态
    main_slider_bots[main_slider_index].className = 'bot_show';
    animate(main_slider_imgs[main_slider_index],{'opacity':1});
    main_slider_preIndex = main_slider_index;
}
//右点击
main_slider_right.onclick = function(){
    // 清除样式
    clearInterval(main_slider_timer);
    clearInterval(main_slider_imgs[main_slider_index].timer);
    main_slider_auto();
    main_slider_time();
}
main_slider_left.onclick = function(){
    // 清除样式
    clearInterval(main_slider_timer);
    clearInterval(main_slider_imgs[main_slider_index].timer);
    main_slider_autoLeft();
    main_slider_time();
}
// bots鼠标滑过事件
for(let i = 0; i<main_slider_bots.length; i++){
    main_slider_bots[i].onmouseenter = function(aa){
        // 清除样式
        clearInterval(main_slider_timer);
        clearInterval(main_slider_imgs[main_slider_index].timer);
        main_slider_bots[main_slider_preIndex].className = '';
        main_slider_imgs[main_slider_preIndex].style.opacity = '0.02';
        main_slider_index = aa;
        if(main_slider_index == 0){  MainWrap.style.background = '#f7e0d6' }
        if(main_slider_index == 1){  MainWrap.style.background = '#9bbc75' }
        if(main_slider_index == 2){  MainWrap.style.background = '#83dda0' }
        if(main_slider_index == 3){  MainWrap.style.background = '#ffa265' }
        if(main_slider_index == 4){  MainWrap.style.background = '#79bcd6' }
        if(main_slider_index == 5){  MainWrap.style.background = '#ffebc6' }
        if(main_slider_index == 6){  MainWrap.style.background = '#ffee56' }
        if(main_slider_index == 7){  MainWrap.style.background = '#ffa696' }
        // 添加状态
        main_slider_bots[main_slider_index].className = 'bot_show';
        animate(main_slider_imgs[main_slider_index],{'opacity':1});
        main_slider_preIndex = main_slider_index;
        main_slider_time();

    }.bind(main_slider_bots[i],i)
}
// 充值隐藏界面
var payment = document.querySelector('.payment');
var pay_hidden = document.querySelector('.payment em');
var huaFei = document.querySelector('.new_serve').firstElementChild;
huaFei.onmouseenter = function(){
    animate(payment,{'top':230});
}

pay_hidden.onclick = function(){
    animate(payment,{'top':450});
}
//                 倒计时       
var  two_countDown = document.querySelectorAll('.countDown_right span');
// 计时器函数
countDown('2020/9/18 16:00:00');  
function countDown(dates){
    setInterval(function(){
        var countDown_targetDate = new Date(dates);
        var countDown_nowDate = new Date();
        var countDown_time = countDown_targetDate - countDown_nowDate;
        var hours = parseInt(countDown_time/(60*60*1000));
        var minutes = parseInt((countDown_time - hours*(60*60*1000))/60/1000);
        var seconds = parseInt((countDown_time - hours*(60*60*1000) - minutes*60*1000)/1000);
        hours < 10 ? hours = '0' + hours : hours
        minutes < 10 ? minutes = '0' + minutes : minutes
        seconds < 10 ? seconds = '0' + seconds : seconds
        two_countDown[0].innerText = hours;
        two_countDown[1].innerText = minutes;
        two_countDown[2].innerText = seconds;
    },1000)
}
// <!-- 透明度运动 -->
var two_contents = document.querySelectorAll('.two_content');
var two_contentW_left = document.querySelector('.two_contentW_left');
var two_contentW_right = document.querySelector('.two_contentW_right');
var two_contentW_index = 0,two_contentW_preIndex = 0;
// 透明度运动
two_contents[two_contentW_preIndex].style.opacity = '1';
function two_content(){
    // 清除上一页样式
    two_contents[two_contentW_preIndex].style.opacity = '0.02';
    two_contentW_index++;
    if(two_contentW_index>=two_contents.length){
        two_contentW_index = 0;
    }
    animate(two_contents[two_contentW_index],{'opacity':1})
    two_contentW_preIndex = two_contentW_index;
}
function two_contentLeft(){
    // 清除上一页样式
    two_contents[two_contentW_preIndex].style.opacity = '0.02';
    two_contentW_index--;
    if(two_contentW_index<0){
        two_contentW_index = two_contents.length-1;
    }
    animate(two_contents[two_contentW_index],{'opacity':1})
    two_contentW_preIndex = two_contentW_index;
}
two_contentW_left.onclick = function(){
    clearInterval(two_contents[two_contentW_index].timer);
    two_contentLeft();
}
two_contentW_right.onclick = function(){
    clearInterval(two_contents[two_contentW_index].timer);
    two_content();
}
// 滚动显示头部
// var scrollSearch_wrap = document.querySelector('.scrollSearch_wrap');
// document.onscroll = function(){
//     if(document.documentElement.scrollTop>700){
//         scrollSearch_wrap.style.display = 'block';
//         console.log(1);
//     }else{
//         scrollSearch_wrap.style.display = 'none';
//     }
// }
// 返回顶部
var fixed_navBottom4 = document.querySelector('.fixed_navBottom4');
fixed_navBottom4.onclick = function(){
   animate(document.documentElement,{'scrollTop':0});
}
// 猜你喜欢
var mayLike_right_right = document.querySelector('.mayLike_right_right');
var mayLike_right_left = document.querySelector('.mayLike_right_left');
var mayLike_content = document.querySelectorAll('.mayLike_content');
var mayLike_content_index = 0,mayLike_content_preIndex = 0;
// 透明度运动
mayLike_content[mayLike_content_preIndex].style.opacity = '1';
function mayLike_contents(){
    // 清除上一页样式
    mayLike_content[mayLike_content_preIndex].style.opacity = '0.02';
    mayLike_content_index++;
    if(mayLike_content_index>=mayLike_content.length){
        mayLike_content_index = 0;
    }
    animate(mayLike_content[mayLike_content_index],{'opacity':1})
    mayLike_content_preIndex = mayLike_content_index;
}
function mayLike_contentsLeft(){
    // 清除上一页样式
    mayLike_content[mayLike_content_preIndex].style.opacity = '0.02';
    mayLike_content_index--;
    if(mayLike_content_index<0){
        mayLike_content_index = mayLike_content.length-1;
    }
    animate(mayLike_content[mayLike_content_index],{'opacity':1})
    mayLike_content_preIndex = mayLike_content_index;
}

mayLike_right_left.onclick = function(){
    clearInterval(mayLike_content[mayLike_content_index].timer);
    mayLike_contentsLeft();
}
mayLike_right_right.onclick = function(){
    clearInterval(mayLike_content[mayLike_content_index].timer);
    mayLike_contents();
}
F1({
    slider_banner_left:'.F1_wrap .slider_banner_left',
    slider_banner_right:'.F1_wrap .slider_banner_right',
    banner_logo:'.F1_wrap .banner_logo',
    slider_banner_bots:'.F1_wrap .slider_banner_bots li',
    slider_banner:'.F1_wrap .slider_banner'
});
F1({
    slider_banner_left:'.F2_wrap .slider_banner_left',
    slider_banner_right:'.F2_wrap .slider_banner_right',
    banner_logo:'.F2_wrap .banner_logo',
    slider_banner_bots:'.F2_wrap .slider_banner_bots li',
    slider_banner:'.F2_wrap .slider_banner'
});
F1({
    slider_banner_left:'.F3_wrap .slider_banner_left',
    slider_banner_right:'.F3_wrap .slider_banner_right',
    banner_logo:'.F3_wrap .banner_logo',
    slider_banner_bots:'.F3_wrap .slider_banner_bots li',
    slider_banner:'.F3_wrap .slider_banner'
});
F1({
    slider_banner_left:'.F4_wrap .slider_banner_left',
    slider_banner_right:'.F4_wrap .slider_banner_right',
    banner_logo:'.F4_wrap .banner_logo',
    slider_banner_bots:'.F4_wrap .slider_banner_bots li',
    slider_banner:'.F4_wrap .slider_banner'
});
F1({
    slider_banner_left:'.F5_wrap .slider_banner_left',
    slider_banner_right:'.F5_wrap .slider_banner_right',
    banner_logo:'.F5_wrap .banner_logo',
    slider_banner_bots:'.F5_wrap .slider_banner_bots li',
    slider_banner:'.F5_wrap .slider_banner'
});
F1({
    slider_banner_left:'.F6_wrap .slider_banner_left',
    slider_banner_right:'.F6_wrap .slider_banner_right',
    banner_logo:'.F6_wrap .banner_logo',
    slider_banner_bots:'.F6_wrap .slider_banner_bots li',
    slider_banner:'.F6_wrap .slider_banner'
});
F1({
    slider_banner_left:'.F7_wrap .slider_banner_left',
    slider_banner_right:'.F7_wrap .slider_banner_right',
    banner_logo:'.F7_wrap .banner_logo',
    slider_banner_bots:'.F7_wrap .slider_banner_bots li',
    slider_banner:'.F7_wrap .slider_banner'
});
function F1(F_obj){
    //                    1F轮播图
var slider_banner_left = document.querySelector(F_obj.slider_banner_left);
var slider_banner_right = document.querySelector(F_obj.slider_banner_right);
var banner_logo = document.querySelectorAll(F_obj.banner_logo);
var slider_banner_bots = document.querySelectorAll(F_obj.slider_banner_bots);
var slider_banner = document.querySelectorAll(F_obj.slider_banner);
var slider_banner_index = 0,slider_banner_preIndex = 0, slider_banner_timer = null;
// 
slider_banner[slider_banner_preIndex].style.opacity = '1';
banner_logo[slider_banner_preIndex].style.opacity = '1';
slider_banner_bots[slider_banner_preIndex].className = 'botsShow';
// 
slider_banner_auto();
function slider_banner_auto(){
    clearInterval(slider_banner_timer);
    slider_banner_timer = setInterval(function(){
        slider_banner_R();
    },2000)
}
function slider_banner_R(){
    // 清除
    slider_banner[slider_banner_preIndex].style.opacity = '0.02';
    banner_logo[slider_banner_preIndex].style.opacity = '0.02';
    slider_banner_bots[slider_banner_preIndex].className = '';
    slider_banner_index++;
    if(slider_banner_index>=slider_banner.length){
        slider_banner_index = 0
    }
    // 
    slider_banner_bots[slider_banner_index].className = 'botsShow';
    animate(slider_banner[slider_banner_index],{'opacity':1});
    animate(banner_logo[slider_banner_index],{'opacity':1});
    slider_banner_preIndex = slider_banner_index;
}
function slider_banner_L(){
    // 清除
    slider_banner[slider_banner_preIndex].style.opacity = '0.02';
    banner_logo[slider_banner_preIndex].style.opacity = '0.02';
    slider_banner_bots[slider_banner_preIndex].className = '';
    slider_banner_index--;
    if(slider_banner_index<0){
        slider_banner_index = slider_banner.length-1
    }
    // 
    slider_banner_bots[slider_banner_index].className = 'botsShow';
    animate(slider_banner[slider_banner_index],{'opacity':1});
    animate(banner_logo[slider_banner_index],{'opacity':1});
    slider_banner_preIndex = slider_banner_index;
}
slider_banner_left.onclick= function(){
    clearInterval(slider_banner_timer);
    clearInterval(slider_banner[slider_banner_index].timer)
    clearInterval(banner_logo[slider_banner_index].timer)
    slider_banner_L();
    slider_banner_auto();
}
slider_banner_right.onclick = function(){
    clearInterval(slider_banner_timer);
    clearInterval(slider_banner[slider_banner_index].timer)
    clearInterval(banner_logo[slider_banner_index].timer)
    slider_banner_R();
    slider_banner_auto();
}
for(let i =0 ;i<slider_banner_bots.length; i++){
    slider_banner_bots[i].onmouseenter = function(a){
    clearInterval(slider_banner_timer);
    clearInterval(slider_banner[slider_banner_index].timer)
    clearInterval(banner_logo[slider_banner_index].timer)
    // 清除
    slider_banner[slider_banner_preIndex].style.opacity = '0.02';
    banner_logo[slider_banner_preIndex].style.opacity = '0.02';
    slider_banner_bots[slider_banner_preIndex].className = '';

    slider_banner_index = a;
    // 
    slider_banner_bots[slider_banner_index].className = 'botsShow';
    animate(slider_banner[slider_banner_index],{'opacity':1});
    animate(banner_logo[slider_banner_index],{'opacity':1});
    slider_banner_preIndex = slider_banner_index;
    slider_banner_auto();
    }.bind(this,i)
}
}

F2({
    title_right:'.F1_wrap .title_right a',
    F1_btn_right:'.F1_wrap .F1_btn_right',
    cons_right:'.F1_wrap .cons_right'
});
F2({
    title_right:'.F2_wrap .title_right a',
    F1_btn_right:'.F2_wrap .F1_btn_right',
    cons_right:'.F2_wrap .cons_right'
});
F2({
    title_right:'.F3_wrap .title_right a',
    F1_btn_right:'.F3_wrap .F1_btn_right',
    cons_right:'.F3_wrap .cons_right'
});
F2({
    title_right:'.F4_wrap .title_right a',
    F1_btn_right:'.F4_wrap .F1_btn_right',
    cons_right:'.F4_wrap .cons_right'
});
F2({
    title_right:'.F5_wrap .title_right a',
    F1_btn_right:'.F5_wrap .F1_btn_right',
    cons_right:'.F5_wrap .cons_right'
});
F2({
    title_right:'.F6_wrap .title_right a',
    F1_btn_right:'.F6_wrap .F1_btn_right',
    cons_right:'.F6_wrap .cons_right'
});
F2({
    title_right:'.F7_wrap .title_right a',
    F1_btn_right:'.F7_wrap .F1_btn_right',
    cons_right:'.F7_wrap .cons_right'
});
function F2(F2_obj){
    // 1F 轮播切换
var title_right = document.querySelectorAll(F2_obj.title_right);
var F1_btn_right = document.querySelector(F2_obj.F1_btn_right);
var cons_right = document.querySelectorAll(F2_obj.cons_right);
var cons_right_index = 0,cons_right_preIndex = 0;
title_right[cons_right_preIndex].className = 'title_right_show';
cons_right[cons_right_preIndex].style.opacity = '1';
// 

function cons_right_auto(){
    title_right[cons_right_preIndex].className = '';
    cons_right[cons_right_preIndex].style.opacity = '0';
    cons_right_index++;
    if(cons_right_index>=cons_right.length){
        cons_right_index = 0;
    }
    title_right[cons_right_index].className = 'title_right_show';
    animate(cons_right[cons_right_index],{'opacity':1});
    cons_right_preIndex = cons_right_index;
}
F1_btn_right.onclick = function(){
    clearInterval(cons_right[cons_right_index].timer);
    cons_right_auto();
}
for(let i = 0; i<title_right.length;i++){
    title_right[i].onmouseenter = function(a){
        clearInterval(cons_right[cons_right_index].timer);
        title_right[cons_right_preIndex].className = '';
        cons_right[cons_right_preIndex].style.opacity = '0';
        cons_right_index = a;
        title_right[cons_right_index].className = 'title_right_show';
        animate(cons_right[cons_right_index],{'opacity':1});
        cons_right_preIndex = cons_right_index;
    }.bind(this,i)
}

}
// <!-- 左侧固定锚点连接 -->
var b_shows = document.querySelectorAll('.FNav .FNav_floor li  b');
var i_show = document.querySelectorAll('.FNav .FNav_floor li i');
var color_show = document.querySelectorAll('.FNav_floor li ');
var FNav = document.querySelector('.FNav');
console.log(b_shows);
console.log(i_show);
console.log(color_show);
function clear_show(){
    for(let i = 0; i<color_show.length; i++){
        color_show[i].style.color = '#5e5e5e';
        i_show[i].style.color = '#5e5e5e';
        b_shows[i].style.opacity = '0';
    }
}

var scrollSearch_wrap = document.querySelector('.scrollSearch_wrap');
 (document.onscroll = function(){
    if(document.documentElement.scrollTop>700){
        scrollSearch_wrap.style.display = 'block';
    }else{
        scrollSearch_wrap.style.display = 'none';
    }

    if(document.documentElement.scrollTop<5600 && document.documentElement.scrollTop>1800){
        FNav.style.display = 'block';
    }else{
        FNav.style.display = 'none';
    }
    if(document.documentElement.scrollTop>1800 && document.documentElement.scrollTop<2340){
        clear_show();
        color_show[0].style.color = '#f5004b';
        i_show[0].style.color = '#f5004b';
        b_shows[0].style.opacity = '1';
    }
    if(document.documentElement.scrollTop>=2340 && document.documentElement.scrollTop<2880){
        clear_show();
        color_show[1].style.color = '#f5004b';
        i_show[1].style.color = '#f5004b';
        b_shows[1].style.opacity = '1';
    }
    if(document.documentElement.scrollTop>=2880 && document.documentElement.scrollTop<3420){
        clear_show();
        color_show[2].style.color = '#f5004b';
        i_show[2].style.color = '#f5004b';
        b_shows[2].style.opacity = '1';
    }
    if(document.documentElement.scrollTop>=3420 && document.documentElement.scrollTop<3960){
        clear_show();
        color_show[3].style.color = '#f5004b';
        i_show[3].style.color = '#f5004b';
        b_shows[3].style.opacity = '1';
    }
    if(document.documentElement.scrollTop>=3960 && document.documentElement.scrollTop<4500){
        clear_show();
        color_show[4].style.color = '#f5004b';
        i_show[4].style.color = '#f5004b';
        b_shows[4].style.opacity = '1';
    }
    if(document.documentElement.scrollTop>=4500 && document.documentElement.scrollTop<5040){
        clear_show();
        color_show[5].style.color = '#f5004b';
        i_show[5].style.color = '#f5004b';
        b_shows[5].style.opacity = '1';
    }
    if(document.documentElement.scrollTop>=5040 && document.documentElement.scrollTop<5600){
        clear_show();
        color_show[6].style.color = '#f5004b';
        i_show[6].style.color = '#f5004b';
        b_shows[6].style.opacity = '1';
    }
})();
for(let i = 0; i<color_show.length; i++){
    color_show[i].onclick = function(i){
        clearInterval(document.documentElement.timer);
        // document.onscroll = null;
        clear_show();
        color_show[i].style.color = '#f5004b';
        i_show[i].style.color = '#f5004b';
        animate(document.documentElement,{'scrollTop':(1800 + i*540)});
        // b_shows[i].style.opacity = '1';
    }.bind(this,i)
    
}
var back_top = document.querySelector('.back_top');
var back_bottom = document.querySelector('.back_bottom');
back_top.onclick = function(ev){
    var e = ev || window.event;
    e.preventDefault ? event.preventDefault() : (event.returnValue = false);
    document.documentElement.scrollTop = 0
}
back_bottom.onclick = function(ev){
    var e = ev || window.event;
    e.preventDefault ? event.preventDefault() : (event.returnValue = false);
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
}
