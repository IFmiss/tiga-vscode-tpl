import * as vscode from 'vscode';

const createRFC = (context: vscode.ExtensionContext) => {
  return vscode.commands.registerCommand('tiga-tpl.createReactFC', async (parmas) => {
    const fPath = parmas?.fsPath;

    if (!fPath) {
      vscode.window.showInformationMessage('[tiga-tpl] 请在资源列表中新建Tpl模版');
      return;
    }

		const options: vscode.InputBoxOptions = {
			prompt: '请输入组件名称',
			placeHolder: '组件名'
		};
		
		const data = await vscode.window.showInputBox(options);
		if (!data) {return;}

		const fullPath = `${fPath}/${data}`;

		vscode.window.showInformationMessage(fullPath);
	});
};

export default createRFC;
