import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="page page-home">
      <div className="card text-center">
        <div className="card-header">
          Welcome to  the Trivia Challenge!
        </div>
        <div className="card-body">
          <h5 className="card-title">You will be presented with 10 True or False questions.</h5>
          <p className="card-text">Can you sore 100%?</p>
          <Link to="quiz" className="btn btn-primary">BEGIN</Link>
        </div>
      </div>
    </div>
  )
}

