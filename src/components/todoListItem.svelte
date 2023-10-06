<script>
    export let handleDeleteTask;
    export let task;
    export let handleToggleDone;
</script>

<li class="border-b-2 border-blue-300 flex justify-between items-center">
    <div class="flex items-center space-x-2 pr-4">
        <input
            type="checkbox"
            checked={task.done}
            on:change={() => handleToggleDone(task.id)} />
        <span class:done={task.done} class="pl-2">{task.taskName}</span>
    </div>
    <button
        class="px-2 rounded-none bg-orange-100 self-end end"
        on:click={() => handleDeleteTask(task.id)}>Delete</button>
</li>

<style>
    .done {
        text-decoration: line-through;
        color: green;
    }
</style>
