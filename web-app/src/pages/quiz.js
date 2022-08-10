import React, {Component} from 'react'
import Question from '../components/question.js'
import Results from '../components/results.js'


export default class QuizPage extends Component {
  constructor(props){
    super(props)
    this.handleAnsweredQuestions = this.handleAnsweredQuestions.bind(this);
    this.state = {
        'answeredQuestions' : [],
        'count' : 1,
        'answers' : []
      }
  }

  handleAnsweredQuestions(value){
    this.setState({
      'answeredQuestions' : value[0],
      'answers' : value[1],
      'count' : value[2],
    })
  }

  render (){
    return(
      <div className="page page-home">
        {this.state.count < 10 ? <Question answeredQuestions={this.handleAnsweredQuestions} /> :
        <Results answeredQuestions={this.state.answeredQuestions} answers={this.state.answers}/>}
      </div>
    )
  }
}
