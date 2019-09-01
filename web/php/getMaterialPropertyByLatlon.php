<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$firstlat = ($_GET['firstlat']);
$firstlon = ($_GET['firstlon']);
$firstz = ($_GET['firstz']);
$firstzmode = ($_GET['firstzmode']);

$secondlat = ($_GET['secondlat']);
$secondlon = ($_GET['secondlon']);

$estr = " -l ".$firstlat.",".$firstlon.",".$firstz." ";
$query="../model/UCVMC_TARGET/bin/run_ucvm_query.sh -m cvmh -f ../model/UCVMC_TARGET/conf/ucvm.conf -c gd -b ".$estr;
if ($firstzmode == 'e') 
     $query="../model/UCVMC_TARGET/bin/run_ucvm_query.sh -m cvmh -f ../model/UCVMC_TARGET/conf/ucvm.conf -c ge -b ".$estr;

echo $query;

$result = exec(escapeshellcmd($query), $retval, $status);

echo $result;

echo "<pre>"; print_r($retval); echo "</pre>";
echo $status;
echo $result;

$result2 = "";
if($secondlat != "" && $secondlon != "") {
  $estr2 = " -l ".$secondlat.",".$secondlon.",".$firstz." ";

  $query2="../model/UCVMC_TARGET/bin/run_ucvm_query.sh -m cvmh -f ../model/UCVMC_TARGET/conf/ucvm.conf -c gd -b ".$estr2;

  if ($firstzmode == 'e') 
     $query2="../model/UCVMC_TARGET/bin/run_ucvm_query.sh -m cvmh -f ../model/UCVMC_TARGET/conf/ucvm.conf -c ge -b ".$estr2;

  $result2 = exec(escapeshellcmd($query2), $retval);
}

$resultlist = new \stdClass();
$resultlist->first=$result;
$resultlist->second=$result2;

$resultstring = htmlspecialchars(json_encode($resultlist), ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"materialPropertyByLatlon\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

