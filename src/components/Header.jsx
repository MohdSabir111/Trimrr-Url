import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from 'lucide-react';
import { UrlState } from '@/Context';
import useFetch from '@/hooks/useFetch';
import { Logout } from '@/db/apiAuth';
import { BarLoader, BeatLoader } from 'react-spinners';

function Header() {
    const navigate = useNavigate();
     const {user,fetchUser} = UrlState();
     const {loading, fn: fnLogout} = useFetch(Logout);

  return (  <>
    <nav className='py-4 flex justify-between item-center'>
         <Link to='/'>
         <img src='logo.png' className='h-16' alt='trimrr logo' />
         </Link>
         <div>
            {!user?
             <Button onClick={()=>navigate("/auth")}>Login</Button>    
             :( <DropdownMenu>
                <DropdownMenuTrigger className='rounded-full overflow-hidden w-10'>
                <Avatar>
     <AvatarImage src={user?.user_metadata?.profile_pic} className="object-contain" />
  <AvatarFallback>MS</AvatarFallback>
</Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LinkIcon  className='mr-2 h-4 w-4'></LinkIcon>
                    My Links</DropdownMenuItem>
                
                  <DropdownMenuItem className='text-red-400'>
                     <LogOut className='mr-2 h-4 w-4'></LogOut>
                     <span onClick={()=>{
                      fnLogout().then(()=>{
                        fetchUser();
                        navigate("/");
                      })
                    
                     }} >Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              )
        }
           
         </div>
         </nav>
           {loading && <BarLoader className="mb-4 " width={"100%"} color="#36d7b7" /> }
           </>
  )
}

export default Header
