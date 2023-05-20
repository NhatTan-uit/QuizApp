import { shuffleArray } from "./util";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[] };
//final Question Structure for displaying

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export enum AnswerType {
    MULTIPLE = "multiple",
    BOOLEAN = "boolean",
}

export const fetchQuizQuote = async (amount: number, difficulty: Difficulty, type: AnswerType) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer]), // merge answer and list of incorrect answer for mapping
    }))
}