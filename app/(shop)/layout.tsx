import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartProvider } from '@/components/cart/cart-provider';

type ShopLayoutProps = { children: React.ReactNode };

export default async function ShopLayout({ children }: ShopLayoutProps) {
    return (
        <CartProvider>
            <Header />
            {children}
            <Footer />
        </CartProvider>
    );
}
