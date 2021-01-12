import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((acc, key) => {
    if (props.results[key] === 'success') {
      acc++
    }

    return acc
  }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((answerItem, index) => {
          const cls = [
            'fa',
            props.results[answerItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[answerItem.id]]
          ]

          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {answerItem.questionTitle}
              <i className={cls.join(' ')} />
            </li>
          )
        })}
      </ul>

      <p>Правильно {successCount} из {props.quiz.length}</p>
      <div>
        <Button onClick={props.onRetry} type="primary">Повторить</Button>
      </div>
    </div>
  )
}

export default FinishedQuiz