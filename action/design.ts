"use server";

import * as z from "zod"
import { DesignCategorySchema, DesignSubCategorySchema, DesignVersionSchema } from "@/schemas";
import db from "@/lib/db";
import { version } from "os";

export const createDesignCategory = async (values: z.infer<typeof DesignCategorySchema>) => {
    const validateFields = DesignCategorySchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "invalid field!"};
    }

    const { name, userId, projectId } = validateFields.data;

    const existingCategory = await db.designCategory.findFirst({
        where: {
            name,
            ownerId: userId,
            projectId
        }
    });

    if (existingCategory) {
        return {error: "Design category already exists!"};
    }

    const newCategory = await db.designCategory.create({
        data: {
            name,
            ownerId: userId,
            projectId,
            
        }
    });

    return {success: "Create Design Category Success", designCategory: newCategory};
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
            ownerId: userId,
            categoryId
        }
    });

    if (existingDesign) {
        return {error: "Design already exists!"};
    }

    const newDesign = await db.designSubClass.create({
        data: {
            name,
            ownerId: userId,
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

    const { name, subCategoryId, ownerId } = validateFields.data;

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
            ownerId
        }
    });

    return {success: "Create Version Success", designVersion: {...newVersion, createdAt: new Date().toISOString()}};
};

export const updateDesignVersionContent = async (versionId: string, content: any) => {

    if(!versionId || !content) {
        return {error: "Version ID and content are required!"};
    }

    try{
        await db.designSubClassVersion.update({
            where: {
                id: versionId
            },
            data: {
                content
            }
        })
    }catch(error){
        return {error: "Failed to update version content!"};
    }

    return {success: "Version content updated successfully!"};
}