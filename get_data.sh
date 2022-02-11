#!/usr/bin/env sh

url="https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata"

curl -sLH "Accept: application/json" $url | jq
