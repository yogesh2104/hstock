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
    const { title, videoData } = await req.json()

    try {

        await db.title.create({
            data:{
                title,
                video:{
                    create:videoData.map((vid:any)=>({
                        videoSrc: vid.videoSrc,
                        thumbnailSrc: vid.thumbnailSrc,
                        thumbnailAlt: vid.thumbnailAlt,
                        isActive: true,
                    }))
                }
            },
            include:{
                video:true
            }
        })

        return NextResponse.json({ message: 'YouTube Video Save Successfull'}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed To Upload Video', data:error }, { status: 500 });
    }
}

export async function PATCH(req:NextRequest){
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req , secret, cookieName: isDevCookies });

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
    }

    const { id } = await req.json()
    const viderInfo = await db.video.findUnique({where:{id}})

    try {
        await db.video.update({
            where:{ id},
            data:{
                isActive:!viderInfo?.isActive
            }
        })

        return NextResponse.json({ message:"Update Successfull" },{ status:200})
    } catch (error) {
        return NextResponse.json({ message:"Not Able To Update. Please Try Again Later." }, { status:500 })
    }
}

export async function GET(req:NextRequest){
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req , secret, cookieName: isDevCookies });

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
    }

    const getFilterValueOrNot = req.nextUrl.searchParams.get('getFilter');
    try {
        
        const findVideo = await db.title.findMany({
            include:{
                video:!getFilterValueOrNot ? true:{
                    where:{
                        isActive:true
                    }
                }
            }
        })

        if(!findVideo){
            return NextResponse.json({message: "Video Data" , data:[] } , { status: 404 })
        }

        return NextResponse.json({ message : "Video Link", data: findVideo} , { status : 200 })
        
    } catch (error) {
        return NextResponse.json({ message: "Fail To Get Video Link" , data : [] } , { status : 500 })
    }
}