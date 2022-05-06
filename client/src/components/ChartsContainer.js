import React, { useState } from 'react'
import BarChartComponent from './BarChart'
import AreaChart from './AreaChart'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'

export default function ChartsContainer() {
  const [barChart, setBarChart] = useState(true)
  const { monthlyTasks: data } = useAppContext()

  return (
    <Wrapper>
      <h4>Monthly Tasks</h4>

      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'AreaChart' : 'BarChart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  )
}