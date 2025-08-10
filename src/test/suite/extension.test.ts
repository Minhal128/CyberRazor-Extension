import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Extension should be present', () => {
    assert.ok(vscode.extensions.getExtension('nisa-iqbal.cyberrazor'));
  });

  test('Should activate', async () => {
    const ext = vscode.extensions.getExtension('nisa-iqbal.cyberrazor');
    if (ext) {
      await ext.activate();
      assert.ok(ext.isActive);
    }
  });

  test('Should register all commands', async () => {
    const commands = await vscode.commands.getCommands();
    
    const cyberrazorCommands = commands.filter(cmd => cmd.startsWith('cyberrazor.'));
    assert.strictEqual(cyberrazorCommands.length, 4);
    
    assert.ok(cyberrazorCommands.includes('cyberrazor.scanCurrentFile'));
    assert.ok(cyberrazorCommands.includes('cyberrazor.scanWorkspace'));
    assert.ok(cyberrazorCommands.includes('cyberrazor.viewLastReport'));
    assert.ok(cyberrazorCommands.includes('cyberrazor.configureSnykToken'));
  });

  test('Should have configuration', () => {
    const config = vscode.workspace.getConfiguration('cyberrazor');
    assert.ok(config.has('snykToken'));
    assert.ok(config.has('autoScanOnSave'));
    assert.ok(config.has('reportFormat'));
    assert.ok(config.has('severityThreshold'));
  });
});

