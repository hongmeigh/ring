<?php
$con = mysql_connect("10.132.64.8","diyform","tpoooqwe123");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
  mysql_select_db("diyform", $con);
  mysql_query("SET NAMES utf8");
{
	echo"<span style='color:#cc3300; font-weight:bold;'>申请列表：</span>";
	echo "<table width='700' border='0' cellpadding='0' cellspacing='0' bgcolor='#6699cc'>
  <tr>
    <td><table width='700' border='0' cellpadding='4' cellspacing='1'>
  <tr>
    <td width='116' bgcolor='#ffffffFFF'>姓名</td>
	<td width='116' bgcolor='#ffffffFFF'>手机</td>
	<td width='63' bgcolor='#ffffffFFF'>年龄</td>
	<td width='185' bgcolor='#ffffffFFF'>邮箱</td>
	<td width='174' bgcolor='#ffffffFFF'>申请时间</td>
  </tr>
</table>
</td>
  </tr>
</table>";
	 $result = mysql_query("SELECT * FROM toefl_7");
	 while($row = mysql_fetch_array($result))
echo "<table width='700' border='0' cellpadding='0' cellspacing='0' bgcolor='#6699cc'>
  <tr>
    <td><table width='700' border='0' cellpadding='4' cellspacing='1'>
  <tr>
    <td width='116' bgcolor='#ffffffFFF'>$row[xing]$row[ming]</td>
	<td width='116' bgcolor='#ffffffFFF'>$row[shouji]</td>
	<td width='63' bgcolor='#ffffffFFF'>$row[age]</td>
	<td width='185' bgcolor='#ffffffFFF'>$row[mail]</td>
	<td width='174' bgcolor='#ffffffFFF'>$row[addtime]</td>
  </tr>
</table>
</td>
  </tr>
</table>";
}

echo mysql_error();//输出报错信息， 没有成功一般是报mysql错误
mysql_close($con)
?>