"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isLoggedIn = true;
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const providerFn = async() => {
      const res = await getProviders();
      setProviders(res)
    }
    providerFn();
  },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className="flex gap-2 flex-center">
        <Image src='/assets/images/icons-96.png' alt='logo' width={30} height={30} className="object-contain" />
        <p className="logo_text">EasyAIPrompt</p>
      </Link>
      <div className="sm:flex hidden">
        {isLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>Create Post</Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
            <Link href='/profile'>
              <Image src='/assets/images/icons-96.png' width={37} height={37} className='rounded-full' alt='profile' />
            </Link>
          </div>
        ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    Sign in
                  </button>
                ))}
            </>
        )}
      </div>
    </nav>
  )
}

export default Nav