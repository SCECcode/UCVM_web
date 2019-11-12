<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<html>
<head>

    <title>UCVM Viewer</title>
    <link href="css/vendor/font-awesome.min.css" rel="stylesheet">

    <link rel="stylesheet" href="css/vendor/leaflet.css">
    <link rel="stylesheet" href="css/vendor/bootstrap.min.css">
    <link rel="stylesheet" href="css/vendor/bootstrap-grid.min.css">
    <link rel="stylesheet" href="css/vendor/jquery-ui.css">
    <link rel="stylesheet" href="css/vendor/glyphicons.css">
    <link rel="stylesheet" href="css/vendor/animation.css">
    <link rel="stylesheet" href="css/ucvm-ui.css?v=1">
    <link rel="stylesheet" href="css/sidebar.css?v=1">

    <script type='text/javascript' src='js/vendor/popper.min.js'></script>
    <script type="text/javascript" src="js/vendor/leaflet-src.js"></script>
    <script type='text/javascript' src='js/vendor/jquery.min.js'></script>
    <script type='text/javascript' src="js/vendor/jquery.csv.js"></script>
    <script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
    <script type='text/javascript' src='js/vendor/ersi-leaflet.js'></script>
    <script type='text/javascript' src='js/vendor/FileSaver.js'></script>
    <script type='text/javascript' src='js/vendor/jszip.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.floatThead.min.js'></script>

<!-- ucvm js -->
    <script type="text/javascript" src="js/debug.js"></script>
    <script type="text/javascript" src="js/ucvm_util.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_ui.js"?v=1></script>
    <script type="text/javascript" src="js/ucvm_main.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_query.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_defines.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_sidebar.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_leaflet.js?v=1"></script>


<!--
    https://leaflet.github.io/Leaflet.draw/docs/Leaflet.draw-latest.html#l-draw
    this is for including the Leaflet.draw plugin
-->
    <link rel="stylesheet" href="plugin/Leaflet.draw/leaflet.draw.css">
    <script type='text/javascript' src="plugin/Leaflet.draw/Leaflet.draw.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Leaflet.Draw.Event.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Toolbar.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Tooltip.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/GeometryUtil.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/LatLngUtil.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/LineUtil.Intersect.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/Polygon.Intersect.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/Polyline.Intersect.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/TouchEvents.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/DrawToolbar.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Feature.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.SimpleShape.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Polyline.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Marker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Circle.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.CircleMarker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Polygon.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Rectangle.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/EditToolbar.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/EditToolbar.Edit.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/EditToolbar.Delete.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Control.Draw.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Poly.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.SimpleShape.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Rectangle.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Marker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.CircleMarker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Circle.js"></script>

</head>
<body>
<div class="container-fluid">

  <div class="row col-12" style="margin:20px 20px 20px 20px" >
            <p>The <a href="https://www.scec.org/research/ucvm">SCEC Unified Community Velocity Model (UCVM)</a> Viewer provides a browser access to  19.4. It allows user query for material property and it also can generate Elevation or Depth Profile plot, Cross Section plot, Horizontal Slice plot on demand using the plotting tools packaged within the  release.</p>
  </div>

  <div class="row" id="controlBlock" style="margin:0px 0px 20px 30px; width:100%;display:flex;">

    <div class="row col-md-3 col-xs-3" style="display:inline-block;">
      <div class="row">
        <button id="propertyBtn" class="btn ucvm-top-btn" style="width:20vw" title="CLICK ME to get material property" onclick="propertyClick();">
        <span class="glyphicon glyphicon-star"></span> query material property</button>
        <div class="row" style="display:inline-block;">
          <div id="spinIconForProperty" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
        </div>
      </div>
    </div>
    <div class="row col-md-2 col-xs-2" style="display:inline-block;">
          <button id="verticalProfileBtn" class="btn ucvm-top-btn" title="CLICK ME to plot depth profiles" onclick="verticalProfileClick();">
          <span class="glyphicon glyphicon-star"></span> profile</button>
        <div class="row" style="display:inline-block;">
          <div id="spinIconForVerticalProfile" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
        </div>
    </div>
    <div class="row" id="resultForVerticalProfile" align="left" style="display:inline-block;"></div>
    <div class="row col-md-2 col-xs-2" style="margin-left:3vw; display:inline-block;">
        <button id="crossSectionBtn" class="btn ucvm-top-btn" title="CLICK ME to plot cross section" onclick="crossSectionClick();">
        <span class="glyphicon glyphicon-star"></span> cross</button>
        <div clsss="row" style="display:inline-block;">
          <div id="spinIconForCrossSection" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
        </div>
    </div>
    <div class="row" id="resultForCrossSection" align="center"style="display:inline-block;"></div>
    <div class="row col-md-2 col-xs-2" style="margin-left:3vw; display:inline-block;">
        <button id="horizontalSliceBtn" class="btn ucvm-top-btn" title="CLICK ME to plot horizontal slice" onclick="horizontalSliceClick();">
        <span class="glyphicon glyphicon-star"></span> horizontal</button>
        <div class="row" style="display:inline-block;">
          <div id="spinIconForHorizontalSlice" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
        </div>
    </div>
    <div class="row" id="resultForHorizontalSlice" align="center" style="display:inline-block;"></div>
   </div> <!-- controlBlock -->

