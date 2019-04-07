
(function(namespace,resourcesUrl){"use strict";
(function(Context, resourcesUrl){
    /** App global **/


})(x,r);


(function(Context, resourcesUrl){
    /** @ionic/core global **/

    const getPlatforms = (win) => setupPlatforms(win);
    const isPlatform = (win, platform) => getPlatforms(win).includes(platform);
    const setupPlatforms = (win) => {
        win.Ionic = win.Ionic || {};
        let platforms = win.Ionic.platforms;
        if (platforms == null) {
            platforms = win.Ionic.platforms = detectPlatforms(win);
            platforms.forEach(p => win.document.documentElement.classList.add(`plt-${p}`));
        }
        return platforms;
    };
    const isMobileWeb = (win) => isMobile(win) && !isHybrid(win);
    const detectPlatforms = (win) => Object.keys(PLATFORMS_MAP).filter(p => PLATFORMS_MAP[p](win));
    const isIpad = (win) => testUserAgent(win, /iPad/i);
    const isIphone = (win) => testUserAgent(win, /iPhone/i);
    const isIOS = (win) => testUserAgent(win, /iPad|iPhone|iPod/i);
    const isAndroid = (win) => testUserAgent(win, /android|sink/i);
    const isAndroidTablet = (win) => {
        return isAndroid(win) && !testUserAgent(win, /mobile/i);
    };
    const isPhablet = (win) => {
        const width = win.innerWidth;
        const height = win.innerHeight;
        const smallest = Math.min(width, height);
        const largest = Math.max(width, height);
        return (smallest > 390 && smallest < 520) &&
            (largest > 620 && largest < 800);
    };
    const isTablet = (win) => {
        const width = win.innerWidth;
        const height = win.innerHeight;
        const smallest = Math.min(width, height);
        const largest = Math.max(width, height);
        return (isIpad(win) ||
            isAndroidTablet(win) ||
            ((smallest > 460 && smallest < 820) &&
                (largest > 780 && largest < 1400)));
    };
    const isMobile = (win) => matchMedia(win, '(any-pointer:coarse)');
    const isDesktop = (win) => !isMobile(win);
    const isHybrid = (win) => isCordova(win) || isCapacitorNative(win);
    const isCordova = (win) => !!(win['cordova'] || win['phonegap'] || win['PhoneGap']);
    const isCapacitorNative = (win) => {
        const capacitor = win['Capacitor'];
        return !!(capacitor && capacitor.isNative);
    };
    const isElectron = (win) => testUserAgent(win, /electron/);
    const isPWA = (win) => win.matchMedia ? (win.matchMedia('(display-mode: standalone)').matches || win.navigator.standalone) : false;
    const testUserAgent = (win, expr) => win.navigator && win.navigator.userAgent ? expr.test(win.navigator.userAgent) : false;
    const matchMedia = (win, query) => win.matchMedia ? win.matchMedia(query).matches : false;
    const PLATFORMS_MAP = {
        'ipad': isIpad,
        'iphone': isIphone,
        'ios': isIOS,
        'android': isAndroid,
        'phablet': isPhablet,
        'tablet': isTablet,
        'cordova': isCordova,
        'capacitor': isCapacitorNative,
        'electron': isElectron,
        'pwa': isPWA,
        'mobile': isMobile,
        'mobileweb': isMobileWeb,
        'desktop': isDesktop,
        'hybrid': isHybrid
    };

    class Config {
        constructor(configObj) {
            this.m = new Map(Object.entries(configObj));
        }
        get(key, fallback) {
            const value = this.m.get(key);
            return (value !== undefined) ? value : fallback;
        }
        getBoolean(key, fallback = false) {
            const val = this.m.get(key);
            if (val === undefined) {
                return fallback;
            }
            if (typeof val === 'string') {
                return val === 'true';
            }
            return !!val;
        }
        getNumber(key, fallback) {
            const val = parseFloat(this.m.get(key));
            return isNaN(val) ? (fallback !== undefined ? fallback : NaN) : val;
        }
        set(key, value) {
            this.m.set(key, value);
        }
    }
    function configFromSession(win) {
        try {
            const configStr = win.sessionStorage.getItem(IONIC_SESSION_KEY);
            return configStr !== null ? JSON.parse(configStr) : {};
        }
        catch (e) {
            return {};
        }
    }
    function saveConfig(win, config) {
        try {
            win.sessionStorage.setItem(IONIC_SESSION_KEY, JSON.stringify(config));
        }
        catch (e) {
            return;
        }
    }
    function configFromURL(win) {
        const config = {};
        win.location.search.slice(1)
            .split('&')
            .map(entry => entry.split('='))
            .map(([key, value]) => [decodeURIComponent(key), decodeURIComponent(value)])
            .filter(([key]) => startsWith(key, IONIC_PREFIX))
            .map(([key, value]) => [key.slice(IONIC_PREFIX.length), value])
            .forEach(([key, value]) => {
            config[key] = value;
        });
        return config;
    }
    function startsWith(input, search) {
        return input.substr(0, search.length) === search;
    }
    const IONIC_PREFIX = 'ionic:';
    const IONIC_SESSION_KEY = 'ionic-persist-config';

    const win = typeof window !== 'undefined' ? window : {};
    const Ionic = win['Ionic'] = win['Ionic'] || {};
    Object.defineProperty(Ionic, 'queue', {
        get: () => Context['queue']
    });
    setupPlatforms(win);
    Context.isPlatform = isPlatform;
    const configObj = Object.assign({}, configFromSession(win), { persistConfig: false }, Ionic['config'], configFromURL(win));
    const config = Ionic['config'] = Context['config'] = new Config(configObj);
    if (config.getBoolean('persistConfig')) {
        saveConfig(win, configObj);
    }
    const documentElement = win.document ? win.document.documentElement : null;
    const mode = config.get('mode', (documentElement && documentElement.getAttribute('mode')) || (isPlatform(win, 'ios') ? 'ios' : 'md'));
    Ionic.mode = Context.mode = mode;
    config.set('mode', mode);
    if (documentElement) {
        documentElement.setAttribute('mode', mode);
        documentElement.classList.add(mode);
    }
    if (config.getBoolean('_testing')) {
        config.set('animated', false);
    }
})(x,r);


(function(Context, resourcesUrl){
    /** @stencil/redux global **/

    Context.store = (() => {
        let _store;
        const setStore = (store) => {
            _store = store;
        };
        const getState = () => {
            return _store && _store.getState();
        };
        const getStore = () => {
            return _store;
        };
        const mapDispatchToProps = (component, props) => {
            Object.keys(props).forEach(actionName => {
                const action = props[actionName];
                Object.defineProperty(component, actionName, {
                    get: () => (...args) => _store.dispatch(action(...args)),
                    configurable: true,
                    enumerable: true,
                });
            });
        };
        const mapStateToProps = (component, mapState) => {
            const _mapStateToProps = (_component, _mapState) => {
                const mergeProps = mapState(_store.getState());
                Object.keys(mergeProps).forEach(newPropName => {
                    const newPropValue = mergeProps[newPropName];
                    component[newPropName] = newPropValue;
                });
            };
            const unsubscribe = _store.subscribe(() => _mapStateToProps(component, mapState));
            _mapStateToProps(component, mapState);
            return unsubscribe;
        };
        return {
            getStore,
            setStore,
            getState,
            mapDispatchToProps,
            mapStateToProps,
        };
    })();
})(x,r);
})("App");