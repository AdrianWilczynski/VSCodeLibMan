import * as vscode from 'vscode';

interface LibmanJson {
    defaultProvider?: string;
    libraries?: {
        library?: string;
    }[];
}

export async function defaultProvider(uri: vscode.Uri) {
    return (await read(uri)).defaultProvider;
}

export async function libraries(uri: vscode.Uri): Promise<string[]> {
    return (await read(uri)).libraries
        ?.filter(l => !!l.library)
        .map(l => l.library as string) || [];
}

async function read(uri: vscode.Uri) {
    const libmanJson = await vscode.workspace.openTextDocument(uri);
    return JSON.parse(libmanJson.getText()) as LibmanJson;
}