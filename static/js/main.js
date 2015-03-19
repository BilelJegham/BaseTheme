/*
 * ============================================================================
 * BaseTheme entry point
 * ============================================================================
 */

var BaseTheme = {};

BaseTheme.$window = null;
BaseTheme.$body = null;

BaseTheme.isMobile = false;
BaseTheme.windowSize = {
    width: 1920,
    height: 1280
};


/**
 * On document ready.
 *
 * @param event
 */
BaseTheme.onDocumentReady = function(e) {
    var _this = _this;

    // Store temp configuration
    for( var index in temp ){
        BaseTheme[index] = temp[index];
    }

    BaseTheme.init();
};


/**
 * Init.
 */
BaseTheme.init = function(){
    var _this = this;

    // Selectors
    _this.$window = $(window);
    _this.$body = $('body');

    // isMobile test
    _this.isMobile = (isMobile.any() === null) ? false : true;
    if(_this.isMobile) addClass(_this.$body[0],'is-mobile');

    // Events
    _this.$window.on('resize', $.proxy(_this.resize, _this));
    _this.$window.trigger('resize');
};


/**
 * Main resize method.
 *
 *
 */
BaseTheme.resize = function(){
    var _this = this;

    /*
     * Match CSS media queries and JavaScript window width.
     *
     * @see http://stackoverflow.com/a/11310353
     */
    _this.windowSize = getViewportSize();
};


/*
 * ============================================================================
 * Plug into jQuery standard events
 * ============================================================================
 */
$(document).ready(BaseTheme.onDocumentReady);
