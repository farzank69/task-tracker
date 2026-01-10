const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'Email is required'], 
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false,
    },
    name: {
        type: String,
        trim: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    }

}, {timestamps: true})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bycrypt.genSalt(10);
        this.password = await bycrypt.hash(this.password, salt);
        next();
    } catch(err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        return await bycrypt.compare(candidatePassword, this.password);
    } catch(error) {
        throw new Error(error);
    }
};

userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
}

const User = mongoose.model("User", userSchema);

module.exports = User;