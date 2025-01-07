
const Header = ({ course }) => (
  <>
    <h1>{course}</h1>
  </>
)

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
)

const Content = ({ parts }) => (
  <>
    {parts.map((e, i) => (
      <Part key={e.name + i} part={e.name} exercises={e.exercises} />
    ))}
  </>
)

const Total = ({ parts }) => (
  <>
    <p>Number of exercises {parts.reduce((v, e) => (v + e.exercises), 0)}</p>
  </>
)

const Course = ({ course }) => {
  const { name, parts } = course
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

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

  return <Course course={course} />
}

export default App
