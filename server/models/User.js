const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Import journalSchema
const { journalSchema } = require("./Journal");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
password: {
    type: String,
    required: true,
    validate: {
        validator: function(v) {
            // At least 8 characters long
            const lengthCheck = v.length >= 8;

            // At least one uppercase letter
            const uppercaseCheck = /[A-Z]/.test(v);

            // At least one lowercase letter
            const lowercaseCheck = /[a-z]/.test(v);

            // At least one digit
            const digitCheck = /\d/.test(v);

            // At least one special character
            const specialCharCheck = /[\W_]/.test(v);

            return lengthCheck && uppercaseCheck && lowercaseCheck && digitCheck && specialCharCheck;
        },
        message: props => 'Password validation failed!'
    }
},

    avatar: {
      type: String,
      default: "/img/avatar/1.webp",
    },
    journals: [{type: Schema.Types.ObjectId, ref: "Journal"}],
    premium: {
      type: Boolean,
      default: false, 
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `journalCount` with the number of saved journals we have
userSchema.virtual("journalCount").get(function () {
  return this.journals.length;
});

const User = model("User", userSchema);

module.exports = User;