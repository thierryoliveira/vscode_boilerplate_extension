import { InputBoxOptions, Uri, window } from "vscode";
import * as fs from 'fs';
import { toSnakeCase } from "../../extension";

export const generateUsecase = async (uri: Uri) => {
window.showInformationMessage("Generate usecase");
    const usecaseName = await promptForUsecaseName();
    if (!usecaseName || usecaseName.length === 0) {
        window.showErrorMessage('Please, provide a valid usecase name');
        return;
    }
    // check if usecases directory exists
    const usecasesPath = `${uri.fsPath}/usecases`;
    const usecaseInterfacePath = `${usecasesPath}/interfaces/${toSnakeCase(usecaseName)}.dart`;
    const usecaseImplementationPath = `${usecasesPath}/implementations/${toSnakeCase(usecaseName)}_impl.dart`;
    const interfacePath = usecaseInterfacePath.substring(0, usecaseInterfacePath.lastIndexOf('/'));
    const implementationPath = usecaseImplementationPath.substring(0, usecaseImplementationPath.lastIndexOf('/'));


    if (fs.existsSync(usecasesPath)) {
        if (fs.existsSync(interfacePath)) {
            if (fs.existsSync(usecaseInterfacePath)) {
            window.showErrorMessage(`Usecase ${usecaseName} already exists`);
            } else {
                createUsecaseInterfaceFile(usecaseName, usecaseInterfacePath);
            }
        } else {
            fs.mkdirSync(interfacePath, { recursive: true });
            createUsecaseInterfaceFile(usecaseName, usecaseInterfacePath);
        }

        if (fs.existsSync(implementationPath)) {
            if (fs.existsSync(usecaseImplementationPath)) {
            window.showErrorMessage(`Usecase ${usecaseName} already exists`);
            } else {
                createUsecaseImplementationFile(usecaseName, usecaseImplementationPath);
            }
        }
        else {
            fs.mkdirSync(implementationPath, { recursive: true });
            createUsecaseImplementationFile(usecaseName, usecaseImplementationPath);
        }
        
    } else {
        fs.mkdirSync(interfacePath, { recursive: true });
        createUsecaseInterfaceFile(usecaseName, usecaseInterfacePath);
        fs.mkdirSync(implementationPath, { recursive: true });
        createUsecaseImplementationFile(usecaseName, usecaseImplementationPath);

    }
};


function createUsecaseInterfaceFile(usecaseName: string, path: string) {
    const content = `abstract class ${usecaseName} {
        //TODO: Fix entity name
        Future<Failure, ExampleEntity> call();
    }
      `;
    fs.writeFileSync(path, content);
    window.showInformationMessage(`Usecase ${usecaseName} created`);
}

function createUsecaseImplementationFile(usecaseName: string, usecasePath: string) {
    const content = `
    import '../interfaces/${toSnakeCase(usecaseName)}.dart';

    class ${usecaseName}Impl implements ${usecaseName} {
        @override
        Future<Failure, ExampleEntity> call() async {

        }
    }
    `;
    fs.writeFileSync(usecasePath, content);
    window.showInformationMessage(`Usecase ${usecaseName} created`);
}

function promptForUsecaseName(): Thenable<string | undefined> {
    const usecaseNamePromptOptions: InputBoxOptions = {
      prompt: "Usecase name",
      placeHolder: "GetUsersUsecase",
    };
    return window.showInputBox(usecaseNamePromptOptions);
  }