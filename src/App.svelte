<script>
  import initSqlJs from "sql.js";
  import { onMount } from "svelte";
  import Post from "./lib/Post.svelte";
  let safari = null;
  let posts = [];
  onMount(async () => {
    safari = navigator.vendor && navigator.vendor.indexOf("Apple") > -1;

    let config = {
      locateFile: (file) =>
        `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/${file}`,
    };
    const SQL = await initSqlJs(config);
    const dbFetch = await fetch("posts.db");
    const arrayBuffer = await dbFetch.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    var db = new SQL.Database(uint8Array);
    posts = await db
      .exec("select * from posts order by rowid desc")
      .map((x) => x.values);
    console.log(posts);
  });
</script>

<div id="main">
  <h1>All donations to Albassort are appreciated!</h1>
  {#if safari == false}
    <table id="non-safari">
      <thead>
        <tr>
          <th>
            <img src="sol.svg" alt="SOL" />
          </th>
          <th>
            <img src="xmr.svg" alt="XMR" />
          </th>
          <th>
            <img src="btc.svg" alt="BTC" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p1 class="address">7bDNtw9moFLfVoqtpAamKZ53VLAuVoJTzWBxZ4YVe2r6</p1
            >
          </td>
          <td>
            <p1 class="address">
              44KDNVNeySuNDZAHLYiqGS2qA9zYA6MUmDqEvutqSQAxYbWwDrFYRFFYCZVM3Q4jZSMuj7j9t1vDd6M3BjqFBTMe82zdF7m
            </p1>
          </td>
          <td>
            <p1 class="address">bc1q9mqtcfttspjfz5knkydja6vpa97khpy800c3k3</p1>
          </td>
        </tr>
      </tbody>
    </table>
  {:else if safari == true}
    <div id="safari">
      <div class="safari-box">
        <img src="sol.svg" alt="SOL" />
        <p1 class="address">7bDNtw9moFLfVoqtpAamKZ53VLAuVoJTzWBxZ4YVe2r6</p1>
      </div>
      <div class="safari-box">
        <img src="xmr.svg" alt="xmr" />
        <p1 class="address">
          44KDNVNeySuNDZAHLYiqGS2qA9zYA6MUmDqEvutqSQAxYbWwDrFYRFFYCZVM3Q4jZSMuj7j9t1vDd6M3BjqFBTMe82zdF7m
        </p1>
      </div>

      <div class="safari-box">
        <img src="btc.svg" alt="btc" />
        <p1 class="address">bc1q9mqtcfttspjfz5knkydja6vpa97khpy800c3k3</p1>
      </div>
    </div>
  {/if}
  <div></div>
  <h1>Contacts</h1>
  <table id="socials">
    <thead>
      <tr>
        <th>
          <h2>Blusky</h2>
        </th>
        <th>
          <h2>Discord</h2>
        </th>
        <th>
          <h2>Email</h2>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <p1> @albassort </p1>
        </td>
        <td>
          <p1> albassort </p1>
        </td>
        <td>
          <p1>contact@albassort.com</p1>
        </td>
      </tr>
    </tbody>
  </table>
  <h1 style="text-align:  left;">Posts</h1>
  <div id="posts">
    {#each posts[0] as post}
      <Post postData={post}></Post>
    {/each}
  </div>
</div>

<style>
  #main {
    min-height: 100vh;
    display: flex;
    text-align: center;
    justify-content: center;
    color: white;
    gap: 50px;
    flex-direction: column;
    margin-left: 10vw;
    margin-right: 10vw;
    min-width: 300px;
  }
  .address {
    word-break: break-all;
  }
  img {
    height: 33%;
    width: 33%;
    margin: 0px;
    padding: 0px;
    margin-left: auto;
    margin-right: auto;
  }
  p1 {
    font-size: 25px;
    font-weight: bold;
  }
  td {
    width: 33%;
  }

  #safari {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 50px;
  }

  .safari-box {
    display: flex;
    flex-direction: column;
    width: 300px;
    justify-self: center;
    margin-left: auto;
    margin-right: auto;
    gap: 30px;
  }
  table {
    border-spacing: 20px;
    margin-left: auto;
    margin-right: auto;
  }
  #posts {
    border-top: 1px dashed coral;
    margin-bottom: 5%;
  }
  :global(*) {
    word-break: break-word;
  }
  :global(a:visited){
    color : #CBB2AA
  }

  :global(a:link){
    color : #CBB2AA
  }
  
 
</style>
