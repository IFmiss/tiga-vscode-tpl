import * as vscode from 'vscode';
import { MODULE_MAP } from '../../constance';

export default function createModule (moduleType: 'react' | 'vue') {
  const M = MODULE_MAP[moduleType];
  return M.config.map(({ command, type, render }) => {
    return vscode.commands.registerCommand(command, async (parmas) => {
      try {
        const data = await M.tplFn(parmas, {
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