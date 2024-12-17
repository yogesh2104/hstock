import { isDevCookies } from "@/config/api-endpoint";
import { db } from "@/db";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req:request , secret, cookieName: isDevCookies });

  if (!token) {
      return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
  }

  try {

    const featureSections = await db.featureSection.findMany();

    return NextResponse.json(featureSections, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error}, { status: 500 })
  }
}

export async function POST(request: Request) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req:request , secret, cookieName: isDevCookies });

  if (!token) {
      return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
  }
  
  try {
    const body = await request.json()
    const { htmlContent , id } = body;

    if (!htmlContent) {
      return NextResponse.json({ error: 'HTML content is required' });
    }

    if(id){
      await db.featureSection.upsert({
        where: { id },
        update: { htmlContent },
        create: { htmlContent },
      });
    }else{
      await db.featureSection.create({
        data:{
          htmlContent
        }
      });
    }



    return NextResponse.json(body, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}


