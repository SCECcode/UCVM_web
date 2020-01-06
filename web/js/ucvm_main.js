/***
   ucvm_main.c

***/

var viewermap;

jQuery(document).ready(function() {

  frameHeight=window.innerHeight;
  frameWidth=window.innerWidth;

  viewermap=setup_viewer();
  setup_model();
  setup_fileFormat();
  setup_ZMode();

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

  $("#search-type").change(function () {
    var funcToRun = $(this).val();
    if (funcToRun != "") {
      window[funcToRun]();
    }
  });
  $("#search-type").trigger("change");

  $("#modelType").change(function () {
      var model = $(this).val();
      remove_all_models();
      load_selected_model(model);
  });

  $("#zModeType").change(function () {
      reset_presets();
  });

  $('#processMPTableList li').click(function() {
      var v=$(this).data('id');
      processMPTable(v);
  });

  $('#processMetaPlotResultTableList li').click(function() {
      var v=$(this).data('id');
      processMetaPlotResultTable(v);
  });

}) // end of MAIN



