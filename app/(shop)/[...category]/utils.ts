import { NumberFilter, StringFilter, TenantFilter } from '@/generated/discovery/graphql';
import { PRICE_FIELD } from './constants';
import { FilterOption } from './types';

const INFINITY_FALLBACK = Number.NEGATIVE_INFINITY;

type PriceRange = {
    min: number;
    max: number;
};

function parsePriceRangeString(range: string): PriceRange {
    const [min = '', max = ''] = range.split(',');
    return {
        min: min ? Number(min) : Number.POSITIVE_INFINITY,
        max: max ? Number(max) : Number.NEGATIVE_INFINITY,
    };
}

function processPriceRanges(priceRange: string | string[]): PriceRange {
    const ranges = Array.isArray(priceRange)
        ? priceRange.map(parsePriceRangeString)
        : [parsePriceRangeString(priceRange)];

    return {
        min: Math.min(...ranges.map((r) => r.min)),
        max: Math.max(...ranges.map((r) => r.max)),
    };
}

type StockFilter = {
    exists: boolean;
};

function buildStockFilter(stock: string | string[]): Record<string, StockFilter> {
    if (Array.isArray(stock)) {
        return stock.reduce<Record<string, StockFilter>>((acc, item) => {
            acc[item] = { exists: true };
            return acc;
        }, {});
    }

    return { [stock]: { exists: true } };
}

type BuildFilterCriteriaProps = {
    priceRange?: string | string[];
    parentPath?: string | string[];
    stock?: string | string[];
};

export function buildFilterCriteria({ stock, parentPath, priceRange }: BuildFilterCriteriaProps) {
    const filterCriteria = {} as TenantFilter;

    if (!stock && !parentPath && !priceRange) {
        return filterCriteria;
    }

    if (parentPath) {
        filterCriteria.parentPaths = {
            in: Array.isArray(parentPath) ? parentPath : [parentPath],
        } as StringFilter;
    }

    if (stock) {
        const stockFilters = Array.isArray(stock) ? { OR: buildStockFilter(stock) } : buildStockFilter(stock);
        Object.assign(filterCriteria, stockFilters);
    }

    if (priceRange) {
        filterCriteria[PRICE_FIELD] = buildPriceFilter(priceRange);
    }

    return filterCriteria;
}

function buildPriceFilter(priceRange: string | string[]): NumberFilter {
    const { min, max } = processPriceRanges(priceRange);
    return {
        range: {
            gte: min,
            ...(max !== INFINITY_FALLBACK ? { lt: max } : {}),
        },
    } as NumberFilter;
}

export function isChecked({ value, filterValue }: { value: string; filterValue: string | string[] | undefined }) {
    if (typeof filterValue === 'string') {
        return value === filterValue;
    }
    if (Array.isArray(filterValue)) {
        return filterValue.includes(value);
    }
    return false;
}

export type ParentPathFacet = Record<string, { count: number; label: string; filter: string }>;

export type StockLocation = {
    data: ParentPathFacet;
    label: string;
};

export function createStockFilterOptions(
    locations: StockLocation[],
    stock: string | string[] | undefined,
): FilterOption[] {
    return locations
        .map(({ data, label }) => {
            const [, value] = Object.entries(data)[0] || [];
            if (!value) return null;

            return {
                value: value.filter,
                label,
                count: value.count,
                checked: isChecked({
                    value: value.filter,
                    filterValue: stock,
                }),
            };
        })
        .filter((option): option is FilterOption => option !== null);
}

export function createAdjacentPairs<T>(array: T[]): { value: string; label: string }[] {
    return array.map((item, index) => {
        const nextElement = array[index + 1] ?? '+';

        return {
            value: nextElement === '+' ? `${item}` : `${item},${nextElement}`,
            label: nextElement === '+' ? `${item}${nextElement}` : `${item}-${nextElement}`,
        };
    });
}
