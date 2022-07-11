import * as fs from 'fs';
import { Uri } from "vscode";
import { generateDatasource } from './generate-datasource.command';
import { generateModel } from './generate-model.command';

export const generateDataLayer = async (uri: Uri) => {
    // check if exists domain folder

    const dataPath = `${uri.fsPath}/data`;
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath, { recursive: true });
    }

    const dataUri = uri.with({ path: `${dataPath}` });

    await generateModel(dataUri);
    await generateDatasource(dataUri);
}; 