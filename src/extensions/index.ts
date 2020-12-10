import * as vscode from 'vscode';
import createTplFolder from '../utils/createTplFolder';
import { EXTENSIONS_MAP } from '../constance';

const tplRegisterCommands = () => {
  return EXTENSIONS_MAP.map(({ command, type, render }) => {
    return vscode.commands.registerCommand(command, async (parmas) => {
      try {
        const data = await createTplFolder(parmas, {
          type: type as TemplateType
        });
        // 执行移动操作
        render?.(data);
      } catch (e) {
        console.info('eee', e);
      }
    });
  });
};

export default tplRegisterCommands;
