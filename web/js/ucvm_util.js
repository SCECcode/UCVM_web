/***
   ucvm_util.js

***/

//https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects-by-property
/* sorting json blobs
var homes = [
   {"h_id":"3","city":"Dallas","state":"TX","zip":"75201","price":"162500"},
   {"h_id":"4","city":"Bevery Hills","state":"CA","zip":"90210","price":"319250"}]
-- Sort by price high to low
homes.sort(sort_by('price', true, parseInt));
-- Sort by city, case-insensitive, A-Z
homes.sort(sort_by('city', false, function(a){return a.toUpperCase()}));
*/
var sort_by=function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}

function processSearchResult(rlist) {
    if (rlist == 'plotHorizontalSlice') {
        str = $('[data-side="horizontalSlice"]').data('params');
    }
    if (rlist == 'plotVerticalProfile') {
        str = $('[data-side="verticalProfile"]').data('params');
    }
    if (rlist == 'plotCrossSection') {
        str = $('[data-side="crossSection"]').data('params');
    }
    if (rlist == 'getMaterialPropertyByLatlon') {
        str = $('[data-side="materialPropertyByLatlon"]').data('params');
    }
    if (rlist == undefined) {
       window.console.log("processSearchResult: BAD BAD BAD");
       return (undefined);
    }
    return (str);
}


// should be a very small file and used for testing and so can ignore
// >>Synchronous XMLHttpRequest on the main thread is deprecated
// >>because of its detrimental effects to the end user's experience.
//     url=http://localhost/data/synapse/segments-dummy.csv
function ckExist(url) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
 // okay
    }
  }
  http.open("GET", url, false);
  http.send();
  if(http.status !== 404) {
    return http.responseText;
    } else {
      return null;
  }
}

function makeMetaFname(url) {
//  var s=url.split('/').pop();
//  return s+"_meta.json";
}
//
// allow multiple bin files from ucvmc's plotting utilities
// example
//       BC_cvms5_gate_vs.svg or BC_cvms5_gate_vs.png	
//       BC_cvms5_gate_vs_meta.json
//       BC_cvms5_gate_vs_data.bin
//
function loadAndProcessBinfromFile(urls) {
  var nlist=[];
  var cnt=urls.length;

  for( var urlidx=0; urlidx < cnt; urlidx++ ) {
      var url=urls[urlidx]; 
//      var metaurl=makeMetaFname(url);
      var metaurl="BC_cvms5_gate_vs_meta.json";
      var metablob=ckExist(metaurl);

      var meta=JSON.parse(metablob);
      var lat1=parseFloat(meta['bottom-left lat']);
      var lon1=parseFloat(meta['bottom-left lon']);
      var lat2=parseFloat(meta['upper-right lat']);
      var lon2=parseFloat(meta['upper-right lon']);
      var step=parseFloat(meta['spacing']);
      var cvm=meta['cvm_selected'];
      var title = " TEST"+cvm+" ("+lat1.toFixed(2)+","+lon1.toFixed(2)+" to "+lat2.toFixed(2)+","+lon2.toFixed(2)+")"
      var xmax=parseInt(meta['nx'])
      var ymax=parseInt(meta['ny'])
      var datamax=xmax * ymax 

      var x_data = meta['lon_list']
      var y_data = meta['lat_list']


      var mRequest2 = new XMLHttpRequest();
      mRequest2.open('GET', url);

      mRequest2.responseType = 'arraybuffer';

      mRequest2.onreadystatechange = function () {
      if (mRequest2.readyState === 4) {

        // Get bytes
        var buffer = mRequest2.response;
        var dataview = new DataView(buffer);

        // Create buffer (4 bytes / float)
        var mFloatArray = new Float32Array(buffer.byteLength / 4);

        // Copy floats
        for (var i = 0; i < mFloatArray.length; i++) 
        {
            mFloatArray[i] = dataview.getFloat32(i * 4, true); // At every 4th byte
        }

        console.log("Loaded "+mFloatArray.length+" floats");

        var z_data=[]
        var row=[]
        for(var idx=0;idx<datamax;idx++)
        {
          var f=mFloatArray[idx]
          if(f < 0) {
//window.console.log("less than 0");
             row.push(NaN)
          } else  {
             row.push(-1 * f)
          }
          if((idx+1) % xmax == 0) { // every set
             z_data.push(row)
             row=[]
          }
        }

// 100x100
       var data = [{
           x:x_data,
           y:y_data,
           z:z_data,
           type:'surface',
           "reversescale": true,
           colorscale : 'Viridis'
        }];
  
        var layout = {
          title: title,
          width: plotWidth,
          height: plotHeight,
          scene: {
            aspectratio : { x:1.0, y:1.0, z:0.02 },
          },
          margin: {
            l: 5,
            r: 5,
            b: 20,
            t: 80,
          }
        };

        Plotly.newPlot('myDiv', data, layout);
      }
    }

    mRequest2.send();
  }
}
