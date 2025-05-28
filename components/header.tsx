import Link from 'next/link';
import { Suspense } from 'react';
import { CartButton } from './cart/cart-button';
import { Navigation } from './navigation';
import { MenuWrapper } from './menu-wrapper';
import Logo from '@/assets/roxtec_logo_black_blue_rgb_fixed.svg';
import Image from 'next/image';
export const Header = () => {
    return (
        <header className="fixed max-w-(--breakpoint-2xl) w-full top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-light border border-muted flex items-stretch rounded-full justify-between">
                <div className="flex items-stretch flex-1">
                    <Link href="/">
                        <div className="items-center inline-flex rounded-full my-2 mx-2 px-6 py-3 h-10">
                            <Image src={Logo} alt="Roxtec Logo" className="h-8 w-auto" />
                        </div>
                        <span className="sr-only">Home</span>
                    </Link>

                    <Suspense fallback={null}>
                        <MenuWrapper>
                            <Navigation
                                className="flex flex-col sm:flex-row  items-center gap-6 min-h-full text-base self-stretch  font-medium sm:pl-8"
                                withSearch
                            />
                        </MenuWrapper>
                    </Suspense>
                </div>

                <Link
                    href="/account"
                    className="flex items-center font-medium  border-x border-muted px-4 sm:px-6 gap-2 hover:bg-muted/20 active:bg-muted/40"
                    data-testid="account-button"
                >
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle
                            cx="12.6046"
                            cy="7.47778"
                            r="4"
                            stroke="#33363F"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M5.9425 18.7983C6.60358 16.0046 9.37634 14.4778 12.2472 14.4778H12.962C15.8329 14.4778 18.6056 16.0046 19.2667 18.7983C19.3946 19.3389 19.4963 19.9046 19.5535 20.4794C19.6082 21.029 19.1569 21.4778 18.6046 21.4778H6.60461C6.05233 21.4778 5.60103 21.029 5.65572 20.4794C5.71292 19.9046 5.81458 19.3389 5.9425 18.7983Z"
                            stroke="#33363F"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="max-sm:sr-only">Account</span>
                </Link>
                <CartButton />
            </div>
        </header>
    );
};
