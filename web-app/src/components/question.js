import React,{Component} from 'react'
import DOMPurify from 'dompurify'
import data from '../data/questions.json';

export default class Question extends Component {
    constructor(props){
        super(props)
        this.questionnaire = {data}.data.results
        this.handleTrueAnswer = this.handleTrueAnswer.bind(this);
        this.handleFalseAnswer = this.handleFalseAnswer.bind(this);
        this.chooser = this.selectQuestion();
        this.state = {
          'currentQuestion' : this.chooser(),
          'answeredQuestions' : [],
          'count' : 1,
          'answers' : []
        }
    }

  // select a question with no repeats
  selectQuestion() {
    var copy = this.questionnaire.slice(0);
    return function() {
      if (copy.length < 1) { copy = this.questionnaire.slice(0) }
      var index = Math.floor(Math.random() * copy.length)
      var item = copy[index]
      copy.splice(index, 1)
      return item
    };
  }

  nextQuestion(){
    // if(this.state.count >= 11){
        this.props.answeredQuestions([this.state.answeredQuestions, this.state.answers, this.state.count])
    // }
    this.setState({"currentQuestion" : this.chooser()})
  }

  handleFalseAnswer(){
    var answeredQuestions = this.state.answeredQuestions.concat([this.state.currentQuestion])
    var answers = this.state.answers.concat(['false'])
    this.setState({
      'answeredQuestions': answeredQuestions,
      'count' : this.state.count + 1,
      'answers' : answers
    })
    this.nextQuestion()
  }

  handleTrueAnswer(){
    var answeredQuestions = this.state.answeredQuestions.concat([this.state.currentQuestion])
    var answers = this.state.answers.concat(['true'])
    this.setState({
      'answeredQuestions': answeredQuestions,
      'count' : this.state.count + 1,
      'answers' : answers
    })
    this.nextQuestion()
  }

    render(){
        return (
            <div>
                <div className="card">
                  <div className="card-header">
                    {this.state.currentQuestion.category}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mb-4" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.currentQuestion.question)}}></h5>
                    <div class="row mb-1">
                      <div class="d-grid col-6">
                      <button onClick={this.handleTrueAnswer} className="btn btn-success ">True</button>
                      </div>
                      <div class="d-grid col-6">
                      <button onClick={this.handleFalseAnswer} className="btn btn-danger ">False</button>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    {this.state.count}/10
                  </div>
                </div>
            </div>
        );
    }
}
