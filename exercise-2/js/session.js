const Session = () => {
    const session = {};

    session.setTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    session.getUsers = () => {
        const localData = localStorage.getItem('tasks');
        const tasks = JSON.parse(localData);
        return tasks ? tasks : [];
    };

    return session;
}
