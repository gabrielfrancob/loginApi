import User from "../models/User";

// tipar
const getUserById = async (req: any, res: any) => {
  const { id } = req.params;
  // o segundo parâmetro serve para excluir o campo senha do retorno
  const usuario = await User.findById(id, "-senha");

  if (!usuario)
    res
      .status(404)
      .json({ msg: "Usuário não encontrado.", status: res.statusCode });

  res.status(200).json({ usuario, status: res.statusCode });
};

const UserController = { getUserById };
export default UserController;
