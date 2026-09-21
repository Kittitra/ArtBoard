
export const getAllProject = async () => {
    try {
        const res = await fetch("/api/project");
        const data = await res.json();
        return data;
    } catch (error) {
        return { error: "Failed to fetch project" };
    }
}

export const getProjectById = async (projectId: string) => {
   try {
        const res = await fetch(`/api/project/${projectId}`);
        
        if (!res.ok) {  // ← เพิ่มตรงนี้
            return null;
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        return null;  // return null แทน error object เพื่อให้ useEffect เช็คง่ายขึ้น
    }
};

export const getProjectByUserId = async (userId: string) => {
  try {
        const res = await fetch(`/api/project/user/${userId}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return { error: "Failed to fetch project" };
    }
};