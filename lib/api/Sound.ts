
export const getSoundFoldersByProjectId = async (projectId: string) => {
    try {
        const res = await fetch(`/api/sound/project/${projectId}`);
        const data = await res.json();
        // console.log("project id: ", projectId); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        console.log("API response for SoundFolders:", data); // ✅ ตรวจสอบข้อมูลที่ได้รับจาก API
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// lib/api/Sound.ts
export const getSoundFoldersByParent = async (
  projectId: string,
  parentFolderId?: string
) => {
  const res = await fetch(
    `/api/sound/project/${projectId}${parentFolderId ? `?parentFolderId=${parentFolderId}` : ''}`
  );
  return res.json();
};