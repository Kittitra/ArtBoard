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