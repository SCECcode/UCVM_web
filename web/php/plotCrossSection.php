<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("util.php");

$firstlat = ($_GET['firstlat']);
$firstlon = ($_GET['firstlon']);
$z = ($_GET['z']);
$zmode = ($_GET['zmode']);
$model= ($_GET['model']);
$zstart = ($_GET['zstart']);
$datatype = ($_GET['datatype']);

$secondlat = ($_GET['secondlat']);
$secondlon = ($_GET['secondlon']);

$envstr=makeEnvString();

$file="../result/cross.png";

$vval= intval(((float)$z-(float)$zstart)/100); 

$hhval= ((float)$secondlat - (float)$firstlat)*110.57;
$hhhval= ((float)$secondlon - (float)$firstlon)*111.32;
$dval=  round(sqrt(($hhval*$hhval) + ($hhhval*$hhhval)),3);
$hval=intval(($dval/200)*1000);

$lstr = " -b ".$firstlat.",".$firstlon." -u ".$secondlat.",".$secondlon." -e ".$z;
$qstub=" -s ".$zstart." -h ".$hval." -d ".$datatype." -c ".$model." -a d -o ".$file." -n ../model/UCVMC_TARGET/conf/ucvm.conf -i ../model/UCVMC_TARGET "."-v ".$vval;

if ($zmode == 'e') {
     $query= $envstr." ../model/UCVMC_TARGET/utilities/plot_elevation_cross_section.py".$qstub.$lstr;
}
if ($zmode == 'd') { 
     $query= $envstr." ../model/UCVMC_TARGET/utilities/plot_cross_section.py".$qstub.$lstr;
}

$result = exec(escapeshellcmd($query), $retval, $status);

if ( $status == 0 && file_exists($file)) {

    $resultstring = htmlspecialchars("cross.png", ENT_QUOTES, 'UTF-8');
    echo "<div data-side=\"crossSection\" data-params=\"";
    echo $resultstring;
    echo "\" style=\"display:flex\"></div>";
}
?>
</body>
</html>

