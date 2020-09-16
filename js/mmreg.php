<?php
header('Content-type:text/html;charset:utf-8');
$name = $_GET['name'];
$password = $_GET['password'];
// 连接数据库
$link = mysqli_connect('localhost','root','root','guomei');
if(!$link){
    echo '{"err":0,"message":"连接失败"}';
    die();
}
// 设置编码集
mysqli_set_charset($link,'utf8');
// 判断账号是否存在
$search_sql = "select * from user where name = '$name'";
$res_sql = mysqli_query($link,$search_sql);
$num_sql = mysqli_fetch_all($res_sql);
if(count($num_sql) > 0){
    echo '{"success":1,"message":"登录成功"}';
}else{
    echo '{"err":2,"message":"用户不存在,请注册"}';
}
// 关闭连接
mysqli_close($link);
?>