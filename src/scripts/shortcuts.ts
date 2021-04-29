import { Menu, MenuItem } from 'electron'

// Setup the window menu:
const setupMenu = (win: any) => {
    const menu = new Menu()

    // Debug item for opening the inspector:
    menu.append(new MenuItem({
        label: 'Debug',
        submenu: [{
            role: 'toggleDevTools',
            accelerator: process.platform === 'darwin' ? 'Cmd+Shift+I' : 'Ctrl+Shift+I',
            click: () => { win.webContents.openDevTools() }
        }]
    }))

    // Debug item for refreshing the window:
    menu.append(new MenuItem({
        label: 'Debug',
        submenu: [{
            role: 'reload',
            accelerator: process.platform === 'darwin' ? 'Cmd+R' : 'Ctrl+R',
            click: () => { win.reload() }
        }]
    }))

    // Open file shortcut:
    menu.append(new MenuItem({
        label: 'File',
        sublabel: 'Open File',
        submenu: [{
            role: 'fileMenu',
            accelerator: process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+O',
            click: () => { win.webContents.send('menu-openfile') }
        }]
    }))

    // New project shortcut:
    menu.append(new MenuItem({
        label: 'File',
        sublabel: 'New Project',
        submenu: [{
            role: 'fileMenu',
            accelerator: process.platform === 'darwin' ? 'Cmd+N' : 'Ctrl+N',
            click: () => { win.webContents.send('menu-newproject') }
        }]
    }))

    // Open project shortcut:
    menu.append(new MenuItem({
        label: 'File',
        sublabel: 'Open Project',
        submenu: [{
            role: 'fileMenu',
            accelerator: process.platform === 'darwin' ? 'Cmd+K' : 'Ctrl+K',
            click: () => { win.webContents.send('menu-openproject') }
        }]
    }))

    Menu.setApplicationMenu(menu)
}

export default setupMenu