import React, { useState } from 'react';

import { fetchQuizQuote } from './api';
// components
import QuestionSession from './components/QuestionSession';
//api type
import { QuestionState } from './api';
import { Difficulty } from './api';
import { AnswerType } from './api';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [totalquestion, setTotalQuestion] = useState(1);
  const [question, setQuestion] = useState<QuestionState[]>([]); //array will be in QuestionState format 
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const [errMess, setErrMess] = useState(false);

  const initaialQuiz = async () => {
    setLoadingState(true);
    setGameOver(false);

    try {
      const newQuestion = await fetchQuizQuote(totalquestion, Difficulty.HARD, AnswerType.MULTIPLE);
      setQuestion(newQuestion);
      setScore(0);
      setUserAnswer([]);
      setNumber(0);
      setLoadingState(false);
    } catch (e) {
      setErrMess(true);
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //get User answer
      const answer = e.currentTarget.value;
      //check if it is a correct one
      const correct = question[number].correct_answer === answer;
      //Add some if answer is correct
      if (correct) setScore((prev) => prev + 1);
      //Save answer into answer array
      const answerObject = {
        question: question[number].question,
        answer,
        correct,
        correctAnswer: question[number].correct_answer,
      }
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    //Move on to the next question if its not the last one
    const nextQuestion = number + 1;

    if (nextQuestion === totalquestion) {
      setGameOver(false);
    }
    else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {errMess ? <p>Dang co loi xay ra! Vui long thu lai sau</p> : null}
      {
        gameOver ?
          <div>
            <label>Nhap vao so luong cau hoi</label>
            <input type="number" min="1" value={totalquestion} onKeyDown={(e) => e.preventDefault()} onChange={(e) => setTotalQuestion(parseInt(e.target.value))} />
          </div>
          : null
      }
      {
        totalquestion ?
          gameOver || userAnswer.length === totalquestion ?
            <button className='start' onClick={initaialQuiz}>
              Bat dau
            </button>
            : null
          : null
      }
      {!gameOver ? <p className='score'>Diem so: {score}</p> : null}
      {loadingState ? <p>Dang tai...</p> : null}
      {
        !loadingState && !gameOver ?
          <QuestionSession
            questionNumber={number + 1}
            totalQuestion={totalquestion}
            question={question[number].question}
            answers={question[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
          : null
      }
      {
        !gameOver && !loadingState && userAnswer.length === number + 1 && number !== totalquestion - 1 ?
          <button className='next' onClick={nextQuestion}>
            Cau hoi ke tiep
          </button>
          : null
      }
    </div>
  );
}

export default App;
