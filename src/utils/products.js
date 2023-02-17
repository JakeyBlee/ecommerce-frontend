export const getAllProducts = async () => {
    const res = await fetch(`/products`, {
        credentials: "include"
    });
    return res;
};

export const getProduct = async (id) => {
    const res = await fetch(`/products/${id}`, {
        credentials: "include"
    });
    return res;
};