<?php
require_once("php/navigation.php");
$header = getHeader("User Guide");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="css/vendor/font-awesome.min.css" rel="stylesheet">

    <link rel="stylesheet" href="css/vendor/bootstrap.min.css">
    <link rel="stylesheet" href="css/vendor/bootstrap-grid.min.css">
    <link rel="stylesheet" href="css/vendor/jquery-ui.css">
    <link rel="stylesheet" href="css/vendor/glyphicons.css">
    <link rel="stylesheet" href="css/scec-ui.css">
    <link rel="stylesheet" href="css/ucvm-ui.css">
    <link rel="stylesheet" href="css/sidebar.css">

    <script type='text/javascript' src='js/vendor/popper.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.min.js'></script>
    <script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
    <title>Unified Community Velocity Model Viewer (under active development): User Guide</title>
</head>
<body>
<?php echo $header; ?>

<div class="container info-page-container scec-main-container guide">

    <h1>User Guide</h1>

    <div class="row">
        <div class="col-12">
            <figure class="ucvm-interface figure float-lg-right">
                <img src="img/ucvm-viewer.png" class="figure-img img-fluid" alt="Screen capture of UCVM Viewer interface">
                <figcaption class="figure-caption">Screen capture of UCVM Viewer interface</figcaption>
            </figure>
            <h4>Unified Community Velocity Model (UCVM) Viewer Overview</h4>
            <p>The UCVM Viewer provides a map-based access to <a
                        href="https://www.scec.org/research/ucvm">UCVM version 19.4</a> release. 
               It allows users to retrieve material properties from different Community Velocity Models. It also allows user to create 1D vertical profiles, 2D vertical cross sections and 2D horizontal slices from retrieved material properties...</p>
            <p>The pages on this site are the <a href="<?php echo $host_site_actual_path; ?>">UCVM viewer
                    page</a>, this user guide, <a href="disclaimer">a disclaimer</a>, and a <a href="contact">contact
                     information</a> page.</p>

            <p>The main interface is on the <a href="<?php echo $host_site_actual_path; ?>">Viewer Page</a>. On top of the map, there is a control that allows the base map to be changed. 
                By default, the map shown is <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ESRI Topographic</a>.
                The other map types are: <a
                        href="https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer">ESRI National Geographic</a>, <a
                        href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ESRI Imagery</a>, <a
                        href="https://opentopomap.org">OTM Topographic</a>, and <a href="https://www.openstreetmap.org">OSM Street</a>.</p>

            <p>Both material properties and downloadable results are populated into two tables at the bottom of the interface page. Click on the eye icon (<span class="glyphicon glyphicon-eye-open"></span>) to highlight related location on the map.  To return to non map select mode, return the selection dropdown to 'Select' mode. To return to the initial view, click the "RESET" button. </p>

            <h4>Common..</h4>

            <p>Model selection..</p>
            <p>Z mode selection..</p>
            <p>To return to the initial view showing all the faults, click the "RESET" button.</p>

            <h4>Material Property Search</h4>
            <p> When performing with latitude/longitude search, there are two search methods. The first method is to
                enter the latitude/longitude values of the location into the text boxes, then clicking 
                the search icon <span style="white-space: nowrap;">(<span
                            style="color:#53A2BE;" class="glyphicon glyphicon-search"></span>).</span>
                The second method is to click on the map to pick a point. </p>
            <p>User can also upload a local file composed of latlongs and Z values... </p>
            <p>Downloadable result is placed in the result table at the bottom of the view page </p>

            <h4>1D Vertical Profile</h4>
            <h4>2D Vertical Cross Section</h4>
            <h4>2D Horizontal Slice</h4>

            <h4>Notes</h4>
            <ul>
                <li>
                </li>
            </ul>

            <h4>Browser Requirements</h4>
            <p>This site supports the latest versions of <a href="https://www.mozilla.org/en-US/firefox/">Firefox</a>, <a href="https://www.google.com/chrome/">Chrome</a>, <a href="https://www.apple.com/safari/">Safari</a>, and <a href="https://www.microsoft.com/en-us/windows/microsoft-edge">Microsoft Edge</a>.</p>

            <h4>About the SCEC Unified Community Velocity Model (UCVM) </h4>

            <p>More information about the UCVM can be found at: <a
               href="https://www.scec.org/research/ucvm">https://www.scec.org/research/ucvm</a></p>

            <h4>Overview</h4>
            <ul class="overview">
                <li>
Small, P.,
Gill, D.,
<a href="https://www.scec.org/user/maechlin">Maechling, P. J.</a>,
<a href="https://www.scec.org/user/rtaborda">Taborda, R.</a>,
<a href="https://www.scec.org/user/scottcal">Callaghan, S.</a>,
<a href="https://www.scec.org/user/tjordan">Jordan, T. H.</a>,
<a href="https://www.scec.org/user/gely">Ely, G. P.</a>,
<a href="https://www.scec.org/user/kbolsen">Olsen, K. B.</a>,
& 
<a href="https://www.scec.org/user/goulet">Goulet, C. A.</a>,
 (2017). The SCEC Unified Community Velocity Model Software Framework. Seismological Research Letters, 88(5). doi:10.1785/0220170082.
