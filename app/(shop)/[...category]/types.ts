export type SortingOption = 'popular' | 'rating' | 'newest' | 'priceLow' | 'priceHigh';

export interface FilterOption {
    value: string;
    label: string;
    count: number;
    checked: boolean;
}