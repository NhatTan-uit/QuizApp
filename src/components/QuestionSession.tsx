import React from 'react'
//Types
import { AnswerObject } from '../App'

type QProps = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void; // return nothing
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestion: number;
}

const QuestionSession: React.FC<QProps> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestion
}) => {
  return (
    <div>
      <p className='number'>
        Question: {questionNumber} / {totalQuestion}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map(a => (
          <div key={a}>
            <button disabled={userAnswer? true: false} value={a} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: a }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionSession