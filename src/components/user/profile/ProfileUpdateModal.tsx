"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { UseCloudinaryImage } from "@/hooks/UseCloudinaryImage";
import { useMutation } from "@tanstack/react-query";
import { userPrfilePatchHelper } from "@/helpers/user/userApiHelper";

export function EditProfile() {
  const user = useUserStore(state => state.user);
  const [profileImage, setProfileImage] = useState(user?.profile || "/avt.png");
  const [username, setUsername] = useState(user?.username || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastaName] = useState(user?.lastaName || "");
  const [uploadProgress, setUploadProgress] = useState(0);
const loginSucees = useUserStore(state=> state.loginSuccess)
  const handleImageUpload = async (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await UseCloudinaryImage(file, setUploadProgress);
      if (imageUrl) {
        setProfileImage(imageUrl);  
      }
    }
  };

  const {mutate:profileUpdateMutate,}= useMutation({
    mutationFn:userPrfilePatchHelper,
    onSuccess:(data)=>{
         console.log("______________________________",data?.payload);
         loginSucees(data?.payload)
    }
  })
  const handleSaveChanges = () => {
    const updatedUser = {
      username,
      firstName,
      lastName,
      profile:profileImage,
    };

    console.log({
      ...updatedUser,
      userId:user?._id
    });
    
    profileUpdateMutate({
        ...updatedUser,
        userId:user?._id
    })
      
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>Edit Profile</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profile" className="text-right">
              Profile
            </Label>
            <img
              src={profileImage}
              className="w-14 h-14 rounded-full object-cover"
              alt="Profile"
            />
            <div className="flex flex-col">
              <div className="rounded-md p-4">
                <label
                  htmlFor="upload-profile"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <CloudUploadIcon />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <span>{uploadProgress}%</span>
                  )}
                </label>
                <input
                  id="upload-profile"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              FirstName
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              lastName
            </Label>
            <Input
              id="firstName"
              value={lastName}
              onChange={(e) => setLastaName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}