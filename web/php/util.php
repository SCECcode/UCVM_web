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

function makeVerticalQuery($model,$lat,$lon,$z,$zmode,$file) { 

$envstr=makeEnvString();

$lstr = " -s ".$lat.",".$lon." -e ".$z;
$qstub=" -n ../model/UCVMC_TARGET/conf/ucvm.conf -i ../model/UCVMC_TARGET -b 0 -d vs,vp,density -c ".$model." -o ".$file;

if ($zmode == 'e') { 
     $query= $envstr." ../model/UCVMC_TARGET/utilities/plot_elevation_profile.py -v -100 ".$qstub.$lstr;
}
if ($zmode == 'd') { 
     $query= $envstr." ../model/UCVMC_TARGET/utilities/plot_depth_profile.py -v 100 ".$qstub.$lstr;
}

return $query;
}
?>
