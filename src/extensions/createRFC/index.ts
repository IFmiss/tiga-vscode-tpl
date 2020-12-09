import * as vscode from 'vscode';
import createTplFolder from '../../utils/createTplFolder';
import renderRFC from './../../exec/renderRFC';

const createRFC = (context: vscode.ExtensionContext) => {
  return vscode.commands.registerCommand('tiga-tpl.createReactFC', async (parmas) => {
    vscode.window.showQuickPick(['red', 'black']);
    return
    try {
      const data = await createTplFolder(parmas, {
        useTypeScript: true,
        type: 'rfc'
      });
      // 执行移动操作
      renderRFC(data);
    } catch (e) {
      console.info('eee', e);
    }
	});
};

export default createRFC;
