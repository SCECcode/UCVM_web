<?php
function makeEnvString() {
   $myhost = gethostname();
   if ($myhost == "MeiPro.local") {
      $envstr="PROJ_LIB=/Users/mei/SCEC/anaconda2/share/proj PATH=../model/UCVMC_TARGET/bin:/Users/mei/SCEC/anaconda2/bin:/usr/local/opt/libxml2/bin:/usr/local/opt/sqlite/bin:/usr/local/opt/libxml2/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin PYTHONPATH=../model/UCVMC_TARGET/utilities/pycvm";
   } else { 
	   $envstr="PROJ_LIB=/usr/local/share/anaconda2/share/proj PATH=/usr/local/share/anaconda2/bin:/usr/local/share/anaconda2/condabin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin PYTHONPATH=../model/UCVMC_TARGET/utilities/pycvm";
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
