export const getUserOrders = async (user_id) => {
    const res = await fetch(`/orders/${user_id}`, {
        credentials: "include"
    });
    return res;
};

export const getOrderProducts = async (user_id, order_id) => {
    const res = await fetch(`/orders/${user_id}/${order_id}`, {
        credentials: "include"
    });
    return res;
};