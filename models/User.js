const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //https://www.npmjs.com/package/bcrypt
const saltRounds = 10;
const jwt = require("jsonwebtoken"); //https://www.npmjs.com/package/jsonwebtoken

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//mongo메서드, 저장하기전에 비밀번호를 암호화
//salt를 이용해서 암호화, salt생성, saltRounds 10자리
userSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) return net(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 12345    암호화된 비밀번호 $2b$10$ecd9N/83HhOr8fERYA1UA.dcUdMRxlZUFZ.qvrhGzWrNTTfEx1xau
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // jsonwebtoken을 이용해서 token을 생성
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
