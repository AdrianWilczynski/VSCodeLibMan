import * as vscode from 'vscode';
import * as path from 'path';
import { providers } from './libraryProviders';
import * as terminal from './terminal';
import * as searchBox from './searchBox';
import * as libmanJson from './libmanJson';

export type Command = (uri?: vscode.Uri) => Promise<void>;

export async function init(uri?: vscode.Uri) {
    const defaultProvider = await vscode.window.showQuickPick(providers, {
        placeHolder: '--default-provider'
    });

    const command = 'libman init';
    const defaultProviderOption = defaultProvider ? ` --default-provider ${defaultProvider.label}` : '';

    terminal.sendText(command + defaultProviderOption, uri && uri.fsPath);
}

export async function restore(uri?: vscode.Uri) {
    terminal.sendText('libman restore', path.dirname(uri!.fsPath));
}

export async function install(uri?: vscode.Uri) {
    const readDefaultProvider = await libmanJson.defaultProvider(uri!);

    const defaultProvider = providers.find(p => p.label === readDefaultProvider);

    const pickedProvider = await vscode.window.showQuickPick(providers, {
        placeHolder: '--provider'
    });

    const useDefaultProvider = !!defaultProvider && (!pickedProvider || defaultProvider === pickedProvider);
    const searchResultProvider = useDefaultProvider && defaultProvider && defaultProvider.searchResultProvider ? defaultProvider.searchResultProvider
        : !useDefaultProvider && pickedProvider && pickedProvider.searchResultProvider ? pickedProvider.searchResultProvider
            : undefined;

    const library = searchResultProvider && await searchBox.show('[libraryId]', searchResultProvider);

    const command = 'libman install ';
    const providerOption = !useDefaultProvider && pickedProvider ? `--provider ${pickedProvider.label} ` : '';
    const libraryArgument = library || '';

    terminal.sendText(command + providerOption + libraryArgument, path.dirname(uri!.fsPath));
}

export async function uninstall(uri?: vscode.Uri) {
    const installedLibraries = await libmanJson.libraries(uri!);

    const pickedLibrary = await vscode.window.showQuickPick(installedLibraries, {
        placeHolder: '[libraryId]'
    });

    const command = 'libman uninstall ';
    const libraryArgument = pickedLibrary || '';

    terminal.sendText(command + libraryArgument, path.dirname(uri!.fsPath));
}

export async function clean(uri?: vscode.Uri) {
    terminal.sendText('libman clean', path.dirname(uri!.fsPath));
}