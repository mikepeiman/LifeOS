<script>
    export let deleteTask;
    export let tasks;
    console.log(`🚀 ~ file: todoListItemAction.svelte:4 ~ tasks:`, tasks);
    export let toggleDone;
    let task = tasks.length ? tasks[0] : {};
</script>

<li class="border-b-2 border-blue-300 flex justify-between items-center">
    <div class="flex items-center space-x-2 pr-4">
        <input
            type="checkbox"
            bind:checked={task.done}
            on:change={() => toggleDone(task.id)} />
        <span class:done={task.done} class="pl-2">{task.taskName}</span>
    </div>
    <button
        class="px-2 rounded-none bg-orange-100 self-end end"
        on:click={() => deleteTask(task.id)}>Delete</button>
</li>

<style>
    .done {
        text-decoration: line-through;
        color: green;
    }
</style>
