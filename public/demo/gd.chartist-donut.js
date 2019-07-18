;(function ($) {
  'use strict';

  $.GDCore.components.GDChartistDonut = {
    /**
     *
     *
     * @var Object _baseConfig
     */
    _baseConfig: {},

    /**
     *
     *
     * @var jQuery pageCollection
     */
    pageCollection: $(),

    /**
     * Initialization of Line chart wrapper.
     *
     * @param String selector (optional)
     * @param Object config (optional)
     *
     * @return jQuery pageCollection - collection of initialized items.
     */

    init: function (selector, config) {
      this.collection = selector && $(selector).length ? $(selector) : $();
      if (!$(selector).length) return;

      this.config = config && $.isPlainObject(config) ?
        $.extend({}, this._baseConfig, config) : this._baseConfig;

      this.config.itemSelector = selector;

      this.initCharts();

      return this.pageCollection;
    },

    initCharts: function () {
      //Variables
      var $self = this,
        collection = $self.pageCollection;

      //Actions
      this.collection.each(function (i, el) {
        //Variables
        var optFillColors = JSON.parse(el.getAttribute('data-fill-colors'));

        $(el).attr('id', 'pieCharts' + i);

        $('<style id="donutChartsStyle' + i + '"></style>').insertAfter($(el));

        //Variables
        var donutChartStyles = '',
          optSeries = JSON.parse(el.getAttribute('data-series')),
          optBorderWidth = $(el).data('border-width'),
          optStartAngle = $(el).data('start-angle'),

          // Tooltips
          optIsShowTooltips = Boolean($(el).data('is-show-tooltips')),
          optTooltipBadgeMarkup = $(el).data('tooltip-badge-markup'),
          optIsReverseData = Boolean($(el).data('is-tooltip-reverse-data')),
          optTooltipCustomClass = $(el).data('tooltip-custom-class'),
          optTooltipCurrency = $(el).data('tooltip-currency'),
          optIsTooltipCurrencyReverse = Boolean($(el).data('is-tooltip-currency-reverse')),
          optSliceMargin = $(el).data('slice-margin') ? $(el).data('slice-margin') : 0,

          data = {
            series: optSeries
          },

          options = {
            donut: true,
            donutSolid: true,
            showLabel: false,
            chartPadding: 0,
            donutWidth: optBorderWidth + optSliceMargin,
            startAngle: optStartAngle + optSliceMargin,
            plugins: []
          };

        if (optIsShowTooltips) {
          options.plugins[0] = Chartist.plugins.tooltip({
            currency: optTooltipCurrency,
            tooltipFnc: function (meta, value) {
              if (meta !== "undefined" && value !== "undefined") {
                if (optIsReverseData) {
                  if (this.currency) {
                    if (optTooltipBadgeMarkup) {
                      if (optIsTooltipCurrencyReverse) {
                        return optTooltipBadgeMarkup + '<span class="chartist-tooltip-value">' + (value + this.currency) + '</span>' +
                          '<span class="chartist-tooltip-meta">' + meta + '</span>';
                      } else {
                        return optTooltipBadgeMarkup + '<span class="chartist-tooltip-value">' + (this.currency + value) + '</span>' +
                          '<span class="chartist-tooltip-meta">' + meta + '</span>';
                      }
                    } else {
                      if (optIsTooltipCurrencyReverse) {
                        return '<span class="chartist-tooltip-value">' + (value + this.currency) + '</span>' +
                          '<span class="chartist-tooltip-meta">' + meta + '</span>';
                      } else {
                        return '<span class="chartist-tooltip-value">' + (this.currency + value) + '</span>' +
                          '<span class="chartist-tooltip-meta">' + meta + '</span>';
                      }
                    }
                  } else {
                    if (optTooltipBadgeMarkup) {
                      return optTooltipBadgeMarkup + '<span class="chartist-tooltip-value">' + value + '</span>' +
                        '<span class="chartist-tooltip-meta">' + meta + '</span>';
                    } else {
                      return '<span class="chartist-tooltip-value">' + value + '</span>' +
                        '<span class="chartist-tooltip-meta">' + meta + '</span>';
                    }
                  }
                } else {
                  if (this.currency) {
                    if (optTooltipBadgeMarkup) {
                      if (optIsTooltipCurrencyReverse) {
                        return optTooltipBadgeMarkup + '<span class="chartist-tooltip-meta">' + meta + '</span>' +
                          '<span class="chartist-tooltip-value">' + (value + this.currency) + '</span>';
                      } else {
                        return optTooltipBadgeMarkup + '<span class="chartist-tooltip-meta">' + meta + '</span>' +
                          '<span class="chartist-tooltip-value">' + (this.currency + value) + '</span>';
                      }
                    } else {
                      if (optIsTooltipCurrencyReverse) {
                        return '<span class="chartist-tooltip-meta">' + meta + '</span>' +
                          '<span class="chartist-tooltip-value">' + (value + this.currency) + '</span>';
                      } else {
                        return '<span class="chartist-tooltip-meta">' + meta + '</span>' +
                          '<span class="chartist-tooltip-value">' + (this.currency + value) + '</span>';
                      }
                    }
                  } else {
                    if (optTooltipBadgeMarkup) {
                      return optTooltipBadgeMarkup + '<span class="chartist-tooltip-meta">' + meta + '</span>' +
                        '<span class="chartist-tooltip-value">' + value + '</span>';
                    } else {
                      return '<span class="chartist-tooltip-meta">' + meta + '</span>' +
                        '<span class="chartist-tooltip-value">' + value + '</span>';
                    }
                  }
                }
              } else if (optSeries) {
                if (this.currency) {
                  if (optTooltipBadgeMarkup) {
                    if (optIsTooltipCurrencyReverse) {
                      return optTooltipBadgeMarkup + '<span class="chartist-tooltip-value">' + (value + this.currency) + '</span>';
                    } else {
                      return optTooltipBadgeMarkup + '<span class="chartist-tooltip-value">' + (this.currency + value) + '</span>';
                    }
                  } else {
                    return '<span class="chartist-tooltip-value">' + (this.currency + value) + '</span>';
                  }
                } else {
                  if (optTooltipBadgeMarkup) {
                    return optTooltipBadgeMarkup + '<span class="chartist-tooltip-value">' + value + '</span>';
                  } else {
                    return '<span class="chartist-tooltip-value">' + value + '</span>';
                  }
                }
              } else {
                return false;
              }
            },
            class: optTooltipCustomClass
          })
        }

        var chart = new Chartist.Pie(el, data, options),
          isOnceCreatedTrue = 1;

        chart.on('created', function () {
          if (isOnceCreatedTrue == 1) {
            $(el).find('.ct-series').each(function (i2) {
              donutChartStyles += '#pieCharts' + i + ' .ct-series:nth-child(' + (i2 + 1) + ') .ct-slice-donut-solid {fill: ' + optFillColors[i2] + '}';
            });

            donutChartStyles += '#pieCharts' + i + ' .ct-series .ct-slice-donut-solid {stroke: #ffffff; stroke-width: ' + optSliceMargin + '}';

            $('#donutChartsStyle' + i).text(donutChartStyles);
          }

          isOnceCreatedTrue++;
        });

        chart.update();

        resizeSensor.create(el, function () {
          chart.update();
        });

        //Actions
        collection = collection.add($(el));
      });
    }
  };
})(jQuery);
