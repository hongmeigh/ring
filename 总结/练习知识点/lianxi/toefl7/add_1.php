<?php
//��¼�ύIP
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
//���Ƶ�λʱ���ύ����
session_start();
$now = time(); //��ǰʱ��
if (isset($_SESSION['last_submit']) && $now - $_SESSION['last_submit'] < 0) {
    //�ϴ��ύʱ������ڳ���180s

    echo "<script>alert('�����ύ����5���Ӻ����ԣ�');window.top.location.href='index.html'</script>";
} else {
//д�����ݿ�
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
echo mysql_error();//���������Ϣ�� û�гɹ�һ���Ǳ�mysql����
echo "<script>alert('�ύ�ɹ�');window.top.location.href='index.html'</script>";
}
//д�����
}
$_SESSION['last_submit'] = $now; //��¼�ύʱ��
?>