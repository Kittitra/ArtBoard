"use client";

import SideBarDesign from '@/app/components/workspace/design/SideBarDesign';
import Design from '@/app/components/workspace/design/Design';
import React, { Fragment, useEffect, useMemo, useState, useTransition } from 'react'
import { AlertBasic } from '@/app/components/Aleart';
import { useCurrentUser } from '@/hooks/use-current-user';
import { usePathname } from 'next/navigation';
import { createDesignCategory, createDesignSubClass, createDesignVersion, updateDesignVersionContent } from '@/action/design';
import { getDesignCategoryByProjectId, getDesignVersionByVersionId } from '@/lib/api/Design';
import { Version } from '@/lib/type';
import { DesignCategory, DesignSubClass } from '@/app/generated/prisma';
import Link from 'next/link';

type Crumb = { id: string | null; name: string };

type BoardNode = {
  id: string;
  name: string;
  parentBoardId?: string | null;
};

// ดึง Board ทั้งหมดออกจาก content (ปรับให้ตรงกับโครงสร้างจริงได้)
function flattenBoards(content: any): BoardNode[] {
  const boardList = content?.board;
  if (!Array.isArray(boardList)) return [];

  return boardList.map((b: any) => ({
    id: b.id,
    name: b.title || b.text || b.name || "Untitled",
    parentBoardId: b.parentBoardId ?? null,
  }));
}

const belongsTo = (el: any, parentId: string | null) =>
  (el?.parentBoardId ?? null) === parentId;

// เอาเฉพาะ element ที่อยู่ใน board ปัจจุบัน (root = null)
function filterContentByParent(content: any, parentId: string | null) {
  if (!content || typeof content !== "object") return content;

  const result: Record<string, any> = {};
  for (const key of Object.keys(content)) {
    const value = content[key];
    result[key] = Array.isArray(value)
      ? value.filter((el) => belongsTo(el, parentId))
      : value;
  }
  return result;
}

// เอา element ของ board ปัจจุบันที่แก้แล้ว ไปแทนที่ใน content เต็ม
function mergeContentForParent(full: any, edited: any, parentId: string | null) {
  const result: Record<string, any> = { ...full };

  for (const key of Object.keys(edited ?? {})) {
    const editedList = edited[key];
    if (!Array.isArray(editedList)) {
      result[key] = editedList;
      continue;
    }
    const others = (Array.isArray(full?.[key]) ? full[key] : []).filter(
      (el: any) => !belongsTo(el, parentId)
    );
    result[key] = [...others, ...editedList];
  }
  return result;
}

function buildCrumbs(boards: BoardNode[], currentId?: string): Crumb[] {
  const crumbs: Crumb[] = [];
  const visited = new Set<string>(); // กัน loop ถ้าข้อมูล parent วนกัน
  let cur = boards.find((b) => b.id === currentId);

  while (cur && !visited.has(cur.id)) {
    visited.add(cur.id);
    crumbs.unshift({ id: cur.id, name: cur.name });
    const parentId: string | null | undefined = cur.parentBoardId;
    cur = parentId ? boards.find((b) => b.id === parentId) : undefined;
  }

  return [{ id: null, name: "Root" }, ...crumbs];
}



