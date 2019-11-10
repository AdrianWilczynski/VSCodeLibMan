import * as vscode from 'vscode';
import { Command } from './commands';

export function handle(action: Command): Command {
    return async (uri?: vscode.Uri) => {
        try {
            await action(uri);
        } catch (err) {
            if (err instanceof Error && err.message) {
                vscode.window.showErrorMessage(`LibMan extension encountered an error: "${err.message}".`);
            }
        }
    };
}