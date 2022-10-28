import S from 'sanctuary'

const formatNorwegianDateWithTime = new Intl.DateTimeFormat ('no-NO', { dateStyle: 'long', timeStyle: 'medium' }).format
const formatNorwegianDate = new Intl.DateTimeFormat ('no-NO', { dateStyle: 'short' }).format

//    safeFormatDate :: (a -> String) -> Maybe a -> String
const safeFormatDate = S.maybe ('')

//    createDate :: a -> Maybe Date
const createDate = S.compose (S.parseDate)
                             (x => x == null ? '' : x)

export {
  formatNorwegianDateWithTime,
  formatNorwegianDate,
  safeFormatDate,
  createDate
}


/*** Tests ***/
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it ('createDate', () => {
    expect (createDate ('2016-03-17')).toStrictEqual (S.Just (new Date ('2016-03-17')))
    expect (createDate (undefined)).toBe (S.Nothing)
    expect (createDate ('not a date')).toBe (S.Nothing)
  })

  it ('format dates', () => {
    const formatDate = safeFormatDate (formatNorwegianDate)
    const formatDateTime = safeFormatDate (formatNorwegianDateWithTime)
    const date = createDate ('2018-05-30T14:57:31')
    const antiDate = createDate (undefined)

    expect (formatDate (date)).toBe ('30.05.2018')
    expect (formatDate (antiDate)).toBe ('')

    expect (formatDateTime (date)).toBe ('30. mai 2018 kl. 14:57:31')
    expect (formatDateTime (antiDate)).toBe ('')
  })
}
