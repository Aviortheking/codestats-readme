export interface CodeStatsResponse {
	user: string
	error?: string
	total_xp: number
	new_xp: number
	machines: Record<string, {
		xps: number
		new_xps: number
	}>
	languages: Record<string, {
		xps: number
		new_xps: number
	}>
	dates: Record<string, number>
}

export interface CodeStatsHistoryGraph {
	data: {
		profile: {
			day_language_xps: Array<{
				xp: number,
				language: string
				date: string
			}>
		}
	}
	errors?: Array<{
		message: string
	}>
}

export interface Profile {
	username: string
	xp: number
	recentXp: number
	level: number
}

export interface TopLanguages {
	username: string
	langs: Array<TopLanguage>
}

export interface TopLanguage {
	xp: number
	recentXp: number
	color: string
	name: string
	level: number
}
