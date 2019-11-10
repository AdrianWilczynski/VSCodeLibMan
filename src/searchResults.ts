export const searchResultCount = 100;

export type SearchResultsProvider = (query: string) => Promise<string[]>;