import path from 'path';
import {app, BrowserWindow, nativeImage} from 'electron';
import store from './config';

export default (url: string): BrowserWindow => {
  const window = new BrowserWindow({
    webPreferences: {
      autoplayPolicy: 'user-gesture-required',
      contextIsolation: false,
      nodeIntegration: false,
      sandbox: false,
      disableBlinkFeatures: 'Auxclick', // Security
      preload: path.join(app.getAppPath(), 'lib/preload/index.js'),
    },
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/normal/256.png')),
    show: false,
    minHeight: 400,
    minWidth: 600,
    center: true,
    title: 'Google Chat',
    backgroundColor: '#E8EAED',
    autoHideMenuBar: store.get('app.hideMenuBar'),
//    autoHideMenuBar: true,
  });

  window.once('ready-to-show', () => {
    if (!store.get('app.startHidden')) {
      window.show();
    }
    window.webContents.session.setSpellCheckerEnabled( !store.get('app.disableSpellChecker') );
  });

  window.loadURL(url);

  return window;
};
