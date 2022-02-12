const formatNorwegianDateWithTime = new Intl.DateTimeFormat ('no-NO', { dateStyle: 'long', timeStyle: 'medium' }).format
const formatNorwegianDate = new Intl.DateTimeFormat ('no-NO', { dateStyle: 'short' }).format

const safeFormatDate = formatter => dateString => {
	if (dateString == null) return null

	return formatter (new Date (dateString))
}

export {
	formatNorwegianDateWithTime,
	formatNorwegianDate,
	safeFormatDate
}