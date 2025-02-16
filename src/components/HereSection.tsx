import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import HereImage from '@/assets/hero_pizza.png';
import {useNavigate} from "react-router-dom";

const HereSection = () => {
  const [searchText, setSearchText] = useState<string>('');
  const navigate = useNavigate();

  return (
    <div className='flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20'>
      <div className='flex flex-col gap-10 md:w-[40%]'>
        <div className='flex flex-col gap-5'>
          <h1 className='font-bold md:font-extrabold md:text-5xl text-4xl'>Order Food anytime & anywhere</h1>
          <p className='text-gray-500'>Hey! Our Delicious food is waiting for you</p>
        </div>
        <div className='relative flex items-center gap-2 w-full'>
            <Input
              type='text'
              value={searchText}
              placeholder=''
              onChange={(e) => setSearchText(e.target.value)}
              className='pl-10 shadow-lg'
            />
            <Search className='text-gray-500 absolute inset-y-2 left-2'/>
          <Button onClick={() => navigate(`/search/${searchText}`)}>Search</Button>
        </div>
      </div>
      <div>
        <img
          src={HereImage}
          alt=''
          className='object-cover w-full max-h-[500px] max-w-[90%]'
        />
      </div>
    </div>
  )
}

export default HereSection;