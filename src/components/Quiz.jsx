import React, { Component } from 'react';


class Quiz extends Component {
  state = {
    questions: [
      {
        question: 'O que é front-end?',
        options: ['Parte de um Sistema que é oculta ao usuário', 'Parte de um sistema é visível e interativa ao usuário', 'Uma instância em um servidor cloud','A infraestrtura de um site'],
        correctAnswer: 'Parte de um sistema é visível e interativa ao usuário', 
      },
      {
        question: 'O que é ReactJS?',
        options: ['Uma poderosa biblioteca do JS', 'Uma linguagem de programação', 'Um servidor cloud', 'Uma ferramenta do Vscode'],
        correctAnswer: 'Uma poderosa biblioteca do JS', 
      },
      {
        question: 'Quais as principais tecnologias do mundo front-end?',
        options: ['Javascript, Golang e Python', 'AWS, GCP, Azure', 'Kotlin, HTML e CSS', 'HTML, CSS, JavaScript'],
        correctAnswer: 'HTML, CSS, JavaScript', 
      },
      {
        question: 'Em que ano o ReactJS foi lançado?',
        options:['2010', '2012', '2013', '2015'],
        correctAnswer:'2013',
      },
      {
        question: 'O que são hooks no React?',
        options:['São funcões de chamar arquivos', 'Um componente','Funções que permitem a você ligar-se aos recursos de state e ciclo de vida do React a partir de componentes funcionais'],
        correctAnswer:'Funções que permitem a você ligar-se aos recursos de state e ciclo de vida do React a partir de componentes funcionais.',
      }
     
    ],
    selectedOptions: {},
    score: null,
    quizCompleted: false 
  };

  handleOptionSelect = (questionIndex, selectedOption) => {
    this.setState((prevState) => ({
      selectedOptions: {
        ...prevState.selectedOptions,
        [questionIndex]: selectedOption,
      },
    }));
  };

  handleSubmitQuiz = () => {
    const { questions, selectedOptions } = this.state;
    
    const allQuestionsAnswered = questions.every((question, index) => {
      return selectedOptions[index] !== undefined;
    });

    if (allQuestionsAnswered){
      let score = 1;
      questions.forEach((question, index)=> {
        if (selectedOptions[index] === question.correctAnswer){
          score++
        }
      });
    
    this.setState({ score, quizCompleted: true });
  } else{
    alert('Responda todas as perguntas antes de enviar o Quiz.');
  }
};

  render() {
    const { questions, selectedOptions, score, quizCompleted } = this.state;

    return (
      <div>
        <h2>Quiz ReactJS</h2>
        {questions.map((question, index) => (
          <div key={index}>
            <h3>Questão {index + 1}</h3>
            <p>{question.question}</p>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      value={option}
                      checked={selectedOptions[index] === option}
                      onChange={() => this.handleOptionSelect(index, option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={this.handleSubmitQuiz}>Enviar Quiz</button>
        {quizCompleted && score !== null && (
          <div>
            <h2>Quiz completado!</h2>
            <p>Sua pontuação: {score} de {questions.length}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Quiz;