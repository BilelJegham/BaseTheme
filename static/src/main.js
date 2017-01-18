import $                from "jquery";
import log              from "loglevel/dist/loglevel";
import polyfills        from "starting-blocks/src/utils/polyfills";
import gaTrackErrors    from "starting-blocks/src/utils/gaTrackErrors";
import isMobile         from "ismobilejs/isMobile";
import Utils            from "starting-blocks/src/utils/utils";
import Router           from "starting-blocks/src/router";
import GraphicLoader    from "starting-blocks/src/graphicLoader";
import Nav              from "./common/nav";
import ClassFactory     from "./class-factory";
import TweenLite        from "TweenLite";
import EasePack         from "gsap/src/uncompressed/easing/EasePack";


/**
 * Set max log level (most verbose) 0 ---> 5
 * @see https://github.com/pimterry/loglevel
 */
if (true === window.temp.devMode) {
    log.setLevel(0);
} else {
    log.setLevel(5);
}

if (!location.origin) {
    location.origin = location.protocol + "//" + location.host;
}

/**
 * Set default Tween ease
 */
TweenLite.defaultEase = Expo.easeOut;

/**
 * Log credits
 */
Utils.logCredits(
    'BaseTheme',
    '#fff',
    [
        { name:'Rezo Zero', website:'www.rezo-zero.com' }
    ],
    [
        { name:'roadiz', website:'www.roadiz.io' },
        { name:'GSAP', website:'www.greensock.com' }
    ],
    '#000'
);

/*
 * Declare polyfills
 */
polyfills();

/**
 * Tracks erros with Analytics
 */
gaTrackErrors();

/*
 * Define vars
 */
const $body = $('body');
const dataHome = $body[0].getAttribute('data-is-home');
const isHome = (dataHome == '1');

/*
 * isMobile Test
 */
let deviceMobile = (isMobile.any !== false);
if(deviceMobile) Utils.addClass($body[0],'is-mobile');
else Utils.addClass($body[0],'is-desktop');

/*
 * IE Test
 */
if(navigator.userAgent.indexOf('MSIE') >= 0 ||
    navigator.userAgent.indexOf('Trident') >= 0){
    Utils.addClass($body[0],'ie-browser');
}

/**
 * Launch router
 */
const router = new Router(
    {
        homeHasClass: false,
        ajaxEnabled: true,
        lazyloadEnabled: true,
        pageClass: 'page-container'
    },
    new ClassFactory(),
    location.origin,
    new GraphicLoader(),
    new Nav()
);
router.initEvents();
router.boot($('.page-container').eq(0), 'static', isHome);

