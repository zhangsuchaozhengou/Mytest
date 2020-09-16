let nn = 0;
$('.login_select span').click(function(){
    $('.login_select span').css('background-position','0 -25px')
    nn++;
    if(nn%2 !=0){
        $('.login_select').height(82);
        $('.login_select span').css('background-position','0 -25px')
    }else{
        $('.login_select').height(42);
        $('.login_select span').css('background-position','0 0')
    }
})
// 二维码滑动
$('.er_wrap').mouseenter(function(){
    $('.er_wrap').stop(true).animate({'margin-left':'9px'},200,function(){
        $('.hid_img').css('display','block')
    })
})
$('.er_wrap').mouseleave(function(){
    $('.hid_img').css('display','none')
    $('.er_wrap').stop(true).animate({'margin-left':'69px'},200)
})
// 登陆功能
$check = $('.check input[type=checkbox]');
$checkbox = $('.checkbox');
// 点击切换登陆方式
var $login_style_left = $('.login_style_left');
var $login_middle = $('.login_middle');
var $login_style_right = $('.login_style_right');
var $login_middle2 = $('.login_middle2');
$login_style_right.click(function(){
    $login_style_left.css('color','#5e5e5e')
    $login_style_right.css('color','#e3101e')
    $login_middle.css('display','none')
    $login_middle2.css('display','block')
    // 自动登陆
    if(document.cookie){
        $checkbox.prop('checked',true);
        $zh.val(getCookie('name'));
        $ps.val(getCookie('password'));
    }else{
        $checkbox.prop('checked',false)
    }
})
$login_style_left.click(function(){
    $login_style_right.css('color','#5e5e5e')
    $login_style_left.css('color','#e3101e')
    $login_middle2.css('display','none')
    $login_middle.css('display','block')
})
// 账号登陆功能
// 自动登陆提示
$auto_login = $('.check_wrap .check');

$mt = $('.mt')
$cuo = $('.cuo1');
let bb = 0;
$auto_login.click(function(){
    bb++;
    if(bb%2 != 0){
        $check.prop('checked',true)
    }
    if(bb%2 == 0){
        $check.prop('checked',false)
    }
    if( $check.prop('checked')){
        $mt.css('margin-top','0')
        $cuo.css({
            display:'block',
            background: '#ffeede',
            color: '#ff8001'
        }).find('.error_txt').text('公共场所不建议自动登录，以防账号丢失').prev().css('background-position','-41px -72px')

    }else{
        // $mt.css('margin-top','26px')
        $cuo.css({
            display:'none',
            background: '#ffeeee',
            color: '#e3111e'
        }).find('.error_txt').text('公共场所不建议自动登录，以防账号丢失').prev().css('background-position','-41px -54px')
    }
})
// 登录验证
var $zh = $('.mt');
var $ps = $('.ps');
var $check = $('.check');
var $waring = $('.cuo1');
var $btn = $('.btn');


// 自动登陆功能
// 正则验证
var reg_phone = /^(1|\+861)[3-8]{1}\d{9}$/;
var reg_mail = /^\w{2,18}@[0-9a-z]{1,10}(\.[a-z]{2,3}){1,2}$/;
var reg_ps = /^\w{6,18}/;
$btn.click(function(){
    if(!$zh.val()){
        $waring.css('display','block').find('.error_txt').text('账号不能为空');
        return false;
    };
    if(!$ps.val()){
        $waring.css('display','block').find('.error_txt').text('密码不能为空');
        return false;
    };
    // console.log($zh.val(),$ps.val());
    // console.log(reg_phone.test($zh.val()),reg_mail.test($zh.val()));
    // console.log(reg_ps.test($ps.val()));
    if((!reg_phone.test($zh.val())) && (!reg_mail.test($zh.val()))){
        $waring.css('display','block').find('.error_txt').text('账号或密码格式不匹配');
        return false;
    }
    if(!(reg_ps.test($ps.val()))){
        $waring.css('display','block').find('.error_txt').text('账号或密码格式不匹配');
        return false;
    }
    $waring.css('display','none').find('.error_txt').text('');

// 数据库验证
    $.ajax({
        url:'../js/mmreg.php',
        data:{
            name:$zh.val(),
            password:$ps.val()
        },
        type:'get',
        dataType:'json',
        cache:false,
        success:function(data){
            alert(data.message);
            // 添加cookie
            if(data.message == '登录成功'){
                setCookie({
                    key:'name',
                    val:$zh.val(),
                    days:30,
                });
                setCookie({
                    key:'password',
                    val:$ps.val(),
                    days:30,
                });
                if(!$checkbox.prop('checked')){
                    removeCookie(user)
                }
                location.href = 'http://localhost/project/homepage.html';
            }
        },
        error:function(){
            alert('登录失败')
        }
    })
})


