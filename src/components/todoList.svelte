<script>
  import { onMount } from "svelte";
  import TodoListInput from './todoListInput.svelte';
  import TodoListItem from './todoListItem.svelte';
  import {
    addTask,
    deleteTask,
    doLogin,
    loadTasks,
    toggleDone,
  } from "../lib/dbService.js";

  let newTask = "";
  let tasks = [];
  onMount(async () => {
      console.log("mounted");
      await doLogin();
      tasks = await loadTasks();
      console.log(`🚀 ~ file: todoList.svelte:20 ~ onMount ~ tasks:`, tasks);
      if (tasks.length === 0) {
          tasks = defaultTasks;
      }
  });

      
  async function handleDeleteTask(id) {
      tasks = await deleteTask(id);
  }


  async function handleAddTask() {
      tasks = await addTask(newTask);
      console.log(`🚀 ~ file: todoList.svelte:26 ~ handleAddTask ~ tasks:`, tasks);
      newTask = '';  // Clear the input after adding
  }

  let defaultTasks = [
      { id: 1, text: "Setup new Tauri-Svelte app", done: false },
      { id: 2, text: "Install and setup TailwindCSS", done: false },
      { id: 3, text: "Setup basic TODO app", done: false },
      { id: 4, text: "Setup localStorage persistence", done: false },
      { id: 5, text: "Setup pocketbase DB", done: false },
  ];

  $: localStorage.setItem("tasks", JSON.stringify(tasks));
</script>

<main class="h-full w-screen pt-24 flex flex-col items-center">
  <h1 class="text-3xl pb-4">Simple To-Do App</h1>

  <TodoListInput bind:newTask={newTask} {handleAddTask} />

  <div class="flex w-full justify-center">
      <ul class="flex flex-col text-left gap-2 pt-12">
          {#each tasks as task (task.id)}
              <TodoListItem {task} {toggleDone} {handleDeleteTask} />
          {/each}
      </ul>
  </div>

  <button class="p-2" on:click={doLogin}>Login</button>
</main>

<style>
  .logo.vite:hover {
    filter: drop-shadow(0 0 2em #747bff);
  }

  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00);
  }
  .done {
    text-decoration: line-through;
    color: green;
  }
</style>
