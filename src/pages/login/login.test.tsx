import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import Login from './index';

describe('Login Test', () => {
  it('If entered a name', async () => {
    render(<Login />);
    const fieldNode = await waitFor(() => screen.getByTestId('input-name'));
    // const fieldNode = await waitForElement(() => getByTestId('form-field'));
    console.log(fieldNode);
    fireEvent.change(fieldNode, { target: { value: 'name-teste' } });
    console.log(fieldNode);
  });
});
