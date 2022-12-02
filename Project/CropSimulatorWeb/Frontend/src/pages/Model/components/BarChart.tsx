/* eslint-disable camelcase */
import { useLayoutEffect, FC } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { TOutput } from '..'
import { format } from 'date-fns'

const BarChart: FC<{ chartID: string; output: TOutput[] }> = ({ chartID, output }) => {
  useLayoutEffect(() => {
    const _root = am5.Root.new(chartID)

    _root.setThemes([am5themes_Animated.new(_root)])

    const chart = _root.container.children.push(
      am5xy.XYChart.new(_root, {
        panX: true,
        panY: true,
        layout: _root.verticalLayout,
        wheelY: 'zoomX',
        pinchZoomX: true,
      }),
    )

    // Define data
    const data = output.map((item) => {
      const res = {
        DVS: item.DVS,
        LAI: item.LAI,
        RD: item.RD,
        SM: item.SM,
        TAGP: item.TAGP,
        TRA: item.TRA,
        TWLV: item.TWLV,
        TWRT: item.TWRT,
        TWSO: item.TWSO,
        TWST: item.TWST,
        WWLOW: item.WWLOW,
        day: format(new Date(item.day), 'yyy-MM-dd'),
      }
      return res
    })

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(_root, {
        renderer: am5xy.AxisRendererY.new(_root, {}),
      }),
    )

    // Create X-Axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(_root, {
        renderer: am5xy.AxisRendererX.new(_root, {}),
        categoryField: 'day',
      }),
    )
    xAxis.data.setAll(data)

    // Create series

    const series = [
      'DVS',
      'LAI',
      'RD',
      'SM',
      'TAGP',
      'TRA',
      'TWLV',
      'TWRT',
      'TWSO',
      'TWST',
      'WWLOW',
    ].map((item) => {
      const serie = chart.series.push(
        am5xy.ColumnSeries.new(_root, {
          name: item,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: item,
          categoryXField: 'day',
        }),
      )
      serie.data.setAll(data)
    })

    // Add legend
    const legend = chart.children.push(am5.Legend.new(_root, {}))
    legend.data.setAll(chart.series.values)

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(_root, {}))

    return () => {
      _root.dispose()
    }
  }, [])

  return <div id={chartID} style={{ width: '100%', height: '500px' }}></div>
}
export default BarChart
