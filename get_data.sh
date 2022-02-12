#!/usr/bin/env sh

# url="https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?antall=100&kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001"
# url="https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata"
url="https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata"
url2="https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kommune=5001&segmentering=true&kartutsnitt=270153.519%2C7040213.023%2C270332.114%2C7040444.864&start=y24ZxsYwSnFtMRE5xh2YtZAiueVFCaFkvsjeJ3YMBPKp4Zw5phVZn4CWSFZLtA5f8cwDDMUNA7wZtDaY8cwYstuJtnUKjNK4R2&inkluder=metadata"

curl -sLH "Accept: application/json" $url2 | jq
