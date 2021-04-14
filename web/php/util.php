<?php
function makeEnvString() {
   $myhost = gethostname();
   if ($myhost == "MeiPro.local") {
      $envstr="PROJ_LIB=/Users/mei/SCEC/anaconda2/share/proj PYTHONPATH=../model/UCVMC_TARGET/ucvm_plotting/pycvm";
   } else { 
	   $envstr="PROJ_LIB=/usr/local/share/anaconda2/share/proj PYTHONPATH=../model/UCVMC_TARGET/ucvm_plotting/pycvm";
   }
   return $envstr;
}

function checkResult($query,$result) {
  $pos=strpos($result,"ERROR:");
  $fp= fopen("../result/query_r","w+") or die("Unable to open file!");
  fwrite($fp,$query); fwrite($fp,"\n");
  fwrite($fp,$result); fwrite($fp,"\n");
  fclose($fp);
  if( $pos != FALSE ) { // found ERROR
     $fp= fopen("../result/query_r","w+") or die("Unable to open file!");
     fwrite($fp,$query); fwrite($fp,"\n");
     fwrite($fp,$result); fwrite($fp,"\n");
     fclose($fp);
     return TRUE;
  } 
  return FALSE;
}

?>
