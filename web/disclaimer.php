<?php
require_once("php/navigation.php");
$header = getHeader("Disclaimer");
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
    <link rel="stylesheet" href="css/gfm-ui.css">
    <link rel="stylesheet" href="css/scec-ui.css">

    <script type='text/javascript' src='js/vendor/popper.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.min.js'></script>
    <script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
    <title>Geological Framework Model Viewer: Disclaimer</title>
</head>
<body>
<?php echo $header; ?>

<div class="container info-page-container scec-main-container">

    <h1>Disclaimer</h1>
    <div>
		<p> The Geological Framework Model(GFM) Viewer Tool is provided “as is” and without warranties of any kind.  While <a href="https://www.scec.org">SCEC</a> and the <a href="https://www.scec.org/research/cxm">the GFM development team</a> have made every effort to provide data from reliable sources or methodologies, SCEC and the GFM development team do not make any representations or warranties as to the accuracy, completeness, reliability, currency, or quality of any data provided herein.  This website provides access to an initial prototype of the SCEC Geological Framework Model (GFM) and the information may be incomplete or contain errors, and we do not recommend use of this website for scientific research until further evaluation of the site has been completed. By using this tool, you accept to release SCEC and the GFM development team of any and all liability.</p>

		<p>More information about the GFM can be found at: <a href="https://www.scec.org/research/cxm">https://www.scec.org/research/cxm</a>.</p>
	</div>
</div>
</body>
</html>
