const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 25
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        emailConfermation: {
            type: Boolean,
            default: false
        },
        newAccount: {
            type: Boolean,
            default: true
        },
        userName: {
            type: String,
        },
        projects: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Project',
            default: []
        },
        singleTasks: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Task',
            default: []
        }
    },
    {
        timestamps: true
    }
)
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', UserSchema)
module.exports = { User }

