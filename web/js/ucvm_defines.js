/****

  ucvm_defines.js

****/

var UCVM_tb={
"units": [
{'id':'lon','units':'decimal degree'},
{'id':'lat','units':'decimal degree'},
{'id':'Z','units':'meters below surface/relative to sealevel'},
{'id':'surf','units':'meter relative to sealevel'},
{'id':'vs30','units':'NA'},
{'id':'crustal','units':'model'},
{'id':'cr_vp','units':'meters/sec'},
{'id':'cr_vs','units':'meters/sec'},
{'id':'cr_rho','units':'kg/m^3'},
{'id':'gtl','units':'gtl'},
{'id':'gtl_vp','units':'meters/sec'},
{'id':'gtl_vs','units':'meters/sec'},
{'id':'gtl_rho','units':'kg/m^3'},
{'id':'cmb_algo','units':'NA'},
{'id':'cmb_vp','units':'meters/sec'},
{'id':'cmb_vs','units':'meters/sec'},
{'id':'cmb_rho','units':'kg/m^3'}
]};

function getUnitsWithLabel(label) {
   var tb=UCVM_tb['units'];
   var cnt=tb.length;
   var i;
   for(i=0; i< cnt; i++) {
       var u=tb[i];
       if(u['id']==label) {
          var n=u['units'];
          if(n == 'NA') 
            return undefined;
          return n;
       }
   }
   window.console.log("ERROR: can not find label %s",label);
   return undefined;
}
