const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

personSchema.pre('save', async function(next) {
    const person = this;
    if(!person.isModified('password')) return  next();
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10);
        
        // hash password
        const hashedPassword = await bcrypt.hashedPassword(person.password, salt);

        // override the plain password
        person.password = hashedPassword;
        next();
    } catch {
        return next(err);
    }
})

// Create Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;