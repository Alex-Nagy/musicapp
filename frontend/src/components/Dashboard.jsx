import React from 'react'
import useAuthSpot from '../hooks/useAuthSpot'

const Dashboard = ({code}) => {
    const accessToken = useAuthSpot(code)
  return (
    <div>{code}</div>
  )
}

export default Dashboard