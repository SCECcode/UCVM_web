/***
   ucvm_main.c

***/

var viewermap;

jQuery(document).ready(function() {

  frameHeight=window.innerHeight;
  frameWidth=window.innerWidth;

  viewermap=setup_viewer();

  $(".popup").hide();

  $(".openpop").click(function(e) {
    e.preventDefault();
    $("iframe").attr("src",$(this).attr('href'));
    $(".links").fadeOut('slow');
    $(".popup").fadeIn('slow');
  });

  $(".close").click(function() {
    $(this).parent().fadeOut("slow");
    $(".links").fadeIn("slow");
  });

  $('#QuerymodeTxt').on('change', function() {
    var v=document.getElementById('QuerymodeTxt').value;
    clearSearchResult();
    if( v == "file") {
      document.getElementById('pointBlock').style.display = "none";
      document.getElementById('fileBlock').style.display = "";
      } else {
        document.getElementById('pointBlock').style.display = "";
        document.getElementById('fileBlock').style.display = "none";
    }
  });

  // toggle to some usable default
  $('#ZmodeTxt').on('change', function() {
    var v=document.getElementById('ZmodeTxt').value;
    if( v == "e") {
        document.getElementById("ZTxt").value = "-3000";
        document.getElementById("ZStepTxt").value = "-100";
        } else {
            document.getElementById("ZTxt").value = "4000";
            document.getElementById("ZStepTxt").value = "100";
    }
  });


  viewermap=setup_viewer();

}) // end of MAIN



