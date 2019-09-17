const Service = () => {
    const service = {};

    service.getUsers = async () => {
        const response = await fetch('https://5d7a59779edf7400140aa043.mockapi.io/khojirakhimov');
        if (response.status === 200) {
            return response.json();
        } else {
            return [];
        }
    }

    service.deleteUser = async (id) => {
        const response = await fetch('https://5d7a59779edf7400140aa043.mockapi.io/khojirakhimov/' + id);
        if (response.status === 200) {
            return response.json();
        } else {
            throw response.status;
        }
    }

    return service;
}
