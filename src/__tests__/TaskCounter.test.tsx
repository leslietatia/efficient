import { render } from '@testing-library/react-native';
import React from 'react';
import { TaskCounter } from '../components/TaskCounter';

it('muestra la relación entre pendientes y finalizadas', () => {
  const { getByTestId, getByText } = render(<TaskCounter pending={3} done={1} />);
  expect(getByTestId('pending-count').props.children).toBe(3);
  expect(getByTestId('done-count').props.children).toBe(1);
  expect(getByText('25%')).toBeTruthy();
});
