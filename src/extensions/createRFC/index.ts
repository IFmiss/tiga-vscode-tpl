import * as vscode from 'vscode';
import createTplFolder from '../../utils/createTplFolder';

const createRFC = (context: vscode.ExtensionContext) => {
  return vscode.commands.registerCommand('tiga-tpl.createReactFC', async (parmas) => {
    createTplFolder(parmas, 'rfc-ts');
	});
};

export default createRFC;
