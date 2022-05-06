import React from 'react'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Task from './Task'
import Wrapper from '../assets/wrappers/TasksContainer'
import PageBtnContainer from './PageBtnContainer'

const TaskContainer = () => {
    const { getTasks, tasks, isLoading, page, totalTasks,search,
      searchStatus,
      searchType,
      sort,numOfPages } = useAppContext()
    useEffect(() => {
      getTasks()
    }, [page,search, searchStatus, searchType, sort])
  
    if (isLoading) {
      return <Loading center />
    }
    if (tasks.length === 0) {
      return (
        <Wrapper>
          <h2>No Tasks to display...</h2>
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        <h5>
          {totalTasks} Task{tasks.length > 1 && 's'} found
        </h5>
        <div className='jobs'>
          {tasks.map((task) => {
            return <Task key={task._id} {...task} />
          })}
        </div>
      {numOfPages > 1 && <PageBtnContainer />}
      </Wrapper>
    )
}

export default TaskContainer