<script>
  import { onMount } from "svelte";
  import TodoListInput from "./todoListInput.svelte";
  import TodoListItem from "./todoListItem.svelte";
  import {
    addTask,
    deleteTask,
    doLogin,
    loadTasks,
    toggleDone,
  } from "../lib/dbService.js";
  import TodoListItemAction from "./todoListItemAction.svelte";

  let newTask = "";
  let tasks = [];
  let tasksFromDB = [];
  let testTask = {};
  $: console.log(`🚀 ~ file: todoList.svelte:18 ~ testTask:`, testTask)
  onMount(async () => {
    console.log("mounted");
    await doLogin();
    tasksFromDB = await loadTasks();
    tasks = loadTasksFromLocalStorage();
    console.log(`🚀 ~ file: todoList.svelte:20 ~ onMount ~ tasks:`, tasks);
    if (tasksFromDB.length > 0) {
      tasks = tasksFromDB;
      saveTasksToLocalStorage();
    }
    testTask = tasks[0];
    console.log(`🚀 ~ file: todoList.svelte:29 ~ onMount ~ testTask:`, testTask)
  });
  // a function to load tasks from localStorage if present
  function loadTasksFromLocalStorage() {
    return localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
  }

  // a function to save tasks to localStorage
  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  async function handleAddTask() {
    tasks = await addTask(newTask);
    console.log(
      `🚀 ~ file: todoList.svelte:26 ~ handleAddTask ~ tasks:`,
      tasks
    );
    newTask = ""; // Clear the input after adding
    saveTasksToLocalStorage();
  }

  async function handleDeleteTask(id) {
    tasks = await deleteTask(id);
    console.log(
      `🚀 ~ file: todoList.svelte:32 ~ handleDeleteTask ~ tasks:`,
      tasks
    );
    saveTasksToLocalStorage();
  }

  async function handleToggleDone(id) {
    tasks = await toggleDone(id);
    console.log(
      `🚀 ~ file: todoList.svelte:38 ~ handleToggleDone ~ tasks:`,
      tasks
    );
    saveTasksToLocalStorage();
  }

  let defaultTasks = [
    { id: 1, text: "Setup new Tauri-Svelte app", done: false },
    { id: 2, text: "Install and setup TailwindCSS", done: false },
    { id: 3, text: "Setup basic TODO app", done: false },
    { id: 4, text: "Setup localStorage persistence", done: false },
    { id: 5, text: "Setup pocketbase DB", done: false },
  ];

  $: localStorage.setItem("tasks", JSON.stringify(tasks));
  // TODO [ x ] : figure out correct way to set full width without triggering overflow on scrollbar
  // TODO [ x ] : load and save to localStorage, overwrite from db if available
  // TODO [  ] : decide on a sensible dataflow and project structure for db functions and components
</script>

<main class="h-full w-screen pt-24 flex flex-col items-center">
  <h1 class="text-3xl pb-4">Simple To-Do App</h1>

  <TodoListInput bind:newTask {handleAddTask} />

  <div class="flex w-full justify-center">
    <ul class="flex flex-col text-left gap-2 pt-12">
      {#each tasks as task (task.id)}
        <TodoListItem {task} {handleToggleDone} {handleDeleteTask} />
      {/each}

      test
        <TodoListItemAction {tasks} {deleteTask} {toggleDone} />

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
