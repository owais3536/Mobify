
export const register = async (name, email, password) => {
    const obj = {
        name,
        email,
        password
    };

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'content-type': 'application/json' }
        });
        const data = await response.json();

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(data));
        }
    }
    catch (err) {
        throw TypeError(err);
    }
};

export const login = async (email, password) => {
    const obj = {
        email, password
    };

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'content-type': 'application/json' }
        });

        if (response.status === 201) {
            const data = await response.json();
            console.log(data);
            return data;
        }
    }
    catch (err) {
        throw TypeError(err);
    }
};