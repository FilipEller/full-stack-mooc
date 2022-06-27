import React from 'react'

const Header = ({ course }) => {
  return <header>
    <h1>{course}</h1>
  </header>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
};


const Content = ({ parts }) => {
  return (
    <section>
      {parts.map((p, index) =>
        (<Part part={p} key={index}/>)
      )}
    </section>
  );
};

const Total = ({ parts }) => {

  return <>
    <p>Number of exercises {parts.reduce((total, part) => total + part.exercises, 0)}</p>
  </>;
};


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App