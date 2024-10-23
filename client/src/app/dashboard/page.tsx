"use client"

import AuthForm from "./Form"





const Dashboard = () => {
  return (
    <div
    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <AuthForm />
    </div>
  )
}

export default Dashboard