&nbsp;<a href="https://www.scec.org/publication/2067">SCEC Contribution 2067</a>
</li></ul>

           <h4>Models</h4>
            <ul class="Models">
                <li>
<a href="https://www.scec.org/user/jshaw">J. H. Shaw</a>,
<a href="https://www.scec.org/user/plesch">A. Plesch</a>,
<a href="https://www.scec.org/user/carltape">C. Tape</a>,
M. P. Suess,
<a href="https://www.scec.org/user/tjordan">T. H. Jordan</a>,
<a href="https://www.scec.org/user/gely">G. Ely</a>,
<a href="https://www.scec.org/user/hauksson">E. Hauksson</a>,
<a href="https://www.scec.org/user/jtromp">J. Tromp</a>,
<a href="https://www.scec.org/user/toshiro">T. Tanimoto</a>, 
<a href="https://www.scec.org/user/rgraves">R. Graves.</a>, 
<a href="https://www.scec.org/user/kbolsen">K. Olsen</a>,
<a href="https://www.scec.org/user/nicholson">C. Nicholson</a>,
<a href="https://www.scec.org/user/maechlin">P. J. Maechling</a>,
<a href="https://www.scec.org/user/rivero">C. Rivero</a>,
<a href="https://www.scec.org/user/plovely">P. Lovely</a>,
<a href="https://www.scec.org/user/brankman">C. M. Brankman</a>,
J. Munster
 (2015). Unified Structural Representation of the southern California crust and upper mantle. Earth and Planetary Science Letters. 415 1, doi: 10.1016/j.epsl.2015.01.016
&nbsp;<a href="https://www.scec.org/publication/2004">SCEC Contribution 2004</a>
</li><li>
Lee, E.-J.,
P. Chen,
<a href="https://www.scec.org/user/tjordan">T. H. Jordan</a>,
<a href="https://www.scec.org/user/maechlin">P. J. Maechling</a>,
M. A. M. Denolle,
and 
<a href="https://www.scec.org/user/beroza">G. C. Beroza</a>
 (2014), Full 3-D tomography for crustal structure in Southern California based on the scattering-integral and the adjoint-waveﬁeld methods, J. Geophys. Res. Solid Earth, 119, doi:10.1002/2014JB011346.
&nbsp;<a href="https://www.scec.org/publication/6039">SCEC Contribution 6039</a>
</li><li>
Lin, G.,
<a href="https://www.scec.org/user/thurber">C. H. Thurber</a>,
H. Zhang,
<a href="https://www.scec.org/user/hauksson">E. Hauksson</a>,
P. Shearer,
F. Waldhauser,
T. M. Brocher,
and
J. Hardebeck 
 (2010), A California statewide three-dimensional seismic velocity model from both absolute and differential times. Bulletin of the Seismological Society of America, 100, 225-240. doi: 10.1785/0120090028.
&nbsp;<a href="https://www.scec.org/publication/1360">SCEC Contribution 1360</a>
SCEC Contribution 1360
</li><li>
<a href="https://www.scec.org/user/gely">Ely, G.</a>,
<a href="https://www.scec.org/user/tjordan">T. H. Jordan</a>,
P. Small,
<a href="https://www.scec.org/user/maechlin">P. J. Maechling</a>,
 (2010), A Vs30-derived Near-surface Seismic Velocity Model Abstract S51A-1907, presented at 2010 Fall Meeting, AGU, San Francisco, Calif., 13-17 Dec.
</li><li>
Pitarka, A.,
and
<a href="https://www.scec.org/user/rgraves">Graves, R.</a> 
 (2010). Broadband Ground-Motion Simulation Using a Hybrid Approach. Bulletin of the Seismological Society of America, Vol. 100, No. 5A, pp. 2095–2123, doi: 10.1785/0120100057.
</li><li>
Wald, D. J.,
and 
T. I. Allen
 (2007), Topographic slope as a proxy for seismic site conditions and amplification, Bull. Seism. Soc. Am., 97 (5), 1379-1395, doi:10.1785/0120060267.
Wills, C. J., and K. B. Clahan (2006), Developing a map of geologically defined site-condition categories for California, Bull. Seism. Soc. Am., 96 (4A), 1483-1501, doi:10.1785/0120050179.
</li><li>
Kohler, M.,
H. Magistrale,
and
R. Clayton
 (2003). Mantle heterogeneities and the SCEC three-dimensional seismic velocity model version 3, Bulletin Seismological Society of America 93, 757-774.
&nbsp;<a href="https://www.scec.org/publication/630">SCEC Contribution 630</a>
</li>
</ul>
        </div>
    </div>
</div>
</body>
</html>
