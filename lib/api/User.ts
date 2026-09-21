export const getUserByUserId = async(userId: string) => {
    try {
        const user = await fetch(`/api/user/${userId}`);
        const data = await user.json();

        return data;
    } catch (error) {
        return { error: "Fail to get user data." }
    }
}