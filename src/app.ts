import { SQL } from "bun";

const db = new SQL(process.env.DATABASE_URL!, {
  allowPublicKeyRetrieval: true,
});

Bun.serve({
  port: 3000,
  async fetch() {
    try {
      const [result] = await db`SELECT DATABASE() AS name`;

      return new Response(
        `
        <html>
          <head>
            <title>Mi App</title>
          </head>
          <body>
            <h1>Hola mundo</h1>
            <p>Conectado a MySQL: ${result.name}</p>
          </body>
        </html>`,
        { headers: { "Content-Type": "text/html; charset=utf-8" } },
      );
    } catch (error) {
      console.error("Error de MySQL:", error);
      return new Response("Error de conexion con MySQL", { status: 500 });
    }
  },
});

console.log("Servidor disponible en http://localhost:3000");
