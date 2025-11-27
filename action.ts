"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "./prisma";
import {z} from "zod";
import { revalidatePath } from "next/cache";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { imagekit } from "./app/utils";

export const likePost = async (postId:number)=>{
    const {userId} = await auth(); 

    if(!userId) return;

    const existingLike = await prisma.like.findFirst({
        where:{
            userId:userId,
            postId:postId,
        },
    });

    if(existingLike){
        await prisma.like.delete({
            where:{id:existingLike.id}
        })
    }else {
        await prisma.like.create({
            data:{userId, postId}
        })
    }
};

export const repost = async (postId:number)=>{
    const {userId} = await auth(); 

    if(!userId) return;

    const existingRepost = await prisma.post.findFirst({
        where:{
            userId:userId,
            repostId:postId,
        },
    });

    if(existingRepost){
        await prisma.post.delete({
            where:{id:existingRepost.id}
        })
    }else {
        await prisma.post.create({
            data: {userId, repostId:postId}
        })
    }
};

export const savePost = async (postId:number)=>{
    const {userId} = await auth(); 

    if(!userId) return;

    const existingSavedPost = await prisma.bookmarks.findFirst({
        where:{
            userId:userId,
            postId:postId,
        },
    });

    if(existingSavedPost){
        await prisma.bookmarks.delete({
            where:{id:existingSavedPost.id}
        })
    }else {
        await prisma.bookmarks.create({
            data:{userId, postId}
        })
    }
};

export const addComment = async (prevState:{success:boolean, error:boolean}, formData:FormData)=>{
    const {userId} = await auth();

    if(!userId) return {success:false, error:true};

     const postId = formData.get("postId")
    const desc = formData.get("desc")
    const username  = formData.get("username")

    const Comment = z.object({
        parentPostId: z.number(),
        desc: z.string().max(150),
    });

    const validatedFields = Comment.safeParse({
        parentPostId: Number(postId),
        desc,
    })


    if(!validatedFields.success){
        return{success:false,error:true}
    }

    try{
        await prisma.post.create({
             data: {
                ...validatedFields.data,
                userId,
             }
        });

        revalidatePath(`/${username}/status/${postId}`)

         return{success:true, error:false}

    }catch(err){
        console.log(err);
        
        return{success:false,error:true}
    }
}

export const addPost = async (
  prevState: { success: boolean; error: boolean },
  formData: FormData
) => {
  const { userId } = await auth();

  if (!userId) return { success: false, error: true };

  const desc = formData.get("desc");
  const file = formData.get("file") as File;

  const uploadFile = async (file: File): Promise<UploadResponse> => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    return new Promise((resolve, reject) => {
      imagekit.upload(
        {
          file: buffer,
          fileName: file.name,
          folder: "/posts",
       
        },
        function (error, result) {
          if (error) reject(error);
          else resolve(result as UploadResponse);
        }
      );
    });
  };

  const Post = z.object({
    desc: z.string().max(140),
    isSensitive: z.boolean().optional(),
  });

  const validatedFields = Post.safeParse({
    desc
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  let img = "";


  if (file.size) {
    const result: UploadResponse = await uploadFile(file);

    if (result.fileType === "image") {
      img = result.filePath;
   
    } 
  }

  console.log({
    ...validatedFields.data,
    userId,
    img,
  });

  try {
    await prisma.post.create({
      data: {
        ...validatedFields.data,
        userId,
        img,
      },
    });
    revalidatePath(`/home`);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
  return { success: false, error: true };
};

export const followUser = async (targetUserId:string)=>{
    const {userId} = await auth(); 

    if(!userId) return;

    const existingFollow = await prisma.follow.findFirst({
        where:{
            followerId:userId,
            followingId:targetUserId,
        },
    });

    if(existingFollow){
        await prisma.follow.delete({
            where:{id:existingFollow.id}
        })
    }else {
        await prisma.follow.create({
            data:{followerId: userId , followingId: targetUserId}
        })
    }
};
// export const addPost = async (prevState:{success:boolean, error:boolean}, formData:FormData)=>{
//     const {userId} = await auth();

//     if(!userId) return {success:false, error:true};

     
//     const desc = formData.get("desc");
//     const file = formData.get("file") as File;
    

//     const uploadFile = async (file:File)=>{


        
//     };
   

//     const Comment = z.object({
//         parentPostId: z.number(),
//         desc: z.string().max(150),
//     });

//     const validatedFields = Comment.safeParse({
//         parentPostId: Number(postId),
//         desc,
//     })


//     if(!validatedFields.success){
//         return{success:false,error:true}
//     }

//     try{
//         await prisma.post.create({
//              data: {
//                 ...validatedFields.data,
//                 userId,
//              }
//         });

//         revalidatePath(`/${username}/status/${postId}`)

//          return{success:true, error:false}

//     }catch(err){
//         console.log(err);
        
//         return{success:false,error:true}
//     }
// }