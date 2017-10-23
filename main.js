const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
const { dialog } = electron;
const path = require('path');
const getMac = require('getmac');
let win;
let winConfig = {
    width: 800,
    height: 600,
    show: false
};

function createWindow() {
    win = new BrowserWindow(winConfig);
    win.loadURL('file://'+path.join(__dirname)+'/index.html');
    //win.webContents.openDevTools();
    win.once('ready-to-show', () => {
        win.show();
        getMac.getMac((error,macAddress)=>{
            dialog.showMessageBox({
                title:'机器信息',
                type:'info',
                message:'机器mac地址为：'+macAddress,
                buttons:['确定']
            })
        });

    });
    win.on('close', () => {
        win.destroy();
        win = null;
    });
    win.on('resize', () => {
        win.reload()
    });
}

app.on('ready', createWindow);
app.on('window-all-cloased', () => {
    if (process.platform !== 'drawin') {
        app.quit()
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});