import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

describe('<Todo />', () => {
  let todo;
  let todoComponent;
  let mockDeleteTodo;
  let mockCompleteTodo;

  beforeEach(() => {
    todo = {
      text: 'Add tests for frontend',
      done: false,
    };

    mockDeleteTodo = jest.fn();
    mockCompleteTodo = jest.fn();

    todoComponent = (
      <Todo
        object={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );
  });

  test('renders content', () => {
    render(todoComponent);

    const text = screen.getByText(todo.text);
    const done = screen.getByText(
      `This todo is ${todo.done ? 'done' : 'not done'}`
    );
    expect(text).toBeDefined();
    expect(done).toBeDefined();
  });

  test('renders complete button if todo is not done', () => {
    render(todoComponent);

    const button = screen.getByText('Set as done');
    expect(button).toBeDefined();
  });

  test('does not render complete button if todo is done', () => {
    todo.done = true;

    render(
      <Todo
        object={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    const button = screen.queryByText('Set as done');
    expect(button).toBeNull();
  });

  test('calls deleteTodo on button click', async () => {
    render(todoComponent);

    const user = userEvent.setup();
    const button = screen.getByText('Delete');
    await user.click(button);

    expect(mockDeleteTodo.mock.calls).toHaveLength(1);
  });

  test('calls completeTodo on button click', async () => {
    render(todoComponent);

    const user = userEvent.setup();
    const button = screen.getByText('Set as done');

    await user.click(button);
    expect(mockCompleteTodo.mock.calls).toHaveLength(1);
  });
});
