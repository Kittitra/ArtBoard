import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
});

export const RegisterSchema = z.object({
    email: z.email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "6 charecter required"
    }),
    name: z.string().min(1, {
        message: "name is required"
    })
});

export const ScriptSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    userId: z.string().min(1, {
        message: "User ID is required"
    }),
    projectId: z.string().min(1, {
        message: "Project ID is required"
    })
});

export const ProjectSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    userId: z.string().min(1, {
        message: "User ID is required"
    }),
});

export const DesignCategorySchema = z.object({
    name: z.string().min(1, {
        message: "Category name is required"
    }),
    userId: z.string().min(1, {
        message: "User ID is required"
    }),
    projectId: z.string().min(1, {
        message: "Project ID is required"
    })
})

export const DesignSubCategorySchema = z.object({
    name: z.string().min(1, {
        message: "Design name is required"
    }),
    userId: z.string().min(1, {
        message: "User ID is required"
    }),
    categoryId: z.string().min(1, {
        message: "Category ID is required"
    })
})

export const DesignVersionSchema = z.object({
    name: z.string().min(1, {
        message: "Version name is required"
    }),
    subCategoryId: z.string().min(1, {
        message: "Subcategory ID is required"
    }),
    ownerId: z.string().min(1, {
        message: "Owner ID is required"
    })
})

export const VideoCategorySchema = z.object({
    name: z.string().min(1, {
        message: "Category name is required"
    }),
    userId: z.string().min(1, {
        message: "User ID is required"
    }),
    projectId: z.string().min(1, {
        message: "Project ID is required"
    }),
    type: z.string().min(1, {
        message: "Category type is required"
    })
    
})

export const VideoSchema = z.object({
    title: z.string().min(1, {
        message: "Video title is required"
    }),
    userId: z.string().min(1, {
        message: "User ID is required"
    }),
    categoryId: z.string().min(1, {
        message: "Category ID is required"
    }),
    status: z.string().min(1, {
        message: "status is required"
    }),
    description: z.string().min(1, {
        message: "description is required"
    }),  
})

export const VideoVersionSchema = z.object({
    label: z.string().min(1, {
        message: "Version label is required"
    }),
    muxUploadId: z.string().min(1, {
        message: "Mux Upload ID is required"
    }),
    muxPlaybackId: z.string().min(1, {
        message: "Mux Playback ID is required"
    }),
    thumbnailUrl: z.string().min(1, {
        message: "Thumbnail URL is required"
    }),
    videoId: z.string().min(1, {
        message: "Video ID is required"
    }),
})
