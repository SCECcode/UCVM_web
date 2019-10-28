#!/bin/bash

export TOP_UCVM_DIR=`pwd`

chmod og+rw $TOP_UCVM_DIR/web/result

export UCVM_SRC_PATH=$TOP_UCVM_DIR/model/UCVMC
export UCVM_INSTALL_PATH=$TOP_UCVM_DIR/web/model/UCVMC_TARGET

if [ $LD_LIBRARY_PATH ] ; then
  export LD_LIBRARY_PATH=$UCVM_INSTALL_PATH/lib/euclid3/lib:$UCVM_INSTALL_PATH/lib/proj-5/lib:$LD_LIBRARY_PATH
  else
    export LD_LIBRARY_PATH=$UCVM_INSTALL_PATH/lib/euclid3/lib:$UCVM_INSTALL_PATH/lib/proj-5/lib
fi

## setup python script
if [ $PYTHONPATH ] ; then 
  export PYTHONPATH=$PYTHONPATH:$UCVM_INSTALL_PATH/utilities/pycvm
  else
     export PYTHONPATH=$UCVM_INSTALL_PATH/utilities/pycvm
fi

export DYLD_LIBRARY_PATH=$UCVM_INSTALL_PATH/lib/euclid3/lib:$UCVM_INSTALL_PATH/lib/proj-5/lib

if [ $PATH ] ; then
  export PATH=$UCVM_INSTALL_PATH/bin:$PATH
  else
    export LD_LIBRARY_PATH=$UCVM_INSTALL_PATH
fi

