import * as vscode from 'vscode';
import { SearchResultsProvider } from './searchResults';

export async function show(placeHolder: string, resultsProvider: SearchResultsProvider) {
    let query: string | undefined;

    do {
        query = await vscode.window.showInputBox({
            value: query,
            placeHolder: placeHolder
        });
        if (!query) {
            return;
        }

        const searchResults = await resultsProvider(query);
        if (searchResults.length === 0) {
            continue;
        }

        const picked = await vscode.window.showQuickPick(searchResults);
        if (picked) {
            return picked;
        }
    } while (true);
}