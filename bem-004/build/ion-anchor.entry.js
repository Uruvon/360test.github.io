import { r as registerInstance, e as getContext, c as getIonMode, h, H as Host } from './chunk-431e4868.js';
import { o as openURL, c as createColorClasses } from './chunk-abd3a723.js';

class Anchor {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */
        this.routerDirection = 'forward';
        this.win = getContext(this, "window");
    }
    onClick(ev) {
        openURL(this.win, this.href, ev, this.routerDirection);
    }
    hostData() {
        const mode = getIonMode(this);
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`${mode}`]: true, 'ion-activatable': true })
        };
    }
    __stencil_render() {
        const attrs = {
            download: this.download,
            href: this.href,
            rel: this.rel,
            target: this.target
        };
        return (h("a", Object.assign({}, attrs), h("slot", null)));
    }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the badge\n   * \@prop --color: Text color of the badge\n   */\n  --background: transparent;\n  --color: var(--ion-color-primary, #3880ff);\n  background: var(--background);\n  color: var(--color);\n}\n\n:host(.ion-color) {\n  color: var(--ion-color-base);\n}\n\na {\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n}"; }
}

export { Anchor as ion_anchor };
