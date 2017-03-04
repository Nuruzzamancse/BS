var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var schema = new Schema({
    studentName: {
        type: String,
        required: true
    },
    studentMobile: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('pendingMember', schema);