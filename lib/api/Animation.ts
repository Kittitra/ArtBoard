
export const getAnimationCategoriesByProjectId = async (projectId: string) => {
    try {
        const res = await fetch(`/api/animation/category/project/${projectId}`);
        const data = await res.json();
        // console.log("project id: ", projectId); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        console.log("API response for AnimationCategories:", data); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAnimationById = async (animationId: string) => {
    try {
        const res = await fetch(`/api/animation/${animationId}`);
        const data = await res.json();
        console.log("API response for Animation:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getAnimationByStateId = async (stateId: string) => {
    try {
        const res = await fetch(`/api/animation/category/${stateId}`);
        const data = await res.json();
        // console.log("project id: ", projectId); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        console.log("API response for Animation:", data); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getAnimationVersionsByAnimationId = async (animationId: string) => {
    try {
        const res = await fetch(`/api/animation/version/${animationId}`);
        const data = await res.json();
        console.log("API response for Animation Versions:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}