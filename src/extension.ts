import * as vscode from 'vscode';
import * as commands from './commands';
import * as exceptionHandler from './exceptionHandler';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('libman.init', exceptionHandler.handle(commands.init)),
		vscode.commands.registerCommand('libman.restore', exceptionHandler.handle(commands.restore)),
		vscode.commands.registerCommand('libman.install', exceptionHandler.handle(commands.install)),
		vscode.commands.registerCommand('libman.uninstall', exceptionHandler.handle(commands.uninstall)),
		vscode.commands.registerCommand('libman.clean', exceptionHandler.handle(commands.clean)));
}

export function deactivate() { }

