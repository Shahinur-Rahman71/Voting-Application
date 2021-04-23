const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/votingApplication', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('mongodb connected'))
  .catch( err => console.log(err))


module.exports.User = require('./user.model');
module.exports.Poll = require('./poll.model');