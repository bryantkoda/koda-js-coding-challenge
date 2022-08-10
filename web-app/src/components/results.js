import React,{Component} from 'react'
import DOMPurify from 'dompurify'

export default class Results extends Component {
    constructor(props){
        super(props)
        this.state = {'score' : this.getScore()};
    }

    capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getScore(){
        var score = 0
        this.props.answeredQuestions.forEach(function(val, key) {
            if(val.correct_answer === this.capitalize(this.props.answers[key])){
                score +=1
            }
        }.bind(this));
        return score
    }
    refreshPage(){
        window.location.reload();
    }

    render(){
        return (
            <div>
            <div className="card">
                <div className="card-header text-center">
                  Final Results
                  <button className="ms-3 btn btn-lg btn-warning">{this.state.score}/10</button>
                </div>
                <div className="card-body">
                  {this.props.answeredQuestions.map((val, key) => {
                      return (
                        <div className="row" key={key}>
                            <div className="col-10">
                                <h5 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(val.question)}}></h5>
                                <p className="text-muted">The correct answer is <span className={val.correct_answer == 'True' ? 'text-success' : 'text-danger'}>
                                {val.correct_answer}</span> You answered <span class={this.props.answers[key] == 'true' ? 'text-success' : 'text-danger'}> {this.props.answers[key]}</span></p>
                            </div>
                            <div className="col-2">
                                <i className={val.correct_answer === this.capitalize(this.props.answers[key]) ? 'bi-check-lg' : 'bi bi-x-lg'}></i>
                            </div>
                        </div>
                      )
                    })}
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-lg btn-primary" onClick={this.refreshPage}>Play Again -></button>
                </div>
            </div>

            </div>
        );
    }
}
