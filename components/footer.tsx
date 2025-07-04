import Link from 'next/link';
import { Suspense } from 'react';
import { Navigation } from './navigation';

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-24 border-t border-muted px-12 sm:px-24">
            <div className="max-w-(--breakpoint-2xl) mx-auto pt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <Link href="/" className="h-7 block">
                            <div className="bg-dark items-center inline-flex rounded-full px-6 py-3 h-10">
                                <span className="text-white font-bold text-lg">NORKO</span>
                            </div>
                            <span className="sr-only">Home</span>
                        </Link>

                        <p className="text-sm mt-8">Premium Infrared Heating Solutions</p>
                        <p className="text-sm mt-1">© {year} Norko AS</p>
                    </div>
                    <Suspense fallback={
                        <div className="flex flex-col gap-4 min-h-full text-base self-stretch items-stretch font-medium sm:mt-12">
                            <Link href="/" className="text-dark hover:text-accent">Home</Link>
                            <Link href="/shop" className="text-dark hover:text-accent">Products</Link>
                            <Link href="/contact" className="text-dark hover:text-accent">Contact</Link>
                        </div>
                    }>
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
