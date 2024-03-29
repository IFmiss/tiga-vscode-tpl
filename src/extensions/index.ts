import * as vscode from 'vscode';
import createModuleExtensions from './createModule';

export default function createExtensions(context: vscode.ExtensionContext) {
  console.info('start create');
  createModuleExtensions('react').map(item => context.subscriptions.push(item));
  createModuleExtensions('vue').map(item => context.subscriptions.push(item));
  createModuleExtensions('svelte').map(item => context.subscriptions.push(item));
  createModuleExtensions('react-mini-program').map(item => context.subscriptions.push(item));
};
