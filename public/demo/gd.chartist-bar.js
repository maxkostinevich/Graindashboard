;(function ($) {
  'use strict';

  $.GDCore.components.GDChartistBar = {
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
        var optStrokeWidth = $(el).data('stroke-width'),
          optMobileStrokeWidth = $(el).data('mobile-stroke-width'),
          optStrokeColor = JSON.parse(el.getAttribute('data-stroke-color'));

        $(el).attr('id', 'barCharts' + i);

        $('<style id="barChartsStyle' + i + '"></style>').insertAfter($(el));

        //Variables
        var barChartStyles = '',
          optSeries = JSON.parse(el.getAttribute('data-series')),
          optLabels = JSON.parse(el.getAttribute('data-labels')),
          optIsHorizontalBars = Boolean($(el).data('is-horizontal-bars')),
          optHeight = $(el).data('height'),
          optMobileHeight = $(el).data('mobile-height'),
          optHigh = $(el).data('high'),
          optLow = $(el).data('low'),
          optDistance = $(el).data('distance'),
          optIsFullWidth = Boolean($(el).data('is-full-width')),
          optChartPadding = JSON.parse(el.getAttribute('data-chart-padding')),

          // Axises
          optIsShowAxisX = Boolean($(el).data('is-show-axis-x')),
          optIsShowAxisY = Boolean($(el).data('is-show-axis-y')),
          optOffsetAxisX = $(el).data('offset-axis-x'),
          optOffsetAxisY = $(el).data('offset-axis-y'),

          // Bars
          optIsStackBars = Boolean($(el).data('is-stack-bars')),

          // Labels
          optLabelsQty = $(el).data('labels-qty'),
          optLabelsStartFrom = $(el).data('labels-start-from'),
          optIsShowLabelsAxisX = Boolean($(el).data('is-show-label-axis-x')),
          optIsShowLabelsAxisY = Boolean($(el).data('is-show-label-axis-y')),
          optLabelColorAxisX = $(el).data('label-color-axis-x'),
          optLabelFontSizeAxisX = $(el).data('label-font-size-axis-x'),
          optLabelColorAxisY = $(el).data('label-color-axis-y'),
          optLabelFontSizeAxisY = $(el).data('label-font-size-axis-y'),
          optTextOffsetTopX = $(el).data('text-offset-top-x'),

          // Tooltips
          optIsShowTooltips = Boolean($(el).data('is-show-tooltips')),
          optTooltipCustomClass = $(el).data('tooltip-custom-class'),
          optTooltipCurrency = $(el).data('tooltip-currency'),

          // Grid
          optIsGridSolidLine = Boolean($(el).data('is-grid-solid-line')),
          optGridLineColor = $(el).data('grid-line-color'),

          // Bar Labels
          optIsShowBarLabels = Boolean($(el).data('is-show-bar-labels')),

          // Strokes
          optIsStrokeRounded = Boolean($(el).data('is-stroke-rounded')),

          // Data
          data = {
            series: optSeries ? optSeries : false,
            labels: optLabels ? optLabels : false
          },

          // Options
          options = {
            width: '100%',
            height: optHeight,
            high: optHigh,
            low: optLow,
            seriesBarDistance: optDistance,
            axisX: {
              offset: optOffsetAxisX ? optOffsetAxisX : 0,
              scaleMinSpace: 0,
              showGrid: optIsShowAxisX,
              showLabel: optIsShowLabelsAxisX,
              labelOffset: {
                y: optTextOffsetTopX ? optTextOffsetTopX : 0
              }
            },
            axisY: {
              offset: optOffsetAxisY ? optOffsetAxisY : 0,
              scaleMinSpace: 0,
              showGrid: optIsShowAxisY,
              showLabel: optIsShowLabelsAxisY

            },
            fullWidth: optIsFullWidth,
            stackBars: optIsStackBars,
            stackMode: 'overlap',
            horizontalBars: optIsHorizontalBars,
            chartPadding: optChartPadding ? {
              top: optChartPadding.top ? optChartPadding.top : 0,
              bottom: optChartPadding.bottom ? optChartPadding.bottom : 0,
              left: optChartPadding.left ? optChartPadding.left : 0,
              right: optChartPadding.right ? optChartPadding.right : 0
            } : 0,
            plugins: []
          },
          responsiveOptions = [
            ['screen and (max-width: 769px)', {
              height: optMobileHeight ? optMobileHeight : optHeight,
              axisX: {
                offset: 0
              },
              axisY: {
                offset: 0
              }
            }]
          ];

        if (optIsShowBarLabels) {
          options.plugins[0] = Chartist.plugins.ctBarLabels({
            position: {
              y: function (data) {
                return data.y2 - 5
              }
            }
          })
        }

        if (optIsShowTooltips) {
          options.plugins[1] = Chartist.plugins.tooltip({
            currency: optTooltipCurrency,
            tooltipFnc: function (meta, value) {
              if (optLabels && optSeries) {
                if (this.currency) {
                  return '<span class="chartist-tooltip-value">' + (this.currency + value) + '</span>' +
                    '<span class="chartist-tooltip-meta">' + meta + '</span>';
                } else {
                  return '<span class="chartist-tooltip-value">' + value + '</span>' +
                    '<span class="chartist-tooltip-meta">' + meta + '</span>';
                }

              } else if (optSeries) {
                if (this.currency) {
                  return '<span class="chartist-tooltip-value">' + (this.currency + value) + '</span>';
                } else {
                  return '<span class="chartist-tooltip-value">' + value + '</span>';
                }
              } else if (optLabels) {
                return '<span class="chartist-tooltip-meta">' + meta + '</span>';
              } else {
                return false;
              }
            },
            class: optTooltipCustomClass
          })
        }

        var chart = new Chartist.Bar(el, data, options, responsiveOptions),
          isOnceCreatedTrue = 1;

        chart.on('created', function () {
          if (optLabelsQty) {
            $('#barCharts' + i + ' .ct-labels').addClass('chart--hide-empty-labels');
            $('#barCharts' + i + ' .ct-labels > *').each(function (i5) {
              if ((i5 - optLabelsStartFrom) % (parseInt(optLabels.length / optLabelsQty)) == 0) {
                $('#barCharts' + i + ' .ct-labels *:nth-child(' + i5 + ') .ct-label.ct-horizontal.ct-end').addClass('chart__label--visible');
              }
            });
          }

          if (isOnceCreatedTrue == 1) {
            $(el).find('.ct-series').each(function () {
              optIsGridSolidLine = optIsGridSolidLine ? 'none' : 'length';

              if (optStrokeWidth) {
                if(optMobileStrokeWidth) {
                  barChartStyles += '#barCharts' + i + ' .ct-series .ct-bar {stroke-width: ' + optMobileStrokeWidth + ';}';
                  barChartStyles += '@media(min-width: 768px) { #barCharts' + i + ' .ct-series .ct-bar {stroke-width: ' + optStrokeWidth + ';} }';
                } else {
                  barChartStyles += '#barCharts' + i + ' .ct-series .ct-bar {stroke-width: ' + optStrokeWidth + ';}';
                }
              }

              if (optLabelColorAxisY) {
                barChartStyles += '#barCharts' + i + ' .ct-label.ct-vertical {color: ' + optLabelColorAxisY + ';}';
              }

              if (optLabelFontSizeAxisY) {
                barChartStyles += '#barCharts' + i + ' .ct-label.ct-vertical {font-size: ' + optLabelFontSizeAxisY + ';}';
              }

              if (optLabelColorAxisX) {
                barChartStyles += '#barCharts' + i + ' .ct-label.ct-horizontal {color: ' + optLabelColorAxisX + ';}';
              }

              if (optLabelFontSizeAxisX) {
                barChartStyles += '#barCharts' + i + ' .ct-label.ct-horizontal {font-size: ' + optLabelFontSizeAxisX + ';}';
              }

              if (optLabelColorAxisX) {
                barChartStyles += '#barCharts' + i + ' .ct-bar-label {fill: ' + optLabelColorAxisX + ';}';
              }

              if (optLabelFontSizeAxisX) {
                barChartStyles += '#barCharts' + i + ' .ct-bar-label {font-size: ' + optLabelFontSizeAxisX + ';}';
              }

              if (optIsGridSolidLine) {
                barChartStyles += '#barCharts' + i + ' .ct-grid {stroke-dasharray: ' + optIsGridSolidLine + ';}';
              }

              if (optGridLineColor) {
                barChartStyles += '#barCharts' + i + ' .ct-grid {stroke: ' + optGridLineColor + ';}';
              }

              if (optIsStrokeRounded) {
                barChartStyles += '#barCharts' + i + ' .ct-series .ct-bar {stroke-linecap: round;}';
              }
            });


            $(el).find('.ct-series').each(function (i2) {
              barChartStyles += '#barCharts' + i + ' .ct-series:nth-child(' + (i2 + 1) + ') .ct-bar {stroke: ' + optStrokeColor[i2] + '}';
            });

            $('#barChartsStyle' + i).text(barChartStyles);
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
