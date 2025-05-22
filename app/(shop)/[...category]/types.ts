export type SortingOption = 'popular' | 'rating' | 'newest' | 'priceLow' | 'priceHigh';

export type FilterOption = {
    value: string;
    label: string;
    count: number;
    checked: boolean;
};
