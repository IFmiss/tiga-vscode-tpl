import * as vscode from 'vscode';
import createModuleFolder from '../../utils/createModuleFolder';
import { EXTENSION_MODULE_MAP } from '../../constance';

export default function createModule () {
  return EXTENSION_MODULE_MAP.map(({ command, type, render }) => {
    return vscode.commands.registerCommand(command, async (parmas) => {
      try {
        const data = await createModuleFolder(parmas, {
          type: type as TemplateType
        });
        // 执行移动操作
        render?.(data);
      } catch (e) {
        console.info('eee', e);
      }
    });
  });
}