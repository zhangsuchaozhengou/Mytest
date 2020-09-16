<?php
header('Content-type:text/html;charset:utf-8');
$name = $_GET['name'];
$password = $_GET['password'];
$phone = $_GET['phone'];
// 链接数据库
$link = mysqli_connect('localhost','root','root','guomei');
if(!$link){
    echo '{"err":0,"message":"连接失败"}';
    die();
}
// 设置编码集
mysqli_set_charset($link,'utf8');
// 判断是否账号已经存在
$add_sql = "select * from user where name='$name'";
$add_res = mysqli_query($link,$add_sql);
$add_arr = mysqli_fetch_all($add_res);
if(count($add_arr) > 0){
    echo '{"err":2,"message":"用户已存在"}';
    die();
}
$insert_sql = "insert into user(name,password,phone) values('$name','$password','$phone')";
mysqli_query($link,$insert_sql);
// 返回受影响条数
$num = mysqli_affected_rows($link);
if($num > 0){
    echo '{"success":3,"message":"注册成功"}';
} else{
    echo '{"err":4,"message":"注册失败"}';
}
// 关闭连接
mysqli_close($link);
?>