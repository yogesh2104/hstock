import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { getToken } from 'next-auth/jwt';
import { isDevCookies } from '@/config/api-endpoint';

interface boday{
    btnlink:string, 
    btnText:string,
    heroImageLink:string[]
}

export async function POST(req: NextRequest) {
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req , secret, cookieName: isDevCookies });

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
    }
    const { btnlink, btnText , heroImageLink }: boday = await req.json()

    try {

        await db.heroSection.create({
            data:{
                btnLink:btnlink,
                btnText:btnText,
                image:{
                    create:heroImageLink?.map((iLink)=>({
                        isActive:true,
                        imageLink:iLink
                    }))
                }
            }
        })

        return NextResponse.json({ message: "Successfull save" , data: {btnlink, btnText , heroImageLink}} , { status: 200})

    } catch (error) {
        return NextResponse.json({ error: 'Failed To Save Link ', data:error }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req, secret, cookieName: isDevCookies });

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id, show } = await req.json();

    const findHeroSection = await db.heroSection.findUnique({
        where: { id }
    });

    try {
        if (!findHeroSection) {
            return NextResponse.json({ message: "This item not found" }, { status: 404 });
        }

        if (show) {
            await db.heroSection.updateMany({
                where: { isShow: true },
                data: { isShow: false }
            });
        }

        await db.heroSection.update({
            where: { id },
            data: {
                isShow: show
            }
        });

        return NextResponse.json({ message: "Update Successful" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Not Able To Update. Please Try Again Later." }, { status: 500 });
    }
}


export async function GET(req:NextRequest){
    const getFilterValueOrNot = req.nextUrl.searchParams.get('getFilter');
    
    const filterCondition = getFilterValueOrNot
      ? { isShow: true }
      : undefined;

    try {
        const findHeroSection = await db.heroSection.findMany({
            where: filterCondition,
            include: {
                image: true,
            },
        });

        if (!findHeroSection || findHeroSection.length === 0) {
            return NextResponse.json(
              { message: 'No Hero Section Data found', data: [] },
              { status: 404 }
            );
        }

        return NextResponse.json({ message : "Hero Section Link", data: findHeroSection} , { status : 200 })
        
    } catch (error) {
        return NextResponse.json({ message: "Fail To Get Hero Section" , data : [] } , { status : 500 })
    }
}

export async function DELETE(req:NextRequest){
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req , secret, cookieName: isDevCookies });

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
    }

    try {
        const { id } = await req.json(); 
    
        const findHeroSection = await db.heroSection.findUnique({
            where: { id },
        });
    
        if (!findHeroSection) {
            return NextResponse.json({ message: 'This item not found' }, { status: 404 });
        }

        await db.heroSection.delete({
            where: { id },
        });
        

        return NextResponse.json({ message:"delete Successfull" } , { status:200})
    } catch (error) {
        return NextResponse.json({ message: 'Not able to delete. Please try again later.',error:error },{ status: 500 })
    }
}