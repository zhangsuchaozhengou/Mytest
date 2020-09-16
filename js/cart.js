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
};
// 购物车加载数据
(async function(){
  await    $.ajax({
        url:'../js/list.json',
        type:'get',
        datatype:'json',
        success:function(data){
            var data = data;
            var goods = JSON.parse(localStorage.getItem('goods'));
            $.each(data,(index,item)=>{
                $.each(goods,(goods_index,goods_item)=>{
                    if(goods_item.id == item.id){
                        var $li = $(`
                            <li class="cart_list">
                                <div class="single_checkbox"><input type="checkbox" checked></div>
                                <div class="cart_message">
                                    <img src="${item.img_src}" alt="">
                                    <div class="cart_p_wrap">
                                        <p class="cart_p1">${item.title}</p>
                                        <p class="cart_p2"><span></span> 选购增值服务<em></em></p>
                                    </div>
                                </div>
                                <div class="cart_color">
                                    <p>颜色: <span>${item.color}</span></p>
                                    <p>版本: <span>${item.版本}</span></p>
                                    <div>修改<em></em></div>
                                </div>
                                <div class="single_price">￥<span>${item.price}</span></div>
                                <div class="cart_num">
                                    <div class="sub">-</div>
                                    <input type="text" placeholder="1"value = "${goods_item.num}">
                                    <div class="add">+</div>
                                </div>
                                <div class="single_total">￥<span>${goods_item.num*item.price}</span> </div>
                                <div class="operation">
                                    <p class="single_delete" goods_id =${goods_item.id} >删除</p>
                                    <p>移入收藏夹</p>
                                </div>
                            </li>
                        `);
                    $('.cart_lists').append($li);
                    };

                });
            });
        },
        error:function(){
            alert('数据请求错误');
        }
    });
 $cart_wrap = $('.cart_wrap');
 $single_delete = $('.single_delete');
$cart_list = $('.cart_list');
 $empty_cart = $('.empty_cart');
$single_total = $('.single_total span');
$price_total = $('.price_total em');
// 本地数据为空，显示空购车的页面
if(localStorage.getItem('goods')){
    $empty_cart.css('display','none');
}else{
    $empty_cart.css('display','block');
    $cart_wrap.css('display','none');
};
// 商品数量
 $num_total = $('.num_total span');
$num_total.text($cart_list.length);
// 删除商品
$cart_wrap.on('click','.single_delete',function(){
    var goods = JSON.parse(localStorage.getItem('goods'));
    var goods_id = $(this).attr('goods_id');
    // console.log($(this).attr('goods_id'));
    $.each(goods,(index,item)=>{
        if(goods_id == item.id){
            goods.splice(index,1);
            // 把数据更新到本地存储
            localStorage.setItem('goods',JSON.stringify(goods));
            return false;
        }
    });
    $(this).parent().parent().remove();
    total_price();
        if(goods.length<=0){
            // localStorage.clear();
            localStorage.removeItem('goods');
        };
    if($('.cart_list').length==0){
        $cart_wrap.css('display','none');
        $empty_cart.css('display','block')
    }
    var $cart_list = $('.cart_list');
    $num_total.text($cart_list.length);
    var $single_total = $('.single_total span');
    // 商品总价
    function total_price(){
    var temporary_price = 0;
    $.each($single_total,(index,item)=>{
        temporary_price += ($(item).text()-0);
    });
        $price_total.text(temporary_price);
};
total_price();
});
// 商品总价
function total_price(){
    var temporary_price = 0;
    $.each($single_total,(index,item)=>{
        temporary_price += ($(item).text()-0);
    });
        $price_total.text(temporary_price);
};
total_price();
// 商品数量加减
$sub = $('.sub');
$add = $('.add');
$single_num = $('.cart_num input');
$cart_wrap.on('click','.add',function(){
    var single_number = parseInt($(this).prev().val());
    single_number++;
    $(this).prev().val(single_number);
    $(this).parent().next().find('span').text(($(this).parent().prev().find('span').text()-0)*single_number);
    total_price();
    // 数据保存到本地
    var goods = JSON.parse(localStorage.getItem('goods'));
    var goods_id = $(this).closest('.cart_list').find('.single_delete').attr('goods_id');
    // console.log($(this).attr('goods_id'));
    $.each(goods,(index,item)=>{
        if(goods_id == item.id){
           item.num = single_number;
            // 把数据更新到本地存储
            localStorage.setItem('goods',JSON.stringify(goods));
        }
    });

});
$cart_wrap.on('click','.sub',function(){
    var single_number = parseInt($(this).next().val());
    single_number--;
    if(single_number<=1){
        single_number = 1;
    };
    $(this).next().val(single_number);
    $(this).parent().next().find('span').text(($(this).parent().prev().find('span').text()-0)*single_number);
    total_price();
      // 数据保存到本地
      var goods = JSON.parse(localStorage.getItem('goods'));
      var goods_id = $(this).closest('.cart_list').find('.single_delete').attr('goods_id');
      // console.log($(this).attr('goods_id'));
      $.each(goods,(index,item)=>{
          if(goods_id == item.id){
             item.num = single_number;
              // 把数据更新到本地存储
              localStorage.setItem('goods',JSON.stringify(goods));
          }
      });
});
$cart_wrap.on('blur','.cart_num input',function(){
    var single_number = parseInt($(this).val());
    if(single_number<=1){
        single_number = 1;
        $(this).val('1')
    };
    $(this).parent().next().find('span').text(($(this).parent().prev().find('span').text()-0)*single_number);
    total_price();
      // 数据保存到本地
      var goods = JSON.parse(localStorage.getItem('goods'));
      var goods_id = $(this).closest('.cart_list').find('.single_delete').attr('goods_id');
      // console.log($(this).attr('goods_id'));
      $.each(goods,(index,item)=>{
          if(goods_id == item.id){
             item.num = single_number;
              // 把数据更新到本地存储
              localStorage.setItem('goods',JSON.stringify(goods));
          }
      });
});
// 全选
$single_checkbox = $('.single_checkbox input');
$cart_wrap.on('click','.single_checkbox input',function(){
    $.each($single_checkbox,(index,item)=>{
        if(!$(item).is(':checked')){
            $('.total_left input').prop("checked",false);
            $('.total_checkbox input').prop("checked",false);
            return false;
        }
            $('.total_left input').prop("checked",true);
            $('.total_checkbox input').prop("checked",true);
        
    })
});

$cart_wrap.on('click','.total_left input',function(){
    if($('.total_left input').is(':checked')){
        $.each($single_checkbox,(index,item)=>{
            $(item).prop("checked",true);
            $('.total_checkbox input').prop("checked",true);
        });
    }else{
        $.each($single_checkbox,(index,item)=>{
            $(item).prop("checked",false);
            $('.total_checkbox input').prop("checked",false);
        });
    }
});
$cart_wrap.on('click','.total_checkbox input',function(){
    if($('.total_checkbox input').is(':checked')){
        $.each($single_checkbox,(index,item)=>{
            $(item).prop("checked",true);
            $('.total_left input').prop("checked",true);
        });
    }else{
        $.each($single_checkbox,(index,item)=>{
            $(item).prop("checked",false);
            $('.total_left input').prop("checked",false);
        });
    }
});
// 全删------------
$cart_wrap.on('click','.total_left span',function(){
    var goods = JSON.parse(localStorage.getItem('goods'));
    $.each($single_checkbox,(del_index,del_item)=>{
        if($(del_item).is(':checked')){
            var goods_ = $(del_item).closest('.cart_list').find('.single_delete').attr('goods_id');
            $(goods).filter((index,item)=>{
                if(goods_ == item.id){
                    // console.log(item.id);
                    // console.log($(del_item).closest('.cart_list'));
                     goods.splice(index,1);
                    // 把数据更新到本地存储goods_ 
                    localStorage.setItem('goods',JSON.stringify(goods));
                    console.log(goods.length);
                    $(del_item).closest('.cart_list').remove();
                    // console.log(1);
                    return item.id!=goods_ ;
            
                }
            });
          
        };
    });
      
      
      
        




//     var goods = JSON.parse(localStorage.getItem('goods'));
//     var goods_id = $(this).attr('goods_id');
//     // console.log($(this).attr('goods_id'));
//     $.each(goods,(index,item)=>{
//         if(goods_id == item.id){
//             goods.splice(index,1);
//             // 把数据更新到本地存储
//             localStorage.setItem('goods',JSON.stringify(goods));
//             return false;
//         }
//     });
//     $(this).parent().parent().remove();
    total_price();
        if(goods.length<=0){
            // localStorage.clear();
            localStorage.removeItem('goods');
        };
    if($('.cart_list').length==0){
        $cart_wrap.css('display','none');
        $empty_cart.css('display','block')
    }
    var $cart_list = $('.cart_list');
    $num_total.text($cart_list.length);
    var $single_total = $('.single_total span');
    // 商品总价
    function total_price(){
    var temporary_price = 0;
    $.each($single_total,(index,item)=>{
        temporary_price += ($(item).text()-0);
    });
        $price_total.text(temporary_price);
};
total_price();
   
    $('.total_checkbox input').prop("checked",false);
    $('.total_left input').prop("checked",false);
});
})();
