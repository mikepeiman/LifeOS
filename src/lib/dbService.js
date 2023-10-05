// databaseService.js

import PocketBase from "pocketbase"; 

const pb = new PocketBase("http://127.0.0.1:8090");

let tasks = []
$: console.log(`🚀 ~ file: dbService.js:8 ~ tasks:`, tasks)
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
    resultList.items.length ? (tasks = resultList.items) : tasks;
    console.log(`🚀 ~ file: dbService.js:31 ~ loadTasks ~ tasks:`, tasks)
    return tasks
  }


  async function addTask(newTask) {
    if (newTask.trim() !== "") {
      let task = {
        taskName: newTask,
        taskDetails: "",
        done: false,
      };
      let pbTask = await pb.collection("tasks").create(task); // Add task to Pocketbase
      console.log(`🚀 ~ file: dbService.js:45 ~ addTask ~ pbTask:`, pbTask)
      tasks = [...tasks, pbTask]; // Update local state
      newTask = "";
      return tasks
    }
  }

  async function toggleDone(id) {
    const taskToUpdate = await pb.collection("tasks").getOne(id);
    console.log(
      `🚀 ~ file: App.svelte:68 ~ toggleDone ~ taskToUpdate:`,
      taskToUpdate
    );
    if (taskToUpdate) {
      taskToUpdate.done = !taskToUpdate.done;
      await pb.collection("tasks").update(id, taskToUpdate); // Update task in Pocketbase
      tasks = tasks.map((task) => (task.id === id ? taskToUpdate : task)); // Update local state
    }
  }

  async function deleteTask(id) {
    console.log(`🚀 ~ file: dbService.js:66 ~ deleteTask ~ id:`, id)
    let res = await pb.collection("tasks").delete(id); // Delete task from Pocketbase
    console.log(`🚀 ~ file: dbService.js:68 ~ deleteTask ~ res:`, res)
    tasks = tasks.filter((task) => task.id !== id); // Update local state
    return tasks

  }

  export { tasks, doLogin, loadTasks, addTask, toggleDone, deleteTask };