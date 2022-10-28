import { S, F } from './sanctuary.js'

//    get :: StrMap -> Future a b
const get = config => (
  F.attemptP (() => fetch (config.resource, config))
  .pipe (S.chain (S.ifElse (response => response.ok)
                           (F.encaseP (response => response.json ()))
                           (F.reject)))
)

export { get }

/*** Tests ***/
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it ('Gets data from an end-point', async () => {
    expect.assertions(1)

    const resource = 'https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata'

    return new Promise ((resolve, reject) => {
      get ({resource, headers: {'Accept': 'application/vnd.vegvesen.nvdb-v3-rev1+json'}})
      .pipe (F.fork (reject)
                    (json => (expect (json).toBeTypeOf ('object'), resolve ())))
    })
  })
}
