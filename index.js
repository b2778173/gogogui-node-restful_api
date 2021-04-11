const colors = require('colors');
const cors = require('cors');
const app = require('./routes');
const mongoDB = require('./db/index');
require('dotenv').config();

mongoDB();

app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT || 5000, () => {
    console.log('\x1b[42m', '\x1b[30msuccess \x1b[0m', `${app.get('env')} Server has started.`);
    console.log(colors.blue(`listening on port ${PORT}...`));
});