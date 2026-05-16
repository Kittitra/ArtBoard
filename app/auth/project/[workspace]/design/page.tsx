"use client";

import SideBarDesign from '@/app/components/workspace/design/SideBarDesign';
import SideBarStoryBoard from '@/app/components/workspace/storyboard/SideBarStoryBoard';
import Design from '@/app/components/workspace/design/Design';
import { title } from 'process';
import React, { useEffect, useState, useTransition } from 'react'
import { AlertBasic } from '@/app/components/Aleart';
import { useCurrentUser } from '@/hooks/use-current-user';
import { usePathname } from 'next/navigation';
import { createDesignCategory, createDesignSubClass, createDesignVersion, updateDesignVersionContent } from '@/action/design';
import { getDesignCategoryByProjectId } from '@/lib/api/Design';
import { Version } from '@/lib/type';



interface SubClass {
    id:string
    name: string
    ownerId: string
    categoryId: string | null
    versions: Version[]
}

interface DesignCategory {
    id:string
    name: string
    ownerId: string
    projectId: string
    designs?: SubClass[]  // ✅ เพิ่ม subclass array ใน DesignCategory
}

const page = () => {

  const [aleart, setAleart] = useState(false);
  const [version, setVersion] = useState<Version[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubClassName, setNewSubClassName] = useState("");
  const [newVersionName, setNewVersionName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [designCategories, setDesignCategories] = useState<DesignCategory[]>([]);
  const [designCategoriesSubClass, setDesignCategoriesSubClass] = useState<SubClass[]>([]);
  const [selected, setSelected] = useState(designCategories[0]?.name || ""); // ✅ ตั้งค่าเริ่มต้นเป็นชื่อของ design category แรก
  const [loading, setLoading] = React.useState(true);

  const user = useCurrentUser();

  const path = usePathname();
  
  const projectPath = path.split("/")[3];

  const handleAleart = () => {
      setAleart(true);

      setTimeout(() => {
          setAleart(false);
      }, 3000);
  };

  const handleCreateNewCategory = () => {

        if(!newCategoryName.trim()){
            setError("Category name is required");
            return;
         }

         if(!user?.id) return;

        setError("");
        setSuccess("");
    
        startTransition(() => {
            createDesignCategory({
                name: newCategoryName,
                userId: user.id,
                projectId: projectPath
            })
            .then((data) => {
                const newCategoryDesign = data?.designCategory;
    
                if (newCategoryDesign) {
                    setDesignCategories((prev) => [newCategoryDesign, ...prev]); // 🔥 เพิ่มบนสุด
                }
    
                setError(data?.error);
                setSuccess(data?.success);
            })
            .catch(() => {
                setError("Failed to create design category.");
            })
            .finally(() => {
                setNewCategoryName("");
                handleAleart();
            });
        });
    }

    const handleCreateNewSubClass = (categoryId: string | null) => {

        if(!newSubClassName.trim()){
            setError("Subclass name is required");
            return;
         }

         if(!user?.id || !categoryId) return;

        setError("");
        setSuccess("");
    
        startTransition(() => {
            createDesignSubClass({
                name: newSubClassName,
                userId: user.id,
                categoryId: categoryId})
            .then((data) => {
                const newSubClass = data?.designCategoriesSubClass;
    
                if (newSubClass) {
                    setDesignCategoriesSubClass((prev) => [newSubClass, ...prev]); // 🔥 เพิ่มบนสุด
                }
    
                setError(data?.error);
                setSuccess(data?.success);
            })
            .catch(() => {
                setError("Failed to create design subclass.");
            })
            .finally(() => {
                setNewSubClassName("");
                handleAleart();
            });
        });
    }

    const handleCreateNewVersion = (subCategoryId: string) => {

        if(!newVersionName.trim()){
            setError("Version name is required");
            return;
         }

         if(!user?.id || !subCategoryId || newVersionName === "") return;

        setError("");
        setSuccess("");
    
        startTransition(() => {
            createDesignVersion({
                name: newVersionName,
                ownerId: user.id,
                subCategoryId: subCategoryId})
            .then((data) => {
                const newVersion = data?.designVersion;
    
                if (newVersion) {
                    setVersion((prev) => [newVersion, ...prev]); // 🔥 เพิ่มบนสุด
                }
    
                setError(data?.error);
                setSuccess(data?.success);
            })
            .catch(() => {
                setError("Failed to create design version.");
            })
            .finally(() => {
                setNewVersionName("");
                handleAleart();
            });
        });
    }

    const updateVersionData = (versionContent: any) => {
         if(!version || version.length === 0) {
            setError("Data is required to update version content");
            return;
         }

         if(!user?.id) return;

        setError("");
        setSuccess("");
    
        startTransition(() => {
            updateDesignVersionContent(version[0].id, versionContent)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
             .catch(() => {
                setError("Failed to update design version content.");
            })
            .finally(() => {
                handleAleart();
            });
        });

    }

    useEffect(() => {
      getDesignCategoryByProjectId(projectPath)
        .then((categories) => {
          console.log("Design Categories:", categories);
          setDesignCategories(categories);
        })
        .catch((error) => {
          console.error("Failed to fetch design categories:", error);
        }).finally(() => {
            setLoading(false);
        })
    }, [projectPath]);


  return (
    // ✅ flex row ให้ sidebar อยู่ซ้าย content อยู่ขวา
    <div className='flex flex-row w-full h-screen relative overflow-x-hidden'>
      <SideBarDesign
        // items={arr}
        data={designCategories}
        onSelect={(title) => setSelected(title)}
        setVersion={setVersion}
        handleCreateNewCategory={handleCreateNewCategory}
        setNewCategoryName={setNewCategoryName}
        handleCreateNewSubClass={handleCreateNewSubClass}
        loading={loading}
        setNewSubClassName={setNewSubClassName}
        handleCreateNewVersion={handleCreateNewVersion}
        setNewVersionName={setNewVersionName}
      />
      <div className='flex-1 bg-custom'>
        <Design versions={version} updateVersionData={updateVersionData} />
      </div>

      <div
          className={`absolute bottom-4 -right-10
              transition-all duration-300 ease-out
              ${aleart
              ? "opacity-100 -translate-x-15 scale-100"
              : "opacity-0 translate-x-10 scale-95 pointer-events-none"
          }`}
      >
          <AlertBasic message={success || error} />
      </div>
    </div>
  )
}

export default page