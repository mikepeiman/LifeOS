<script>
    import { onMount } from "svelte";
    // import Greet from "./lib/Greet.svelte";
    import {
      addTask,
      deleteTask,
      doLogin,
      loadTasks,
      toggleDone,
    } from "../lib/dbService.js";

    // import PocketBase from "pocketbase";
    let newTask = "";
    $: tasks = [];
    onMount(async () => {
      console.log("mounted");
      await doLogin();
      tasks = await loadTasks()
      console.log(`🚀 ~ file: todoList.svelte:20 ~ onMount ~ tasks:`, tasks)
      tasks.length === 0 ? await loadTasks()
      : defaultTasks;
    });
  
    async function handleAddTask() {
      tasks = await addTask(newTask);
      console.log(`🚀 ~ file: todoList.svelte:26 ~ handleAddTask ~ tasks:`, tasks)
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


<main class="container p-0 h-full w-full">
    <main
      class="bg-white pt-24 h-full w-screen bg-gradient-to-br from-blue-200 to-purple-200">
      <h1 class="text-3xl pb-4">Simple To-Do App</h1>
  
      <input
        class="p-2"
        bind:value={newTask}
        placeholder="Enter a new task..."
        on:keyup={(e) => e.key === "Enter" && handleAddTask()} />
      <button
        class="p-2 bg-white bg-gradient-to-br from-blue-500 to-purple-500 text-white"
        on:click={handleAddTask}>Add</button>
  
      <div class="flex w-full justify-center">
        <ul class="flex flex-col text-left gap-2 pt-12">

            {#each tasks as task (task.id)}
              <li
                class="border-b-2 border-blue-300 flex justify-between items-center">
                <div class="flex items-center space-x-2 pr-4">
                  <input
                    type="checkbox"
                    checked={task.done}
                    on:change={() => toggleDone(task.id)} />
                  <span class:done={task.done} class="pl-2">{task.taskName}</span>
                </div>
                <button
                  class="px-2 rounded-none bg-orange-100 self-end end"
                  on:click={() => deleteTask(task.id)}>Delete</button>
              </li>
            {/each}

        </ul>
      </div>
      <button class="p-2" on:click={doLogin}>Login</button>
    </main>
  </main>
  
  <style>
    :global(#app) {
      height: 100vh;
    }
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