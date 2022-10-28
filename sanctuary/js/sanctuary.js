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

export { S, F }
