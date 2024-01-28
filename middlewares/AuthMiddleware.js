const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ msg: "Acesso negado.", status: res.statusCode });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "Token inválido.", status: res.statusCode });
  }
}

module.exports = checkToken;
