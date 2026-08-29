export const getScriptByUserId = async(userId: string) => {
    try {
        const script = await fetch(`/api/script/user/${userId}`);
        const data = await script.json();

        return data;
    } catch (error) {
        return { error: "Fail to get script data." }
    }
}

export const getScriptByProjectId = async(projectId: string) => {
    try {
        const script = await fetch(`/api/script/project/${projectId}`);
        const data = await script.json();

        return data;
    } catch (error) {
        return { error: "Fail to get script data." }
    }
}