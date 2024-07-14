import React from 'react'

export default function LowerFooter() {

  let  year = new Date()
  year = year.getFullYear()
  return (
    <>
    <footer>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <p className="text-white text-center m-0 fw-medium">
              &copy; {year} | All rights Reserved  
            </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}
