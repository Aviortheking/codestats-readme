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
