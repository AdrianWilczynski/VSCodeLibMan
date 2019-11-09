import * as vscode from 'vscode';

export type SearchResultsProvider = (query: string) => Promise<string[]>;
export type Command = (uri?: vscode.Uri) => Promise<void>;

export const searchResultCount = 100;