const Page = () => {
  const [aleart, setAleart] = useState(false);
  const [version, setVersion] = useState<Version[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubClassName, setNewSubClassName] = useState("");
  const [newVersionName, setNewVersionName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [designCategories, setDesignCategories] = useState<DesignCategory[]>([]);
  const [designCategoriesSubClass, setDesignCategoriesSubClass] = useState<DesignSubClass[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  const user = useCurrentUser();
  const path = usePathname();

  const org = path.split("/")[3];
  const projectPath = path.split("/")[5];
  const versionPath = path.split("/")[7];
  const boardPath = path.split("/")[8];
  const base = `/auth/org/${org}/project/${projectPath}/design/${versionPath}`;

  const boards = useMemo(
    () => flattenBoards(version[0]?.content),
    [version]
  );

  const crumbs = useMemo(
    () => buildCrumbs(boards, boardPath),
    [boards, boardPath]
  );

  const handleAleart = () => {
    setAleart(true);
    setTimeout(() => {
      setAleart(false);
    }, 3000);
  };

  const handleCreateNewCategory = () => {
    if (!newCategoryName.trim()) {
      setError("Category name is required");
      return;
    }

    if (!user?.id) return;

    setError("");
    setSuccess("");

    startTransition(() => {
      createDesignCategory({
        name: newCategoryName,
        userId: user.id,
        projectId: projectPath,
      })
        .then((data) => {
          const newCategoryDesign = data?.designCategory;

          if (newCategoryDesign) {
            setDesignCategories((prev) => [newCategoryDesign, ...prev]);
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
  };

  const handleCreateNewSubClass = (categoryId: string | null) => {
    if (!newSubClassName.trim()) {
      setError("Subclass name is required");
      return;
    }

    if (!user?.id || !categoryId) return;

    setError("");
    setSuccess("");

    startTransition(() => {
      createDesignSubClass({
        name: newSubClassName,
        userId: user.id,
        categoryId: categoryId,
      })
        .then((data) => {
          const newSubClass = data?.designCategoriesSubClass;

          if (newSubClass) {
            setDesignCategoriesSubClass((prev) => [newSubClass, ...prev]);
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
  };

  const handleCreateNewVersion = (subCategoryId: string) => {
    if (!newVersionName.trim()) {
      setError("Version name is required");
      return;
    }

    if (!user?.id || !subCategoryId) return;

    setError("");
    setSuccess("");

    startTransition(() => {
      createDesignVersion({
        name: newVersionName,
        ownerId: user.id,
        subCategoryId: subCategoryId,
      })
        .then((data) => {
          const newVersion = data?.designVersion;

          if (newVersion) {
            setVersion((prev) => [newVersion, ...prev]);
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
  };

    const updateVersionData = (versionContent: any) => {
        if (!version || version.length === 0) {
            setError("Data is required to update version content");
            return;
        }

        if (!user?.id) return;

        setError("");
        setSuccess("");

        const merged = mergeContentForParent(
            version[0].content,
            versionContent,
            currentParentId
        );

        startTransition(() => {
            updateDesignVersionContent(version[0].id, merged)
            .then((data) => {
                if (!data?.error) {
                // เก็บ content เต็มล่าสุดไว้ เพื่อให้เข้า board อื่นแล้วเห็นของที่เพิ่งแก้
                setVersion((prev) =>
                    prev.map((v, i) => (i === 0 ? { ...v, content: merged } : v))
                );
                }
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
    };

  useEffect(() => {
    getDesignCategoryByProjectId(projectPath)
      .then((categories) => {
        setDesignCategories(categories);
      })
      .catch((error) => {
        console.error("Failed to fetch design categories:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectPath]);

  // ดึง version ครั้งเดียวต่อ versionPath (ไม่ผูกกับ boardPath แล้ว)
  useEffect(() => {
    if (!versionPath) return;

    getDesignVersionByVersionId(versionPath)
      .then((versionData) => {
        setVersion(versionData);
      })
      .catch((error) => {
        console.error("Failed to fetch design version data:", error);
      });
  }, [versionPath]);

    const currentParentId = boardPath ?? null;

    const visibleVersions = useMemo(() => {
    if (version.length === 0) return version;
    return version.map((v, i) =>
        i === 0
        ? { ...v, content: filterContentByParent(v.content, currentParentId) }
        : v
    );
    }, [version, currentParentId]);

  return (
    <div className='flex flex-row w-full h-screen relative overflow-x-hidden'>
      <SideBarDesign
        version={version}
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

      <div className='flex-1 bg-custom flex flex-col h-full relative'>
        <nav
          aria-label="Breadcrumb"
          className='w-full bg-white h-10 absolute z-30 mt-1 flex items-center gap-2 p-2 text-sm'
        >
          {crumbs.map((item, i) => {
            const isLast = i === crumbs.length - 1;
            const href = item.id ? `${base}/${item.id}` : base;

            return (
              <Fragment key={item.id ?? "root"}>
                {i > 0 && <span aria-hidden="true">/</span>}
                {isLast ? (
                  <span aria-current="page" className="font-medium">
                    {item.name}
                  </span>
                ) : (
                  <Link href={href} className="hover:underline">
                    {item.name}
                  </Link>
                )}
              </Fragment>
            );
          })}
        </nav>

        <div className='mt-10'>
          <Design
            versions={version}
            updateVersionData={updateVersionData}
            parentBoardId={boardPath}
          />
        </div>
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
  );
};

export default Page;