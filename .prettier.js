module.exports = {
    trailingComma: 'none',
    tabWidth: 2,
    useTabs: true,
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    arrowParens: 'avoid',
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: [
        '<THIRD_PARTY_MODULES>',
        '^@/components/(.*)$',
        '^@/layout/(.*)$',
        '^@/ui/(.*)$',
        '^@/providers/(.*)$',
        '^@/shared/(.*)$',
        '^@/assets/(.*)$',
        '^@/config/(.*)$',
        '^@/store/(.*)$',
        '^@/hooks/(.*)$',
        '^@/types/(.*)$',
        '^@/utils/(.*)$',
        '^@/api/(.*)$',
        '^[./]'
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true
}
