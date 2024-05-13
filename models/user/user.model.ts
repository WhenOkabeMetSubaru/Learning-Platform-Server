const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        min: [5, "Name is too short"],
        max: [30]
    },
    email: {
        type: String,
        unique: '{VALUE} - Email already exists',
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    hashed_password: {
        type: String
    },
    mobile: {
        type: String,
        validate: {
            validator: function (number:string) {
                return number.includes('+91');
            },
            message: (props:any) => `${props.value} is not a valid phone number!`
        }
    },
    user_type: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
   

})


UserSchema
    .virtual('password')
    .set(function (password:string) {
        this._password = password;
        console.log("pass", this.encryptPassword(password))
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })
UserSchema.methods = {
    authenticate: function (plainText:string) {
        return bcrypt.compareSync(plainText, this.hashed_password)
    },
    encryptPassword: function (password:string) {
        if (!password) return ''
        try {

            return bcrypt.hashSync(password, 10)
        } catch (err:any) {
            return err.message
        }
    }
}
UserSchema.path('hashed_password').validate(function (v:any) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }
}, null)
const User= mongoose.model('User', UserSchema);

export default User;