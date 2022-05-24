// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from "child_process";
import { strictEqual } from 'assert';

const execShell = (cmd: string) =>
    new Promise<string>((resolve, reject) => {
        cp.exec(cmd, (err, out) => {
            if (err) {
                return reject(err);
            }
            return resolve(out);
        });
    });

class RoverCode {
	outC: vscode.OutputChannel;
	term: vscode.Terminal;

	constructor () {
		this.outC = vscode.window.createOutputChannel("roverOut");
		this.term = vscode.window.createTerminal("Rover");
	}

	connect(): void {
		const serial = vscode.window.showInputBox({
			placeHolder: 'Number on the main screen of the rover; e.g 42',
			title: 'Rover Serial Number',
			validateInput: text => {
				if (text.trim() === '') return null;
				else {
					return Number.isNaN(Number(text)) ? 'Not a valid number' : null;
				}
			}
		});
		this.outC.append("Serial: " + serial);
		this.term.sendText("try:");
		this.term.sendText("from micromelon import *");
		this.term.sendText("rc = RoverController()");
		this.term.sendText("rc.connectBLE("+serial+")");
		this.term.sendText("except error as e:");
		this.term.sendText("print(e)");
	}
}

let rover: RoverCode;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	rover = new RoverCode();
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "micromelon" is now active!');


	rover.term.sendText("python3");
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('micromelon.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from micromelon!');
	});

	context.subscriptions.push(disposable);

	vscode.commands.registerCommand('micromelon.program', rover.connect.bind(rover));

}

// this method is called when your extension is deactivated
export function deactivate() {}
