import {Link} from "react-router-dom";
import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
  Bell,
  HandPlatter,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed
} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import React, {useEffect, useRef, useState} from "react";
import Notification from "@/components/Notification.tsx";
// import {io} from "socket.io-client";

// const socket = io('http://localhost:3000');

const NavBar = () => {
  const admin = true;
  const [open, setOpen] = useState(false);
  const dropdownRef: React.MutableRefObject<any> = useRef(null);
  // const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-between h-14'>
        <Link to="/">
          <h1 className='font-bold md:font-extrabold text-2xl'>PatelEats</h1>
        </Link>
        <div className='hidden md:flex items-center gap-10'>
          <div className='hidden md:flex items-center gap-6'>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/order/status">Order</Link>
            {
              admin && (
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>
                      Dashboard
                    </MenubarTrigger>
                    <MenubarContent>
                      <Link to="/admin/restaurant">
                        <MenubarItem>
                          Restaurant
                        </MenubarItem>
                      </Link>
                      <Link to="/admin/menu">
                        <MenubarItem>
                          Menu
                        </MenubarItem>
                      </Link>
                      <Link to="/admin/orders">
                        <MenubarItem>
                          Order
                        </MenubarItem>
                      </Link>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              )
            }
          </div>
          <div className='flex items-center gap-4'>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun
                      className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <Moon
                      className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Link to="/cart" className='relative cursor-pointer'>
                <ShoppingCart/>
                <Button
                  size={'icon'}
                  className='absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-500'>
                  5
                </Button>
              </Link>
            </div>
            <div className="bell-dropdown" ref={dropdownRef}>
              <div onClick={handleToggle} className="bell-icon">
                <Bell/>
              </div>

              {(open &&
                <div className="dropdown-menu">
                  <Notification />
                </div>
              )}
            </div>
            <div>
              <Avatar>
                <AvatarImage/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <Button>Logout</Button>
            </div>
          </div>
        </div>
        {/* Mobile */}
        <div className='md:hidden lg:hidden'>
          <MobileNavBar/>
        </div>
      </div>
    </div>
  )
}

export default NavBar;

const MobileNavBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={'icon'} variant="outline">
          <Menu size={'18'}/>
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader className='flex flex-row items-center justify-between'>
          <SheetTitle>PatelEats</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun
                  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                <Moon
                  className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator/>

        <SheetDescription className='flex-1'>
          <Link to="/profile" className='flex items-center gap-4 cursor-pointer py-2'>
            <User/>
            <span>Profile</span>
          </Link>
          <Link to="/profile" className='flex items-center gap-4 cursor-pointer py-2'>
            <HandPlatter/>
            <span>Order</span>
          </Link>
          <Link to="/profile" className='flex items-center gap-4 cursor-pointer py-2'>
            <ShoppingCart/>
            <span>Cart (0)</span>
          </Link>
          <Link to="/profile" className='flex items-center gap-4 cursor-pointer py-2'>
            <SquareMenu/>
            <span>Menu</span>
          </Link>
          <Link to="/profile" className='flex items-center gap-4 cursor-pointer py-2'>
            <UtensilsCrossed/>
            <span>Restaurant</span>
          </Link>
          <Link to="/profile" className='flex items-center gap-4 cursor-pointer py-2'>
            <PackageCheck/>
            <span>Restaurant Orders</span>
          </Link>
        </SheetDescription>

        <SheetFooter className='flex flex-col gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <Avatar>
              <AvatarImage/>
              <AvatarFallback>
                CN
              </AvatarFallback>
            </Avatar>
            <h1 className='font-bold'>Patel MernStack</h1>
          </div>
          <SheetClose asChild>
            <Button type="submit">Log out</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}