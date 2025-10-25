import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { getToken } from 'next-auth/jwt';
import { isDevCookies } from '@/config/api-endpoint';

export async function POST(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret, cookieName: isDevCookies });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, videoData, titleId } = await req.json();

  try {
    if (titleId) {
      await db.video.createMany({
        data: videoData.map((vid: any) => ({
          titleId,
          videoSrc: vid.videoSrc,
          thumbnailSrc: vid.thumbnailSrc,
          thumbnailAlt: vid.thumbnailAlt,
          isActive: true,
        })),
      });

      return NextResponse.json({ message: "Videos Added Successfully" }, { status: 200 });
    } else {
      await db.title.create({
        data: {
          title,
          video: {
            create: videoData.map((vid: any) => ({
              videoSrc: vid.videoSrc,
              thumbnailSrc: vid.thumbnailSrc,
              thumbnailAlt: vid.thumbnailAlt,
              isActive: true,
            })),
          },
        },
      });

      return NextResponse.json({ message: "YouTube Video Save Successful" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed To Upload Video", data: error }, { status: 500 });
  }
}

// export async function PATCH(req:NextRequest){
//     const secret = process.env.AUTH_SECRET;
//     const token = await getToken({ req , secret, cookieName: isDevCookies });

//     if (!token) {
//         return NextResponse.json({ message: 'Unauthorized' },{ status:401 });
//     }

//     const { id } = await req.json()
//     const viderInfo = await db.video.findUnique({where:{id}})

//     try {
//         await db.video.update({
//             where:{ id},
//             data:{
//                 isActive:!viderInfo?.isActive
//             }
//         })

//         return NextResponse.json({ message:"Update Successfull" },{ status:200})
//     } catch (error) {
//         return NextResponse.json({ message:"Not Able To Update. Please Try Again Later." }, { status:500 })
//     }
// }

export async function PATCH(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret, cookieName: isDevCookies });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, isUpdateTitle, newTitle, isActiveToggle } = body;

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    if (isUpdateTitle) {
      if (!newTitle) {
        return NextResponse.json({ message: "newTitle is required" }, { status: 400 });
      }

      await db.title.update({
        where: { id },
        data: { title: newTitle },
      });

      return NextResponse.json({ message: "Title updated successfully" }, { status: 200 });
    }

    if (isActiveToggle) {
      const videoInfo = await db.video.findUnique({ where: { id } });
      if (!videoInfo) {
        return NextResponse.json({ message: "Video not found" }, { status: 404 });
      }

      await db.video.update({
        where: { id },
        data: { isActive: !videoInfo.isActive },
      });

      return NextResponse.json({ message: "Video status updated successfully" }, { status: 200 });
    }

    return NextResponse.json(
      { message: "No update action performed. Provide either isUpdateTitle or isActiveToggle." },
      { status: 400 }
    );
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ message: "Failed to update data", error }, { status: 500 });
  }
}

export async function GET(req:NextRequest){
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

export async function DELETE(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const token = await getToken({ req, secret, cookieName: isDevCookies });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id, isTitle } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: "Video ID is required" },
      { status: 400 }
    );
  }

  try {
    if (isTitle) {
      await db.video.deleteMany({
        where: { titleId: id },
      });

      await db.title.delete({
        where: { id },
      });
    }else{
      await db.video.delete({
        where: { id },
      });
    }

    return NextResponse.json(
      { message: isTitle ? "Video list deleted successfully":"Video deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete video", error },
      { status: 500 }
    );
  }
}