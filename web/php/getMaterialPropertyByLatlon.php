<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$lat = ($_GET['lat']);
$lon = ($_GET['lon']);
$z = ($_GET['z']);
$zmode = ($_GET['zmode']);
$model = ($_GET['model']);
$zrange = ($_GET['zrange']);
$uid = ($_GET['uid']);

$estr = " -b -l ".$lat.",".$lon.",".$z." ";

if ($zmode == 'e') {
  $estr=" -c ge".$estr;
  } else {
    $estr=" -c gd".$estr;
}
if ($zrange != '') {
  $estr=" -Z ".$zrange.$estr;
}

$estr = " -b -l ".$lat.",".$lon.",".$z." ";

$query="../model/UCVMC_TARGET/bin/run_ucvm_query.sh -m ".$model." -f ../model/UCVMC_TARGET/conf/ucvm.conf ".$estr;

$result = exec(escapeshellcmd($query), $retval, $status);

$itemlist = new \stdClass();
$itemlist->mp=$result;

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"materialPropertyByLatlon".$uid."\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

