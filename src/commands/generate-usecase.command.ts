import { InputBoxOptions, Uri, window } from "vscode";
import * as fs from 'fs';
import { getVSCodeDownloadUrl } from "@vscode/test-electron/out/util";
import { camelToSnakeCase } from "../extension";

export const generateUsecase = async (uri: Uri) => {
window.showInformationMessage("Generate usecase");
    const usecaseName = await promptForUsecaseName();
    if (!usecaseName || usecaseName.length === 0) {
        window.showErrorMessage('Please, provide a valid usecase name');
        return;
    }
    // check if usecases directory exists
    const usecasesPath = `${uri.fsPath}/usecases`;
    const usecasePath = `${usecasesPath}/${camelToSnakeCase(usecaseName)}.dart`;

    if (fs.existsSync(usecasesPath)) {
        // check if usecase file exists
        if (fs.existsSync(usecasePath)) {
            window.showErrorMessage(`Usecase ${usecaseName} already exists`);
        } else {
            createUsecaseInterfaceFile(usecaseName, usecasePath);
        }
    } else {
        fs.mkdirSync(usecasesPath, { recursive: true });
        createUsecaseInterfaceFile(usecaseName, usecasePath);
    }
};


function createUsecaseInterfaceFile(usecaseName: string, usecasePath: string) {
    const content = `abstract class ${usecaseName} {
        //TODO: Fix entity name
        Future<Failure, ExampleEntity> call();
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