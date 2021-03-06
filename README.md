# Capgemini

1. [Vanilla js solution](https://dotnetcarpenter.github.io/capgemini/vanilla/)
1. [React solution](https://dotnetcarpenter.github.io/capgemini/react/)

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
+ 20:00-22:10: Design registration page according to wireframe and assignment
+ 22:20-22:30: Small fixed for registration
+ 22:45-23:00: Put on github pages
+ 23:30-00:50: Scaffolding React app
</details>

<details>
<summary>14.02.2022</summary>

+ 01:30-01:35: Fix CSS in react to work with new HTML structure
+ 01:50-02:50: Implement registration page according to assignment PART I
+ 03:20-06:30: Implement registration page according to assignment PART II
+ 06:30-06:50: Put react app on github pages
+ 07:10-08:30: Implement overview page according to assignment
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
		"sidest??rrelse": 800,
		"neste": {
			"start": "y24ZxsYwSnFtMRE5xh...",
			"href": "https://nvdbapiles-v3...start=y24ZxsYwSnFtMRE5xh..."
		}
	}
}
```

Setting `antall=20` will return the same but with `"sidest??rrelse": 20,`.
If we follow the link to the next page, we will get an empty result set:

```json
{
  "objekter": [],
  "metadata": {
    "antall": 4,
    "returnert": 0,
    "sidest??rrelse": 800,
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
