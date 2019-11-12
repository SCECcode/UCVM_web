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
    <link rel="stylesheet" href="css/ucvm-ui.css?v=1">
    <link rel="stylesheet" href="css/sidebar.css?v=1">

    <script type='text/javascript' src='js/vendor/popper.min.js'></script>
    <script type="text/javascript" src="js/vendor/leaflet-src.js"></script>
    <script type='text/javascript' src='js/vendor/jquery.min.js'></script>
    <script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
    <script type='text/javascript' src='js/vendor/ersi-leaflet.js'></script>
    <script type='text/javascript' src='js/vendor/FileSaver.js'></script>
    <script type='text/javascript' src='js/vendor/jszip.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.floatThead.min.js'></script>

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
    <script type="text/javascript" src="js/debug.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_leaflet.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_layer.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_util.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_ui.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_main.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_query.js?v=1"></script>
    <script type="text/javascript" src="js/ucvm_sidebar.js?v=1"></script>

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

            <button id="toggleBtn" class="btn ucvm-top-small-btn" title="toggle to display all faults"
                    onclick="toggleAll()">
                <span class="glyphicon glyphicon-adjust"></span></button>

            <button id="refreshBtn" class="btn ucvm-top-small-btn" title="refresh to initial state"
                    onclick="refreshAll();">
                <span class="glyphicon glyphicon-refresh"></span></button>

            <button id="basketBtn" class="btn ucvm-top-small-btn" title="download selected faults metadata"
                    onMouseEnter="expandDownloadControl()">
                <span class="glyphicon glyphicon-download-alt"></span></button>
            <div id="itemCount"></div>
            <div id="downloadSelect" class="ucvm-control-download" onMouseLeave="removeDownloadControl()"></div>
        </div>
    </div>

    <div id="controls-container" class="row">
        <div class="col-4">
            <div class="input-group filters">
                <select id="search-type" class="custom-select">
                    <option value="">Input ingest by ...</option>
                    <option value="latlonClick">Latitude &amp; Longitude</option>
                    <option disabled>-- Advanced --</option>
                    <option value="fileClick">File</option>
                </select>
                <div class="input-group-append">
                    <button onclick="refreshAll();" class="btn btn-dark pl-4 pr-4" type="button">Reset</button>
                </div>
            </div>
            <div class="row">
                <div class="col input-group">
                    <ul id="sidebar" class="navigation">
                        <li id='latlon' class='navigationLi ' style="display:none">
                            <div id='latlonMenu' class='menu'>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <p>Draw a rectangle on the map or enter latitudes and longitudes below.</p>
                                    </div>
                                </div>
                                <div class="row d-flex ">
                                    <div class="col-5 pr-0">
                                        <input type="text"
                                               placeholder="Latitude"
                                               id="firstLatTxt"
                                               title="first lat"
                                               onfocus="this.value=''"
                                               class="form-control">
                                        <input type="text" id="firstLonTxt" placeholder='Longitude' title="first lon"
                                               onfocus="this.value=''" class="form-control mt-1">
                                    </div>
                                    <div class="col-5 pr-0">
                                        <input type="text"
                                               id="secondLatTxt"
                                               title="optional second lat"
                                               value='optional'
                                               onfocus="this.value=''"
                                               class="form-control">
                                        <input type="text"
                                               id="secondLonTxt"
                                               title="optional second lon"
                                               value='optional'
                                               onfocus="this.value=''"
                                               class="form-control mt-1">
                                    </div>
                                    <div class="col-1 pr-0 align-items-center">
                                        <button id="latlonBtn" type="button" title="search with latlon"
                                                class="btn btn-default ucvm-small-btn " onclick="searchByLatlon()">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- pull-out -->
                </div>
            </div>
        </div>
        <div class="col-3 d-flex offset-5 align-items-end mb-2">
            <div>&nbsp;</div>
            <div class="input-group input-group-sm" id="map-controls">
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

            <div class="input-group input-group-sm ml-md-2 ml-sm-0">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="highlight-faults">Highlight Area By</label>
                </div>
                <select id="highlight-area" class="custom-select custom-select-sm"
                        onchange="changeAreaColor(this.value);">
                    <option value="">Default</option>
                    <option value="model">Model</option>
                    <option value="fault">Fault</option>
                </select>
            </div>
        </div>
    </div>


    <div class="row mapData">
        <div class="col-5 button-container d-flex flex-column" style="overflow:hidden;">
            <div id="searchResult" class="mb-1">
            </div>
            <div id="phpResponseTxt"></div>
        </div>
        <div class="col-7 pr-0 pl-2 ">
            <div class="row w-100 mb-1" id='UCVM_plot'
                 style="position:relative;border:solid 1px #ced4da; height:576px;"></div>


        </div>
    </div>
        <div class="row">
            <div class="col-12" id="metadata-viewer-container">
                <table id="metadata-viewer">
                    <thead>
                    <tr>
                        <th>Fault</th>
                        <th>Area</th>
                        <th>Zone</th>
                        <th>Section</th>
                        <th>CFM Version</th>
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
                                &nbsp; &nbsp;
                                <div class="btn-group download-now">
