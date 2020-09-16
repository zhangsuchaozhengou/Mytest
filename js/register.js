// 手机号码验证
var $line1 = $('.line1');
var $circle_2 = $('.circle_2');
var $mes_2 = $('.mes_2');
var $pho = $('.pho');
var $pho_yz = $('.pho_yz');
var $phone = $('.phone');
var $zHao = $('.zHao');
var $next_pho = $('.next_pho');
var $yzm = $('.yzm')
var $yzm_write = $('.dx input');

$pho.focus(function(){
    $pho_yz.css({
        opacity:1,
        color:'#5e5e5e'
    }),
    $pho_yz.text('验证完成后，你可以使用该手机登录或找回密码')
})
$pho.keydown(function(){
    if($pho.val().length>=11){
        var vv = $pho.val().slice(0,10);
        $pho.val(vv);
    }
   
})
var phone_bool = false;
$pho.blur(function(){
    if(!$pho.val()){
        $pho_yz.css({
            opacity:1,
            color:'#ff4c4c'
        }),
        $pho_yz.text('手机号码不能为空')
        return false;
    }
    var reg_phone = /^(1|\+861)[3-8]{1}\d{9}$/; 
    if(!(reg_phone.test($pho.val()))){
        $pho_yz.css({
            opacity:1,
            color:'#ff4c4c'
        }),
        $pho_yz.text('手机号码输入错误');
        return false;
    }else{
        phone_bool = true;
    }
})
$yzm.click(function(){
    $yzm_write.val(randomCode());
})
var $phone_next_pho = $('.phone .next_pho');
 $phone_next_pho.click(function(){
    if($yzm_write.val() && phone_bool){
        $line1.css('background-color','#ff4c4c')
        $circle_2.css({
           borderColor:'#ff4c4c',
            color:'#ff4c4c'
        });
        $mes_2.css('color','#ff4c4c')
        $phone.css('display','none');
        $zHao.css('display','block');
    }
});


// 账号信息
var $zh = $('.zh');
var $zh_yz = $('.zh_yz');
var $mm = $('.mm');
var $mm_yz = $('.mm_yz');
var $line2 = $('.line2');
var $circle_3 = $('.circle_3');
var $mes_3 = $('.mes_3');
var $zHao_next_pho = $('.zHao .next_pho');
$zh.focus(function(){
    $zh_yz.css({
        opacity:'1',
    });
    $zh_yz.text('请输入邮箱');
})
var zh_bool = false;
var mm_bool = false;
$zh.blur(function(){
    if(!$zh.val()){
        $zh_yz.css({
            opacity:'1',
            color:'#ff4c4c'
        });
        $zh_yz.text('邮箱不能为空');
        return false;
    }
    var reg_mail = /^\w{2,18}@[0-9a-z]{1,10}(\.[a-z]{2,3}){1,2}$/;
    if(!(reg_mail.test($zh.val()))){
        $zh_yz.css({
            opacity:'1',
            color:'#ff4c4c'
        });
        $zh_yz.text('邮箱输入不正确');
        return false;
    }else{
        zh_bool = true;
        $zh_yz.css({
            opacity:'0',
        });
    }
})
$mm.focus(function(){
    $mm_yz.css({
        opacity:'1',
    });
    $mm_yz.text('请输入密码');
})
$mm.blur(function(){
    if(!$mm.val()){
        $mm_yz.css({
            opacity:'1',
            color:'#ff4c4c'
        });
        $mm_yz.text('密码不能为空');
        return false;
    }
    var reg_ps = /^\w{6,18}/;
    if(!(reg_ps.test($mm.val()))){
        $mm_yz.css({
            opacity:'1',
            color:'#ff4c4c'
        });
        $mm_yz.text('密码输入不正确');
        return false;
    }else{
        mm_bool = true;
        $mm_yz.css({
            opacity:'0',
        });
    }
})
$zHao_next_pho.click(function(){
    if(zh_bool && mm_bool){
        $line2.css('background-color','#ff4c4c');
        $circle_3.css({
            color:'#ff4c4c',
            borderColor:'#ff4c4c'
        });
        $mes_3.css('color','#ff4c4c');
        var zh_value = $zh.val();
        var mm_value = $mm.val();
        // 保存手机号码信息
        var phone_value = $pho.val();
        console.log(phone_value,zh_value,mm_value);
        $.ajax({
            type: 'get',
            url: '../js/reg.php',
            dataType: 'json',
            data:{
                name: $zh.val(),
                password: $mm.val(),
                phone: $pho.val(),
            },
            cache:false,
            success:function(data){
                console.log(data);
                alert(data.message);
                if(data.message == '注册成功'){
                        // 添加cookie
                        // setCookie({
                        //     key:'user'+Math.random().toFixed(8),
                        //     val:`zh=${zh_value}; mm=${mm_value}; phone=${phone_value}`,
                        //     days:30,
                        // });
                     location.href = 'http://localhost/project/homepage.html';
                }
            },
            error:function(){
                alert('注册失败');
            }

        });
       
    }
});

