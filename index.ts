import express from 'express'
import api from './api'
import history from './api/history'
import topLangs from './api/top-langs'

const app = express()


app.use('/api', api)
app.use('/api/history', history)
app.use('/api/top-langs', topLangs)

app.get('/', (_, res) => {
	res.redirect(301, 'https://github.com/aviortheking/codestats-readme')
})

app.listen(3000, () => {
	console.log('server launched!')
})
