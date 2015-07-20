#!/bin/bash
echo 'Installing local Node dependencies'
npm install
echo 'Installing local bower dependencies'
bower install
python -m SimpleHTTPServer

