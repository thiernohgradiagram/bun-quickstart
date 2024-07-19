import figlet from "figlet";
import fs from 'fs';

const server = Bun.serve({
    port: 3000,   // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
    hostname: "localhost", // defaults to "0.0.0.0"
    //unix: "/path/to/socket.sock", // to listen on a unix domain socket: https://en.wikipedia.org/wiki/Unix_domain_socket 
    development: true,

    fetch(req: Request) {
      const url = new URL(req.url);
      let body: string | undefined;
      if (url.pathname === "/") body = figlet.textSync("Welcome")
      else if (url.pathname === "/thierno") body = figlet.textSync("Welcome Thierno")
      else if (url.pathname === "/notes") return new Response(Bun.file("./notes.txt"))
      else if (url.pathname === "/midaadi") return new Response(Bun.file("./midaadi.mp4"))
      else throw new Error("404!");
      return new Response(body);
    },
    error(error) {
      return new Response(`<pre>${error}\n${error.stack}</pre>`, {
        headers: {
          "Content-Type": "text/html",
        },
      });
    },
    tls: {
      
      //key: Bun.file("./key.pem"), // BunFile
      //cert: Bun.file("./cert.pem"),
      //key|cert: fs.readFileSync("./key|cert.pem"), // Buffer
      //key|cert: fs.readFileSync("./key|cert.pem", "utf8"), // string
      //key|cert: [Bun.file("./key1|cert1.pem"), Bun.file("./key2|cert2.pem")], // array of above
      //ca: Bun.file("./ca.pem"),
      //passphrase: "my-secret-passphrase",
      //dhParamsFile: "/path/to/dhparams.pem", // To override Diffie-Hellman parameters

    },
    //maxRequestBodySize: 0,
    //lowMemoryMode: false
  });
  //server.stop(); why the fuck would i want this?
  
console.log(`Listening on http://localhost:${server.port} ...`);
console.log("Bun version ", Bun.version);