import * as z from 'zod';
export const SignupVaidation = z.object({
	username: z.string().min(2,{message : 'Too short'}).max(50),
    name: z.string().min(2,{message : 'Too short'}).max(50),
    email: z.string().email(),
    password: z.string().min(8,{message : 'Password must be at least 8 characters long'}),
});

export const SigninVaidation = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message : 'Password must be at least 8 characters long'}),
});

export const ProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    bio: z.string(),
  });



export const PostVaidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string(),
});