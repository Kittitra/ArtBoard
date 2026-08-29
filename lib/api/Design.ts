
export const getDesignCategoryByProjectId = async (projectId: string) => {
    try {
        const res = await fetch(`/api/design/category/project/${projectId}`);
        const data = await res.json();
        // console.log("project id: ", projectId); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        // console.log("API response for design categories:", data); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getDesignVersionByVersionId = async (versionId: string) => {
    try {
        const res = await fetch(`/api/design/version/${versionId}`);
        const data = await res.json();
        // console.log("version id: ", versionId); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        // console.log("API response for design versions:", data); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// export const getBo