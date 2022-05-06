
import { useAppContext } from '../context/appContext'
import StatsItem from './StatsItem'
import { FaCircleNotch,FaClipboardList ,FaClipboardCheck} from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'
const StatsContainer = () => {
  const { stats } = useAppContext()
  const defaultStats = [
    {
      title: 'Todo tasks',
      count: stats.todo|| 0,
      icon: <FaClipboardList />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Inprogress', 
      count: stats.inprogress || 0,
      icon: <FaCircleNotch />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Complete tasks',
      count: stats.completed || 0,
      icon: <FaClipboardCheck />,
      color:'green',
      bcg: 'var(--green-light)'
    },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatsItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer