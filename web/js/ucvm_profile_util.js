
/*** iframe housekeeping ***/
function plotly_profile_run(){
   var plist=get_all_highlight_profile_list();
   var data=[];
   var sz=plist.length;
   var i;

   for(i=0;i<sz;i++) {
     var d=readVProfileDataFile(plist[i]);
     if(d) {
       data.push(d);
     }
   }

   var ulist=JSON.stringify(plist);
   var srcstr= "plotly_profile/compare.html?uidlist="+ulist;
   var frameHeight=window.innerHeight;
   document.getElementById("viewProfileIfram").height = frameHeight * 0.9 ;
   $('#viewProfileIfram').attr('src',srcstr);

   setTimeout(() => { send_to_profileIfram(JSON.stringify(data)) ; }, 2000);
}

/**** the profile uid ***/
function get_all_highlight_profile_list() {
   var cnt=ucvm_profile_list.length;
   var plist=[];
   if(cnt == 0) { // none to look at
     return plist;
   } else {
     var i;
     var item;
     var uid;
     for(i=0;i<cnt;i++) {
       item=ucvm_profile_list[i];
       uid=item['uid']; 
       // it is highlighted 
       if(isLayergroupHigh(uid)) {
         plist.push(uid);
       }
     }
   }
   return plist;
}

function readVProfileDataFile(uid) {

  var fmeta=makeVProfileMetaFname(uid);
  var fmp=makeVProfileMPFname(uid);
  fmeta="result/"+fmeta;
  fmp="result/"+fmp;

  var fmetablob=getTextFile(fmeta);
  var metajson=JSON.parse(fmetablob);
  var fmpblob=getTextFile(fmp);
  var mpjson=JSON.parse(fmpblob);
  if( "depth" in metajson ) {
    var data= { uid:uid, mp:mpjson, meta:metajson };
    return data;
    } else {
    return null;
  }
}

function send_to_profileIfram(data) {
  var profileWindow = document.getElementById('viewProfileIfram').contentWindow;
  // postMessage arguments: data to send, target origin
  profileWindow.postMessage(data, 'http://localhost');
}

var track_profile_full=1; // 1 is on 0 is off
function toggleExpandProfileView(elt) {

  track_profile_full = !track_profile_full;

  var body=document.getElementById("modalProfileBody");
  var body_height=body.scrollHeight;
  var body_width=body.scrollWidth;

  if(track_profile_full) {
    window.console.log("in shrink..\n");
    elt.innerHTML="Expand";
    $('#modalProfileContent').removeClass('full_modal-content');
    document.getElementById("viewProfileIfram").height = body_height/2 ;
    } else {
    window.console.log("in expand..\n");
      elt.innerHTML="Shrink";
      $('#modalProfileContent').addClass('full_modal-content');
      document.getElementById("viewProfileIfram").height = body_height*2;
  }
}


