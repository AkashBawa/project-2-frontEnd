import { Outlet } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="dashBoardElder">
      <h1>Elder Dashboard</h1>
      <div className="dashElder">
        <div className="dashElderEvent">Upcoming Event</div>
        <div className="dashElderPending">Pending Approval</div>
        <div className="dashElderOpen">Open Request</div>
      </div>
      <div className="postCard">
        <div></div>
      </div>
    </div>
  )
}

export default Dashboard
