// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from "child_process";

const execShell = (cmd: string) =>
    new Promise<string>((resolve, reject) => {
        cp.exec(cmd, (err, out) => {
            if (err) {
                return reject(err);
            }
            return resolve(out);
        });
    });

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "micromelon" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('micromelon.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from micromelon!');
	});

	context.subscriptions.push(disposable);

	vscode.commands.registerCommand('micromelon.program', () => {
		const x = 1;
		let outC = vscode.window.createOutputChannel("rover");
		let temp = cp.exec("echo " + x, (err, out) => {
            if (err) {
                return 0;
            }
           	outC.appendLine(out);
			outC.show(true);
			return 1;
        });
	});

}

// this method is called when your extension is deactivated
export function deactivate() {}
