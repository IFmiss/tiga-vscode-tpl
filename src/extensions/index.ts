import * as vscode from 'vscode';
import createModuleExtensions from './createModule';

export default function createExtensions(context: vscode.ExtensionContext) {
  createModuleExtensions('react').map(item => context.subscriptions.push(item));
  createModuleExtensions('vue').map(item => context.subscriptions.push(item));
};
