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
$uid = ($_GET['uid']);

$estr = " -l ".$lat.",".$lon.",".$z." ";
$query="../model/UCVMC_TARGET/bin/run_ucvm_query.sh -m ".$model." -f ../model/UCVMC_TARGET/conf/ucvm.conf -c gd -b ".$estr;
if ($zmode == 'e')
     $query="../model/UCVMC_TARGET/bin/run_ucvm_query.sh -m ".$model." -f ../model/UCVMC_TARGET/conf/ucvm.conf -c ge -b ".$estr;

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

