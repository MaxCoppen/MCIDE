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
                    installerIcon: "public/icon.ico",
                    uninstallerIcon: "public/icon.ico",
                    uninstallDisplayName: "Uninstall MCIDE"
                },
                win: {
                    target: "nsis",
                    icon: 'build/icon.ico',
                    publisherName: "Max Coppen"
                },
                productName: "MCIDE",
                buildVersion: "1.0.0",
                copyright: "Max Coppen 2021",
                directories: {
                    output: './releases'
                },
                files: ["**/*", "public/icon.*"]
            }
        }
    }
}