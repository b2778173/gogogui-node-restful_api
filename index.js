const app = require('./routes');
const cors = require('cors')

app.use(cors())

const PORT = process.env.PORT || 5000
app.listen(PORT || 5000, () => {
  console.log('\x1b[42m', '\x1b[30msuccess \x1b[0m', `${app.get('env')} Server has started.`)
  console.log(`listening on port ${PORT}...`)
})