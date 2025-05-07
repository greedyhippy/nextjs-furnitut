import { FetchCategoryDocument, FetchItemShapeDocument } from '@/generated/graphql';
import { apiRequest } from '@/utils/api-request';
import { Product } from '@/components/product';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Blocks } from '@/components/blocks';
import ProductPage from '@/components/ProductPage';
import classnames from 'classnames';
import Link from 'next/link';

interface CategoryOrProductProps {
    params: Promise<{ slug: string; category: string[] }>;
    searchParams: Promise<Record<string, string>>;
}

interface FetchCategoryProps {
    path: string;
    limit?: number;
    skip?: number;
}

const fetchCategory = async ({ path, limit = 25, skip = 0 }: FetchCategoryProps) => {
    const response = await apiRequest(FetchCategoryDocument, { path, limit, skip });
    const { blocks, breadcrumbs, name, children } = response.data.browse?.category?.hits?.[0] ?? {};

    return {
        name,
        blocks,
        breadcrumbs: breadcrumbs?.[0]?.filter((item) => !!item),
        categories: children?.hits?.filter((item) => item?.shape === 'category'),
        products: children?.hits?.filter((item) => item?.shape === 'product'),
    };
};

type ItemShape = 'category' | 'product' | null;

const fetchItemShape = async (path: string): Promise<ItemShape> => {
    const response = await apiRequest(FetchItemShapeDocument, { path });

    const itemShape = response?.data?.search?.hits?.[0]?.shape;

    if (!itemShape) {
        return null;
    }

    return itemShape as ItemShape;
};

export default async function CategoryOrProduct(props: CategoryOrProductProps) {
    const params = await props.params;
    const path = `/${params.slug}/${params.category.join('/')}`;

    const itemShape = await fetchItemShape(path);

    if (!itemShape) {
        // TODO: do a proper not found section
        return <div>Nothing found</div>;
    }

    if (itemShape === 'product') {
        return <ProductPage params={props.params} searchParams={props.searchParams} />;
    }
    const { breadcrumbs, name, categories, blocks, products } = await fetchCategory({ path });

    /**
     *  TODO:
     *  - pagination
     *  - proper categories section
     */

    return (
        <main>
            <div className="page  pb-6">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <h1 className="text-4xl font-bold py-4">{name}</h1>
            </div>
            <div className={classnames('flex flex-col items-center pt-12', !!blocks?.length && 'pb-12')}>
                <Blocks blocks={blocks} />
            </div>
            {/* Categories TODO: beautify */}
            <div className={classnames('grid grid-cols-4 gap-2 max-w-(--breakpoint-2xl) mx-auto')}>
                {categories?.map((child) => (
                    <Link href={child?.path} key={child?.id}>
                        {child?.name}
                    </Link>
                ))}
            </div>

            {/* Products */}
            <div className={classnames('grid grid-cols-4 gap-2 max-w-(--breakpoint-2xl) mx-auto')}>
                {products?.map((child) => <Product key={child?.path} product={child} />)}
            </div>
        </main>
    );
}
