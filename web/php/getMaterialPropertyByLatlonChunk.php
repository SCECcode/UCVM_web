<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
/* get string and then need to split and extract triplet out of them */
$datastr = ($_GET['datastr']); 
$zmode = ($_GET['zmode']);
$model = ($_GET['model']);
$chunkid = intVal($_GET['chunkid']);
$uid = ($_GET['uid']);
$lastchunks = intVal($_GET['chunks'])-1;
$skip = intVal($_GET['skip']);

/* if chunkid == 0, it is first chunk, create 
   the .json file in result/UCVM_uidpoint_matprops.json, 
   other ones, just 'append'               */

$fname="../result/".$uid."point_matprops.json";
if ($chunkid == 0) {
   $fp= fopen($fname,"w") or die("Unable to open file!");
   $start=" { \"".$uid."\": [";
   fwrite($fp,$start); fwrite($fp,"\n");
   } else {
      $fp= fopen($fname,"a") or die("Unable to open file to append!");
}

$itemlist = new \stdClass();

$datalist=explode(",",$datastr);

$cnt=count($datalist);
$set= intval($cnt/3);

for($i=0; $i< $set; $i++) {

  $idx= $i*3;
  $lon=$datalist[$idx];
  $lat=$datalist[$idx+1];
  $z=$datalist[$idx+2];

  $estr = " -l ".$lat.",".$lon.",".$z." ";
  $query="../model/UCVMC_TARGET/bin/run_ucvm_query.sh -m ".$model." -f ../model/UCVMC_TARGET/conf/ucvm.conf -c gd -b ".$estr;
  if ($zmode == 'e')
	$query="../model/UCVMC_TARGET/bin/run_ucvm_query.sh -m ".$model." -f ../model/UCVMC_TARGET/conf/ucvm.conf -c ge -b ".$estr;

  $result = exec(escapeshellcmd($query), $retval, $status);

/*  echo $result; */
  fwrite($fp,$result); 
  if($i != ($set-1)) {
    fwrite($fp,",\n");
    } else { 
      if($chunk == $lastchunk) {
       fwrite($fp,"\n] }\n");
      }
  }

/* cap the max at 10 */
  if($i < 10) {
     $itemlist->$i=$result;
  }
}

fclose($fp);

// don't transfer back the material property..
if($skip) {
   $resultstring="";
} else {
  $resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');
}

echo "<div data-side=\"materialPropertyByLatlonChunk".$uid."\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

