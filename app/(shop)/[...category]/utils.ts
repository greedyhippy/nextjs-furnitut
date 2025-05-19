import { TenantFilter } from '@/generated/graphql';
import { PRICE_FIELD } from './constants';

interface BuildFilterCriteriaProps {
    priceRange?: string;
    parentPath?: string;
    stock?: string;
}

export function buildFilterCriteria({ stock, parentPath, priceRange }: BuildFilterCriteriaProps): TenantFilter {
    // @ts-expect-error
    const filterCriteria: TenantFilter = {};

    if (parentPath) {
        // @ts-expect-error
        filterCriteria.parentPaths = {
            equals: parentPath,
        };
    }

    if (stock) {
        // @ts-expect-error
        filterCriteria[stock] = {
            exists: true,
        };
    }

    if (priceRange) {
        const [min = '', max = ''] = priceRange.split(',');

        filterCriteria[PRICE_FIELD] = {
            // @ts-expect-error
            range: {
                gte: Number(min),
                ...(max ? { lt: Number(max) } : {}),
            },
        };
    }

    return filterCriteria;
}
