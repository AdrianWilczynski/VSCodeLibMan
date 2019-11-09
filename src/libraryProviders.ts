import * as vscode from 'vscode';
import { SearchResultsProvider } from "./common";
import * as cdnjs from './cdnjs';
import * as npm from './npm';

interface LibraryProvider {
    label: string;
    searchResultProvider?: SearchResultsProvider;
}

export const providers: (LibraryProvider & vscode.QuickPickItem)[] = [
    {
        label: 'cdnjs',
        searchResultProvider: cdnjs.search
    },
    {
        label: 'jsdelivr',
        searchResultProvider: npm.search

    },
    {
        label: 'unpkg',
        searchResultProvider: npm.search
    },
    {
        label: 'filesystem'
    }
];