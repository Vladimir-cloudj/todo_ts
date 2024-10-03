type Task ={
    id: number,
    title: string,
    completed: boolean,
    createdAt: Date,
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector('#new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const tasks: Task[] = loadTasks();
tasks.forEach(task => addListItem(task));

form?.addEventListener('submit', e => {
    e.preventDefault();
    if (input?.value === '' || input?.value === null || input?.value === undefined) return
    const newtask: Task = {
        id: (Math.round(Math.random()*1000)),
        title: input?.value,
        completed: false,
        createdAt: new Date(),
    }
    tasks.push(newtask);

    addListItem(newtask);
    console.log(newtask);
    input.value = '';
    saveTasks();
})

function addListItem(task: Task): boolean {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
    })
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    label.append(checkbox, task.title);
    item.append(label);
    list?.append(item);
    return true;
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
    const tasks: Task[] = [];
    tasks.push(...JSON.parse(localStorage.getItem('tasks') || '[]'));
    // tasks.forEach(task => addListItem(task));
    return tasks;
}