<!-- MODAL popup button, reuse download-counter -->
                                    <button id="plot3d-all" type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false" disabled>
                                        Plot3d <span id="download-counter"></span>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <button class="dropdown-item" type="button" value="native"
                                                onclick="executePlot3d(this.value);">Native
                                        </button>
                                        <button class="dropdown-item" type="button" value="500m"
                                                onclick="executePlot3d(this.value);">500m
                                        </button>
                                        <button class="dropdown-item" type="button" value="1000m"
                                                onclick="executePlot3d(this.value);">1000m
                                        </button>
                                        <button class="dropdown-item" type="button" value="2000m"
                                                onclick="executePlot3d(this.value);">2000m
                                        </button>
                                        <button class="dropdown-item" type="button" value="all"
                                              onclick="executePlot3d(this.value);">All of the Above
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
                <!--                    <p>-->
                <!--                        The UCVM Viewer was developed by the <a href="https://www.scec.org/">Southern California Earthquake Center</a> (SCEC) and SCEC-->
                <!--                        Community Fault Model researchers. More information is available on the <a-->
                <!--                            href="https://www.scec.org/research/ucvm">SCEC UCVM Research Page</a>. SCEC is funded by-->
                <!--                        <a href="https://www.nsf.gov">National Science Foundation</a> and the <a href="https://www.usgs.gov">United States Geological Survey</a>.-->
                <!--                    </p>-->
            </div>
        </div>

    </div>

    <div class="row">&nbsp;</div>

    <div id='queryBlock' class="col-6" style="overflow:hidden;display:none;">

    </div> <!-- query block -->
</div>

<!--Modal: Name-->
<div class="modal" id="modal3D" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" id="modal3DDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modal3DContent">
      <!--Header-->
      <div class="modal-header">
        <button id="view3DRefreshbtn" class="btn btn-outline-primary btn-md" type="button" onclick="refresh3Dview()">Reset View</button>
        <button id="view3DToggleUIbtn" class="btn btn-outline-primary btn-md" type="button" onclick="toggleUI3Dview(this)">Hide Legend</button>
      </div>

      <!--Body-->
      <div class="modal-body" id="modal3DBody">
<div id="iframe-container" class="row col-12" style="overflow:hidden">
<iframe id="view3DIfram" src="" height="400" width="100%" frameborder="2" allowfullscreen></iframe>
</div>
      </div>

      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-outline-primary btn-md" data-dismiss="modal">Close</button>
        <button id="view3DExpandbtn" class="btn btn-outline-primary btn-md" type="button" onclick="toggleExpand3Dview(this)">Expand</button>
      </div> <!-- footer -->

    </div> <!--Content-->
  </div>
</div> <!--Modal: Name-->
</body>
</html>
