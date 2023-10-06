<script>
  import TodoList from "./components/todoList.svelte";
  let isProd = location.hostname !== "localhost";
  let cssPath = isProd ? "/output.css" : "/dist/output.css";
</script>

<svelte:head>
  <link href="{cssPath}" rel="stylesheet" />
  console.log(`🚀 ~ file: App.svelte:9 ~ cssPath:`, cssPath)
</svelte:head>

<main class="w-screen p-0 h-full  bg-white bg-gradient-to-br from-blue-200 to-purple-200">
  <TodoList  />

</main>

<style>
      :global(#app) {
      height: 100vh;
      width: 100vw;
    }
</style>