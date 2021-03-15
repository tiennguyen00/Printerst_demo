import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String }
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema)