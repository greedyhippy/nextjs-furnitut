'use client';
import dynamic from 'next/dynamic';

export { ProductPDF } from './ProductPDF';

export const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((m) => m.PDFViewer), {
    ssr: false,
    loading: () => (
        <div className="h-screen w-full flex justify-center items-center flex-col font bold gap-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600"
                viewBox="0 0 24 24"
            >
                <path
                    d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                    data-original="#000000"
                />
            </svg>
            <span className="font-medium">Loading pdf...</span>
        </div>
    ),
});
