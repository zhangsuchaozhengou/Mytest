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
    animate(privilege_content,{'scrollLeft':privilege_index*privilege_content_switchALL[0].clientWidth});
}
privilege_left.onclick = function(){
    privilege_index--;
    if(privilege_index < 0){
        privilege_index = privilege_content_switchALL.length-2;
        privilege_content.scrollLeft = privilege_content_switchALL.length*privilege_content_switchALL[0].clientWidth;
    }
    animate(privilege_content,{'scrollLeft':privilege_index*privilege_content_switchALL[0].clientWidth});
}
// top1198二级菜单
var top_navControl = document.querySelector('.headerRight li:nth-child(5)');
var top_nav  = document.querySelector('.top_nav');
top_navControl.onmouseenter = function(){
    top_nav.style.display = "block";
}
top_navControl.onmouseleave = function(){
    top_nav.style.display = "none";
}
// 搜索框点击切换店铺
var dianPu = document.querySelector('.dianPu i');
var dianPu_list = document.querySelectorAll('.dianPu_hid li');
for(let ii = 0;ii<dianPu_list.length;ii++){
    dianPu_list[ii].onclick = function(ii){
        dianPu.innerText = dianPu_list[ii].innerText;
    }.bind(this,ii);
};
// ----------------------------------------------------------------------------------------
var $glass = $('.glass');
var $glass_img = $('.glass img');
var $mask = $('.mask');
var $img_big = $('.glass_big img');
var $glass_big = $('.glass_big');
var $target_title = $('.detailed_title h1');
var $target_red_title = $('.detailed_title p');
var $price = $('.price_left .price'); 
var $evaluate_num = $('.evaluate_num');
$.ajax({
    url:'../js/list.json',
    datatype:'json',
    type:'get',
    data:'',
    success:function(data){
        if(getCookie('target')){
            $.each(data,(index,target_src)=>{
                if(target_src.id == getCookie('target')){
                    console.log(target_src.img_src);
                    $glass_img.prop('src',target_src.img_src);
                    $glass_big.prop('src',target_src.img_src);
                    $target_title.text(target_src.title);
                    $target_red_title.text(target_src.red_title);
                    $price.text(target_src.price);
                    $evaluate_num.text(target_src.evaluate_num);
                
                }
            })
        }else{
            alert('请走正门');
            location.href = './list.html';
        }
    },
    error:function(){
        alert('请求数据失败')
    }
});

$glass.mousemove(function(ev){
    var e = ev || window.event;
    var left = e.pageX - $glass[0].offsetLeft;
    var top = e.pageY - $glass[0].offsetTop;
    var x = left - $mask.width()/2;
    var y = top - $mask.height()/2;
    if(x<=0){
        x=0;
    }
    if(x>=($glass.width() - $mask.width())){
        x=$glass.width() - $mask.width();
    }
    if(y<=0){
        y=0;
    }
    if(y>=($glass.height() - $mask.height())){
        y=$glass.height() - $mask.height();
    }
    $mask.css({
        left:x,
        top:y
    });
    var percentageX = x/($glass.width() - $mask.width());
    var percentageY = y/($glass.height() - $mask.height());

    var big_x = -($img_big.width() - $glass_big.width())*percentageX;
    var big_y = -($img_big.height() - $glass_big.height())*percentageY;
    $img_big.css({
        left:big_x,
        top:big_y
    });
});
//  <!-- 镜下图片切换 -->
var $slider_left = $('.slider_left');
var $slider_right = $('.slider_right');
var $scroll_wrap = $('.scroll_wrap');
var $slider_contents = $('.slider_content');
var slider_index = 0;
// 向下一页滚动
$slider_right.click(function(){
    slider_index=1;
    $scroll_wrap.stop(true).animate({'scrollLeft':slider_index*$scroll_wrap.width()},'normal','swing',function(){
        slider_index == 1?$slider_right.css('cursor','no-drop') : $slider_left.css('cursor','no-drop');
        if(slider_index == 1){
            $slider_right.css('cursor','no-drop');
            $slider_left.css('cursor','pointer');
        }else{
            $slider_left.css('cursor','no-drop');
            $slider_right.css('cursor','pointer');
        }
    });
});
$slider_left.click(function(){
    slider_index=0;
    $scroll_wrap.stop(true).animate({'scrollLeft':slider_index*$scroll_wrap.width()},'normal','swing',function(){
        if(slider_index == 1){
            $slider_right.css('cursor','no-drop');
            $slider_left.css('cursor','pointer');
        }else{
            $slider_left.css('cursor','no-drop');
            $slider_right.css('cursor','pointer');
        }
    });
});
var $slider_img = $('.scroll_wrap img');
$slider_img.mouseenter(function(){
    $glass_img.attr('src',$(this).attr('bpic'));
    $img_big.attr('src',$(this).attr('rpic'));
});
// 购买商品数量
var $shop_input = $('.shop_num input');
var $add = $('.add');
var $sub = $('.sub');
var shop_num = 1;
$add.click(function(){
    shop_num++;
    $shop_input.val(shop_num);
});
$sub.click(function(){
    shop_num--;
    if(shop_num<1){
        shop_num = 1;
    }
    $shop_input.val(shop_num);
});
$shop_input.blur(function(){
    var input_val = $shop_input.val();
    $shop_input.val(input_val);
});
(async function(){
// 其他类似商品 轮播图
var $analogy_content_left = $('.analogy_content_left');
var $analogy_content_right = $('.analogy_content_right');
var $analogy_content_scroll = $('.analogy_content_scroll');
var $analogy_scroll_width = $('.analogy_scroll_width');
    await  $.ajax({
            type:'get',
            datatype:'json',
            url:'../js/list.json',
            success:function(data){
                var num_ = 0;
                for(let i =0;i<3;i++){
                    var $analogy_contents = $('<div class="analogy_contents"></div>');
                    for(let a=0;a<6;a++){
                        num_++;
                        var $analogy_content = $(`
                        <div class="analogy_cont">
                            <img src="${data[num_].img_src}"">
                            <p><a href="#">${data[num_].title}</a></p>
                            <div class="analogy_cont_price">￥<span>${data[num_].price}</span></div>
                        </div>
                        `);
                        $analogy_contents.append($analogy_content);
                    }
                    $analogy_scroll_width.append($analogy_contents);
                }
            },
        });
var $analogy_clone = $analogy_scroll_width.children().eq(0).clone(true);
$analogy_scroll_width.append($analogy_clone);
var $analogy_contents = $('.analogy_contents');
var analogy_index = 0;
$analogy_content_right.click(function(){
    analogy_index++;
    if(analogy_index>=$analogy_contents.length){
        analogy_index = 1;
        $analogy_content_scroll.scrollLeft(0);
    }
    $analogy_content_scroll.stop(true).animate({'scrollLeft':analogy_index*$analogy_content_scroll.width()});
})
$analogy_content_left.click(function(){
    analogy_index--;
    if(analogy_index<0){
        analogy_index = $analogy_contents.length-2;
        $analogy_content_scroll.scrollLeft((analogy_index+1)*$analogy_content_scroll.width());
    }
    $analogy_content_scroll.stop(true).animate({'scrollLeft':analogy_index*$analogy_content_scroll.width()});
})
    }
)();


