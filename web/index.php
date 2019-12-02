<?php
require_once("php/navigation.php");
$header = getHeader("Viewer");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>UCVM Viewer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/vendor/font-awesome.min.css" rel="stylesheet">

    <link rel="stylesheet" href="css/vendor/leaflet.css">
    <link rel="stylesheet" href="css/vendor/bootstrap.min.css">
    <link rel="stylesheet" href="css/vendor/bootstrap-grid.min.css">
    <link rel="stylesheet" href="css/vendor/jquery-ui.css">
    <link rel="stylesheet" href="css/vendor/glyphicons.css">
    <link rel="stylesheet" href="css/vendor/leaflet.awesome-markers.css">
    <link rel="stylesheet" href="css/vendor/animation.css">
    <link rel="stylesheet" href="css/vendor/fontello.css">
    <link rel="stylesheet" href="css/ucvm-ui.css">
    <link rel="stylesheet" href="css/sidebar.css">

    <script type='text/javascript' src='js/vendor/popper.min.js'></script>
    <script type="text/javascript" src="js/vendor/leaflet-src.js"></script>
    <script type='text/javascript' src='js/vendor/jquery.min.js'></script>
    <script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
    <script type='text/javascript' src='js/vendor/ersi-leaflet.js'></script>
    <script type='text/javascript' src='js/vendor/FileSaver.js'></script>
    <script type='text/javascript' src='js/vendor/jszip.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.floatThead.min.js'></script>
    <script type='text/javascript' src='js/vendor/leaflet.awesome-markers.min.js'></script>

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

    <!-- ucvm js -->
    <script type="text/javascript" src="js/debug.js"></script>
    <script type="text/javascript" src="js/ucvm_leaflet.js"></script>
    <script type="text/javascript" src="js/ucvm_layer.js"></script>
    <script type="text/javascript" src="js/ucvm_util.js"></script>
    <script type="text/javascript" src="js/ucvm_ui.js"></script>
    <script type="text/javascript" src="js/ucvm_main.js"></script>
    <script type="text/javascript" src="js/ucvm_query.js"></script>
    <script type="text/javascript" src="js/ucvm_sidebar.js"></script>

<!-- Global site tag (gtag.js) - Google Analytics o
TODO: need a new id
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-495056-12"></script>
-->
    <script type="text/javascript">
        $ = jQuery;
        var tableLoadCompleted = false;
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'UA-495056-12');

        $(document).on("tableLoadCompleted", function () {
            tableLoadCompleted = true;
            var $table = $('div.ucvm-table table');
            $table.floatThead({
                scrollContainer: function ($table) {
                    return $table.closest('div.ucvm-table');
                }
            });

            var $download_queue_table = $('#metadata-viewer');
            $download_queue_table.floatThead({
                scrollContainer: function ($table) {
                    return $table.closest('div#metadata-viewer-container');
                },
            });

        });

    </script>
</head>
<body>
<?php echo $header; ?>


<div class="container main">
    <div class="row">
        <div class="col-12">
            <p>
The <a href="https://www.scec.org/research/ucvm">SCEC Unified Community Velocity Model (UCVM)</a> Viewer provides a browser access to  19.4. It allows user query for material property and it also can generate Elevation or Depth Profile plot, Cross Section plot, Horizontal Slice plot on demand using the plotting tools packaged within the  release.  See the <a href="guide">user guide</a> for more details and site usage instructions.</p>
        </div>
    </div>

    <div class="row" style="display:none;">
        <div class="col justify-content-end custom-control-inline">
            <div style="display:none;" id="external_leaflet_control"></div>
            <button id="colorBtn" class="btn ucvm-top-small-btn" onMouseEnter="expandColorsControl()">
                <span class="glyphicon glyphicon-star"></span></button>
            <div id="colorSelect" class="ucvm-control-colors" onMouseLeave="removeColorsControl()"></div>

            <button id="basketBtn" class="btn ucvm-top-small-btn" title="download selected faults metadata"
                    onMouseEnter="expandDownloadControl()">
                <span class="glyphicon glyphicon-download-alt"></span></button>
            <div id="itemCount"></div>
            <div id="downloadSelect" class="ucvm-control-download" onMouseLeave="removeDownloadControl()"></div>
        </div>
    </div>

