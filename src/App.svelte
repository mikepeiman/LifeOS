<script>
  import Greet from './lib/Greet.svelte'

let newTask = "";
$: tasks = [];
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

  <ul>
    {#each tasks as task (task.id)}
      <li>
        <input type="checkbox" on:change={() => toggleDone(task.id)} />
        <span class={task.done ? 'done text-green-500 bg-blue-400' : ''} class:done={task.done}>{task.text}</span>
        <button on:click={() => deleteTask(task.id)}>Delete</button>
      </li>
    {/each}
  </ul>
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
