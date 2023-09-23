<script>
  import Greet from './lib/Greet.svelte'

let newTask = "";
// refctor tasks to have id


// let defaultTasks = [
//   { id: 1, text: "Setup new Tauri-Svelte app", done: false },
//   { id: 2, text: "Install and setup TailwindCSS", done: false },
//   { id: 3, text: "Setup basic TODO app", done: false },
//   { id: 4, text: "Setup localStorage persistence", done: false },
//   { id: 5, text: "Setup pocketbase DB", done: false }
// ];

let tasks = JSON.parse(localStorage.getItem('tasks')) || defaultTasks;
$: localStorage.setItem('tasks', JSON.stringify(tasks));

$: console.log(tasks)

function addTask() {
  if (newTask.trim() !== "") {
    tasks = [...tasks, { id: Date.now(), text: newTask, done: false }];
    newTask = "";
  }
}

function toggleDone(id) {
    console.log(`🚀 ~ file: App.svelte:15 ~ toggleDone ~ id:`, id)
    tasks = tasks.map(task => {
      if (task.id === id) {
          console.log(`🚀 ~ file: App.svelte:25 ~ toggleDone ~ task:`, task)
            return {
                ...task,
                done: !task.done
            };
        }

        return task;
    });

}


function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
}
  
</script>

<svelte:head>
  <link href="/dist/output.css" rel="stylesheet">
</svelte:head>

<main class="container">


<main>
  <h1>Simple To-Do App</h1>
  
  <input 
    bind:value={newTask} 
    placeholder="Enter a new task..." 
    on:keyup={e => e.key === 'Enter' && addTask()}
  />
  <button on:click={addTask}>Add</button>

  <div class="flex w-full justify-center">
    <ul class="flex flex-col text-left gap-2 pt-12">
      {#each tasks as task (task.id)}
        <li class="border-b-2 border-blue-300 flex justify-between items-center">
          <div class="flex items-center space-x-2 pr-4">
            <input type="checkbox" checked={task.done} on:change={() => toggleDone(task.id)} />
            <span class:done={task.done} class="pl-2">{task.text}</span>
          </div>
          <button class="px-2 rounded-none bg-orange-100 self-end end" on:click={() => deleteTask(task.id)}>Delete</button>
        </li>
      {/each}
    </ul>
  </div>
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
