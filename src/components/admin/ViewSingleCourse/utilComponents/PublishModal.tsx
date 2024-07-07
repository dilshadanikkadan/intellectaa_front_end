"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { publishCourseHelper } from '@/helpers/course/courseApiHelper';

const PublishModal = () => {
    const {id} = useParams()
    console.log("###################",id);
const router = useRouter()

    const {mutate:publishMutate} = useMutation({
        mutationFn:publishCourseHelper,
        onSuccess:(data)=>{
            router.push('/admin/courses')
        }
    })
    const queryClient = useQueryClient()
    const handlePublish = () => {
        console.log("Publishing...");
        publishMutate({
            id
        })
        queryClient.invalidateQueries(["allCourses"] as any);

    };

    return (
        <div>
            <Dialog>
                <DialogTrigger className="underline">Publish</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are You sure want To Publish This ?</DialogTitle>
                        <DialogDescription className='flex justify-end'>
                            <DialogClose asChild>
                                <button 
                                    onClick={handlePublish}
                                    className='py-2 px-5 rounded-md bg-gray-400 text-black'
                                >
                                    Yes
                                </button>
                            </DialogClose>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PublishModal