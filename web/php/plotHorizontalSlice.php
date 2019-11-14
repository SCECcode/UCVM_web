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
$model = ($_GET['model']);
$datatype = ($_GET['datatype']);


$secondlat = ($_GET['secondlat']);
$secondlon = ($_GET['secondlon']);

$envstr=makeEnvString();

$zval=(int) $z;

$lval= round(($secondlat - $firstlat), 3);
$llval=round(($secondlon - $firstlon), 3);

if ($lval == 0) {
echo "ERROR: Two points can not have same Latitute";
return;
}
if ($llval == 0) {
echo "ERROR: Two points can not have same Longitude";
return;
}

$sval= round(sqrt(($lval*$lval) + ($llval*$llval))/100,3);

$file="../result/horizontal.png";

$lstr = " -b ".$firstlat.",".$firstlon." -u ".$secondlat.",".$secondlon." -e ".$zval;
$qstub=" -d ".$datatype." -c ".$model." -s ".$sval." -a d -o ".$file." -n ../model/UCVMC_TARGET/conf/ucvm.conf -i ../model/UCVMC_TARGET ";

if( $zmode == 'd') {
  $query= $envstr." ../model/UCVMC_TARGET/utilities/plot_horizontal_slice.py ".$qstub.$lstr;
}
if( $zmode == 'e') {
  $query= $envstr." ../model/UCVMC_TARGET/utilities/plot_elevation_horizontal_slice.py ".$qstub.$lstr;
}

$result = exec(escapeshellcmd($query), $retval, $status);

if ( $status == 0 && file_exists($file)) {
    $resultstring = htmlspecialchars("horizontal.png", ENT_QUOTES, 'UTF-8');
    echo "<div data-side=\"horizontalSlice\" data-params=\"";
    echo $resultstring;
    echo "\" style=\"display:flex\"></div>";
}  
?>
</body>
</html>

