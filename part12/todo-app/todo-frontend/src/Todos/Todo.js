import React from 'react';

const Todo = ({ object, deleteTodo, completeTodo }) => {
  const onClickDelete = (object) => () => {
    deleteTodo(object);
  };

  const onClickComplete = (object) => () => {
    completeTodo(object);
  };

  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={onClickDelete(object)}> Delete </button>
      </span>
    </>
  );

  const notDoneInfo = (
    <>
      <span>This todo is not done</span>
      <span>
        <button onClick={onClickDelete(object)}> Delete </button>
        <button onClick={onClickComplete(object)}> Set as done </button>
      </span>
    </>
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '70%',
        margin: 'auto',
      }}
    >
      <span>{object.text}</span>
      {object.done ? doneInfo : notDoneInfo}
    </div>
  );
};

export default Todo;
