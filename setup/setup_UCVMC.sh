#!/bin/bash


## base models are cvmh1511/cvmh-15.1.1.tar.gz/CVM-Hv15.1.1 
##             and cvmsi/cvms426.tar.gz/CVM-S4.26.M01

export TOP_UCVM_DIR=`pwd`

export ANACONDA2=/usr/local/share/anaconda2

export UCVM_SRC_PATH=$TOP_UCVM_DIR/model/UCVMC
export UCVM_INSTALL_PATH=$TOP_UCVM_DIR/model/UCVMC_TARGET

if [ $LD_LIBRARY_PATH ] ; then
  export LD_LIBRARY_PATH=$UCVM_INSTALL_PATH/lib/euclid3/lib:$UCVM_INSTALL_PATH/lib/proj-5/lib:$UCVM_INSTALL_PATH/model/cvmh1511/lib:$UCVM_INSTALL_PATH/model/cvmsi/lib:$LD_LIBRARY_PATH
  else
    export LD_LIBRARY_PATH=$UCVM_INSTALL_PATH/lib/euclid3/lib:$UCVM_INSTALL_PATH/lib/proj-5/lib:$UCVM_INSTALL_PATH/model/cvmh1511/lib:$UCVM_INSTALL_PATH/model/cvmsi/lib
fi

## setup python script
if [ $PYTHONPATH ] ; then 
  export PYTHONPATH=$PYTHONPATH:$UCVM_INSTALL_PATH/utilities/pycvm
  else
     export PYTHONPATH=$UCVM_INSTALL_PATH/utilities/pycvm
fi

export DYLD_LIBRARY_PATH=$UCVM_INSTALL_PATH/lib/euclid3/lib:$UCVM_INSTALL_PATH/lib/proj-5/lib:$UCVM_INSTALL_PATH/model/cvmh1511/lib:$UCVM_INSTALL_PATH/model/cvmsi/lib

if [ $PATH ] ; then
  export PATH=$UCVM_INSTALL_PATH/bin:$PATH
  else
    export PATH=$UCVM_INSTALL_PATH/bin
fi

export PATH=$ANACONDA2/bin:$PATH
