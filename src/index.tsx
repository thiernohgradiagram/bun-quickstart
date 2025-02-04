import { Hono } from 'hono'
import { html } from "hono/html";

const app = new Hono()
const port = process.env["PORT"] || 3000;

app.get('/', (c) => c.text(
  "Welcome to senitechnology.com / We are an African Tech company based in Dakar, Senegal."
))


const Footer = () => html`
  <footer>
    <p>© 2025 MameThierno Gadiaga</p>
  </footer>
`

app.get('/:name', (context) => {
  const { name } = context.req.param()

  const greeting = html`
    <h1>Hello ${name}</h1>
  `
  
  return context.html(`
    <html>
      <head>
        <title>Bun! Hono! Htmx! Mongo!</title>
      </head>
      <body>
        ${greeting}
      </body>
      ${<Footer/>}
    </html>
  `)
})

console.log(`Listening on http://localhost:${port} ...`);
console.log("Bun version ", Bun.version);

export default {
  port: port,
  fetch: app.fetch
}