import React from 'react'
import classes from './AnswersList.module.css'
import AnswersItem from './AnswersItem/AnswersItem'

const AnswersList = props => (
  <ul className={classes.AnswersLIst}>
    {props.answers.map((Answer, index) => {
      return (
        <AnswersItem
          key={index}
          answer={Answer}
          onAnswerClick={props.onAnswerClick}
          state={props.state ? props.state[Answer.id] : null}
        />
      )
    })}
  </ul>
)


export default AnswersList