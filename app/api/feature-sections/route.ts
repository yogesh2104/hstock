import { isDevCookies } from "@/config/api-endpoint";
import { db } from "@/db";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
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

    return NextResponse.json(featureSections, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error}, { status: 500 })
  }
}

export async function POST(request: Request) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req: request, secret, cookieName: isDevCookies });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { content, id, emailTitle } = body;

    if (!content) {
      return NextResponse.json({ error: "Editor content is required" }, { status: 400 });
    }

    const parsedContent =
      typeof content === "string" ? JSON.parse(content) : content;

    const html = generateHTML(parsedContent, [StarterKit]);

    if (id) {
      await db.featureSection.upsert({
        where: { id },
        update: { htmlContent: html, content: parsedContent, emailTitle },
        create: { htmlContent: html, content: parsedContent, emailTitle },
      });
    } else {
      await db.featureSection.create({
        data: {
          emailTitle,
          htmlContent: html,
          content: parsedContent,
        },
      });
    }

    return NextResponse.json(
      { message: "Saved successfully", emailTitle, htmlContent: html, content: parsedContent },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}


// export async function POST(request: Request) {
//   const secret = process.env.AUTH_SECRET;
//   const token = await getToken({ req:request , secret, cookieName: isDevCookies });

//   if (!token) {
//       return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
//   }
  
//   try {
//     const body = await request.json()
//     const { content , id, emailTitle } = body;

//     if (!content) {
//       return NextResponse.json({ error: 'HTML content is required' });
//     }
//     const parsedContent =
//     typeof content === "string"
//       ? JSON.parse(content)
//       : content
//     const html = generateHTML(parsedContent, [StarterKit])

//     if(id){
//       await db.featureSection.upsert({
//         where: { id },
//         update: { htmlContent:html,content:content, emailTitle },
//         create: { htmlContent:html,content:content, emailTitle },
//       });
//     }else{
//       await db.featureSection.create({
//         data:{
//           htmlContent:html,
//           content:content,
//           emailTitle
//         }
//       });
//     }



//     return NextResponse.json(body, { status: 201 })
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 })
//   }
// }


