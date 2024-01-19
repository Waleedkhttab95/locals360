#!/bin/bash

cd ..

zip -r locals360.zip . -x "scripts/*" -x "node_modules/*" -x "dist/*"