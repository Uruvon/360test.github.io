import { l as readTask, w as writeTask } from './chunk-431e4868.js';

function startStatusTap(win) {
    win.addEventListener('statusTap', () => {
        readTask(() => {
            const width = win.innerWidth;
            const height = win.innerHeight;
            const el = win.document.elementFromPoint(width / 2, height / 2);
            if (!el) {
                return;
            }
            const contentEl = el.closest('ion-content');
            if (contentEl) {
                contentEl.componentOnReady().then(() => {
                    writeTask(() => contentEl.scrollToTop(300));
                });
            }
        });
    });
}

export { startStatusTap };
