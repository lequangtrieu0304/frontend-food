import {Input} from "@/components/ui/input.tsx";
import {Loader2, LockKeyhole, Mail, User} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Link} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {userSignupSchema} from "@/schema/userSchema.ts";

interface SignUpInputState {
  fullName: string;
  email: string,
  password: string,
}

const SignUp = () => {
  const [input, setInput] = useState<SignUpInputState>({
    fullName: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<Partial<SignUpInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value});
  }

  const signupSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const dto = userSignupSchema.safeParse(input);
    if (!dto.success) {
      const fieldError = dto.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<SignUpInputState>);
      return;
    }

    console.log(input)
  }

  const loading = false;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={signupSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
        <div className='mb-4'>
          <h1 className='font-bold text-2xl'>PatelEats</h1>
        </div>
        <div className='mb-4'>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Full name'
              name='fullName'
              value={input.fullName}
              onChange={changeEventHandler}
              className='pl-10 focus-visible:ring-0'
            />
            <User className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
            {
              errors && <span className='text-sm text-red-500'>{errors.fullName}</span>
            }
          </div>
        </div>

        <div className='mb-4'>
          <div className='relative'>
            <Input
              type='email'
              placeholder='Email'
              name='email'
              value={input.email}
              onChange={changeEventHandler}
              className='pl-10 focus-visible:ring-0'
            />
            <Mail className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
            {
              errors && <span className='text-sm text-red-500'>{errors.email}</span>
            }
          </div>
        </div>

        <div className='mb-4'>
          <div className='relative'>
            <Input
              type='password'
              placeholder='Password'
              name='password'
              value={input.password}
              onChange={changeEventHandler}
              className='pl-10 focus-visible:ring-0'
            />
            <LockKeyhole className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
            {
              errors && <span className='text-sm text-red-500'>{errors.password}</span>
            }
          </div>
        </div>

        <div className='mb-10'>
          {
            loading
              ? <Button className='w-full'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>
              : (<Button type='submit' className='w-full'>Sign Up</Button>)
          }
        </div>
        <Separator/>
        <p className='mt-2'>
          Already have an account?{' '}
          <Link to="/login" className='text-blue-500'>Log In</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp;