const Session = () => {
    const session = {};

    session.setUsers = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
    };

    session.getUsers = () => {
        const localData = localStorage.getItem('users');
        const users = JSON.parse(localData);
        return users ? users : [];
    };

    return session;
}
