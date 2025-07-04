// @ts-nocheck
import { FetchLayoutDocument, MenuItemFragment } from '@/generated/discovery/graphql';
import { apiRequest } from '@/utils/api-request';
import Link from 'next/link';
import { CommandPalette } from '@/components/command-palette';

type NavigationProps = {
    className?: string;
    withSearch?: boolean;
};

const fetchNavigation = async () => {
    try {
        const response = await apiRequest(FetchLayoutDocument);

        // Try to parse navigation from GraphQL response
        const navigation = (response.data as any)?.browse?.header?.hits?.[0]?.children?.hits?.reduce((acc, nav) => {
            const link = nav?.link;
            const href = link?.url || link?.item?.items?.[0]?.path;
            if (href && nav?.name) {
                acc.push({ href, name: nav.name });
            }
            return acc;
        }, []);

        return { navigation: navigation || [] };
    } catch (error) {
        console.warn('Navigation GraphQL query failed, using fallback navigation:', error);
        // Fallback navigation for Norko
        return {
            navigation: [
                { href: '/', name: 'Home' },
                { href: '/shop', name: 'Products' },
                { href: '/contact', name: 'Contact' }
            ]
        };
    }
};

export const Navigation = async ({ className, withSearch }: NavigationProps) => {
    const { navigation } = await fetchNavigation();

    return (
        <div className={className}>
            {navigation?.map(({ href, name }) => (
                <Link
                    href={href}
                    className="h-full flex items-center"
                    key={name}
                    data-testid={`navigation-link-${name.toLowerCase()}`}
                >
                    {name}
                </Link>
            ))}
            {withSearch && <CommandPalette />}
        </div>
    );
};
