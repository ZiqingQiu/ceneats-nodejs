// require modules for our User Model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "Centennial Id is required"
    },
    email: {
      type: String,
      default: "",
      trim: true,
      required: "Email is required"
    },    
    /* taken out because password will be encrypted by passport-local-mongoose
    password: {
        type: String,
        default: '',
        trim: true,
        required: 'password is required'
    }
    */
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: "Display Name is required"
    },
    accountType: {
      type: String,
      default: "",  //Student, Faculty, Restaurant, Admin
      trim: true,
      required: "Account Type is required"
    }
  },
  {
    collection: "users"
  }
);

// configure options for the UserSchema

let options = ({
    missingPasswordError: "Wrong / Missing Password"
});

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', userSchema);
