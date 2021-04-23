const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    polls: [{type: Schema.Types.ObjectId, ref: 'Poll'}]
});

userSchema.pre('save', async function(next){
    try {

        if (!this.isModified('password')) {
            return next();
        }

        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        return next();
    } catch (err) {
        console.log(err)
        return next(err)
    }
});

userSchema.methods.comparePasswords = async function (attempt, next){
    try {
        // console.log('attemp: ', attempt);
        // console.log('this.password: ', this.password);
        return await bcrypt.compare(attempt, this.password);
        // here attempt is : username

    } catch(err) {
        next(err);
    }
}

module.exports = model('User', userSchema);