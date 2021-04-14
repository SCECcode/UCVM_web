#!/bin/bash

export TOP_DIR=`pwd`
export TOP_UCVM_WEB_DIR=$TOP_DIR/web

export ANACONDA2=/usr/local/share/anaconda2

export UCVM_SRC_PATH=$TOP_DIR/model/UCVMC
export UCVM_INSTALL_PATH=$TOP_DIR/web/model/UCVMC_TARGET
export UCVM_WEB_INSTALL_PATH=$TOP_UCVM_WEB_DIR/model/UCVMC_TARGET

source $UCVM_WEB_INSTALL_PATH/conf/ucvm_env.sh

export PATH=$ANACONDA2/bin:$PATH
