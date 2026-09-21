"use server";

import * as z from "zod"
import bcrypt from "bcryptjs"
import { ProjectSchema } from "@/schemas";
import db from "@/lib/db";

export const createProject = async (values: z.infer<typeof ProjectSchema>) => {
    const validateFields = ProjectSchema.safeParse(values);

    if (!validateFields.success) {
        return {error: "invalid field!"};
    }

    const { name, userId } = validateFields.data;

    const newProject = await db.project.create({
        data: {
            name,
            projectMembers:{
                create: [
                    {
                        userId,
                        role: "owner",
                    },
                ]
            }
        }
    })

    return {success: "Create Project Success", project: newProject};
}


