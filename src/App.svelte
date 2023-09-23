<script>
  import Greet from './lib/Greet.svelte'
</script>

<svelte:head>
  <link href="/dist/output.css" rel="stylesheet">
</svelte:head>

<main class="container">
  <h1>Welcome to Tauri!</h1>

  <div class="row">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo vite" alt="Vite Logo" />
    </a>
    <a href="https://tauri.app" target="_blank">
      <img src="/tauri.svg" class="logo tauri" alt="Tauri Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank">
      <img src="/svelte.svg" class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Love life.</h1>

  <ul>
    <li class="bg-cyan-400 border-l-orange-600 text-3xl">Integrate TailwindCSS</li>
    <li>Make basic TODO app</li>
    <li>Integrate Pocketbase</li>
  </ul>



  <div class="row">
    <Greet />
  </div>

</main>

<style>
  .logo.vite:hover {
    filter: drop-shadow(0 0 2em #747bff);
  }

  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00);
  }
</style>
