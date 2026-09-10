"use server";

import * as z from "zod"
import { VideoCategorySchema, VideoSchema, VideoVersionSchema } from "@/schemas";
import db from "@/lib/db";

export const createNewVideoCategory = async (values: z.infer<typeof VideoCategorySchema>) => {
    const validateFields = VideoCategorySchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "invalid field!"};
    }

    const { name, userId, projectId, type } = validateFields.data;

    if(type === "animation") {

        const existingCategory = await db.animationState.findFirst({
            where: {
                name,
                projectId
            }
        });

        if (existingCategory) {
            return {error: "animation category already exists!"};
        }
    }else if(type === "footage") {
        const existingCategory = await db.footageState.findFirst({
            where: {
                name,
                projectId
            }
        });

        if (existingCategory) {
            return {error: "footage category already exists!"};
        }
    }else if(type === "edited") {
         const existingCategory = await db.editedState.findFirst({
            where: {
                name,
                projectId
            }
        });

        if (existingCategory) {
            return {error: "edited category already exists!"};
        }
    }

    if(type === "animation") {
        const newAnimationCategory = await db.animationState.create({
            data: {
                name,
                projectId,
                
            }
        });

        return {success: "Create Animation Category Success", animationCategory: newAnimationCategory};
    }else if(type === "footage") {
        const newFootageCategory = await db.footageState.create({
            data: {
                name,
                projectId,
            }
        });

        return {success: "Create Footage Category Success", footageCategory: newFootageCategory};
    }else if(type === "edited") {
        const newEditedCategory = await db.editedState.create({
            data: {
                name,
                projectId,
            }
        });

        return {success: "Create Edited Category Success", editedCategory: newEditedCategory};
    }
};

export const createNewVideo = async (values: z.infer<typeof VideoSchema>, type: string ) => {
    const validateFields = VideoSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "invalid field!"};
    }

    const { title, userId, categoryId, status, description } = validateFields.data;

    if(type === "animation") {

        const existingCategory = await db.animation.findFirst({
            where: {
                title,
                stateId: categoryId
            }
        });

        if (existingCategory) {
            return {error: "animation category already exists!"};
        }
    } else if (type === "footage") {
        const existingCategory = await db.footage.findFirst({
            where: {
                title,
                stateId: categoryId
            }
        });

        if (existingCategory) {
            return {error: "footage category already exists!"};
        }
    } else if(type === "edited"){
        const existingCategory = await db.edited.findFirst({
            where: {
                title,
                stateId: categoryId
            }
        });

        if (existingCategory) {
            return {error: "edited category already exists!"};
        }
    }else {
        return { error: "invalid type!" };
    }

    if(type === "animation") {
        const newVideo = await db.animation.create({
            data: {
                title,
                stateId: categoryId,
                ownerId: userId,
                status,
                description
            }
        });

        return {success: "Create Animation Category Success", animation: newVideo};
    }else if(type === "footage") {
        const newVideo = await db.footage.create({
            data: {
                title,
                stateId: categoryId,
                ownerId: userId,
                status,
                description
            }
        });

        return {success: "Create Footage Category Success", footage: newVideo};
    }else if(type === "edited"){
        const newVideo = await db.edited.create({
            data: {
                title,
                stateId: categoryId,
                ownerId: userId,
                status,
                description
            }
        });

        return {success: "Create Edited Category Success", edited: newVideo};
    }
};

export const createNewAnimationVersion = async (values: z.infer<typeof VideoVersionSchema>, type: string) => {
    const validateFields = VideoVersionSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "invalid field!" };
    }

    const { label, muxUploadId, muxPlaybackId, thumbnailUrl, videoId } = validateFields.data;

    if (type === "animation") {
        const existingVersions = await db.animationVersion.findMany({
            where: { animationId: videoId }
        });

        const labelTaken = existingVersions.some((item) => item.label === label);
        if (labelTaken) {
            return { error: "animation version label already in use!" };
        }

        const newVideoVersion = await db.animationVersion.create({
            data: {
                label,
                muxUploadId,
                muxPlaybackId,
                thumbnailUrl,
                animationId: videoId,
                versionNumber: existingVersions.length + 1,
            }
        });

        return { success: "Create Video Version Success", videoVersion: newVideoVersion };
    }

    return { error: "invalid type!" };
};


export const createNewFootageVersion = async (values: z.infer<typeof VideoVersionSchema>, type: string) => {
    const validateFields = VideoVersionSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "invalid field!" };
    }

    const { label, muxUploadId, muxPlaybackId, thumbnailUrl, videoId } = validateFields.data;

    if(type === "footage") {
         const existingVersions = await db.footageVersion.findMany({
            where: { footageId: videoId }
        });

        const labelTaken = existingVersions.some((item) => item.label === label);
        if (labelTaken) {
            return { error: "footage version label already in use!" };
        }

        const newVideoVersion = await db.footageVersion.create({
            data: {
                label,
                muxUploadId,
                muxPlaybackId,
                thumbnailUrl,
                footageId: videoId,
                versionNumber: existingVersions.length + 1,
            }
        });

        return { success: "Create Video Version Success", videoVersion: newVideoVersion };
    }

    return { error: "invalid type!" };
};

export const createNewEditedVersion = async (values: z.infer<typeof VideoVersionSchema>, type: string) => {
    const validateFields = VideoVersionSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "invalid field!" };
    }

    const { label, muxUploadId, muxPlaybackId, thumbnailUrl, videoId } = validateFields.data;

    if(type === "edited") {
         const existingVersions = await db.editedVersion.findMany({
            where: { editedId: videoId }
        });

        const labelTaken = existingVersions.some((item) => item.label === label);
        if (labelTaken) {
            return { error: "edited version label already in use!" };
        }

        const newVideoVersion = await db.editedVersion.create({
            data: {
                label,
                muxUploadId,
                muxPlaybackId,
                thumbnailUrl,
                editedId: videoId,
                versionNumber: existingVersions.length + 1,
            }
        });

        return { success: "Create Video Version Success", videoVersion: newVideoVersion };
    }

    return { error: "invalid type!" };
};