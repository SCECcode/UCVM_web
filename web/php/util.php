<?php
function makeEnvString() {
   $myhost = gethostname();
   if ($myhost == "MeiPro.local") {
      $envstr="PROJ_LIB=/Users/mei/SCEC/anaconda2/share/proj PATH=/Users/mei/anaconda2/bin:/Users/mei/anaconda2/condabin:/anaconda2/bin:/usr/local/opt/libxml2/bin:/usr/local/opt/sqlite/bin:/usr/local/opt/libxml2/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/Library/Apple/usr/bin PYTHONPATH=../model/UCVM_TARGET/ucvm_plotting";
   } else { 
	   $envstr="PROJ_LIB=/usr/local/share/anaconda2/share/proj PATH=/usr/local/share/anaconda2/bin:/usr/local/share/anaconda2/condabin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin PYTHONPATH=../model/UCVM_TARGET/ucvm_plotting";
   }
   return $envstr;
}

function checkResult($query,$result,$uid) {
  $qname="../result/query_r".$uid;
  $pos=strpos($result,"ERROR:");
  $fp= fopen($qname,"w+") or die("Unable to open file!");
  fwrite($fp,$query); fwrite($fp,"\n");
  fwrite($fp,$result); fwrite($fp,"\n");
  fclose($fp);
  if( $pos != FALSE ) { // found ERROR
     $fp= fopen($qname,"w+") or die("Unable to open file!");
     fwrite($fp,$query); fwrite($fp,"\n");
     fwrite($fp,$result); fwrite($fp,"\n");
     fclose($fp);
     return TRUE;
  } 
  return FALSE;
}

function makeCSVProfile($uid) {
  $csvname="../result/".$uid."vertical_data.csv";

  $cfp= fopen($csvname,"w+") or die("Unable to open file!");

  $metaname="../result/".$uid."vertical_meta.json";
  $mpname="../result/".$uid."vertical_matprops.json";

  $json = file_get_contents($metaname);
  $json_meta = json_decode($json,true);

#  print_r($json_meta);

  $json = file_get_contents($mpname);
  $json_mp = json_decode($json,true);

  $depth=$json_meta["ending_depth"];
  $start=$json_meta["starting_depth"];
  $cvm=$json_meta["cvm"];
  $lon=$json_meta["lon1"];
  $lat=$json_meta["lat1"];
  $step=$json_meta["vertical_spacing"];
  $comment=$json_meta["comment"];
  $depthlist=$json_meta["depth"];
  $mplist=$json_mp["matprops"];

  fwrite($cfp,"#UID:".$uid."\n");
  fwrite($cfp,"#CVM:".$comment." (".$cvm.")\n");
  fwrite($cfp,"#Lat:".$lat." Long:".$lon." Start_depth(m):".$start." End_depth(m):".$depth." Vert_spacing(m):".$step."\n");
  fwrite($cfp,"#Depth(m), Vp(km/s), Vs(km/s), Density(kg/m^3)\n");

  ### iterate through the mp list
  $len=count($depthlist);
  for($i=0; $i<$len; $i++) {
    $item=$mplist[$i];
    fwrite($cfp,$depthlist[$i].",".$item["vp"].",".$item["vs"].",".$item["density"]."\n");
  }
  fclose($cfp);
  return TRUE;
}

?>
