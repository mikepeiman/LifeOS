<script>
  import { onMount } from "svelte";
  import Greet from "./lib/Greet.svelte";
  // import { addTask, getTasks } from './lib/dbService.js';
  import PocketBase from "pocketbase";
  let newTask = "";
  // refctor tasks to have id

  onMount(() => {
    console.log("mounted");
    doLogin();
  });

  const pb = new PocketBase("http://127.0.0.1:8090");

  let defaultTasks = [
    { id: 1, text: "Setup new Tauri-Svelte app", done: false },
    { id: 2, text: "Install and setup TailwindCSS", done: false },
    { id: 3, text: "Setup basic TODO app", done: false },
    { id: 4, text: "Setup localStorage persistence", done: false },
    { id: 5, text: "Setup pocketbase DB", done: false },
  ];

  let tasks = JSON.parse(localStorage.getItem("tasks")) || defaultTasks;
  $: localStorage.setItem("tasks", JSON.stringify(tasks));

  const doLogin = async () => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword("mikepeiman@gmail.com", "devmike123");

      // after the above you can also access the auth data from the authStore
      console.log(pb.authStore.isValid);
      console.log(pb.authStore.token);
      console.log(pb.authStore.model);
      // currentUser.value = pb.authStore.model
    } catch (error) {
      alert(error.message);
    }
  };

  async function loadTasks() {

    // adminAuthData
    // console.log(`🚀 ~ file: App.svelte:29 ~ loadTasks ~ adminAuthData:`, adminAuthData)
    const resultList = await pb.collection("tasks").getList(1, 50); // Adjust the pagination as needed
    console.log(
      `🚀 ~ file: App.svelte:23 ~ loadTasks ~ resultList:`,
      resultList.items
    );
    resultList.items.length ? (tasks = resultList.items) : tasks;
  }

  loadTasks();

  async function addTask() {
    if (newTask.trim() !== "") {
      let task = { id: Date.now().toString(), text: newTask, done: false };
      // await pb.collection("tasks").create(task); // Add task to Pocketbase
      tasks = [...tasks, task]; // Update local state
      newTask = "";
    }
  }

  // async function toggleDone(id) {
  //   const taskToUpdate = await pb.collection("tasks").getOne(id);
  //   if (taskToUpdate) {
  //     taskToUpdate.done = !taskToUpdate.done;
  //     // await pb.collection("tasks").update(id, taskToUpdate); // Update task in Pocketbase
  //     tasks = tasks.map((task) => (task.id === id ? taskToUpdate : task)); // Update local state
  //   }
  // }

  function toggleDone(id) {
    tasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
  }

  async function deleteTask(id) {
    // await pb.collection("tasks").delete(id); // Delete task from Pocketbase
    tasks = tasks.filter((task) => task.id !== id); // Update local state
  }

  const getTasks = async () => {
    try {
      const records = await pb
        .collection("tasks")
        .getFullList(200 /* batch size */, {
          sort: "-created",
        });
      return records;
    } catch (error) {
      return { error: error.message };
    }
  };
</script>

<svelte:head>
  <link href="/dist/output.css" rel="stylesheet" />
</svelte:head>

<main class="container">
  <main>
    <h1>Simple To-Do App</h1>

    <input
      bind:value={newTask}
      placeholder="Enter a new task..."
      on:keyup={(e) => e.key === "Enter" && addTask()} />
    <button on:click={addTask}>Add</button>

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
    <button on:click={getTasks}>Load tasks</button>
    <button on:click={doLogin}>Login</button>
  </main>
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
