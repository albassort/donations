<script>
  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
  export let postData = [];
  function renderMD(node) {
    let body = postData[3];
    node.innerHTML = marked.parse(body);
  }
</script>

<div class="post">
  <div class="header">
    <h2 class="title">{postData[0]}</h2>
    <h2 class="time">{postData[1]}</h2>
  </div>

  <div class="body" use:renderMD></div>
</div>

<style>
  .post {
    text-align: left;
  }
  .body {
    margin-left: 7%;
    font-size: 0.8rem;
    max-width: 65%;
  }
  :global(.body p) {
    font-size: 0.9rem;
  }
  :global(.body ul) {
    font-size: 0.9rem;
  }

  .header {
    display: flex;
    gap: 10%;
  }
  .title {
    width: 50%;
    overflow-x: scroll;
  }
</style>
