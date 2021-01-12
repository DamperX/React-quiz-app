import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
  state = {
    results: {}, // { id: 'error', id: 'success'
    quizFinished: false,
    answerState: null,
    activeQuestion: 0,
    quiz: [
      {
        id: 1,
        questionTitle: 'Какого цвета небо?',
        answerRightId: 1,
        answers: [
          {text: 'Синего', id: 1},
          {text: 'Зеленого', id: 2},
          {text: 'Красного', id: 3},
          {text: 'Белого', id: 4}
        ]
      },
      {
        id: 2,
        questionTitle: 'Какого цвета солнце?',
        answerRightId: 4,
        answers: [
          {text: 'Синего', id: 1},
          {text: 'Зеленого', id: 2},
          {text: 'Красного', id: 3},
          {text: 'Желтого', id: 4}
        ]
      }
    ]
  }

  onAnswerClickHandler = answerId => {
    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    if (!results[question.id]) {
      results[question.id] = 'success'
    }

    this.setState({
      answerState: {[answerId]: 'success'},
      results
    })

    if (question.answerRightId === answerId) {
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            quizFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          })
        }
        window.clearTimeout(timeout)
      }, 1000)

    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryClickHandler = () => {
    this.setState({
      activeQuestion: 0,
      quizFinished: false,
      results: {},
      answerState: null
    })
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizContainer}>
          <h1>Quiz</h1>
          {this.state.quizFinished
            ? <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryClickHandler}
            />
            : <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              questionTitle={this.state.quiz[this.state.activeQuestion].questionTitle}
              activeAnswer={this.state.activeQuestion + 1}
              answersLength={this.state.quiz.length}
              onAnswerClick={this.onAnswerClickHandler}
              state={this.state.answerState}
            />
          }
        </div>
      </div>
    )
  }
}

export default Quiz