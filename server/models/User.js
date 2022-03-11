const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //https://www.npmjs.com/package/bcrypt
const saltRounds = 10;
const jwt = require("jsonwebtoken"); //https://www.npmjs.com/package/jsonwebtoken

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  id: {
    type: String,
    trim: true,
    unique: 1,
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
  organization: {
    type: String,
    maxlength: 50,
  },
  gender: {
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
  const user = this;
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
  const user = this;
  // jsonwebtoken을 이용해서 token을 생성
  const token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  // 토큰 복호화
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저아이디를 이용해서 유절르 찾고 클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
