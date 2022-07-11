import { InputBoxOptions, Uri, window } from "vscode";
import * as fs from 'fs';
import { toSnakeCase } from "../../extension";

export const generateRepositoryInterface = async (uri: Uri) => {
window.showInformationMessage("Generate repository");
    const repositoryName = await promptForRepositoryName();
    if (!repositoryName || repositoryName.length === 0) {
        window.showErrorMessage('Please, provide a valid repository name');
        return;
    }
    const repositoiresPath = `${uri.fsPath}/repositoires`;
    const repositoryPath = `${repositoiresPath}/${toSnakeCase(repositoryName)}.dart`;

    if (fs.existsSync(repositoiresPath)) {
        if (fs.existsSync(repositoryPath)) {
            window.showErrorMessage(`Repository ${repositoryName} already exists`);
        } else {
            createRepositoryFile(repositoryName, repositoryPath);
        }
    } else {
        fs.mkdirSync(repositoiresPath, { recursive: true });
        createRepositoryFile(repositoryName, repositoryPath);
    }
};


function createRepositoryFile(repositoryName: string, repositoryPath: string) {
    const content = ` abstract class ${repositoryName} {
        // TODO: implement your repository methods
      }
      `;
    fs.writeFileSync(repositoryPath, content);
    window.showInformationMessage(`Repository ${repositoryName} created`);
}
function promptForRepositoryName(): Thenable<string | undefined> {
    const options: InputBoxOptions = {
      prompt: "Repository name",
      placeHolder: "UserRepository",
    };
    return window.showInputBox(options);
  }