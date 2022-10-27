const formatNorwegianDateWithTime = new Intl.DateTimeFormat ('no-NO', { dateStyle: 'long', timeStyle: 'medium' }).format
const formatNorwegianDate = new Intl.DateTimeFormat ('no-NO', { dateStyle: 'short' }).format

const safeFormatDate = formatter => date => {
  if (date == null) return null

  return formatter (date)
}

// see https://github.com/js-temporal/proposal-temporal-v2/issues/22 for a proposal to validate dateString
const createDate = dateString => {
  try {
    if (dateString == null) throw new TypeError ('Invalid Date')

    return new Date (dateString)
  } catch (e) {
      console.error (e)
      return null
  }
}

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
    expect (createDate ('2016-03-17')).toStrictEqual (new Date ('2016-03-17'))
    expect (createDate ()).toBe (null)
    expect (isNaN (createDate ('not a date'))).toBe (true)

    // below is a bug in V8 - the date is invalid and should produce NaN
    expect (isNaN (createDate ('2021-02-30'))).toBe (false)
  })

  it ('format dates', () => {
    const formatDate = safeFormatDate (formatNorwegianDate)
    const formatDateTime = safeFormatDate (formatNorwegianDateWithTime)
    const date = new Date ('2018-05-30T14:57:31')

    expect (formatDate (date)).toBe ('30.05.2018')
    expect (formatDateTime (date)).toBe ('30. mai 2018 kl. 14:57:31')
  })
}
