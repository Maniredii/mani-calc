const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class WindowsSearchIntegration {
    constructor(maniCalc) {
        this.maniCalc = maniCalc;
        this.protocolName = 'calc';
        this.appPath = process.execPath;
        this.scriptPath = path.join(__dirname, '..', '..', 'bin', 'cli.js');
    }

    async register() {
        try {
            // Register protocol handler for Windows Search
            await this.registerProtocolHandler();

            // Create search connector
            await this.createSearchConnector();

            return true;
        } catch (error) {
            throw new Error(`Failed to register Windows Search integration: ${error.message}`);
        }
    }

    async registerProtocolHandler() {
        // Create registry entries for custom protocol
        const regContent = `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Software\\Classes\\calc]
@="URL:Mani-Calc Protocol"
"URL Protocol"=""

[HKEY_CURRENT_USER\\Software\\Classes\\calc\\shell]

[HKEY_CURRENT_USER\\Software\\Classes\\calc\\shell\\open]

[HKEY_CURRENT_USER\\Software\\Classes\\calc\\shell\\open\\command]
@="\\"${process.execPath}\\" \\"${this.scriptPath}\\" \\"%1\\""
`;

        const regFile = path.join(process.env.TEMP, 'mani-calc-protocol.reg');
        fs.writeFileSync(regFile, regContent);

        try {
            await execAsync(`reg import "${regFile}"`);
            fs.unlinkSync(regFile);
        } catch (error) {
            console.warn('Could not register protocol handler automatically. Manual registration may be required.');
        }
    }

    async createSearchConnector() {
        const connectorPath = path.join(
            process.env.APPDATA,
            'Microsoft',
            'Windows',
            'Libraries',
            'ManiCalc.searchConnector-ms'
        );

        const connectorXml = `<?xml version="1.0" encoding="UTF-8"?>
<searchConnectorDescription xmlns="http://schemas.microsoft.com/windows/2009/searchConnector">
    <description>Mani-Calc - Instant Calculator</description>
    <isSearchOnlyItem>false</isSearchOnlyItem>
    <includeInStartMenuScope>true</includeInStartMenuScope>
    <iconReference>shell32.dll,23</iconReference>
    <templateInfo>
        <folderType>{5c4f28b5-f869-4e84-8e60-f11db97c5cc7}</folderType>
    </templateInfo>
    <simpleLocation>
        <url>calc:</url>
    </simpleLocation>
</searchConnectorDescription>`;

        try {
            const dir = path.dirname(connectorPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(connectorPath, connectorXml);
        } catch (error) {
            console.warn('Could not create search connector:', error.message);
        }
    }

    async unregister() {
        try {
            // Remove protocol handler
            await execAsync('reg delete "HKEY_CURRENT_USER\\Software\\Classes\\calc" /f').catch(() => { });

            // Remove search connector
            const connectorPath = path.join(
                process.env.APPDATA,
                'Microsoft',
                'Windows',
                'Libraries',
                'ManiCalc.searchConnector-ms'
            );

            if (fs.existsSync(connectorPath)) {
                fs.unlinkSync(connectorPath);
            }

            return true;
        } catch (error) {
            console.error('Failed to unregister:', error);
            return false;
        }
    }

    parseProtocolUrl(url) {
        // Parse calc:query format
        const match = url.match(/^calc:(.+)$/i);
        if (match) {
            return decodeURIComponent(match[1]);
        }
        return null;
    }
}

module.exports = WindowsSearchIntegration;