<div class="row" id='queryBlock' style="margin:0px 0px 20px 30px; background-color:transparent;top:40vh; width:100%; display:none">

  <div class="row col-md-10 col-xs-10" style="display:inline-block;">

    <div class="row col-md-4" style="display:inline-block"> Model:
      <select id="modelTxt" title="model" class="custom-select custom-select-sm" style="width:15vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
             <option value="cvms">CVM-S4</option>
             <option value="cvms5">CVM-S4.26</option>
             <option value="cvmsi">CVM-S4.26M01</option>
             <option value="cvmh">CVM-Hv15.1</option>
      </select>
    </div>
    <div class="row col-md-3" style="display:inline-block"> Zmode:
      <select id="ZmodeTxt" title="Z mode" class="custom-select custom-select-sm" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
             <option value="e">Elevation</option>
             <option value="d">Depth</option>
       </select>
    </div>

    <div class="row col-md-3" id="inputModeBlock" style="display:none"> InputMode:
      <select id="QuerymodeTxt" title="how to query" class="custom-select custom-select-sm" style="width:8vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
             <option value="point"> Point</option>
             <option value="file"> File</option>
       </select>
    </div>

    <div class="row col-md-3 col-xs-3" style="display:inline-block;">
      <div class="row">
       <button id="goBtn" class="btn ucvm-top-btn" title="get material property" onclick="goClick();">
       <span class="glyphicon glyphicon-play"></span> GO!</button>
       <div id="spinIconForGo" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
       </div>
    </div>
  </div>

  <div class="row col-md-10 col-xs-10" id="pointBlock" style="margin:20px 0px 0px 10px;display:">
   <div class="row"> Lat:<input type="text" id="firstLatTxt" title="lat" value="34.30" onfocus="this.value=''" style="width:8vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
 &nbsp;&nbsp;Lon:<input type="text" id="firstLonTxt" title="lon" value="-119.20" onfocus="this.value=''" style="width:8vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
&nbsp;&nbsp;Z:<input type="text" id="ZTxt" title="Z" value="-3000" onfocus="this.value=''" style="width:8vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
    </div>
  </div><!--- pointBlock --->

  <div class="row col-md-10 col-xs-10" id="point2Block" style="margin:20px 0px 0px 10px;display:none">
   <div class="row"> Lat:<input type="text" id="secondLatTxt" title="lat" value="35.60" onfocus="this.value=''" style="width:8vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
 &nbsp;&nbsp;Lon:<input type="text" id="secondLonTxt" title="lon" value="-117.50" onfocus="this.value=''" style="width:8vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
   </div>
  </div> <!--- point2Block --->

  <div class="row col-md-10 col-xs-10" id="fileBlock" style="margin:20px 0px 0px 10px;display:none">
    <div class="row">
      <input id='fileBtn' type='file' onchange='selectLocalFiles(this.files)' style='display:none;'></input>
      <button id="selectbtn" class="btn gfm-top-btn" style="width:20vw" title="open a file to ingest" onclick='javascript:document.getElementById("fileBtn").click();'>
           <span class="glyphicon glyphicon-file"></span> Select file to open for query</button>
     <div id="spinIconForListProperty" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
      <div class="row" id="fileQuery" style="margin:0 0 0 0;display:">
        <div class="row" style="margin:0 0 0 0;display:inline-block">
          <div class="row" id="resultForMPQuery" style="margin:0 0 0 0;display:inline-block"></div>
        </div>
      </div>
    </div>
  </div><!--- fileBlock --->

</div><!-- queryBlock -->

<div class="row" id='resultBlock' style="position:relative;left:30px;width:90%;">

<div class="wrapper">
  <div class="popup">
    <iframe src="">
       <p>iframes are not supported by your browser.</p>
    </iframe>
    <a href="#" class="close">X</a>
  </div>
</div>

  <div id="searchResult" class="table-responsive"></div>
  <div id="phpResponseTxt"></div>
</div>

</div>
</div><!-- container-fluid -->

</body>
</html>

