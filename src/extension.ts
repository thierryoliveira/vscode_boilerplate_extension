// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import { generateUsecase } from './commands/generate-usecase.command';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('flutter-clean-arch.generateUsecase', generateUsecase)
	);
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "flutter-clean-arch" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('flutter-clean-arch.generateDomainLayer', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Generate domain layer');
		
				const fileNameOptions: vscode.InputBoxOptions = {
					prompt: 'File name',
					placeHolder: 'type your file name, e.g. user',
				};
				vscode.window.showInputBox(fileNameOptions).then((fileName) => {
					if (fileName) {
						const folderPath = `/Users/thierry.oliveira/development/projects/vscode-extension/flutter-clean-arch/src/generated_code/lib/domain/entities`;
						const filePath = `${folderPath}/${fileName}Entity.dart`;
						const fileContent = `class ${fileName}Entity {
							//TODO: Implements entity properties

							//TODO: implements equality
						}`;
						// check if file exists
						if (fs.existsSync(folderPath)) {
							if (fs.existsSync(filePath)) {
								vscode.window.showErrorMessage(`File ${fileName}Entity already exists`);
							} else {
								fs.writeFileSync(filePath, fileContent);
								vscode.window.showInformationMessage(`File ${fileName}Entity created`);
							}
						} else {
							fs.mkdirSync(folderPath, { recursive: true });
							fs.writeFileSync(filePath, fileContent);
							vscode.window.showInformationMessage(`File ${fileName}Entity created`);
						}
					}
				}, (err) => {
					vscode.window.showErrorMessage(err);
				});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

export function camelToSnakeCase(str: string):string {
	return str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

}