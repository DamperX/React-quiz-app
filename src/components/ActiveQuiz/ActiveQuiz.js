import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>1.</strong>
          {props.questionTitle}
        </span>
        <small>{props.activeAnswer} из {props.answersLength}</small>
      </p>
      <AnswersList
        state={props.state}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  )
}

export default ActiveQuiz