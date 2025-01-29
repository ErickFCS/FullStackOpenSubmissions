import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
    username: String,
    favoriteGenre: String
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('user', userSchema)

export default User