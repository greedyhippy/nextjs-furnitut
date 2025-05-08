import { FetchCategoryDocument, FetchItemShapeDocument, SearchCategoryDocument } from '@/generated/graphql';
import { apiRequest } from '@/utils/api-request';
import { Product } from '@/components/product';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Blocks } from '@/components/blocks';
import ProductPage from '@/components/ProductPage';
import classnames from 'classnames';
import Link from 'next/link';

const ITEMS_PER_PAGE = 25;

interface SearchParams {
    page?: string;
}

interface FetchCategoryProps {
    path: string;
    limit?: number;
    skip?: number;
}

const searchCategory = async ({ path, limit = 25, skip = 0 }: FetchCategoryProps) => {
    const response = await apiRequest(SearchCategoryDocument, { path: `${path}/*`, browsePath: path, limit, skip });
    const { hits, summary } = response.data.search ?? {};
    const { breadcrumbs, name, blocks, children } = response.data.browse?.category?.hits?.[0] ?? {};

    return {
        name,
        blocks,
        breadcrumbs: breadcrumbs?.[0]?.filter((item) => !!item),
        categories: children?.hits?.filter((item) => item?.shape === 'category'),
        products: hits?.filter((item) => item?.shape === 'product'),
        summary,
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

interface CategoryOrProductProps {
    params: Promise<{ slug: string; category: string[] }>;
    searchParams: Promise<SearchParams>;
}

export default async function CategoryOrProduct(props: CategoryOrProductProps) {
    const params = await props.params;
    const { page } = await props.searchParams;
    const currentPage = Number(page ?? 1);
    const limit = ITEMS_PER_PAGE;
    const skip = currentPage ? (currentPage - 1) * limit : 0;

    console.log({ skip, limit, page });
    const path = `/${params.slug}/${params.category.join('/')}`;

    const itemShape = await fetchItemShape(path);

    if (!itemShape) {
        // TODO: do a proper not found section
        return <div>Nothing found</div>;
    }

    if (itemShape === 'product') {
        return <ProductPage params={props.params} searchParams={props.searchParams} />;
    }
    // const { breadcrumbs, name, categories, blocks, products } = await fetchCategory({ path });
    const { breadcrumbs, name, categories, blocks, products, summary } = await searchCategory({ path, limit, skip });
    const { totalHits, hasPreviousHits, hasMoreHits } = summary ?? {};

    console.log({ breadcrumbs, name, categories, blocks, products, summary });

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
            {blocks && (
                <div className={classnames('flex flex-col items-center pt-12', !!blocks?.length && 'pb-12')}>
                    <Blocks blocks={blocks} />
                </div>
            )}

            {/* Categories TODO: beautify */}
            <div className={classnames('flex gap-4 max-w-(--breakpoint-2xl) mx-auto my-4')}>
                {categories?.map((child) => (
                    // @ts-expect-error
                    <Link className="bg-dark text-light rounded-full px-4 py-2" href={child?.path} key={child?.id}>
                        {/*@ts-expect-error*/}
                        {child?.name}
                    </Link>
                ))}
            </div>

            {/* Products */}
            <div className={classnames('grid grid-cols-4 gap-2 max-w-(--breakpoint-2xl) mx-auto my-8')}>
                {/*@ts-expect-error*/}
                {products?.map((child) => <Product key={child?.path} product={child} />)}
            </div>

            {totalHits && totalHits > ITEMS_PER_PAGE && (
                <Pagination
                    totalItems={totalHits ?? 0}
                    currentPage={currentPage}
                    hasPreviousPage={hasPreviousHits ?? false}
                    hasNextPage={hasMoreHits ?? false}
                    url={path}
                />
            )}
        </main>
    );
}

interface PaginationProps {
    totalItems: number;
    url: string;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

function Pagination({ totalItems, currentPage, hasPreviousPage, hasNextPage, url }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const previousPage = currentPage === 1 ? 1 : currentPage - 1;
    const nextPage = currentPage + 1;

    const getPageUrl = (page: number) => `${url}?page=${page}`;

    const renderPageNumbers = () => {
        const pages: (number | string)[] = [];
        const lastThreePages = [totalPages - 2, totalPages - 1, totalPages];

        // Determine the starting page for the first segment
        let startPage: number;
        if (currentPage <= 3) {
            startPage = 1;
        } else if (currentPage >= totalPages - 4) {
            startPage = totalPages - 6;
        } else {
            startPage = currentPage - 1;
        }

        // Add first three pages based on the start page
        for (let i = 0; i < 3; i++) {
            if (startPage + i <= totalPages - 3) {
                pages.push(startPage + i);
            }
        }

        // Add ellipsis if there's a gap
        // @ts-expect-error
        if (pages[pages.length - 1] < totalPages - 3) {
            pages.push('...');
        }

        // Add last three pages
        lastThreePages.forEach((page) => {
            if (page > 0 && !pages.includes(page)) {
                pages.push(page);
            }
        });

        return pages.map((page, index) => {
            if (page === '...') {
                return (
                    <span
                        key={`ellipsis-${index}`}
                        className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
                    >
                        ...
                    </span>
                );
            }

            return (
                <a
                    key={page}
                    href={getPageUrl(page as number)}
                    className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                        currentPage === page
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </a>
            );
        });
    };

    return (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 max-w-(--breakpoint-2xl) mx-auto">
            <div className="-mt-px flex w-0 flex-1">
                <a
                    href={getPageUrl(previousPage)}
                    className={`inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${!hasPreviousPage ? 'invisible' : ''}`}
                    aria-disabled={!hasPreviousPage}
                >
                    <svg
                        className="mr-3 size-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Previous
                </a>
            </div>
            <div className="hidden md:-mt-px md:flex">{renderPageNumbers()}</div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
                <a
                    href={getPageUrl(nextPage)}
                    className={`inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${!hasNextPage ? 'invisible' : ''}`}
                    aria-disabled={!hasNextPage}
                >
                    Next
                    <svg
                        className="ml-3 size-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </div>
        </nav>
    );
}
