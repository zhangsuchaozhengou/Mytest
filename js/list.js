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
};

titleRight_bottom.onclick = function(){
    clearInterval(titleRight_timer);
    titleRight_move();
    titleRight_auto();
};
titleRight_top.onclick = function(){
    clearInterval(titleRight_timer);
    titleRight_moveTop();
    titleRight_auto();
};
// ----------------------------------------------------------------------------------------
// filtrate_content_wrap 展开
var $expanded = $('.expanded');
var $hiddens = $('.hiddens');
$expanded.click(function(){
    $expanded.toggleClass('toggles');
    if($expanded.hasClass('toggles')){
        var $toggles_b = $('.toggles b');
        $toggles_b.text('收起');
        $hiddens.css('display','block');
    }else{
        var $expanded_b = $('.expanded b');
        $expanded_b.text('更多选项（操作系统,运行内存,机身内存,CPU核数,电池容量,像素,颜色');
        $hiddens.css('display','none');
    }
});
// 地址规定定位
var content_wrap = document.querySelector('.content_wrap');
var content_address = document.querySelector('.content_address');
document.onscroll = function(){
    if(document.documentElement.scrollTop>=770){
        content_address.style = 'position:fixed;top:0;left:50%;margin-left:-392px';
    }else{
        content_address.style = 'position:static;';
    }
};
// ajax请求数据
var $lists_wrap = $('.lists_wrap');
$.ajax({
    url:'../js/list.json',
    datatype:'json',
    type:'get',
    data:'',
    success:function(message){
        for(let i = 0; i<4;i++ ){
            for(let a = 0; a<message.length;a++){
                message[a].num = 1;
                $lists_wrap.append($(`<li list_id =${message[a].id}>
                    <a href="../html/detail.html"><img src="${message[a].img_src}" alt="phone"></a>
                    <div class="small_img"><img src="${message[a].small_src}" alt="phone"></div>
                    <p class="list_price">￥<span>${message[a].price}</span></p>
                    <p class="list_title"><a href="../html/detail.html">${message[a].title}</a></p>
                    <p class="red_title">${message[a].red_title}</p>
                    <p class="list_evaluate">已有<span>${message[a].evaluate_num}</span>人评价</p>
                    <div class="list_icon"><span>自营</span></div>
                    <div class="list_hidden">
                        <div class="list_hidden_ch"><span></span></div>
                        <div class="list_hidden_ch"><span></span></div>
                        <div class="list_hidden_ch add_cart" list_id =${message[a].id}><a href="#"><span></span></a></div>
                        <div class="list_hidden_ch" style="border: none;"><span></span></div>
                    </div>
                </li>`));
            }
        }
    },
    error:function(){
        console.log('请求失败');
    }
});
// 在localStorage中保存商品标签名和数量【{id:1,num：2}】
var $add_cart = $('.add_cart');
$('.lists_wrap').on('click','.add_cart',function(){
    var goodsArray = [];
    // 判断本地是否存在
    if(localStorage.getItem('goods')){
        // 存在判断购物车是否已存在本商品
         goodsArray = JSON.parse(localStorage.getItem('goods'));
    }
    var goods_id = $(this).attr('list_id');
    console.log(goods_id);
    var flag = false;
    $.each(goodsArray,(index,item)=>{
        if(item.id == goods_id){
            flag = true;
            item.num++;
            return false;
        }
    });
    // 商品不存在，添加数据
    if(!flag){
        goodsArray.push({"id":goods_id,"num":1});
    }
    // 数据存储到 localStorage中
    localStorage.setItem('goods',JSON.stringify(goodsArray));
    alert('加入购物车成功！');
});
// cookie 传商品
var lists_wrap = document.querySelector('.lists_wrap');
lists_wrap.onclick = function(ev){
    var e = ev || window.event;
    var target = e.target || e.srcElement;
   
    if(target.nodeName == 'IMG' && target.parentNode.nodeName == 'A'){
        setCookie({
            key:'target',
            val:target.parentNode.parentNode.getAttribute('list_id')
        });
    }
}