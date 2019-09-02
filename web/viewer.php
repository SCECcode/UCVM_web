<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<html>
<head>

<title>UCVM Viewer</title>
<link rel="stylesheet" href="css/vendor/bootstrap.css">
<link rel="stylesheet" href="css/vendor/jquery-ui.css">
<link rel="stylesheet" href="css/vendor/animation.css">
<link rel="stylesheet" href="css/vendor/fontello.css">
<link rel="stylesheet" href="css/ucvm-ui.css">

<script type='text/javascript' src='js/vendor/jquery.min.js'></script>
<script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
<script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
<script type='text/javascript' src="js/vendor/jquery.csv.js"></script>
<script type='text/javascript' src='js/vendor/FileSaver.js'></script>
<script type='text/javascript' src='js/vendor/jszip.js'></script>

<!-- ucvm js -->
<script type="text/javascript" src="js/debug.js"></script>
<script type="text/javascript" src="js/ucvm_util.js"></script>
<script type="text/javascript" src="js/ucvm_ui.js"></script>
<script type="text/javascript" src="js/ucvm_main.js"></script>
<script type="text/javascript" src="js/ucvm_query.js"></script>
<script type="text/javascript" src="js/ucvm_defines.js"></script>
</head>
<body>
<div class="container-fluid">

  <div class="row col-12" style="margin:20px 20px 20px 20px" >
            <p>The <a href="https://www.scec.org/research/ucvm">SCEC Unified Community Velocity Model (UCVM)</a> Viewer provides a browser access to  19.4. It allows users query for material property and it also can generate Elevation or Depth Profile plot, Cross Section plot, Horizontal Slice plot on demand using the plotting tools packaged within the  release.</p>
  </div>

  <div class="row" id="controlBlock" style="margin:0px 0px 20px 30px; width:100%;display:flex;">

    <div class="row col-md-3 col-xs-3" style="display:inline-block;">
      <div class="row">
        <button id="propertyBtn" class="btn ucvm-top-btn" style="width:20vw" title="get material property " onclick="propertyClick();">
        <span class="glyphicon glyphicon-star"></span> query material property</button>
        <div class="row" style="display:inline-block;">
          <div id="spinIconForProperty" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
        </div>
      </div>
    </div>
    <div class="row col-md-2 col-xs-2" style="display:inline-block;">
          <button id="verticalProfileBtn" class="btn ucvm-top-btn" title="depth profile" onclick="verticalProfileClick();">
          <span class="glyphicon glyphicon-star"></span> profile</button>
        <div class="row" style="display:inline-block;">
          <div id="spinIconForVerticalProfile" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
        </div>
    </div>
    <div class="row" id="resultForVerticalProfile" align="left" style="display:inline-block;"></div>
    <div class="row col-md-2 col-xs-2" style="margin-left:3vw; display:inline-block;">
        <button id="crossSectionBtn" class="btn ucvm-top-btn" title="cross section" onclick="crossSectionClick();">
        <span class="glyphicon glyphicon-star"></span> cross</button>
        <div clsss="row" style="display:inline-block;">
          <div id="spinIconForCrossSection" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
        </div>
    </div>
    <div class="row" id="resultForCrossSection" align="center"style="display:inline-block;"></div>
    <div class="row col-md-2 col-xs-2" style="margin-left:3vw; display:inline-block;">
        <button id="horizontalSliceBtn" class="btn ucvm-top-btn" title="horizontal slice" onclick="horizontalSliceClick();">
        <span class="glyphicon glyphicon-star"></span> horizontal</button>
        <div class="row" style="display:inline-block;">
          <div id="spinIconForHorizontalSlice" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none"><i class="spin-icon animate-spin">&#xe839;</i></div>
        </div>
    </div>
    <div class="row" id="resultForHorizontalSlice" align="center" style="display:inline-block;"></div>
   </div> <!-- controlBlock -->

<div class="row" id='queryBlock' style="margin:0px 0px 20px 30px; background-color:transparent;top:40vh; width:100%;">
  <div class="row" > Lat:<input type="text" id="firstLatTxt" title="first lat" value="34.30" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid black; color:#990000; text-align:center;"><input type="text" id="secondLatTxt" title="second lat" value='35.6' onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid black; color:#990000; text-align:center;"> Lon:<input type="text" id="firstLonTxt" title="first lon" value="-119.20" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid black; color:#990000; text-align:center;"><input type="text" id="secondLonTxt" title="second lat" value='-117.5' onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid black; color:#990000; text-align:center;"> Z:<input type="text" id="firstZTxt" title="first Z" value="3000" onfocus="this.value=''" style="width:10vw; right-margin:10px; border:1px solid black; color:#990000; text-align:center;">
Zmode:<select id="firstZmodeTxt" title="Z mode" class="custom-select custom-select-sm" style="width:10vw; right-margin:10px; border:1px solid grey; color:#990000; text-align:center;">
             <option value="d">Depth</option>
             <option value="e">Elevation</option>
       </select>
  </div>
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

