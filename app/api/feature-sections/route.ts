import { isDevCookies } from "@/config/api-endpoint";
import { db } from "@/db";
import { tiptapExtensions } from "@/lib/tiptap";
import { generateHTML } from "@tiptap/html";
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

// export async function POST(request: Request) {
//   const secret = process.env.AUTH_SECRET;
//   const token = await getToken({ req: request, secret, cookieName: isDevCookies });

//   if (!token) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const body = await request.json();
//     const { content, id, emailTitle } = body;

//     if (!content) {
//       return NextResponse.json({ error: "Editor content is required" }, { status: 400 });
//     }

//     const parsedContent =
//       typeof content === "string" ? JSON.parse(content) : content;

//     const html = generateHTML(parsedContent,tiptapExtensions);

//     if (id) {
//       await db.featureSection.upsert({
//         where: { id },
//         update: { htmlContent: html, content: parsedContent, emailTitle },
//         create: { htmlContent: html, content: parsedContent, emailTitle },
//       });
//     } else {
//       await db.featureSection.create({
//         data: {
//           emailTitle,
//           htmlContent: html,
//           content: parsedContent,
//         },
//       });
//     }

//     return NextResponse.json(
//       { message: "Saved successfully", emailTitle, htmlContent: html, content: parsedContent },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error(error);
//     return NextResponse.json(
//       { error: error?.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: Request) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req: request, secret, cookieName: isDevCookies });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { htmlContent, emailTitle, id } = body;

    if (!htmlContent || !emailTitle) {
      return NextResponse.json({ error: "Email title and HTML content are required" }, { status: 400 });
    }

    // Upsert or create new record
    if (id) {
      await db.featureSection.upsert({
        where: { id },
        update: { emailTitle, htmlContent },
        create: { emailTitle, htmlContent },
      });
    } else {
      await db.featureSection.create({
        data: { emailTitle, htmlContent },
      });
    }

    return NextResponse.json({ message: "Saved successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("POST /feature-sections error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}


