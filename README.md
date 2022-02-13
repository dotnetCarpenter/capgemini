# Capgemini

1. [Vanilla js solution](./vanilla/dist/index.html)

Time spent:

<details>
<summary>12.02.2022</summary>

+ 11:45-13:15: Logo, favicon, tailwind colors
+ 14:10-14-20: Learning [doT]
+ 14:20-14:50: Setup [doT] with test data
+ 15:15-16:00: Fetch data from endpoint and tranform the data
+ 16:15-16:45: Found and read documentation and added error handling
+ 17:25-17:40: Documented [Endpoint API](#endpoint-api)
+ 17:45-18:35: HTML form
+ 19:10-19:40: Sort speed bumps by date
+ 19:40-20:30: Added basic router
+ 21:00-21:15: Use [doT] to add `<header>`
+ 21:15-22:30: Added page animation
</details>

<details>
<summary>13.02.2022</summary>

+ 13:15-14:20: Design overview page according to wireframe + added correct fonts
+ 14:45-15:45: Design header according to wireframe
+ 17:00-19:30: Design footer according to wireframe
</details>

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

[doT]: https://github.com/olado/doT
[API]: https://nvdbapiles-v3.atlas.vegvesen.no/dokumentasjon/
