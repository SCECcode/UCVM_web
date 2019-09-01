<?php
require_once("php/navigation.php");
$header=getHeader("Viewer")
?>
<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
<html>
<head>
<title>Geological Framework Model Viewer</title>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="css/vendor/font-awesome.min.css">

<link rel="stylesheet" href="css/vendor/bootstrap.min.css">
<link rel="stylesheet" href="css/vendor/bootstrap-grid.min.css">
<link rel="stylesheet" href="css/vendor/jquery-ui.css">
<link rel="stylesheet" href="css/vendor/glyphicons.css">
<link rel="stylesheet" href="css/vendor/animation.css">
<link rel="stylesheet" href="css/vendor/fontello.css">
<link rel="stylesheet" href="css/gfm-ui.css">
<link rel="stylesheet" href="css/scec-ui.css">

<script type="text/javascript" src="js/vendor/plotly.js"></script>
<script type='text/javascript' src='js/vendor/jquery.min.js'></script>
<script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
<script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
<script type='text/javascript' src="js/vendor/jquery.csv.js"></script>
<script type='text/javascript' src='js/vendor/FileSaver.js'></script>
<script type='text/javascript' src='js/vendor/jszip.js'></script>


<!-- gfm js -->
<script type="text/javascript" src="js/debug.js"></script>
<script type="text/javascript" src="js/gfm_util.js"></script>
<script type="text/javascript" src="js/gfm_ui.js"></script>
<script type="text/javascript" src="js/gfm_main.js"></script>
<script type="text/javascript" src="js/gfm_query.js"></script>
<script type="text/javascript" src="js/gfm_viz.js"></script>
<script type="text/javascript" src="js/gfm_plotly.js"></script>
<script type="text/javascript" src="js/gfm_region.js"></script>
</head>
<body>
<?php echo $header; ?>

<div class="container main container-fluid">
  <div class="row">
        <div class="col-12">
            <p>The <a href="https://www.scec.org/research/cxm">SCEC Geological Framework Model (GFM)</a> Viewer provides a browser access to GFM version 1.0 dataset. It can display a 3D visualization of the Geological Framework model.  It also allows users to query for material property.</p>
        </div>
  </div>

  <div class="row" align="left" id="controlBlock" style="margin:10px 0px 10px 0px; width:100%;display:flex;">
    <div align="left" class="row col-md-4 col-xs-4" style="display:inline-block;">
      <div class="row">
       <button id="propertyBtn" class="btn gfm-top-btn" style="width:20vw" title="get material property" onclick="propertyClick();">
       <span class="glyphicon glyphicon-star"></span> Query material property</button>
       <div id="spinIconForProperty" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
       </div>
    </div>
    <div class="row col-md-3 col-xs-3" style="display:inline-block;">
      <div class="row">
       <button id="regionBtn" class="btn gfm-top-btn" style="width:15vw" title="plot region data" onclick="plotRegionClick();">
       <span class="glyphicon glyphicon-star"></span> Show regions</button>
       <div id="spinIconForRegion" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
      </div>
    </div>
   </div> <!-- controlBlock -->

<div class="row" id='queryBlock' style="background-color:transparent;">
   <div> Lat:<input type="text" id="firstLatTxt" title="first lat" value="34.30" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
 Lon:<input type="text" id="firstLonTxt" title="first lon" value="-119.20" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
Z:<input type="text" id="firstZTxt" title="first Z" value="-32000" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
Zmode:<select id="firstZmodeTxt" title="Z mode" class="custom-select custom-select-sm" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
             <option value="e">Elevation</option>
             <option value="d">Depth</option>
       </select>
   </div>
</div><!-- queryBlock -->

<div class="row" style="position:fixed; margin-left:30%;width:60%;height:60%;">
  <div class="row" id='noteBlock' style="font-size:15pt;color:#212529;">Press 'Show regions' above to plot 3d Volume of GFM Regions</div>
  <div class="row" id='GFM_view' style="background-color:#DDDDDD;width:100%;height:100%;top:30vh;"></div>
</div>

<div class="row" id='resultBlock' style="top:10vh;left:30px;width:24%;overflow:hidden">
  <div id="searchResult" class="table-responsive"></div>
  <div id="phpResponseTxt"></div>
</div>

</div>
</div><!-- container-fluid -->

</body>
</html>

