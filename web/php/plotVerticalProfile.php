<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("util.php");

$lat = ($_GET['lat']);
$lon = ($_GET['lon']);
$z = ($_GET['z']);
$zstart = ($_GET['zstart']);
$zstep = ($_GET['zstep']);
$zmode = ($_GET['zmode']);
$model = ($_GET['model']);
$uid = ($_GET['uid']);

$np="/usr/local/share/anaconda2/bin:/usr/local/share/anaconda2/condabin:".getenv("PATH");
putenv("PATH=".$np);

$itemlist = new \stdClass();

$file="../result/".$uid."vertical.png";

$envstr=makeEnvString();

$lstr = " -v ".$zstep." -b ".$zstart." -s ".$lat.",".$lon." -e ".$z;
$qstub=" -n ../model/UCVMC_TARGET/conf/ucvm.conf -i ../model/UCVMC_TARGET -d vs,vp,density -c ".$model." -o ".$file;

if ($zmode == 'e') {
     $query= $envstr." ../model/UCVMC_TARGET/utilities/plot_elevation_profile.py ".$qstub.$lstr;
}
if ($zmode == 'd') {
     $query= $envstr." ../model/UCVMC_TARGET/utilities/plot_depth_profile.py ".$qstub.$lstr;
}

$result = exec(escapeshellcmd($query), $retval, $status);

if ( $status == 0 && file_exists($file)) {
    $itemlist->first=$uid."vertical.png";
}

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"verticalProfile".$uid."\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

