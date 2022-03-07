// bring in mongoose
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


// This is where we make our model
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    }, {timestamps: true});

// Confirm Password. Use of virtual keyword https://mongoosejs.com/docs/tutorials/virtuals.html
UserSchema.virtual('confirmPassword')
    .get( () => this.confirmPassword )
    .set( value => this.confirmPassword = value );

// Use of pre hook to compare password versus confirmpassword https://mongoosejs.com/docs/middleware.html#pre
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
    });

// bcrypt hashing of password
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
    });

// Finalize setting up my model
const User = mongoose.model("User", UserSchema);
// We need to export this to other areas of my project
module.exports = User;
