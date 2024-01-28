const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
  },
  matricula: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
});

module.exports = User;
