import { request, CONSTANTS, getLevel, profileGraphRequest, CustomError, formatDateNumber, formatDate, getColorOfLanguage } from '../common/utils'
import retryer from '../common/retryer'
import { CodeStatsHistoryGraph, TopLanguages } from '../interfaces'

export async function fetchProfile(username: string) {
	if (!username) throw Error('Invalid Username')

	const response = await retryer(request, username)

	return {
		username,
		xp: response.total_xp,
		recentXp: response.new_xp,
		level: getLevel(response.total_xp)
	}
}

export async function fetchHistory(username: string, days: number) {
	if (!username) throw Error('Invalid Username')

	const date = new Date()
	date.setDate(date.getDate() - (days - 1))

	const body = `{
		profile(username: "${username}") {
			day_language_xps: dayLanguageXps(since: "${formatDate(date)}") {date language xp}
		}
	}`

	const response = await retryer<Promise<CodeStatsHistoryGraph>>(profileGraphRequest, body)
	if (response.errors) {
		throw new CustomError(response.errors[0].message, 'MAX_RETRY')
	}

	const result: Record<string /* Date */, Array<{
		xp: number
		language: string
	}>> = {}

	const languagesData: Record<string, number> = {}

	for (const data of response.data.profile.day_language_xps) {
		let day = result[data.date]
		if (!day) {
			day = []
		}
		day.push({
			xp: data.xp,
			language: data.language
		})
		if (data.language in languagesData) {
			languagesData[data.language] += data.xp
		} else {
			languagesData[data.language] = data.xp
		}

		result[data.date] = day
	}

	for (const key of Object.keys(result)) {
		const item = result[key]
		result[key] = item.sort((a, b) => languagesData[b.language] - languagesData[a.language])
	}

	const keys = Object.keys(result)

	for (const day of keys) {
		if (keys.indexOf(day) === 0 && day === formatDate(date)) {
			continue
		}
		const date2 = new Date(day)
		date2.setDate(date2.getDate() - 1)
		const oldDate = formatDate(date2)
		if (!(oldDate in result)) {
			result[oldDate] = []
		}

	}

	return Object.keys(result).map((el) => {
		return {
			data: result[el],
			day: el,
			total: result[el].reduce((prvs, crnt) => prvs + crnt.xp, 0)
		}
	}).sort((a, b) => a.day < b.day ? 1 : -1)


}

export async function fetchTopLanguages(username: string): Promise<TopLanguages> {
	if (!username) throw Error("Invalid username")

	let res = await retryer(request, username)

	const langs = res.languages

	const resp = Object.keys(langs)
		.map((key) => {
			const item = langs[key]
			return {
				xp: item.xps,
				recentXp: item.new_xps,
				color: getColorOfLanguage(key),
				name: key,
				level: getLevel(item.xps)
			}
		})
		.sort((a, b) => (b.xp + b.recentXp) - (a.xp + a.recentXp))

	return {
		username,
		langs: resp
	}
}
