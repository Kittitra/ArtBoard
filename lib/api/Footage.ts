
export const getFootageCategoriesByProjectId = async (projectId: string) => {
    try {
        const res = await fetch(`/api/footage/category/project/${projectId}`);
        const data = await res.json();
        // console.log("project id: ", projectId); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        console.log("API response for FootageCategories:", data); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getFootageById = async (footageId: string) => {
    try {
        const res = await fetch(`/api/footage/${footageId}`);
        const data = await res.json();
        console.log("API response for Footage:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getFootageByStateId = async (stateId: string) => {
    try {
        const res = await fetch(`/api/footage/category/${stateId}`);
        const data = await res.json();
        // console.log("project id: ", projectId); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        console.log("API response for Footage:", data); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getFootageVersionsByFootageId = async (footageId: string) => {
    try {
        const res = await fetch(`/api/footage/version/${footageId}`);
        const data = await res.json();
        console.log("API response for Footage Versions:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}