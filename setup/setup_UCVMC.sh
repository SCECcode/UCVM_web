#!/bin/bash


## base models are dir_name, model_label, tarball, model_name 
##                cvmh1511/cvmh/cvmh-15.1.1.tar.gz/CVM-Hv15.1.1 
##                cvms426/cvmsi/cvms426.tar.gz/CVM-S4.26.M01
##                cvms/cvms/cvms4.tar.gz/CVM-S4
##                cvms5/cvms5/cvms5.tar.gz/CVM-S4.26
##                cencal/cencal/cencal080.tar.gz/CCenCalVM
##                cca/cca/cca.tar.gz/CCA

export TOP_UCVM_DIR=`pwd`

export ANACONDA2=/usr/local/share/anaconda2

export UCVM_SRC_PATH=$TOP_UCVM_DIR/model/UCVMC
export UCVM_INSTALL_PATH=$TOP_UCVM_DIR/web/model/UCVMC_TARGET

if [ $LD_LIBRARY_PATH ] ; then
  export LD_LIBRARY_PATH=$UCVM_INSTALL_PATH/lib/euclid3/lib:$UCVM_INSTALL_PATH/lib/proj-5/lib:$UCVM_INSTALL_PATH/model/cvmh1511/lib:$UCVM_INSTALL_PATH/model/cvms426/lib:$UCVM_INSTALL_PATH/model/cvms/lib:$UCVM_INSTALL_PATH/model/cvms5/lib:$UCVM_INSTALL_PATH/model/cca/lib:$UCVM_INSTALL_PATH/model/cencal/lib
:$LD_LIBRARY_PATH
  else
    export LD_LIBRARY_PATH=$UCVM_INSTALL_PATH/lib/euclid3/lib:$UCVM_INSTALL_PATH/lib/proj-5/lib:$UCVM_INSTALL_PATH/model/cvmh1511/lib:$UCVM_INSTALL_PATH/model/cvms426/lib:$UCVM_INSTALL_PATH/model/cvms/lib:$UCVM_INSTALL_PATH/model/cvms5/lib:$UCVM_INSTALL_PATH/model/cca/lib:$UCVM_INSTALL_PATH/model/cencal/lib
fi

## setup python script
if [ $PYTHONPATH ] ; then 
  export PYTHONPATH=$PYTHONPATH:$UCVM_INSTALL_PATH/utilities/pycvm
  else
     export PYTHONPATH=$UCVM_INSTALL_PATH/utilities/pycvm
fi

export DYLD_LIBRARY_PATH=$UCVM_INSTALL_PATH/lib/euclid3/lib:$UCVM_INSTALL_PATH/lib/proj-5/lib:$UCVM_INSTALL_PATH/model/cvmh1511/lib:$UCVM_INSTALL_PATH/model/cvms426/lib:$UCVM_INSTALL_PATH/model/cvms/lib:$UCVM_INSTALL_PATH/model/cvms5/lib:$UCVM_INSTALL_PATH/model/cca/lib:$UCVM_INSTALL_PATH/model/cencal/lib

if [ $PATH ] ; then
  export PATH=$UCVM_INSTALL_PATH/bin:$PATH
  else
    export PATH=$UCVM_INSTALL_PATH/bin
fi

export PATH=$ANACONDA2/bin:$PATH
