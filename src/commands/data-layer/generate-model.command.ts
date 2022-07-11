import { InputBoxOptions, Uri, window } from "vscode";
import * as fs from 'fs';
import { toSnakeCase } from "../../extension";

export const generateModel = async (uri: Uri) => {
window.showInformationMessage("Generate model");
    const modelName = await promptForModelName();
    if (!modelName || modelName.length === 0) {
        window.showErrorMessage('Please, provide a valid model name');
        return;
    }
    const modelsPath = `${uri.fsPath}/models`;
    const modelPath = `${modelsPath}/${toSnakeCase(modelName)}.dart`;

    if (fs.existsSync(modelsPath)) {
        if (fs.existsSync(modelPath)) {
            window.showErrorMessage(`Model ${modelName} already exists`);
        } else {
            createModelFile(modelName, modelPath);
        }
    } else {
        fs.mkdirSync(modelsPath, { recursive: true });
        createModelFile(modelName, modelPath);
    }
};


function createModelFile(modelName: string, modelPath: string) {
    const content = `class ${modelName} extends ${modelName.replace('Model', 'Entity')} {
        //TODO: implement your model properties
      
        //TODO: implement fromMap/fromJson
      }
      `;
    fs.writeFileSync(modelPath, content);
    window.showInformationMessage(`Model ${modelName} created`);
}
function promptForModelName(): Thenable<string | undefined> {
    const options: InputBoxOptions = {
      prompt: "Model name",
      placeHolder: "UserModel",
    };
    return window.showInputBox(options);
  }