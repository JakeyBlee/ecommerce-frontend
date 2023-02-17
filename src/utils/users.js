export const getUserDetails = async (user_id) => {
    const res = await fetch(`/users/${user_id}`, {
        credentials: "include"
    });
    return res;
};