import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import fs from 'fs';
import initSqlJs from "sql.js"
import assert from 'assert';

async function compilePosts() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  const schema = fs.readFileSync("./schema.sql", { encoding: "utf8" })
  db.run(schema)

  const files = fs.readdirSync("./posts/");
  files.forEach(file => {
    const filedata = fs.readFileSync(`./posts/${file}`, { encoding: "utf8" })
    const split = filedata.split("!---")
    const jsonData = split[0]
    const body = split[1]
    const json = JSON.parse(jsonData)
    const id = json.id
    const time = json.time
    const title = json.title

    //required fields
    assert(id != null)
    assert(time != null)
    assert(title != null)
    assert(json != null)
    assert(body != null)

    db.run("INSERT INTO posts(rowid, title, time, metadata, body) values (?, ?, ?, ?, ?);",
      [id, title, time, jsonData, body]
    )
  })

  const out = db.export()
  fs.writeFileSync("./dist/posts.db", out)
};

export default defineConfig({
  plugins: [,
    {
      name: "Generate Db",
      closeBundle() {
        compilePosts()
      }
    },
    svelte()
  ],
})