<div id="outside" class="row col-12" style="border:solid 2px orange">
    <div id="controls-container" class="col-5" style="border:solid 2px blue">
        <div class="row" style="border:solid 1px green">
          <div class="col">
            <div class="row input-group filters mb-1">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="modelType" >Select Model Type</label>
                </div>
                <select id="modelType" class="custom-select custom-select">
                    <option value="cvmh">cvmh</option>
                </select>
            </div>
            <div class="row input-group filters mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="zType" >Select Z Mode</label>
                </div>
                <select id="zModeType" class="custom-select">
                    <option value="d">Depth</option>
                    <option value="e">Elevation</option>
                </select>
            </div>
            <div class="row input-group filters">
                <select id="search-type" class="custom-select">
                    <option value="">Select </option>
                    <option value="pointClick">point</option>
                    <option disabled>-- Advanced --</option>
                    <option value="profileClick">profile</option>
                    <option value="lineClick">line</option>
                    <option value="areaClick">area</option>
                </select>
                <div class="input-group-append">
                    <button onclick="refreshAll();" class="btn btn-dark pl-4 pr-4" type="button">Reset</button>
                </div>
            </div>
          </div> <!--XXX-->
            <div class="row">
                <div class="col input-group">
                    <ul id="sidebar" class="navigation" style="border:solid 1px red">

                        <li id='point' class='navigationLi' style="display:none">
                            <div id='pointMenu' class='menu'>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Pick a point on the map, or enter latitudes and longitudes below and the Z value or upload a file with latlongs and matching Z values.</p>
                                    </div>
                                </div>
                                <div class="row d-flex" style="border:solid 2px purple">
                                    <div class="col-6 pr-0">
                                        <input type="text"
                                               id="pointFirstLatTxt"
                                               placeholder="Latitude"
                                               title="lat"
                                               onfocus="this.value=''"
                                               class="form-control">
               
                                        <input type="text" 
                                               id="pointFirstLonTxt" 
                                               placeholder="Longitude" 
                                               title="lon"
                                               onfocus="this.value=''" 
                                               class="form-control mt-1">
                                        <input type="text" 
                                               id="pointZTxt" 
                                               placeholder="Z" 
                                               title="Z"
                                               onfocus="this.value=''" 
                                               class="form-control mt-1">

      <div class="mt-2"></div>
      <input class="form-control" id='fileBtn' type='file' onchange='selectLocalFiles(this.files)' style='border:2px solid green; display:none;'></input>
      <button id="selectbtn" class="btn gfm-top-btn" style="width:20vw" title="open a file to ingest" onclick='javascript:document.getElementById("fileBtn").click();'>
      <span class="glyphicon glyphicon-file"></span> Select file to use</button>
      <div id="spinIconForListProperty" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
      <div class="row" id="fileQuery" style="margin:0 0 0 0;display:">
        <div class="row" style="margin:0 0 0 0;display:inline-block">
          <div class="row" id="resultForMPQuery" style="margin:0 0 0 0;display:inline-block"></div>
        </div>
      </div>

                                    </div>
                                    <div class="col-1 pr-0 align-items-center">
                                        <button id="pointBtn" type="button" title="query with latlon"
                                                class="btn btn-default ucvm-small-btn " onclick="searchByLatlonForPoint()">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </button>
                                    </div>
                                    <div class="col-2 pr-0">
                                        <div id="spinIconForProperty" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li id='profile' class='navigationLi' style="display:none">
                            <div id='profileMenu' class='menu'>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Pick a profile point on the map or enter latitudes and longitudes below.</p>
                                    </div>
                                </div>
                                <div class="row d-flex">
                                    <div class="col-5 pr-0">
                                        <input type="text"
                                               id="profileFirstLatTxt"
                                               placeholder="Latitude"
                                               title="lat"
                                               onfocus="this.value=''"
                                               class="form-control">
                                        <input type="text" 
                                               id="profileFirstLonTxt" 
                                               placeholder="Longitude" 
                                               title="lon"
                                               onfocus="this.value=''" 
                                               class="form-control mt-1">
                                    </div>
                                    <div class="col-1 pr-0 align-items-center">
                                        <button id="profileBtn" type="button" title="query with latlon"
                                                class="btn btn-default ucvm-small-btn " onclick="searchByLatlonForProfile()">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </button>
                                    </div>
                                    <div class="col-2 pr-0">
                                        <div id="spinIconForProfile" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li id='line' class='navigationLi ' style="display:none">
                            <div id='lineMenu' class='menu'>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Draw a line on the map or enter latitudes and longitudes below.</p>
                                    </div>
                                </div>
                                <div class="row d-flex ">
                                    <div class="col-4 pr-0">
                                        <input type="text"
                                               placeholder="Latitude"
                                               id="lineFirstLatTxt"
                                               title="first lat"
                                               onfocus="this.value=''"
                                               class="form-control">
                                        <input type="text" 
                                               id="lineFirstLonTxt" 
                                               placeholder='Longitude'
                                               title="first lon"
                                               onfocus="this.value=''" 
                                               class="form-control mt-1">
                                    </div>
                                    <div class="col-4 pr-0">
                                        <input type="text"
                                               id="lineSecondLatTxt"
                                               title="second lat"
                                               value='second Lat'
                                               onfocus="this.value=''"
                                               class="form-control">
                                        <input type="text"
                                               id="lineSecondLonTxt"
                                               title="second lon"
                                               value='second Lon'
                                               onfocus="this.value=''"
                                               class="form-control mt-1">
                                    </div>
                                    <div class="col-1 pr-0 align-items-center">
                                        <button id="areaBtn" type="button" title="query with latlon"
                                                class="btn btn-default ucvm-small-btn " onclick="searchByLatlonForLine()">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </button>
                                    </div>
                                    <div class="col-2 pr-0">
                                        <div id="spinIconForLine" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li id='area' class='navigationLi ' style="display:none">
                            <div id='areaMenu' class='menu'>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Draw a rectangle on the map or enter latitudes and longitudes below.</p>
                                    </div>
                                </div>
                                <div class="row d-flex ">
                                    <div class="col-4 pr-0">
                                        <input type="text"
                                               placeholder="Latitude"
                                               id="areaFirstLatTxt"
                                               title="first lat"
                                               onfocus="this.value=''"
                                               class="form-control">
                                        <input type="text" 
                                               id="areaFirstLonTxt" 
                                               placeholder='Longitude'
                                               title="first lon"
                                               onfocus="this.value=''" 
                                               class="form-control mt-1">
                                    </div>
                                    <div class="col-4 pr-0">
                                        <input type="text"
                                               id="areaSecondLatTxt"
                                               title="second lat"
                                               value='second Lat'
                                               onfocus="this.value=''"
                                               class="form-control">
                                        <input type="text"
                                               id="areaSecondLonTxt"
                                               title="second lon"
                                               value='second Lon'
                                               onfocus="this.value=''"
                                               class="form-control mt-1">
                                    </div>
                                    <div class="col-1 pr-0 align-items-center">
                                        <button id="areaBtn" type="button" title="query with latlon"
                                                class="btn btn-default ucvm-small-btn " onclick="searchByLatlonForArea()">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </button>
                                    </div>
                                    <div class="col-2 pr-0">
                                        <div id="spinIconForArea" align="center" class="the-spin-icons" title="Code: 0xe839" style="display:none;"><i class="spin-icon animate-spin">&#xe839;</i></div>
                                    </div>

                                </div>
                            </div>
                        </li>
                    </ul> <!-- pull-out -->
                </div>
            </div>
        </div>
    </div>
    <div id="map-container" class="col-7" style="border:solid 2px green">
        <div class="row col-8 d-flex offset-4 align-items-end mb-0 mt-2">
            <div class="input-group input-group-sm mb-0" id="map-controls">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="mapLayer">Select Map Type</label>
                </div>
                <select id="mapLayer" class="custom-select custom-select-sm" onchange="switchLayer(this.value);">
                    <option selected value="esri topo">ESRI Topographic</option>
                    <option value="esri NG">ESRI National Geographic</option>
                    <option value="esri imagery">ESRI Imagery</option>
                    <option value="otm topo">OTM Topographic</option>
                    <option value="osm street">OSM Street</option>
                </select>
            </div>
        </div>
      <div class="row mapData" display="border:solid 1px red">
        <div class="col-12 pr-0 pl-2 pt-1 ">
            <div class="row w-100 mb-1" id='UCVM_plot'
                 style="position:relative;border:solid 1px #ced4da; height:576px;"></div>


        </div>
    </div>
    </div> <!-- map-container -->
        <div class="row" style="overflow:scroll;">
            <div id="searchResult" class="mb-1">
            </div>
            <div id="phpResponseTxt"></div>
        </div>
        <div class="row col mt-2 mb-4" style="border:2px solid green">
            <div class="col-12" id="metadata-viewer-container">
                <table id="metadata-viewer">
                    <thead>
                    <tr>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th><div class="col text-center">
                                <div class="btn-group download-now">
                                    <button id="download-all" type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false" disabled>
                                        Download All <span id="download-counter"></span>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <button class="dropdown-item" type="button" value="meta"
                                                onclick="executeDownload(this.value);">Metadata
                                        </button>
                                        <button class="dropdown-item" type="button" value="native"
                                                onclick="executeDownload(this.value);">Native + Metadata
                                        </button>
                                        <button class="dropdown-item" type="button" value="500m"
                                                onclick="executeDownload(this.value);">500m + Metadata
                                        </button>
                                        <button class="dropdown-item" type="button" value="1000m"
                                                onclick="executeDownload(this.value);">1000m + Metadata
                                        </button>
                                        <button class="dropdown-item" type="button" value="2000m"
                                                onclick="executeDownload(this.value);">2000m + Metadata
                                        </button>
                                        <button class="dropdown-item" type="button" value="all"
                                              onclick="executeDownload(this.value);">All of the Above
                                        </button>
                                    </div>
                                </div>
                            </div></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr id="placeholder-row">
                        <td colspan="12">Metadata for selected faults will appear here. </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

    <div id='queryBlock' class="col-6" style="overflow:hidden;display:none;">

    </div> <!-- query block -->
</div>

</body>
</html>
