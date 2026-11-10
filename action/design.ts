"use server";

import * as z from "zod"
import { DesignCategorySchema, DesignSubCategorySchema, DesignVersionSchema } from "@/schemas";
import db from "@/lib/db";
import { version } from "os";

export const createDesignCategory = async (values: z.infer<typeof DesignCategorySchema>) => {
  const validateFields = DesignCategorySchema.safeParse(values);
  if (!validateFields.success) return { error: "invalid field!" };

  const { name, userId, projectId } = validateFields.data;

  // เช็คซ้ำภายใน project เดียวกัน (ผ่าน asset เพราะ DesignCategory ไม่มี projectId)
  const existingCategory = await db.designCategory.findFirst({
    where: { name, asset: { projectId } },
  });
  if (existingCategory) return { error: "Design category already exists!" };

  const asset = await db.asset.create({
    data: {
      projectId,
      createdById: userId,
      type: "DESIGN",
      title: name,
      designCategory: { create: { name } }, // ผูก assetId ให้อัตโนมัติ
      
    },
    include: { designCategory: true },
  });

  return {
    success: "Create Design Category Success",
    designCategory: asset.designCategory,
  };
};

export const createDesignSubClass = async (values: z.infer<typeof DesignSubCategorySchema>) => {
    const validateFields = DesignSubCategorySchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "Invalid field!"};
    }

    const { name, userId, categoryId } = validateFields.data;

    const existingDesign = await db.designSubClass.findFirst({
        where: {
            name,
            categoryId
        }
    });

    if (existingDesign) {
        return {error: "Design already exists!"};
    }

    const newDesign = await db.designSubClass.create({
        data: {
            name,
            categoryId,
        }
    });

    return {success: "Create Design Success", designCategoriesSubClass: { ...newDesign, versions: [] }};
};

export const createDesignVersion = async (value: z.infer<typeof DesignVersionSchema>) => {
    const validateFields = DesignVersionSchema.safeParse(value);

    if (!validateFields.success) {
        return {error: "Invalid field!"};
    }

    const { name, subCategoryId } = validateFields.data;

    const existingVersion = await db.designSubClassVersion.findFirst({
        where: {
            name,
            DesignSubClassId: subCategoryId
        }
    });

    if (existingVersion) {
        return {error: "Version already exists!"};
    }

    const newVersion = await db.designSubClassVersion.create({
        data: {
            name,
            DesignSubClassId: subCategoryId,
        }
    });

    return {success: "Create Version Success", designVersion: {...newVersion, createdAt: new Date().toISOString()}};
};

export const updateDesignVersionContent = async (versionId: string, content: any) => {

    if(!versionId || !content) {
        return {error: "Version ID and content are required!"};
    }

    // console.log("content in updateDesignVersionContent: ", content[0]?.content);

    const contentData = content[0]?.content;

    try{
        await db.designSubClassVersion.update({
            where: {
                id: versionId
            },
            data: {
                content: contentData
            }
        })
    }catch(error){
        return {error: "Failed to update version content!"};
    }

    return {success: "Version content updated successfully!"};
}