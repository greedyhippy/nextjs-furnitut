import { PDFViewer, ProductPDF } from '@/components/pdf';
import { fetchProductDataForPDF } from '@/components/pdf/utils';
type PDFProps = {
    params: Promise<{ slug: string[] }>;
};
export const PDF = async ({ params }: PDFProps) => {
    const { slug } = await params;
    slug.pop();
    const path = `/${slug.join('/')}`;

    const productData = await fetchProductDataForPDF(path);
    const { variants } = productData;
    if (!variants || !variants.length) {
        return (
            <div className="h-screen w-full flex justify-center items-center font-bold">
                No support for this shape type
            </div>
        );
    }
    return (
        <div className="min-h-screen w-full">
            <PDFViewer className="min-h-screen w-full">
                <ProductPDF product={productData} />
            </PDFViewer>
        </div>
    );
};

export default PDF;
