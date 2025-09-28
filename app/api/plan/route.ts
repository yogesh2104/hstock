import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { getToken } from 'next-auth/jwt';
import { isDevCookies } from '@/config/api-endpoint';

export async function POST(req: NextRequest) {
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req , secret, cookieName: isDevCookies });

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
    }
    const { name,logo,price, description, buttonText, popular, features, planID } = await req.json()

    const getPlan = await db.plan.findMany({ 
       orderBy:{
        position:"desc"
       }
    })

    try {
        await db.plan.create({
            data:{
                name,
                logo,
                planID,
                price:Number(price),
                description,
                buttonText,
                popular,
                features,
                position:getPlan ? getPlan[0]?.position + 1 : 0
            },
        })

        return NextResponse.json({ message: 'Plan Save Successfull' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed To Save Plan', data:error }, { status: 500 });
    }
}

export async function PATCH(req:NextRequest){
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req , secret, cookieName: isDevCookies });

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
    }

    const { id } = await req.json()
    const planInfo = await db.plan.findUnique({where:{id}})

    try {
        await db.plan.update({
            where:{ id},
            data:{
                name :"",
                price :0,     
                description:"",   
                buttonText :"",
                popular:false,
                features:[""]
            }
        })

        return NextResponse.json({ message:"Update Successfull" },{ status:200})
    } catch (error) {
        return NextResponse.json({ message:"Not Able To Update. Please Try Again Later." }, { status:500 })
    }
}

export async function DELETE(req: NextRequest) {
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req, secret, cookieName: isDevCookies });

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
        }

        const planExists = await db.plan.findUnique({ where: { id } });

        if (!planExists) {
            return NextResponse.json({ message: "Plan not found" }, { status: 404 });
        }

        await db.plan.delete({ where: { id } });

        return NextResponse.json({ message: "Plan deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ message: "Failed to delete plan", error }, { status: 500 });
    }
}


export async function GET(req:NextRequest){
    try {
        const findPlan = await db.plan.findMany({ 
            orderBy:{
             position:"asc"
            }
         })

        if(!findPlan){
            return NextResponse.json({message: "Plan Data" , data:[] } , { status: 404 })
        }

        return NextResponse.json({ message : "Plan Link", data: findPlan} , { status : 200 })
        
    } catch (error) {
        return NextResponse.json({ message: "Fail To Get Plan" , data : [] } , { status : 500 })
    }
}