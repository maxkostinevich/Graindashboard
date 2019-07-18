;(function ($) {
  'use strict';

  $.GDCore.components.GDChartistArea = {
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
        if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
          $('body').addClass('IE11');
        }

        //Variables
        var optIsFillColorsGradient = Boolean($(el).data('is-fill-colors-gradient')),
          optFillColors = JSON.parse(el.getAttribute('data-fill-colors')),
          optFillOpacity = $(el).data('fill-opacity'),

          // Lines
          optLineColors = JSON.parse(el.getAttribute('data-line-colors')),
          optLineWidth = JSON.parse(el.getAttribute('data-line-width')),
          optLineDasharrays = JSON.parse(el.getAttribute('data-line-dasharrays')),

          // Grid
          optStrokeColorAxisX = $(el).data('stroke-color-axis-x'),
          optStrokeColorAxisY = $(el).data('stroke-color-axis-y'),
          optStrokeDasharrayAxisX = $(el).data('stroke-dasharray-axis-x'),
          optStrokeDasharrayAxisY = $(el).data('stroke-dasharray-axis-y'),
          optIsSideStrokeHiddenAxisX = Boolean($(el).data('is-side-stroke-hidden-axis-x')),

          // Labels
          optLabelsQty = $(el).data('labels-qty'),
          optLabelsStartFrom = $(el).data('labels-start-from'),
          optTextSizeX = $(el).data('text-size-x'),
          optTextSizeY = $(el).data('text-size-y'),
          optTextColorX = $(el).data('text-color-x'),
          optTextColorY = $(el).data('text-color-y'),
          optTextOffsetTopX = $(el).data('text-offset-top-x'),
          optTextAlignAxisX = $(el).data('text-align-axis-x'),
          optTextAlignAxisY = $(el).data('text-align-axis-y'),

          // Points
          optPointsColors = JSON.parse(el.getAttribute('data-points-colors'));

        $(el).attr('id', 'areaCharts' + i);

        $('<style id="areaChartsStyle' + i + '"></style>').insertAfter($(el));

        //Variables
        // Area
        var optIsHideArea = Boolean($(el).data('is-hide-area')),

          // Lines
          optIsHideLine = Boolean($(el).data('is-hide-line')),

          // Axises
          optIsShowAxisX = Boolean($(el).data('is-show-axis-x')),
          optIsShowAxisY = Boolean($(el).data('is-show-axis-y')),

          // Lines
          optIsLineSmooth = {},

          // Tooltips
          optIsShowTooltips = Boolean($(el).data('is-show-tooltips')),
          optIsCustomTooltips = Boolean($(el).data('is-line-tooltips')),
          optIsTooltipDivided = !$('body').hasClass('IE11') ? Boolean($(el).data('is-tooltip-divided')) : false,
          optTooltipBadgeMarkup = !$('body').hasClass('IE11') ? $(el).data('tooltip-badge-markup') : '',
          optIsTooltipsAppendToBody = Boolean($(el).data('is-tooltips-append-to-body')),
          optIsReverseData = Boolean($(el).data('is-tooltip-reverse-data')),
          optTooltipCustomClass = !$('body').hasClass('IE11') ? $(el).data('tooltip-custom-class') : 'chart-tooltip chart-tooltip--sections-blocked chart-tooltip__meta--text-muted small text-white p-2',
          optTooltipCurrency = $(el).data('tooltip-currency'),
          optIsTooltipCurrencyReverse = Boolean($(el).data('is-tooltip-currency-reverse')),
          optCustomTooltips = {
            appendTooltipContent: function (tooltip, data, pluginOptions) {
              var title = document.createElement('div');
              title.setAttribute('class', 'chartist-tooltip-title');
              title.innerHTML = data.label;
              tooltip.appendChild(title);

              var seriesLabel;

              data.series.forEach(function (arr, i) {
                seriesLabel = pluginOptions.createSeriesLabel({
                  id: i,
                  idAlpha: String.fromCharCode(97 + i),
                  value: arr.value,
                  meta: arr.meta
                }, pluginOptions);

                tooltip.appendChild(seriesLabel);
              });
            },
            createSeriesLabel: function (options, pluginOptions, i) {
              var seriesLabel = document.createElement('div');

              seriesLabel.setAttribute('class', 'chartist-tooltip-series-labels');
              seriesLabel.style.color = optLineColors[options.id];
              seriesLabel.innerHTML = '<span class="chartist-tooltip-meta">' + options.meta + '</span><span class="chartist-tooltip-value">' + options.value + '</span>';

              return seriesLabel;
            }
          },
          tooltips = [],

          // Points
          optIsShowPoint = Boolean($(el).data('is-show-points')),
          optPointEl = $(el).data('point-custom-class'),
          optPointDimensions = JSON.parse(el.getAttribute('data-point-dimensions')),

          areaChartStyles = '',
          optSeries = optIsCustomTooltips ? JSON.parse(el.getAttribute('data-series')) : [],
          optLabels = JSON.parse(el.getAttribute('data-labels')),
          optHeight = parseInt($(el).data('height')),
          optWidth = $(el).data('width'),
          optMobileHeight = $(el).data('mobile-height'),
          optHigh = $(el).data('high'),
          optLow = $(el).data('low'),
          optOffsetX = parseInt($(el).data('offset-x')),
          optOffsetY = parseInt($(el).data('offset-y')),
          optPrefix = $(el).data('prefix'),
          optPostfix = $(el).data('postfix'),
          optAlignTextAxisX = $(el).data('align-text-axis-x'),
          optIsFullWidth = Boolean($(el).data('is-full-width')),
          optChartPadding = JSON.parse(el.getAttribute('data-chart-padding'));

        if ($('body').hasClass('IE11')) {
          optIsCustomTooltips = false;
          optSeries = [];
        }

        if (JSON.parse(el.getAttribute('data-series')) && !optIsCustomTooltips) {
          for (var i3 = 0; i3 < JSON.parse(el.getAttribute('data-series')).length; i3++) {
            optSeries.push({
              name: 'series' + i + i3,
              data: JSON.parse(el.getAttribute('data-series'))[i3]
            })
          }
        }

        if (JSON.parse(el.getAttribute('data-is-line-smooth'))) {
          for (var i4 = 0; i4 < JSON.parse(el.getAttribute('data-is-line-smooth')).length; i4++) {
            var typeOfSmooth;

            switch (JSON.parse(el.getAttribute('data-is-line-smooth'))[i4]) {
              case true:
                typeOfSmooth = true;
                break;
              case false:
                typeOfSmooth = false;
                break;
              case 'simple':
                typeOfSmooth = Chartist.Interpolation.simple();
                break;
              case 'step':
                typeOfSmooth = Chartist.Interpolation.step();
                break;
              default:
                typeOfSmooth = true;
            }

            optIsLineSmooth['series' + i + i4] = {
              lineSmooth: typeOfSmooth
            };
          }
        }

        // Data
        var data = {
          labels: optLabels,
          series: optSeries
        };

        // Options
        var options = {
            width: optWidth ? optWidth : false,
            height: optHeight,
            high: optHigh,
            low: optLow ? optLow : 0,
            showArea: !optIsHideArea,
            showLine: !optIsHideLine,
            showPoint: optIsShowPoint,
            fullWidth: optIsFullWidth ? optIsFullWidth : true,
            chartPadding: optChartPadding ? {
              top: optChartPadding.top ? optChartPadding.top : 0,
              bottom: optChartPadding.bottom ? optChartPadding.bottom : 0,
              left: optChartPadding.left ? optChartPadding.left : 0,
              right: optChartPadding.right ? optChartPadding.right : 0
            } : 0,
            axisX: {
              offset: optOffsetX ? optOffsetX : 0,
              showGrid: optIsShowAxisX ? optIsShowAxisX : false,
              labelOffset: {
                y: optTextOffsetTopX ? optTextOffsetTopX : 0
              }
            },
            axisY: {
              offset: optOffsetY ? optOffsetY : 0,
              showGrid: optIsShowAxisY ? optIsShowAxisY : false,
              labelInterpolationFnc: function (value) {
                if (optPrefix) {
                  return optPrefix + value;
                } else if (optPostfix) {
                  return value + optPostfix;
                } else {
                  return value;
                }
              }
            },
            series: optIsLineSmooth,
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

        if (optIsShowTooltips) {
          Chartist.plugins = Chartist.plugins || {};

          Chartist.plugins.customTooltip = function (options) {
            var pluginOptions = Chartist.extend({}, optCustomTooltips, options);

            return function plugin(chart) {
              if (!(chart instanceof Chartist.Line)) {
                return;
              }

              var createTooltip = function (options) {
                var tooltip = document.createElement('div');

                tooltip.id = 'tooltip-' + i + '-' + options.id + '';
                tooltip.className = 'chartist-tooltip-custom ' + optTooltipCustomClass;

                tooltip.innerHTML = '<div class="chartist-tooltip-inner"></div>';

                return tooltip;
              };

              var createTooltips = function (data) {
                var tooltipsContainer = document.querySelector('body');

                var tooltipContainer,
                  tooltip,
                  seriesLabel;

                data.forEach(function (tooltipData, s) {
                  tooltipData.id = s;
                  tooltipContainer = createTooltip(tooltipData);

                  tooltip = tooltipContainer.querySelector('.chartist-tooltip-inner');
                  pluginOptions.appendTooltipContent(tooltip, tooltipData, pluginOptions);

                  tooltips[s] = tooltip;
                  tooltipsContainer.appendChild(tooltipContainer);
                });
              };

              chart.on('data', function (data) {
                var tooltipData = [];

                data.data.series.forEach(function (series, s) {
                  series.forEach(function (value, i) {
                    tooltipData[i] = tooltipData[i] || {};
                    tooltipData[i].label = data.data.labels[i];
                    tooltipData[i].series = tooltipData[i].series || [];
                    tooltipData[i].series[s] = value;
                  })
                });

                createTooltips(tooltipData);
              });
            };
          };

          if (optIsCustomTooltips) {
            options.plugins[0] = Chartist.plugins.customTooltip();
          } else {
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
                        var newTemplate = !optTooltipBadgeMarkup ? '<span class="chartist-tooltip-value">' + value + '</span>' : '<span class="chartist-tooltip-meta">' + meta + '</span><span class="chartist-tooltip-value">' + value + '</span>';

                        return newTemplate;
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
              class: optTooltipCustomClass + ' chartist-tooltip-' + i,
              appendToBody: optIsTooltipsAppendToBody
            })
          }
        }

        var chart = new Chartist.Line(el, data, options, responsiveOptions),
          isOnceCreatedTrue = 1;

        if (optPointEl) {
          chart.on('draw', function (data) {
            if (!$('body').hasClass('IE11')) {
              if (data.type === 'point') {
                var point = data.element.parent().foreignObject('<div class="u-point"><span class="ct-point ' + optPointEl + '" ct:meta="' + data.meta + '" ct:value="' + data.value.y + '"></span><span class="u-point__helper"></span></div>', {
                  width: parseInt(optPointDimensions.width),
                  height: parseInt(optPointDimensions.height),
                  x: data.x - (parseInt(optPointDimensions.width / 2)),
                  y: data.y - (parseInt(optPointDimensions.height / 2)),
                  "ct:tooltip": "tooltip-" + i + '-' + data.index,
                  "ct:meta": data.meta,
                  "ct:value": data.value.y
                });

                data.element.replace(point);

                $(point._node).on('mouseenter', function () {
                  var $this = $(this),
                    innerPoint = $this.find('.u-point'),
                    thisWidth = innerPoint.outerWidth(),
                    thisHeight = innerPoint.outerHeight(),
                    thisOffsetTop = innerPoint.offset().top,
                    thisOffsetLeft = innerPoint.offset().left,
                    thisTooltip = $this.attr('ct:tooltip'),
                    thisTooltipWidth = $('#' + thisTooltip).outerWidth(),
                    thisTooltipHeight = $('#' + thisTooltip).outerHeight();

                  $('#' + thisTooltip).show().css({
                    top: thisOffsetTop - thisTooltipHeight - thisHeight,
                    left: thisOffsetLeft - (thisTooltipWidth / 2) + (thisWidth / 2),
                    opacity: 1
                  });
                });

                $(point._node).on('mouseleave', function () {
                  $('.chartist-tooltip-custom').hide().css({
                    top: '',
                    left: '',
                    opacity: ''
                  });
                });
              }
            }
          });
        }

        chart.on('created', function (data) {
          var axisXLinesLength = $('#areaCharts' + i + ' .ct-grid.ct-horizontal').length,
            axisXLabelsWidth = $('#areaCharts' + i + ' .ct-labels *:nth-child(' + (axisXLinesLength - 1) + ') .ct-label.ct-horizontal').outerWidth();

          $('#areaCharts' + i + ' .ct-labels *:nth-child(' + 1 + ') .ct-label.ct-horizontal').addClass('first');
          $('#areaCharts' + i + ' .ct-labels *:nth-child(' + axisXLinesLength + ')').width(axisXLabelsWidth);
          $('#areaCharts' + i + ' .ct-labels *:nth-child(' + axisXLinesLength + ') .ct-label.ct-horizontal').addClass('last').width(axisXLabelsWidth);

          if ($(el).find('.chartist-tooltip').length && $(el).find('.chartist-tooltip').hasClass('chart-tooltip--divided')) {
            $(el).find('.chartist-tooltip').css('height', optHeight - optOffsetX);
          }

          if (optLabelsQty) {
            $('#areaCharts' + i + ' .ct-labels').addClass('chart--hide-empty-labels');
            $('#areaCharts' + i + ' .ct-labels > *').each(function (i5) {
              if ((i5 - optLabelsStartFrom) % (parseInt(optLabels.length / optLabelsQty)) == 0) {
                $('#areaCharts' + i + ' .ct-labels *:nth-child(' + i5 + ') .ct-label.ct-horizontal.ct-end').addClass('chart__label--visible');
              }
              if ((i5 - optLabelsStartFrom) % (parseInt(optLabels.length / optLabelsQty)) == 0) {
                $('#areaCharts' + i + ' .ct-labels text.ct-label.ct-horizontal.ct-end:nth-child(' + i5 + ')').addClass('chart__label--visible');
                /* for IE 11 */
              }
            });
          }

          if (optIsTooltipDivided) {
            var parentHeight = $('#areaCharts' + i).height(),
              parentPadding = parseInt($('#areaCharts' + i).css('padding'));

            $('.chartist-tooltip-' + i).css({
              'height': (parentHeight + (parentPadding / 2)) - (optOffsetY / 2)
            });
          }

          $(el).find('.ct-series').each(function (i2) {
            if (optIsFillColorsGradient) {
              var defs = data.svg.elem('defs');

              defs.elem('linearGradient', {
                id: 'gradient' + i + '_' + i2,
                x1: 0,
                y1: 1,
                x2: 0,
                y2: 0
              }).elem('stop', {
                offset: 0,
                'stop-color': optFillColors[i2][1]
              }).parent().elem('stop', {
                offset: 1,
                'stop-color': optFillColors[i2][0]
              });
            }
          });

          if (isOnceCreatedTrue == 1) {
            if (optStrokeColorAxisX) {
              areaChartStyles += '#areaCharts' + i + ' .ct-grid.ct-vertical {stroke: ' + optStrokeColorAxisX + ';}';
            }

            if (optStrokeDasharrayAxisX) {
              areaChartStyles += '#areaCharts' + i + ' .ct-grid.ct-vertical {stroke-dasharray: ' + optStrokeDasharrayAxisX + '}';
            }

            if (optStrokeColorAxisY) {
              areaChartStyles += '#areaCharts' + i + ' .ct-grid.ct-horizontal {stroke: ' + optStrokeColorAxisY + ';}';
            }

            if (optStrokeDasharrayAxisY) {
              areaChartStyles += '#areaCharts' + i + ' .ct-grid.ct-horizontal {stroke-dasharray: ' + optStrokeDasharrayAxisY + ';}';
            }

            if (optFillOpacity) {
              areaChartStyles += '#areaCharts' + i + ' .ct-area {fill-opacity: ' + optFillOpacity + '}';
            }

            if (optTextSizeX) {
              areaChartStyles += '#areaCharts' + i + ' .ct-horizontal {font-size: ' + optTextSizeX + ';}';
            }

            if (optTextColorX) {
              areaChartStyles += '#areaCharts' + i + ' .ct-horizontal {color: ' + optTextColorX + ';}';
            }

            if (optAlignTextAxisX) {
              areaChartStyles += '#areaCharts' + i + ' .ct-horizontal {justify-content: ' + optAlignTextAxisX + ';}';
            }

            if (optTextSizeY) {
              areaChartStyles += '#areaCharts' + i + ' .ct-vertical {font-size: ' + optTextSizeY + ';}';
            }

            if (optTextColorY) {
              areaChartStyles += '#areaCharts' + i + ' .ct-vertical {color: ' + optTextColorY + ';}';
            }

            if (optIsSideStrokeHiddenAxisX) {
              areaChartStyles += '#areaCharts' + i + ' .ct-grid.ct-horizontal:first-of-type {display: none;}' +
                '#areaCharts' + i + ' .ct-grid.ct-horizontal:nth-child(' + axisXLinesLength + ') {display: none;}';
            }

            if (optTextAlignAxisX) {
              areaChartStyles += '#areaCharts' + i + ' .ct-label.ct-horizontal.ct-end {justify-content: ' + optTextAlignAxisX + ';}';
            }

            if (optTextAlignAxisY) {
              areaChartStyles += '#areaCharts' + i + ' .ct-label.ct-vertical.ct-start {justify-content: ' + optTextAlignAxisY + ';}';
            }

            $(el).find('.ct-series').each(function (i2) {
              if (optFillColors && !optIsFillColorsGradient) {
                areaChartStyles += '#areaCharts' + i + ' .ct-series:nth-child(' + (i2 + 1) + ') .ct-area {fill: ' + optFillColors[i2] + '}';
              } else if (optIsFillColorsGradient) {
                areaChartStyles += '#areaCharts' + i + ' .ct-series:nth-child(' + (i2 + 1) + ') .ct-area {fill: url(#' + 'gradient' + i + '_' + i2 + ');}';
              }

              if (optPointsColors) {
                areaChartStyles += '#areaCharts' + i + ' .ct-series:nth-child(' + (i2 + 1) + ') .ct-point {stroke: ' + optPointsColors[i2] + '}'
              }

              if (optLineWidth) {
                areaChartStyles += '#areaCharts' + i + ' .ct-series:nth-child(' + (i2 + 1) + ') .ct-line {stroke-width: ' + optLineWidth[i2] + ';}';
              }

              if (optLineColors) {
                areaChartStyles += '#areaCharts' + i + ' .ct-series:nth-child(' + (i2 + 1) + ') .ct-line {stroke: ' + optLineColors[i2] + '}';
              }

              if (optLineDasharrays) {
                areaChartStyles += '#areaCharts' + i + ' .ct-series:nth-child(' + (i2 + 1) + ') .ct-line {stroke-dasharray: ' + optLineDasharrays[i2] + '}';
              }
            });

            $('#areaChartsStyle' + i).text(areaChartStyles);
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