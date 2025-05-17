# Donate To Albassort

This is a donations page. This is implemented with Vite, Svelte, sql.js (and therefor sqlite).

All of the posts / updates are in ./posts, these posts have a custom header which looks like this:

```md 
{
  "id" : 1,
  "time" : DD-MM-YYYYTHH:MM:SS,
  "title" : "Hello, World"
}
!---
# Body 
```
These are then put into a database when `$: npm run build` is ran, according to ./schema.sql. This makes distribution easier,  and allows for many posts over a long time to be searched / ordered quickly by all browsers. I can even add FTS5 to allow for token searching, should this become necessary in the future.

