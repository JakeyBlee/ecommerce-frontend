export const fetchDatabaseBasket = async (user_id) => {
    const res = await fetch(`/cart/${user_id}`, {
        credentials: "include"
    });
    return res;
};

export const addOneItemToDatabaseBasket = async (user_id, product_id) => {
    const res = await fetch(`/cart/${user_id}`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_id: product_id,
            quantity: 1
        }),
    });
    return res;
};

export const updateItemInDatabaseBasket = async (user_id, product_id, quantity) => {
    const res = await fetch(`/cart/${user_id}/${product_id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_id: product_id,
            quantity: quantity
        }),
    });
    return res;
};

// whole basket on login
export const updateDatabaseBasket = async (user_id, data) => {
    const res = await fetch(`/cart/${user_id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    return res;
};

export const deleteItemFromDatabaseBasket = async (user_id, product_id) => {
    const res = await fetch(`/cart/${user_id}/${product_id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res;
};

export const deleteDatabaseBasket = async (user_id) => {
    const res = await fetch(`/cart/${user_id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res;
};

export const checkout = async (user_id, date, total_cost) => {
    const res = await fetch(`/cart/${user_id}/checkout`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            total_cost: total_cost,
            date: date
        })
    });
    return res;
};