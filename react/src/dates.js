// apparently format will crash in firefox if we use the year 11111
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