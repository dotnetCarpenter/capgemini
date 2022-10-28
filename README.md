# Capgemini

1. [Vanilla js solution](https://dotnetcarpenter.github.io/capgemini/vanilla/)
1. [React solution](https://dotnetcarpenter.github.io/capgemini/react/)
1. [Sanctuary solution](https://dotnetcarpenter.github.io/capgemini/sanctuary/)


## Development

1. `cd [solution name]`
2. `npm i`
3. `npm run dev`


## Endpoint API

Dokumentasjon: https://nvdbapiles-v3.atlas.vegvesen.no/dokumentasjon/

Eksempel klient: https://github.com/nvdb-vegdata/nvdb-api-client

When using the provided URI
`https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata`
, we get back 4 speed bump objects.
The [API] supports pagination with the query parameter `antall` but it
appears that our dataset only contains 4 records so the parameter makes
no difference.

The result looks a kind to this:

```json
{
	"objekter": [{...},{...},{...},{...}],
	"metadata": {
		"antall": 4,
		"returnert": 4,
		"sidestørrelse": 800,
		"neste": {
			"start": "y24ZxsYwSnFtMRE5xh...",
			"href": "https://nvdbapiles-v3...start=y24ZxsYwSnFtMRE5xh..."
		}
	}
}
```

Setting `antall=20` will return the same but with `"sidestørrelse": 20,`.
If we follow the link to the next page, we will get an empty result set:

```json
{
  "objekter": [],
  "metadata": {
    "antall": 4,
    "returnert": 0,
    "sidestørrelse": 800,
		"neste": {
			"start": "y24ZxsYwSnFtMRE5xh...",
			"href": "https://nvdbapiles-v3...start=y24ZxsYwSnFtMRE5xh..."
		}
  }
}
```

See `get_data.sh` for a quick comparison of request and result.

## doT

[doT]'s documentation is very scarce. The best examples I have found is https://github.com/olado/doT/blob/master/examples/advancedsnippet.txt.

## animated-tailwindcss

There seem to be a bug in the animations where they do not start at the center of the page, as expected.
I suspect there is a difference in how the same animation is defined in [animated-tailwindcss] vs
[animate.css].


[doT]: https://github.com/olado/doT
[API]: https://nvdbapiles-v3.atlas.vegvesen.no/dokumentasjon/
[animated-tailwindcss]: https://github.com/ikcb/animated-tailwindcss
[animate.css]: https://github.com/animate-css/animate.css
