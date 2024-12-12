import { auth } from '@/auth';
import { FullWidthWrapper } from '@/components/animation-container';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

interface Props {
    children: React.ReactNode
}

const AuthLayout = async ({ children }: Props) => {
    const session = await auth();
    return (
        <>
        <Navbar session={session}/>
            {children}
        <Footer/>
        </>
        // <FullWidthWrapper>
            
        //     <main className="mx-auto w-full relative">{children}</main>
        // </FullWidthWrapper>
    );
};

export default AuthLayout
