import mongoose from "mongoose";

const User = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
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

export default mongoose.model("User", User);
