module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            name: 'MCIDE',
            builderOptions: {
                appId: 'com.electron.mcide',
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true,
                    deleteAppDataOnUninstall: true,
                    createDesktopShortcut: true,
                    installerIcon: "public/install-icon.ico",
                    uninstallerIcon: "public/uninstall-icon.ico",
                    uninstallDisplayName: "Uninstall MCIDE"
                },
                win: {
                    target: "nsis",
                    icon: 'public/icon.ico',
                    publisherName: "Max Coppen"
                },
                productName: "MCIDE",
                buildVersion: "1.0.0",
                copyright: "Max Coppen 2021",
                directories: {
                    output: './releases'
                },
                files: ["**/*", "public/*"]
            }
        }
    }
}