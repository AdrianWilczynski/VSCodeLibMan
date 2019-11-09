import * as vscode from 'vscode';
import { SearchResultsProvider } from './common';

export async function show(placeHolder: string, resultsProvider: SearchResultsProvider) {
    let query: string | undefined;
    let picked: string | undefined;

    do {
        query = await vscode.window.showInputBox({
            value: query,
            placeHolder: placeHolder
        });
        if (!query) {
            return;
        }

        const results = await resultsProvider(query);
        if (results.length === 0) {
            continue;
        }

        picked = await vscode.window.showQuickPick(results);
        if (picked) {
            return picked;
        }
    } while (true);
}