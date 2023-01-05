const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "myprivatekey";

function generateAuthToken(user) {
  const token = jwt.sign({ data: user }, PRIVATE_KEY, {
    expiresIn: "60s",
  });
  return token;
}
function auth(req, res, next) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"] || "";

  if (!authHeader) {
    return res
      .status(401)
      .json({
        error: "not authenticated",
        detail: "No se encontro token de autorizacion",
      });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "not authenticated", detail: "Formato token invalido" });
  }
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({
        error: "not authorized",
        detail: "acceso denegado al recurso solicitado",
      });
  }
  next();
}
module.exports = {
  generateAuthToken,
  auth,
};
