import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Loader2, LocateIcon, Mail, MapPin, MapPinnedIcon, Plus} from "lucide-react";
import {FormEvent, useRef, useState} from "react";
import * as React from "react";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";

interface ProfileData {
  fullName: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  country: string,
  img: string,
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    img: '',
  });
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [selectedImg, setSelectedImg] = useState<string>("");

  const loading = false;

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = reader.result as string;
        setSelectedImg(img);
        setProfileData((prev) => ({
          ...prev,
          img,
        }))
      }
      reader.readAsDataURL(file);
    }
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value })
  }

  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(profileData)
  }

  return (
    <form onSubmit={updateProfileHandler} className='max-w-7xl mx-auto my-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar className='relative md:w-28 md:h-28 w-20 h-20'>
            <AvatarImage src={selectedImg}/>
            <AvatarFallback>CN</AvatarFallback>
            <input
              ref={imgRef}
              className='hidden'
              name='image'
              type='file'
              accept="image/*"
              onChange={fileChangeHandler}
            />
            <div
              onClick={() => imgRef.current?.click()}
              className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 hover:opacity-100'
            >
              <Plus className='text-white w-8 h-8'/>
            </div>
          </Avatar>
          <Input
            type='text'
            name={profileData.fullName}
            onChange={changeHandler}
            className='font-bold text-2xl outline-none border-none focus-visible:ring-transparent'
          />
        </div>
      </div>
      <div className='grid md:grid-cols-4 md:gap-2 gap-3 my-10'>
        <div className='flex items-center gap-4 rounded-sm p-2 bg-gray-200'>
          <Mail className='text-gray-500'/>
          <div className='w-full'>
            <Label>Email</Label>
            <input
              className='w-full text-gray-600 outline-none border-none'
              name='email'
              value={profileData.email}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className='flex items-center gap-4 rounded-sm p-2 bg-gray-200'>
          <LocateIcon className='text-gray-500'/>
          <div className='w-full'>
            <Label>Address</Label>
            <input
              className='w-full text-gray-600 outline-none border-none'
              name='address'
              value={profileData.address}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className='flex items-center gap-4 rounded-sm p-2 bg-gray-200'>
          <MapPin className='text-gray-500'/>
          <div className='w-full'>
            <Label>City</Label>
            <input
              className='w-full text-gray-600 outline-none border-none'
              name='city'
              value={profileData.city}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className='flex items-center gap-4 rounded-sm p-2 bg-gray-200'>
          <MapPinnedIcon className='text-gray-500'/>
          <div className='w-full'>
            <Label>Country</Label>
            <input
              className='w-full text-gray-600 outline-none border-none'
              name='country'
              value={profileData.country}
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
      <div className='text-center'>
        {
          loading
            ? (<Button><Loader2 className='mr-2 w-4 h-4 animate-spin'/>Please await...</Button>)
            : (<Button>Update</Button>)
        }
      </div>
    </form>
  )
}

export default Profile;