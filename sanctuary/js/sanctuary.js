import sanctuary from 'sanctuary'
import $         from 'sanctuary-def'
import * as F    from 'fluture'
import { env  }  from 'fluture-sanctuary-types'

const $Response = $.NullaryType
  ('Response')
  ('https://devdocs.io/dom/response')
  ([])
  (x => toString.call (x) === '[object Response]')

const $HTMLFormControlsCollection = $.NullaryType
  ('HTMLFormControlsCollection')
  ('https://devdocs.io/dom/htmlformcontrolscollection')
  ([])
  (x => toString.call (x) === '[object HTMLFormControlsCollection]')

// [object HTMLFormControlsCollection

const S = sanctuary.create ({
  checkTypes: Boolean (import.meta.env.DEV),
  env: sanctuary.env.concat ([
    ...env,
    $Response,
    $HTMLFormControlsCollection,
  ])
})

/* v8 ignore next 3 */
// This is only meant for debugging
// print :: a -> a
const print = x => (console.debug (S.show (x)), x)

export { S, F, $, print }
