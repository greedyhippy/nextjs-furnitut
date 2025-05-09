interface PriceFilter {
    count: number;
    filter: string;
}

interface PriceRangeData {
    [key: string]: PriceFilter;
}

export interface TransformedRange {
    min: number;
    max: number | undefined;
    count: number;
}

export function transformPriceRanges(data: PriceRangeData): TransformedRange[] {
    return Object.entries(data)
        .map(([key, value]) => {
            if (key === 'other') {
                return {
                    min: 50,
                    max: undefined,
                    count: value.count,
                };
            }

            const min = parseInt(key);
            const max = min + 5;

            return {
                min,
                max,
                count: value.count,
            };
        })
        .sort((a, b) => {
            if (a.max === undefined) return 1;
            if (b.max === undefined) return -1;
            return a.max - b.max;
        });
}
