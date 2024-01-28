import jwt from "jsonwebtoken";

// tipar
function checkToken(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ msg: "Acesso negado.", status: res.statusCode });

  try {
    // tipar
    const secret: any = process.env.SECRET;

    jwt.verify(token, secret);

    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "Token inválido.", status: res.statusCode });
  }
}

const AuthMiddleware = { checkToken };
export default AuthMiddleware;
