const User = require("../models/User");

const getUserById = async (req, res) => {
  const { id } = req.params;
  // o segundo parâmetro serve para excluir o campo senha do retorno
  const usuario = await User.findById(id, "-senha");

  if (!usuario)
    res
      .status(404)
      .json({ msg: "Usuário não encontrado.", status: res.statusCode });

  res.status(200).json({ usuario, status: res.statusCode });
};

module.exports = getUserById;
