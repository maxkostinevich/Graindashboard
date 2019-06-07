/**
 * Side Nav.
 */
;(function ($) {
  'use strict';

  $.GDCore.components.GDSideNav = {
    _baseConfig: {
      touchDevicesMode: 'full',

      touchDevicesModeResolution: 992,

      closedClass: 'side-nav-closed',
      hiddenClass: 'side-nav-hidden',
      initializedClass: 'side-nav-initialized',
      minifiedClass: 'side-nav-minified',
      openedSubMenuClass: 'side-nav-opened',
      hasSubMenuClass: 'side-nav-has-menu',
      fullModeClass: 'side-nav-full-mode',
      miniModeClass: 'side-nav-mini-mode',
      transitionOnClass: 'side-nav-transition-on',
      topLevelMenuClass: 'side-nav-menu-top-level',
      secondLevelMenuClass: 'side-nav-menu-second-level',
      thirdLevelMenuClass: 'side-nav-menu-third-level',

      afterOpen: function () {},
      afterClose: function () {}
    },

    pageCollection: $(),

    init: function (selector, config) {

      this.collection = selector && $(selector).length ? $(selector) : $();
      if (!$(selector).length) return;

      this.config = config && $.isPlainObject(config) ?
        $.extend({}, this._baseConfig, config) : this._baseConfig;

      this.config.itemSelector = selector;

      this.initSidebar();

      return this.pageCollection;

    },

    initSidebar: function () {
      //Variables
      var $self = this,
        collection = $self.pageCollection,
        config = $self.config;

      //Actions
      this.collection.each(function (i, el) {
        //Variables
        var $this = $(el),
          mode = $this.data('mode'),
          target = $this.data('target'),
          targetWrapper = $this.data('target-wrapper'),

          defaults = {
            openedItem: ''
          },

          flags = {
            isSubMenuCollapsed: false,
            isSidebarClosed: false,
            isSidebarHidden: true,
            isSidebarMinified: false,
            isMenuHeadingsHide: false,
            isTouchDevicesMode: false,
            isMiniMode: false,
            isFullMode: false,
            isTransitionOn: false
          },

          selectors = {
            mainContainer: targetWrapper,
            sidebar: target,
            menuHeadings: $(target).find('.sidebar-heading'),
            topLevelMenuItems: $(target).find('.side-nav-menu-top-level > .side-nav-menu-item'),
            menuInvoker: $(target).find('.side-nav-menu-link')
          };

        $self.pushOpenedItem($this, defaults, selectors);

        if (mode) {
          config.touchDevicesMode = mode;
        }

        switch (config.touchDevicesMode) {
          case 'mini':
            $self.miniMode(flags, selectors);
            break;

          default:
            $self.fullMode(flags, selectors);
            break;
        }

        $self.menuInvokerClickFunc(defaults, flags, selectors);

        $self.clickFunc($this, defaults, flags, selectors);

        $self.closeFunc($this, flags, selectors);

        $self.mouseEnterFunc(defaults, flags, selectors);

        $self.mouseLeaveFunc(defaults, flags, selectors);

        $self.documentOnClickCloseFunc($this, defaults, flags, selectors);

        $self.resizeFunc(defaults, flags, selectors);

        //Actions
        collection = collection.add($this);
      });
    },

    pushOpenedItem: function (el, defaults, selectors) {
      var $self = this,
        config = $self.config,
        _defaults = defaults,
        _selectors = selectors;

      el.each(function () {
        var $this = $(this);
        _selectors.sidebar = $this.data('target');

        $(_selectors.sidebar).find('[data-target]').each(function () {
          if ($(this).parent(_selectors.topLevelMenuItems).hasClass(config.openedSubMenuClass)) {
            _defaults.openedItem = $(this).data('target');
          }
        });
      });
    },

    clickFunc: function (el, defaults, flags, selectors) {
      var $self = this,
        config = $self.config,
        _flags = flags,
        _defaults = defaults,
        _selectors = selectors;

      el.stop().on('click', function (e) {
        e.preventDefault();

        if (_flags.isTouchDevicesMode === true) {
          if (_flags.isSidebarHidden === true) {
            $self.showSidebar(_flags, _selectors);
          } else {
            $self.hideSidebar(_flags, _selectors);
          }
        } else {
          if (_flags.isSidebarClosed === true) {
            $self.openTitles(false, _flags, _selectors);
            $self.openSidebar(_flags, _selectors);

            if (_defaults.openedItem !== '') {
              $(_selectors.sidebar).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                $self.openSubMenu(false, _defaults, _flags, _selectors);
              });
            }

            if (_flags.isTouchDevicesMode === false) {
              $(_selectors.mainContainer).one().removeClass(config.minifiedClass);

              _flags.isSidebarMinified = false;
            }
          } else {
            if (_defaults.openedItem !== '') {
              $self.closeTitles(false, _flags, _selectors);

              $self.closeSubMenu(function () {
                $self.closeSidebar(_flags, _selectors);
              }, _defaults, _flags, _selectors);
            } else {
              $self.closeTitles(function () {
                $self.closeSidebar(_flags, _selectors);
              }, _flags, _selectors);
            }

            if (_flags.isTouchDevicesMode === false) {
              $(_selectors.sidebar).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
                $(_selectors.mainContainer).one().addClass(config.minifiedClass);

                _flags.isSidebarMinified = true;
              });
            }
          }
        }
      });
    },

    closeFunc: function (el, flags, selectors) {
      var $self = this,
        _flags = flags,
        _selectors = selectors,
        closeInvoker = el.data('close-invoker');

      $(closeInvoker).stop().on('click', function (e) {
        e.preventDefault();

        $self.hideSidebar(_flags, _selectors);
      });
    },

    documentOnClickCloseFunc: function (el, defaults, flags, selectors) {
      var $self = this,
        config = $self.config,
        _defaults = defaults,
        _flags = flags,
        _selectors = selectors;

      // $(document).stop().on('click touchstart', 'body', function (e) {
      //   if(e.target.id === el) return;

      //   if($(e.target).closest(el).length) return;

      //   if (_flags.isTouchDevicesMode === true) {
      //     $self.hideSidebar(_flags, _selectors);
      //   } else {
      //     if (_flags.isSidebarClosed === true) {
      //       $self.openTitles(false, _flags, _selectors);
      //       $self.openSidebar(_flags, _selectors);

      //       if (_defaults.openedItem !== '') {
      //         $(_selectors.sidebar).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
      //           $self.openSubMenu(false, _defaults, _flags, _selectors);
      //         });
      //       }

      //       if (_flags.isTouchDevicesMode === false) {
      //         $(_selectors.mainContainer).one().removeClass(config.minifiedClass);

      //         _flags.isSidebarMinified = false;
      //       }
      //     }
      //   }
      // });
    },

    mouseEnterFunc: function (defaults, flags, selectors) {
      var $self = this,
        _defaults = defaults,
        _flags = flags,
        _selectors = selectors;

      $(_selectors.sidebar).stop().on('mouseenter', function () {
        if ((_flags.isSidebarClosed === true && _flags.isSidebarMinified === true) || (_flags.isMiniMode === true && _flags.isSidebarClosed === true && _flags.isTouchDevicesMode === true)) {
          $self.openTitles(false, _flags, _selectors);
          $self.openSidebar(_flags, _selectors);

          if (_defaults.openedItem !== '') {
            $(_selectors.sidebar).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
              $self.openSubMenu(false, _defaults, _flags, _selectors);
            });
          }
        }
      });
    },

    mouseLeaveFunc: function (defaults, flags, selectors) {
      var $self = this,
        _defaults = defaults,
        _flags = flags,
        _selectors = selectors;

      $(_selectors.sidebar).stop().on('mouseleave', function () {
        if ((_flags.isSidebarClosed === false && _flags.isSidebarMinified === true) || (_flags.isMiniMode === true && _flags.isSidebarClosed === false && _flags.isTouchDevicesMode === true)) {
          if (_defaults.openedItem !== '') {
            $self.closeTitles(false, _flags, _selectors);
            $self.closeSubMenu(function () {
              $self.closeSidebar(_flags, _selectors);
            }, _defaults, _flags, _selectors);
          } else {
            $self.closeTitles(function () {
              $self.closeSidebar(_flags, _selectors);
            }, _flags, _selectors);
          }
        }
      });
    },

    menuInvokerClickFunc: function (defaults, flags, selectors) {
      var $self = this,
        config = $self.config,
        _defaults = defaults,
        _flags = flags,
        _selectors = selectors,
        menuInvoker = _selectors.menuInvoker;

      $(menuInvoker).stop().on('click', function (e) {
        var $this = $(this),
          parent = $this.parent(),
          parentSiblings = parent.siblings(),
          target = $this.data('target'),
          items = [];

        if (target) {
          e.preventDefault();
        }

        parentSiblings.children(menuInvoker).each(function () {
          if ($(this).data('target')) items.push($(this).data('target'));
        });

        $(items.toString()).parents().removeClass(config.openedSubMenuClass);
        $(items.toString()).slideUp(400);

        if ($(parent).hasClass(config.openedSubMenuClass)) {
          $(parent).removeClass(config.openedSubMenuClass);
          $(target).slideUp(400, function () {
            if ($(parent).parent().hasClass(config.topLevelMenuClass)) {
              _defaults.openedItem = '';
            }
          });
        } else {
          $(parent).addClass(config.openedSubMenuClass);
          $(target).slideDown(400, function () {
            if ($(parent).parent().hasClass(config.topLevelMenuClass)) {
              _defaults.openedItem = target;
            }
          });
        }
      });
    },

    openTitles: function (callback, flags, selectors) {
      var _flags = flags,
        _selectors = selectors;

      $(_selectors.sidebar).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
        $(_selectors.sidebar).find(_selectors.menuHeadings).slideDown(400, function () {
          _flags.isMenuHeadingsHide = false;

          if (callback) callback();
        });
      });
    },

    closeTitles: function (callback, flags, selectors) {
      var _flags = flags,
        _selectors = selectors;

      $(_selectors.sidebar).find(_selectors.menuHeadings).slideUp(400, function () {
        _flags.isMenuHeadingsHide = true;

        if (callback) callback();
      });
    },

    openSubMenu: function (callback, defaults, flags, selectors) {
      var $self = this,
        config = $self.config,
        _defaults = defaults,
        _flags = flags,
        _selectors = selectors;

      $(_defaults.openedItem).parent(_selectors.topLevelMenuItems).addClass(config.openedSubMenuClass);

      $(_defaults.openedItem).slideDown(400, function () {
        _flags.isSubMenuCollapsed = false;

        if (callback) callback();
      });
    },

    closeSubMenu: function (callback, defaults, flags, selectors) {
      var $self = this,
        config = $self.config,
        _defaults = defaults,
        _flags = flags,
        _selectors = selectors;

      $(_defaults.openedItem).slideUp(400, function () {
        $(_defaults.openedItem).parent(_selectors.topLevelMenuItems).removeClass(config.openedSubMenuClass);

        _flags.isSubMenuCollapsed = true;

        if (callback) callback();
      });
    },

    openSidebar: function (flags, selectors) {
      var $self = this,
        config = $self.config,
        _flags = flags,
        _selectors = selectors;

      $(_selectors.mainContainer).stop().removeClass(config.closedClass);

      $self.transitionOn(_flags, _selectors);

      $(_selectors.sidebar).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
        _flags.isSidebarClosed = false;

        $self.transitionOff(_flags, _selectors);
      });
    },

    closeSidebar: function (flags, selectors) {
      var $self = this,
        config = $self.config,
        _flags = flags,
        _selectors = selectors;

      $(_selectors.mainContainer).stop().addClass(config.closedClass);

      $self.transitionOn(_flags, _selectors);

      $(_selectors.sidebar).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
        _flags.isSidebarClosed = true;

        setTimeout(function () {
          $self.transitionOff(_flags, _selectors);
        }, 200);
      });
    },

    showSidebar: function (flags, selectors) {
      var $self = this,
        config = $self.config,
        _flags = flags,
        _selectors = selectors;

      $self.transitionOn(_flags, _selectors);

      $(_selectors.mainContainer).stop().removeClass(config.hiddenClass);

      $(_selectors.sidebar).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
        $self.transitionOff(_flags, _selectors);
      });

      _flags.isSidebarHidden = false;
    },

    hideSidebar: function (flags, selectors) {
      var $self = this,
        config = $self.config,
        _flags = flags,
        _selectors = selectors;

      $self.transitionOn(_flags, _selectors);

      $(_selectors.mainContainer).stop().addClass(config.hiddenClass);

      $(_selectors.sidebar).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
        $self.transitionOff(_flags, _selectors);
      });

      _flags.isSidebarHidden = true;
    },

    fullMode: function (flags, selectors) {
      var $self = this,
        config = $self.config,
        _flags = flags,
        _selectors = selectors;

      $(_selectors.mainContainer).addClass(config.fullModeClass);

      _flags.isFullMode = true;
    },

    miniMode: function (flags, selectors) {
      var $self = this,
        config = $self.config,
        _flags = flags,
        _selectors = selectors;

      $(_selectors.mainContainer).addClass(config.miniModeClass);

      _flags.isMiniMode = true;
    },

    transitionOn: function (flags, selectors) {
      var $self = this,
        config = $self.config,
        _flags = flags,
        _selectors = selectors;

      $(_selectors.mainContainer).addClass(config.transitionOnClass);

      _flags.isTransitionOn = true;
    },

    transitionOff: function (flags, selectors) {
      var $self = this,
        config = $self.config,
        _flags = flags,
        _selectors = selectors;

      $(_selectors.mainContainer).removeClass(config.transitionOnClass);

      _flags.isTransitionOn = false;
    },

    resizeFunc: function (defaults, flags, selectors) {
      var $self = this,
        config = $self.config,
        _defaults = defaults,
        _flags = flags,
        _selectors = selectors;

      $(window).on('resize', function () {
        var windowWidth = window.innerWidth;

        $self.transitionOff(_flags, _selectors);

        if (windowWidth <= config.touchDevicesModeResolution) {
          if (_defaults.openedItem !== '') {
            $(_selectors.sidebar).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
              $(_selectors.mainContainer).one().addClass(config.initializedClass);
            });
          } else {
            $(_selectors.mainContainer).one().addClass(config.initializedClass);
          }

          $(_selectors.mainContainer).one().addClass(config.hiddenClass);

          if (_flags.isFullMode === true) {
            if (_flags.isSidebarClosed === true) {
              $self.openSubMenu(false, _defaults, _flags, _selectors);
            }

            $(_selectors.mainContainer).one().removeClass(config.closedClass);

            _flags.isSidebarMinified = false;
          }

          if (_flags.isMiniMode === true) {
            $(_selectors.mainContainer).one().addClass(config.closedClass + ' ' + config.minifiedClass);

            $self.closeTitles(false, _flags, _selectors);
            $self.closeSubMenu(false, _defaults, _flags, _selectors);

            _flags.isSidebarClosed = true;
            _flags.isSidebarMinified = true;
          }

          _flags.isTouchDevicesMode = true;
        } else {
          if (_flags.isFullMode === true) {
            if (_flags.isSidebarClosed === true) {
              $(_defaults.openedItem).hide();
              $(_defaults.openedItem).parent(_selectors.topLevelMenuItems).removeClass(config.openedSubMenuClass);

              $(_selectors.mainContainer).one().addClass(config.closedClass);

              _flags.isSidebarMinified = true;
              _flags.isSubMenuCollapsed = true;
            }
          }

          $(_selectors.mainContainer).one().removeClass(config.initializedClass + ' ' + config.hiddenClass);

          _flags.isTouchDevicesMode = false;
        }
      });

      $(window).trigger('resize');
    }
  }
})(jQuery);