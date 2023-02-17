export const register = async (username, password, firstName, lastName) => {
    const res = await fetch(`/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName
        }),
    });
    return res;
};

export const login = async (username, password) => {
    const res = await fetch(`/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password
        }),
    });
    return res;
};

export const logout = async () => {
    const res = await fetch(`/logout`, {
        method: "POST",
        credentials: 'include'
    });
    return res;
};

export const changePassword = async (user_id, newPassword) => {
    const res = await fetch(`/users/${user_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            password: newPassword
        })
    });
    return res;
};