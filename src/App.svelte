<script>
  import TodoList from "./components/todoList.svelte";
  let isProd = location.hostname !== "localhost";
  console.log(`🚀 ~ file: App.svelte:4 ~ location.hostname:`, location.hostname)
  let cssPath = isProd ? "./output.css" : "/public/output.css";
  console.log(`🚀 ~ file: App.svelte:6 ~ cssPath:`, cssPath)
</script>

<svelte:head>
  <link href="{cssPath}" rel="stylesheet" />
</svelte:head>

<main class="w-full p-0 h-full  bg-white bg-gradient-to-br from-blue-200 to-purple-200">
  <TodoList  />

</main>

<style>
      :global(#app) {
      height: 100vh;
      width: 100%;
    }
</style>