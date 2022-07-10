import * as fs from 'fs';
import { Uri } from "vscode";
import { generateEntity } from "./generate-entity.command";
import { generateUsecase } from "./generate-usecase.command";

export const generateDomainLayer = async (uri: Uri) => {
    // check if exists domain folder

    const domainPath = `${uri.fsPath}/domain`;
    if (!fs.existsSync(domainPath)) {
        fs.mkdirSync(domainPath, { recursive: true });
    }

    const domainUri = uri.with({ path: `${domainPath}` });

    await generateEntity(domainUri);
    await generateUsecase(domainUri);
}; 