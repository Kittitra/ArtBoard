"use server";

import db from "@/lib/db"
import { OrganizationSchema } from "@/schemas"
import * as z from "zod"

export const createOrganization = async (value: z.infer<typeof OrganizationSchema>) => {
    const validateFields = OrganizationSchema.safeParse(value);

    if (!validateFields.success) {
        return {error: "invalid field!"};
    }

    const { name, ownerId } = value
    try{
        const newOrg = await db.organization.create({
            data: {
                name,
                ownerId,
                members: {
                    create: {
                        userId: ownerId,
                        role:"OWNER"
                    }
                }
            },
            include: {
                members: true
            }
        })

        return {success: "create organization success", org: newOrg}
    }catch(err){
        console.log(err)
    }
}

export const getOrganizationByUserId = async (userId: string) => {
    try{
        const orgData = await db.organization.findMany({
            where:{
                ownerId: userId
                
            },
            include: {
                members: true
            }
        });

        return orgData
    }catch(error){
        console.log(error)
    }
}