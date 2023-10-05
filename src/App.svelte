<script>
  import TodoList from "./components/todoList.svelte";
  
</script>

<svelte:head>
  <link href="output.css" rel="stylesheet" />
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