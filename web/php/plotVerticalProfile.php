<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("util.php");

$firstlat = ($_GET['firstlat']);
$firstlon = ($_GET['firstlon']);
$firstz = ($_GET['firstz']);
$firstzmode = ($_GET['firstzmode']);

$secondlat = ($_GET['secondlat']);
$secondlon = ($_GET['secondlon']);

$np="/usr/local/anaconda2/bin:/usr/local/anaconda2/condabin:".getenv("PATH");
putenv("PATH=".$np);

$itemlist = new \stdClass();

$file="../result/vertical.png";
$query=makeVerticalQuery($firstlat,$firstlon,$firstz,$firstzmode,$file);

$result = exec(escapeshellcmd($query), $retval, $status);

if ( $status == 0 && file_exists($file)) {
    $itemlist->first="vertical.png";
}

if ( $secondlat != "" && $secondlon !="" ) {
   $file2="../result/vertical2.png";
   $query2=makeVerticalQuery($secondlat,$secondlon,$firstz,$firstzmode,$file2);
   $result2 = exec(escapeshellcmd($query2), $retval2, $status2);
   if ( $status2== 0 && file_exists($file2)) {
     $itemlist->second="vertical2.png";
   }
}

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"verticalProfile\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

