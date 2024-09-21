import {Input} from "@/components/ui/input.tsx";
import {Loader2, LockKeyhole, Mail} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {userLoginSchema} from "@/schema/userSchema.ts";
import {useUserStore} from "@/stores/useUserStore.ts";

interface LoginInputState {
  email: string,
  password: string,
}

const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: '',
    password: '',
  });

  const {loading, login} = useUserStore();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Partial<LoginInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setInput({...input, [name]: value});
  }

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const dto = userLoginSchema.safeParse(input);
    if (!dto.success) {
      const fieldError = dto.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<LoginInputState>);
      return;
    }
    await login(input);
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
        <div className='mb-4'>
          <h1 className='font-bold text-2xl'>PatelEats</h1>
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
              : (<Button type='submit' className='w-full'>Login</Button>)
          }
        </div>
        <Separator/>
        <p className='mt-2'>
          Don't have an account?{' '}
          <Link to="/signup" className='text-blue-500'>Sign up</Link>
        </p>
      </form>
    </div>
  )
}

export default Login;