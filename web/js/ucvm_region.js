/****

  ucvm_region.js

****/

var UCVM_tb={
"models": [
    {'id':15,
     'model name':'CVM-H Ventura Basin',
     'abb name':'cvmhvbn',
     'path name':'cvmhvbn',
     'model filename':'cvmhvbn.tar.gz',
     'description':'Ventura Basin developed by Harvard Structural Geology Group',
     'coordinates': [
          { 'lon':-119.56521,'lat':33.97183 },
          { 'lon':-119.56521, 'lat':34.52582 },
          { 'lon':-118.08960, 'lat':34.52582 },
          { 'lon':-118.08960, 'lat':33.97183 } ],
     'color':'#4B0082'},
    {'id':14,
     'model name':'CVM-H San Gabriel Basin',
     'abb name':'cvmhsgbn',
     'path name':'cvmhsgbn',
     'model filename':'cvmhsgbn.tar.gz',
     'description':'San Gabriel Basin developed by Harvard Structural Geology Group',
     'coordinates': [
          { 'lon':-118.26439,'lat':33.82977 },
          { 'lon':-118.26439, 'lat':34.19044 },
          { 'lon':-117.33646, 'lat':34.19654 },
          { 'lon':-117.33504, 'lat':33.83579 } ],
     'color':'#990000'},
    {'id':13,
     'model name':'CVM-H LA Basin',
     'abb name':'cvmhlabn',
     'path name':'cvmhlabn',
     'model filename':'cvmhlabn.tar.gz',
     'description':'LA Basin developed by Harvard Structural Geology Group',
     'coordinates': [
	  /* cvmh
          { 'lon':-120.862028,'lat':30.956496 },
          { 'lon':-120.862028, 'lat':36.612951 },
          { 'lon':-113.33294, 'lat':36.612951 },
          { 'lon':-113.33294, 'lat':30.956496 } ],
	  */
          { 'lon':-118.60524,'lat':32.978073 },
          { 'lon':-117.256881, 'lat':32.988127 },
          { 'lon':-117.260267, 'lat':34.123581 },
          { 'lon':-118.62639, 'lat':34.114087 } ],
     'color':'#9400D3'},
    {'id':12,
     'model name':'Wasatch Front Utah',
     'abb name':'wfcvm',
     'path name':'wfcvm',
     'model filename':'wfcvm.tar.gz',
     'map':'ucvm_utah',
     'description':'Wasatch Front North-eastern Utah Velocity Model',
     'coordinates': [
               {'lon':-112.699997,'lat':39.75},
               {'lon':-112.699997,'lat':42},
               {'lon':-111.5,'lat':42},
               {'lon':-111.5,'lat':39.75}
               ],
     'color':'#FF3CFF'},
    {'id':11,
     'model name':'SSIP Imperial Valley',
     'abb name':'ivlsu',
     'path name':'ivlsu',
     'model filename':'ivlsu.tar.gz',
     'description':'Imperial Valley Velocity Model developed by LSU<br>depth:0 to 8km',
     'coordinates': [
               {'lon':-116.051578,'lat':32.596922},
               {'lon':-115.344866,'lat':32.596922},
               {'lon':-115.344866,'lat':33.356203},
               {'lon':-116.051578,'lat':33.356203},
               ],
     'color':'#220082'},
    {'id':10,
     'model name':'SSIP Coachella Valley',
     'abb name':'cvlsu',
     'path name':'cvlsu',
     'model filename':'cvlsu.tar.gz',
     'description':'Coachella Valley Velocity Model developed by LSU<br>depth:-5km to 16km',
     'coordinates': [
               {'lon':-115.7,'lat':33.3},
               {'lon':-116.7,'lat':33.3},
               {'lon':-116.7,'lat':34.2},
               {'lon':-115.7,'lat':34.2},
               ],
     'color':'#FF3C00'},
    {'id':9,
     'model name':'ALBACORE',
     'abb name':'albacore',
     'path name':'albacore',
     'model filename':'albacore.tar.gz',
     'description':'Southern California Off-shore Velocity Model<br>depth:0 to 100km',
     'coordinates': [
               {'lon':-116.847200,'lat':33.300000},
               {'lon':-116.847200,'lat':32.700000},
               {'lon':-124.047200,'lat':32.700000},
               {'lon':-124.047200,'lat':33.000000},
               {'lon':-124.647200,'lat':33.000000},
               {'lon':-124.647200,'lat':33.600000},
               {'lon':-123.447200,'lat':33.600000},
               {'lon':-123.447200,'lat':33.900000},
               {'lon':-123.147200,'lat':33.900000},
               {'lon':-123.147200,'lat':34.200000},
               {'lon':-121.347200,'lat':34.200000},
               {'lon':-121.347200,'lat':34.500000},
               {'lon':-120.447200,'lat':34.500000},
               {'lon':-120.447200,'lat':34.800000},
               {'lon':-118.947200,'lat':34.800000},
               {'lon':-118.947200,'lat':34.500000},
               {'lon':-118.647200,'lat':34.500000},
               {'lon':-118.647200,'lat':34.200000},
               {'lon':-118.047200,'lat':34.200000},
               {'lon':-118.047200,'lat':33.900000},
               {'lon':-117.447200,'lat':33.900000},
               {'lon':-117.447200,'lat':33.600000},
               {'lon':-117.147200,'lat':33.600000},
               {'lon':-117.147200,'lat':33.300000},
               ],
     'color':'#0000FF'},
    {'id':8,
     'model name':'CVM-H v15.1.1',
     'abb name':'cvmh',
     'path name':'cvmh',
     'model filename':'cvmh.tar.gz',
     'description':'Southern California Velocity Model developed by Harvard Structural Geology Group',
     'coordinates': [
          { 'lon':-120.862028,'lat':30.956496 },
          { 'lon':-120.862028, 'lat':36.612951 },
          { 'lon':-113.33294, 'lat':36.612951 },
          { 'lon':-113.33294, 'lat':30.956496 } ],
     'color':'#00B0FF'},
    {'id':7,
     'model name':'CenCalVM',
     'abb name':'cencal',
     'path name':'cencal',
     'model filename':'cencal.tar.gz',
     'description':'USGS Bay Area (CenCal) Velocity Model',
     'coordinates': [
        {'lon':-120.644051,'lat':37.050062},
        {'lon':-121.922036,'lat':36.320331},
        {'lon':-123.858493,'lat':38.424179},
        {'lon':-122.562365,'lat':39.174505},
        {'lon':-120.644051,'lat':37.050062}
               ],
     'color':'#FF00FF'},
    {'id':6,
     'model name':'CVM-S4.26.M01',
     'abb name':'cvmsi',
     'path name':'cvmsi',
     'model filename':'cvmsi.tar.gz',
     'description':'CVM-S4.26 with geotechnical layer',
     'coordinates': [
          { 'lon':-116.000, 'lat':30.4499 },
          { 'lon':-122.300, 'lat':34.7835 },
          { 'lon':-118.9475, 'lat':38.3035 },
          { 'lon':-112.5182, 'lat':33.7819 } ],
     'color':'#FFA726'},
    {'id':5,
     'model name':'CVM-S4',
     'abb name':'cvms',
     'path name':'cvms',
     'model filename':'cvms.tar.gz',
     'description':'Southern California Velocity Model developed by SCEC, Caltech, USGS Group with geotechnical layer',
     'coordinates': [
          { 'lon':-116.64433, 'lat':31.102 },
          { 'lon':-121.568, 'lat':35.18167 },
          { 'lon':-118.49184, 'lat':37.73133 },
          { 'lon':-113.56834, 'lat':33.65166 } ],
     'color':'#FF3D00'},
    {'id':4,
     'model name':'CS173h',
     'abb name':'cs173h',
     'path name':'cs173h',
     'model filename':'cs173h.tar.gz',
     'description':'CS173-H CyberShake Study 17.3 Velocity Model with Harvard Basins',
     'coordinates': [
         { 'lon':-127.65648, 'lat':37.08416 },
         { 'lon':-116.48562, 'lat':31.26643 },
         { 'lon':-112.92896, 'lat':35.33518 },
         { 'lon':-124.51032, 'lat':41.45284 },
               ],
     'color':'#00FFFF'},
    {'id':3,
     'model name':'CS173h',
     'abb name':'cs173h',
     'path name':'cs173h',
     'model filename':'cs173h.tar.gz',
     'description':'CS173-H CyberShake Study 17.3 Velocity Model with Harvard Basins',
     'coordinates': [
         { 'lon':-127.65648, 'lat':37.08416 },
         { 'lon':-116.48562, 'lat':31.26643 },
         { 'lon':-112.92896, 'lat':35.33518 },
         { 'lon':-124.51032, 'lat':41.45284 },
               ],
     'color':'#7FFFD4'},
    {'id':2,
     'model name':'CCA',
     'abb name':'cca',
     'path name':'cca',
     'model filename':'cca.tar.gz',
     'description':'CCA-06 Central California Seismic Velocity Model',
     'coordinates': [
          { 'lon': -122.950, 'lat': 36.598 },
          { 'lon':-118.296, 'lat':39.353 },
          { 'lon':-115.445, 'lat':36.038 },
          { 'lon':-120.000, 'lat':33.398 },
               ],
     'color':'#0000FF'},
   {'id':1,
     'model name':'CVM-S4.26',
     'abb name':'cvms5',
     'path name':'cvms5',
     'model filename':'cvms5.tar.gz',
     'description':'Tomography improved version of CVM-S4 with no geotechnical layer',
     'coordinates': [
          { 'lon':-116.000, 'lat':30.4499 },
          { 'lon':-122.300, 'lat':34.7835 },
          { 'lon':-118.9475, 'lat':38.3035 },
          { 'lon':-112.5182, 'lat':33.7819 } ],
     'color':'#2E7D32'}
    ],
"maps": [
    {'id':1,
     'map name':'UCVM',
     'abb name':'ucvm',
     'path name':'ucvm',
     'map filename':'ucvm.e',
     'description':'UCVM Topography and Vs30 Coverage Region(Wills2015)',
     'coordinates': [
        {'lon':-129.25,'lat':41},
        {'lon':-117.4199,'lat':28.0268},
        {'lon':-110.3864,'lat':31.80259},
        {'lon':-121.5606,'lat':45.4670}
               ],
     'color':'#FF0000'},
    {'id':2,
     'map name':'UCVM UTAH',
     'abb name':'ucvm_utah',
     'path name':'ucvm_utah',
     'map filename':'ucvm_utah.e',
     'description':'UCVM Utah Topography and Vs30 Coverage Region(2006)',
     'coordinates': [
        {'lon':-116,'lat':35},
        {'lon':-116,'lat':44},
        {'lon':-108,'lat':44},
        {'lon':-108,'lat':35}
               ],
     'color':'#FF00FF'}
    ],
"fileformats": [
    {'id':1,
     'format name':'image',
     'suffix':'png',
     'description':'plot image in fixed discrete color scale'},
    {'id':2,
     'format name':'metadata',
     'suffix':'json',
     'description':'metadata describing the image and the binary image data'},
    {'id':3,
     'format name':'data',
     'suffix':'bin',
     'description':'binary image data'},
    {'id':4,
     'format name':'dataset',
     'suffix':'json',
     'description':'image data in triplets'},
    {'id':5,
     'format name':'material property data',
     'suffix':'json',
     'description':'material property'}
    ],
"zmodes": [
    {'id':1,
     'mode name':'Depth',
     'value':'d',
     'description':'0 at surface and positive depth value'},
    {'id':2,
     'mode name':'Elevation',
     'value':'e',
     'description':'0 at sealevel and positive value toward the air and negative value toward the center of the earth'}
    ],
"Products": [
    {'id': 1,
     'product name': '0D Point',
     'description':'Material Properties are returned for the selected location'},
    {'id': 2,
     'product name': '1D Vertical Profile',
     'description':'3 Vertical profile(Vp, Vs, Rho) plots are produced for the selected location. The plot starts at Z start, ends at Z ends, and in Z step interval'},
    {'id': 3,
     'product name': '2D Vertical Cross Section',
     'description':'A Cross section of a selected property is produced between two selected points. The plot starts at Z start, ends at Z ends, and the interval is determined by the web service'},
    {'id': 3,
     'product name': '2D Horizontal Slice',
     'description':'A Horizontal slice of a selected property is produced in a area marked by the rectangle drawn with the depth or elevation supplied as Z, and the interval is determined by the web service.'}
 ],
"descript": [
    {'id':'lon','label':'lon','show':1,'descript':'Longitude'},
    {'id':'lat','label':'lat','show':1,'descript':'Latitude)'},
    {'id':'Z','label':'Z','show':1,'descript':'Input Z (elevation - meters above sea level. Positive numbers above sea-level)<br>(depth - meters below ground surface. Positive numbers below ground surface)'},
    {'id':'surf','label':'surf','show':1,'descript':'Surface elevation from sealevel'},
    {'id':'vs30','label':'vs30','show':1,'descript':'vs30 value from Wills 2015 map'},
    {'id':'crustal','label':'crustal','show':1,'descript':'crustal model'},
    {'id':'cr_vp','label':'cr_vp','show':0,'descript':'cr_vp'},
    {'id':'cr_vs','label':'cr_vs','show':0,'descript':'cr_vs'},
    {'id':'cr_rho','label':'cr_rho','show':0,'descript':'cr_rho'},
    {'id':'gtl','label':'gtl','show':1,'descript':'gtl'},
    {'id':'gtl_vp','label':'gtl_vp','show':0,'descript':'gtl_vp'},
    {'id':'gtl_vs','label':'gtl_vs','show':0,'descript':'gtl_vs'},
    {'id':'gtl_rho','label':'gtl_rho','show':0,'descript':'gtl_rho'},
    {'id':'cmb_algo','label':'cmb_algo','show':0,'descript':'cmb_algo'},
    {'id':'cmb_vp','label':'vp','show':1,'descript':'vp'},
    {'id':'cmb_vs','label':'vs','show':1,'descript':'vs'},
    {'id':'cmb_rho','label':'rho','show':1,'descript':'rho'},
    {'id':'Zmode','label':'zmode','show':0,'descript':'zmode'},
 ]
};

