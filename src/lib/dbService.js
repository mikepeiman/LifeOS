// databaseService.js

import { Pocketbase } from 'pocketbase'; // Assuming this is how you import Pocketbase

const db = new Pocketbase(/* configuration here */);

export function addTask(task) {
    return db.add('tasks', task);
}

export function getTasks() {
    return db.get('tasks');
}

// ... other database operations
