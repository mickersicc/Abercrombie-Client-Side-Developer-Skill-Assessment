((Service, Session) => {
    const service = Service();
    const session = Session();
    let users;

    initButtons = () => {
        const buttons = document.getElementsByClassName('delete-btn');
        onClick = async (event) => {
            const response = await service.deleteUser(event.target.id);
            users = users.filter((user) => user.id !== response.id)
            session.setUsers(users);
            renderData();
        };
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].onclick = onClick
        }
    }

    initShowButtons = () => {
        const buttons = document.getElementsByClassName('show-btn');
        onClick = (event) => {
            const children = event.srcElement.parentElement.children;
            for (child of children) {
                child.classList.remove('hidden');
            }
        };
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].onclick = onClick
        }
    }

    const renderData = async () => {
        const source = document.getElementById('root').innerHTML;
        const template = Handlebars.compile(source);
        document.getElementById('content-placeholder').innerHTML = template({ data: users });
        initButtons();
        initShowButtons();
    }

    const main = async () => {
        users = session.getUsers();
        if (!users.length) {
            users = await service.getUsers();
            session.setUsers(users);
        }
        renderData();
    }

    main();

})(Service, Session);
