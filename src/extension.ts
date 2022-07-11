// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { generateDataLayer } from './commands/data-layer/generate-data-layer.command';
import { generateDatasource } from './commands/data-layer/generate-datasource.command';
import { generateModel } from './commands/data-layer/generate-model.command';
import { generateDomainLayer } from './commands/domain-layer/generate-domain-layer.command';
import { generateEntity } from './commands/domain-layer/generate-entity.command';
import { generateRepositoryInterface } from './commands/domain-layer/generate-repository.command';
import { generateUsecase } from './commands/domain-layer/generate-usecase.command';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('flutter-clean-arch.generateUsecase', generateUsecase),
		vscode.commands.registerCommand('flutter-clean-arch.generateEntity', generateEntity),
		vscode.commands.registerCommand('flutter-clean-arch.generateRepositoryInterface', generateRepositoryInterface),
		vscode.commands.registerCommand('flutter-clean-arch.generateDomainLayer', generateDomainLayer),
		vscode.commands.registerCommand('flutter-clean-arch.generateModel', generateModel),
		vscode.commands.registerCommand('flutter-clean-arch.generateDatasource', generateDatasource),
		vscode.commands.registerCommand('flutter-clean-arch.generateDataLayer', generateDataLayer),
	);
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "flutter-clean-arch" is now active!');

}

// this method is called when your extension is deactivated
export function deactivate() {}

export function toSnakeCase(str: string):string {
	return str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

}