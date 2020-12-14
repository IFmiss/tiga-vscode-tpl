import * as vscode from 'vscode';
import createModuleExtensions from './createModule';
import createVueModuleExtensions from './createVueModule';

export default function createExtensions(context: vscode.ExtensionContext) {
  createModuleExtensions().map(item => context.subscriptions.push(item));
  createVueModuleExtensions().map(item => context.subscriptions.push(item));
};
