"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    // constructor({ name, email, hashed_password, mobile, location, user_type }:UserClassConstructorParams) {
    //     this.name = name;
    //     this.email = email;
    //     this.hashed_password = hashed_password;
    //     this.mobile = mobile;
    //     this.location = location;
    //     this.user_type  = user_type
    // }
    constructor() {
    }
    setID(_id) {
        this._id = _id;
    }
    setName(name) {
        this.name = name;
    }
    setEmail(email) {
        this.email = email;
    }
    setPassword(password) {
        this.hashed_password = password;
    }
    setMobile(mobile) {
        this.mobile = mobile;
    }
    setLocation(location) {
        this.location = location;
    }
    setUserType(user_type) {
        this.user_type = user_type;
    }
    getID() { return this._id; }
    getName() { return this.name; }
    ;
    getEmail() { return this.email; }
    ;
    getPassword() { return this.hashed_password; }
    ;
    getMobile() { return this.mobile; }
    ;
    getLocation() { return this.location; }
    ;
    getUserType() { return this.user_type; }
    ;
}
exports.User = User;
