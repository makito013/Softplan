import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import Login from './index';

describe('Login Test', () => {
  it('should render input element', () => {
    render(<Login />);
    const inputElement = screen.getByTestId('input-name') as HTMLInputElement;
    const buttonElement = screen.getByTestId('buttonLogin') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('If entered a name', () => {
    render(<Login />);
    const inputElement = screen.getByTestId('input-name') as HTMLInputElement;
    const buttonElement = screen.getByTestId('buttonLogin') as HTMLInputElement;
    // const fieldNode = await waitForElement(() => getByTestId('form-field'));
    fireEvent.change(inputElement, { target: { value: 'name-teste' } });
    expect(inputElement.value).toBe('name-teste');
  });
});
