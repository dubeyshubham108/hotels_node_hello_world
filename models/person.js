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
        unique: false
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
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // override the plain password
        person.password = hashedPassword;
        next();
    } catch(err) {
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

// Create Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;