import { InputBoxOptions, Uri, window } from "vscode";
import * as fs from 'fs';
import { toSnakeCase } from "../../extension";

export const generateEntity = async (uri: Uri) => {
window.showInformationMessage("Generate entity");
    const entityName = await promptForEntityName();
    if (!entityName || entityName.length === 0) {
        window.showErrorMessage('Please, provide a valid entity name');
        return;
    }
    const entitiesPath = `${uri.fsPath}/entities`;
    const entityPath = `${entitiesPath}/${toSnakeCase(entityName)}.dart`;

    if (fs.existsSync(entitiesPath)) {
        if (fs.existsSync(entityPath)) {
            window.showErrorMessage(`Entity ${entityName} already exists`);
        } else {
            createEntityFile(entityName, entityPath);
        }
    } else {
        fs.mkdirSync(entitiesPath, { recursive: true });
        createEntityFile(entityName, entityPath);
    }
};


function createEntityFile(entityName: string, entityPath: string) {
    const content = `class ${entityName} {
        //TODO: implement your entity properties
      
        //TODO: implement equality
      }
      `;
    fs.writeFileSync(entityPath, content);
    window.showInformationMessage(`Entity ${entityName} created`);
}
function promptForEntityName(): Thenable<string | undefined> {
    const options: InputBoxOptions = {
      prompt: "Entity name",
      placeHolder: "UserEntity",
    };
    return window.showInputBox(options);
  }