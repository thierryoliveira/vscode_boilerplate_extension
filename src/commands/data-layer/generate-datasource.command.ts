import { InputBoxOptions, Uri, window } from "vscode";
import * as fs from 'fs';
import { toSnakeCase } from "../../extension";

export const generateDatasource = async (uri: Uri) => {
window.showInformationMessage("Generate datasource");
    const datasourceName = await promptForDatasourceName();
    if (!datasourceName || datasourceName.length === 0) {
        window.showErrorMessage('Please, provide a valid datasource name');
        return;
    }
    // check if datasources directory exists
    const datasourcesPath = `${uri.fsPath}/datasources`;
    const datasourceInterfacePath = `${datasourcesPath}/interfaces/${toSnakeCase(datasourceName)}.dart`;
    const datasourceImplementationPath = `${datasourcesPath}/implementations/${toSnakeCase(datasourceName)}_impl.dart`;
    const interfacePath = datasourceInterfacePath.substring(0, datasourceInterfacePath.lastIndexOf('/'));
    const implementationPath = datasourceImplementationPath.substring(0, datasourceImplementationPath.lastIndexOf('/'));


    if (fs.existsSync(datasourcesPath)) {
        if (fs.existsSync(interfacePath)) {
            if (fs.existsSync(datasourceInterfacePath)) {
            window.showErrorMessage(`Datasource ${datasourceName} already exists`);
            } else {
                createDatasourceInterfaceFile(datasourceName, datasourceInterfacePath);
            }
        } else {
            fs.mkdirSync(interfacePath, { recursive: true });
            createDatasourceInterfaceFile(datasourceName, datasourceInterfacePath);
        }

        if (fs.existsSync(implementationPath)) {
            if (fs.existsSync(datasourceImplementationPath)) {
            window.showErrorMessage(`Datasource ${datasourceName} already exists`);
            } else {
                createDatasourceImplementationFile(datasourceName, datasourceImplementationPath);
            }
        }
        else {
            fs.mkdirSync(implementationPath, { recursive: true });
            createDatasourceImplementationFile(datasourceName, datasourceImplementationPath);
        }
        
    } else {
        fs.mkdirSync(interfacePath, { recursive: true });
        createDatasourceInterfaceFile(datasourceName, datasourceInterfacePath);
        fs.mkdirSync(implementationPath, { recursive: true });
        createDatasourceImplementationFile(datasourceName, datasourceImplementationPath);

    }
};


function createDatasourceInterfaceFile(datasourceName: string, path: string) {
    const content = `abstract class ${datasourceName} {
        //TODO: Fix entity name
        Future<ExampleModel> exampleMethod();
    }
      `;
    fs.writeFileSync(path, content);
    window.showInformationMessage(`Datasource ${datasourceName} created`);
}

function createDatasourceImplementationFile(datasourceName: string, datasourcePath: string) {
    const content = `
    import '../interfaces/${toSnakeCase(datasourceName)}.dart';

    class ${datasourceName}Impl implements ${datasourceName} {

        final RestClientGet clientGet;

        ${datasourceName}Impl({required this.clientGet});

        @override
        Future<ExampleModel> exampleMethod() async {
            try{

            }
            catch(e){
            }
        }
    }
    `;
    fs.writeFileSync(datasourcePath, content);
    window.showInformationMessage(`Datasource ${datasourceName} created`);
}

function promptForDatasourceName(): Thenable<string | undefined> {
    const datasourceNamePromptOptions: InputBoxOptions = {
      prompt: "Datasource name",
      placeHolder: "GetUsersDatasource",
    };
    return window.showInputBox(datasourceNamePromptOptions);
  }