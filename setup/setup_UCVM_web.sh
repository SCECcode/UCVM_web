#!/bin/bash

export TOP_DIR=`pwd`
export TOP_UCVM_WEB_DIR=$TOP_DIR/web

export ANACONDA2=/usr/local/share/anaconda2

export UCVM_SRC_PATH=$TOP_DIR/model/UCVMC
export UCVM_INSTALL_PATH=$TOP_DIR/model/UCVMC_TARGET

chmod og+rw $TOP_UCVM_WEB_DIR/web/result
ln -s $UCVM_INSTALL_PATH $TOP_UCVM_WEB_DIR/model

export UCVM_WEB_INSTALL_PATH=$TOP_UCVM_WEB_DIR/model/UCVMC_TARGET

if [ $LD_LIBRARY_PATH ] ; then
  export LD_LIBRARY_PATH=$UCVM_WEB_INSTALL_PATH/lib/euclid3/lib:$UCVM_WEB_INSTALL_PATH/lib/proj-5/lib:$LD_LIBRARY_PATH
  else
    export LD_LIBRARY_PATH=$UCVM_WEB_INSTALL_PATH/lib/euclid3/lib:$UCVM_WEB_INSTALL_PATH/lib/proj-5/lib
fi

## setup python script
if [ $PYTHONPATH ] ; then 
  export PYTHONPATH=$PYTHONPATH:$UCVM_WEB_INSTALL_PATH/utilities/pycvm
  else
     export PYTHONPATH=$UCVM_WEB_INSTALL_PATH/utilities/pycvm
fi

export DYLD_LIBRARY_PATH=$UCVM_WEB_INSTALL_PATH/lib/euclid3/lib:$UCVM_WEB_INSTALL_PATH/lib/proj-5/lib

if [ $PATH ] ; then
  export PATH=$UCVM_WEB_INSTALL_PATH/bin:$PATH
  else
    export PATH=$UCVM_WEB_INSTALL_PATH/bin
fi

export PATH=$ANACONDA2/bin:$PATH
