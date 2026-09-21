
export const getEditedCategoriesByProjectId = async (projectId: string) => {
    try {
        const res = await fetch(`/api/edited/category/project/${projectId}`);
        const data = await res.json();
        // console.log("project id: ", projectId); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        console.log("API response for FootageCategories:", data); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getEditedById = async (footageId: string) => {
    try {
        const res = await fetch(`/api/edited/${footageId}`);
        const data = await res.json();
        console.log("API response for Footage:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getEditedByStateId = async (stateId: string) => {
    try {
        const res = await fetch(`/api/edited/category/${stateId}`);
        const data = await res.json();
        // console.log("project id: ", projectId); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        console.log("API response for Footage:", data); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getEditedVersionsByEditedId = async (editedId: string) => {
    try {
        const res = await fetch(`/api/edited/version/${editedId}`);
        const data = await res.json();
        console.log("API response for Edited Versions:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}