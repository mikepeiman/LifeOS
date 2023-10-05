<script>
    export let newTask;
    export let handleAddTask;
</script>

<div class="flex">
    <input
      class="p-2"
      bind:value={newTask}
      placeholder="Enter a new task..."
      on:keyup={(e) => e.key === "Enter" && handleAddTask()} />
    <button
      class="p-2 bg-white bg-gradient-to-br from-blue-500 to-purple-500 text-white"
      on:click={handleAddTask}>Add</button>
</div>
