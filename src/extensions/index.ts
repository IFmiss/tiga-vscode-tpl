import * as vscode from 'vscode';
import createModuleExtensions from './createModule';

export default function createExtensions(context: vscode.ExtensionContext) {
  createModuleExtensions().map(item => context.subscriptions.push(item));
};
