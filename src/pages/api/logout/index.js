import { parse, serialize } from "cookie";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default function handler(req, res) {
  // Obtén todas las cookies de la solicitud del usuario
  const cookies = parse(req.headers.cookie || "");
  // Elimina cada cookie existente
  for (const cookieName in cookies) {
    // Configura la cookie para que expire inmediatamente (0 segundos)
    console.log(cookieName)
    res.setHeader(
      "Set-Cookie",
      serialize(cookieName, "", {
        expires: new Date(0),
        path: "/",
      })
    );
  }
  // Redirige al usuario a la página principal ("/")
  res.writeHead(302, { Location: "/" });
  res.end();
}
