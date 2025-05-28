import Link from 'next/link';
import { Suspense } from 'react';
import { Navigation } from './navigation';
import Image from 'next/image';
import Logo from '@/assets/roxtec_logo_black_blue_rgb_fixed.svg';

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-24 border-t border-muted px-12 sm:px-24">
            <div className="max-w-(--breakpoint-2xl) mx-auto pt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <Link href="/" className="h-7 block">
                            <Image src={Logo} alt="Roxtec Logo" className="h-8 w-auto" />
                            <span className="sr-only">Home</span>
                        </Link>

                        <p className="text-sm mt-8 ">Organization No. 9999999</p>
                        <p className="text-sm mt-1">© {year} Crystallize AS</p>
                    </div>
                    <Suspense fallback={null}>
                        <Navigation className="flex flex-col gap-4 min-h-full text-base self-stretch items-stretch font-medium sm:mt-12" />
                    </Suspense>
                </div>
            </div>
            <div className="max-w-(--breakpoint-2xl) mx-auto py-24 sm:py-48">
                This commerce site is built for demo purposes, no real shopping will happen here
            </div>
        </footer>
    );
};
