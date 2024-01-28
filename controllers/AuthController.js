const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { email, matricula, senha } = req.body;
  if (!email || !matricula || !senha) {
    return res
      .status(400)
      .json({ msg: "Forneça os dados.", status: res.statusCode });
  }
  if (!matricula.includes("BCC")) {
    return res
      .status(400)
      .json({ msg: "Matrícula inválida.", status: res.statusCode });
  }

  const userExists = await User.findOne({ email });

  if (userExists)
    return res
      .status(400)
      .json({ msg: "Email já cadastrado.", status: res.statusCode });

  const salt = await bcrypt.genSalt(12);
  const senhaHash = await bcrypt.hash(senha, salt);

  const user = new User({
    email,
    matricula,
    senha: senhaHash,
  });

  try {
    await user.save();

    return res
      .status(201)
      .json({ msg: "Usuário criado com sucesso.", status: res.statusCode });
  } catch (err) {
    return res.status(400).json({
      msg: "Erro do servidor, tente novamete mais tarde",
      status: res.statusCode,
    });
  }
}

async function loginUser(req, res) {
  const { email, senha } = req.body;
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!senha) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  const usuario = await User.findOne({ email: email });

  if (!usuario)
    return res
      .status(400)
      .json({ msg: "Usuário não encontrado.", status: res.statusCode });

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta)
    return res
      .status(400)
      .json({ msg: "Senha incorreta.", status: res.statusCode });

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign({ id: usuario._id }, secret, { expiresIn: 3600 });

    return res.status(200).json({
      msg: "Autenticação realizada com sucesso!",
      token,
      status: res.statusCode,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Erro do servidor, tente novamete mais tarde",
      status: res.statusCode,
    });
  }
}

module.exports = { registerUser, loginUser };
