import * as vscode from 'vscode';

let terminal: vscode.Terminal | undefined;

export async function sendText(text: string, cwd?: string) {
    if (terminal) {
        terminal.dispose();
    }

    terminal = vscode.window.createTerminal({
        name: 'LibMan',
        cwd: cwd
    });
    terminal.sendText(text, false);
    terminal.show();
}