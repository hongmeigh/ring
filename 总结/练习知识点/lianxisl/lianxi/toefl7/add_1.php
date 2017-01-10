<?php
//记录提交IP
function ip()
{
 if(getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'), 'unknown'))
 {
  $ip = getenv('HTTP_CLIENT_IP');
 }
 elseif(getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), 'unknown'))
 {
  $ip = getenv('HTTP_X_FORWARDED_FOR');
 }
 elseif(getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'), 'unknown'))
 {
  $ip = getenv('REMOTE_ADDR');
 }
 elseif(isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], 'unknown'))
 {
  $ip = $_SERVER['REMOTE_ADDR'];
 }
 return preg_match("/[\d\.]{7,15}/", $ip, $matches) ? $matches[0] : 'unknown';
}
$ip=ip();
//限制单位时间提交次数
session_start();
$now = time(); //当前时间
if (isset($_SESSION['last_submit']) && $now - $_SESSION['last_submit'] < 0) {
    //上次提交时间距现在超过180s

    echo "<script>alert('您已提交，请5分钟后再试！');window.top.location.href='index.html'</script>";
} else {
//写入数据库
$con = mysql_connect("10.132.64.8","diyform","tpoooqwe123");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
  mysql_select_db("diyform", $con);
  mysql_query("SET NAMES utf8");
if(isset($_POST['submit'])&&$_POST['submit'])
{
 $sql="insert into toefl_7(xing,shouji,mail,addtime,ip) 
        values('$_POST[xing]','$_POST[shouji]','$_POST[mail]',NOW(),'$ip')";
mysql_query($sql);
echo mysql_error();//输出报错信息， 没有成功一般是报mysql错误
echo "<script>alert('提交成功');window.top.location.href='index.html'</script>";
}
//写入结束
}
$_SESSION['last_submit'] = $now; //记录提交时间
?>