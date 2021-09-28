import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import App from '../../App';

function delay(n: number): any {
  return new Promise((resolve) => {
    setTimeout(resolve, n * 1000);
  });
}

describe('When entering the flags page', () => {
  it('passing name to the flags page', () => {
    render(<App test />);
    const inputElement = screen.getByTestId('input-name') as HTMLInputElement;
    const buttonElement = screen.getByTestId('buttonLogin') as HTMLButtonElement;
    fireEvent.change(inputElement, { target: { value: 'name-teste' } });
    fireEvent.click(buttonElement);
    const labelElement = screen.getByTestId('named') as HTMLLabelElement;
    expect(labelElement.innerHTML).toEqual('Olá name-teste,');
  });

  it('If entered a name', async () => {
    render(<App test />);

    const inputElement = screen.getByTestId('inputFlagsSearch') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Brasil' } });
    const valueTable = screen.getByTestId('tableRow-Brasil') as HTMLInputElement;
    expect(valueTable).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'testeNotValue' } });
    const table = screen.getByTestId('tableFlags');
    expect(table.innerHTML).toBe('');
  });

  it('When you click on see you must open modal', async () => {
    render(<App test />);

    const inputElement = screen.getByTestId('inputFlagsSearch') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Brasil' } });
    const buttonView = screen.getByTestId('ButtonView-Brasil') as HTMLButtonElement;
    expect(buttonView).toBeInTheDocument();
    fireEvent.click(buttonView);
    const modal = screen.getByTestId('Modal-Brasil') as HTMLButtonElement;
    expect(modal).toBeInTheDocument();
  });

  it('When clicking on edit you must open modal', () => {
    render(<App test />);
    const inputElement = screen.getByTestId('inputFlagsSearch') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Brasil' } });
    const buttonEdit = screen.getByTestId('ButtonEdit-Brasil') as HTMLButtonElement;
    expect(buttonEdit).toBeInTheDocument();
    fireEvent.click(buttonEdit);
    const Modal = screen.getByTestId('Modal-Brasil') as HTMLButtonElement;
    expect(Modal).toBeInTheDocument();
  });

  it('Check modal fields when clicking view', () => {
    render(<App test />);
    const inputElement = screen.getByTestId('inputFlagsSearch') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Brasil' } });
    const buttonView = screen.getByTestId('ButtonView-Brasil') as HTMLButtonElement;
    fireEvent.click(buttonView);
    const label = screen.getByTestId('Label-Brasil') as HTMLInputElement;
    expect(label.innerHTML).toEqual('Brasil');
    const inputName = screen.getByTestId('InputName-Brasil') as HTMLInputElement;
    const inputCapital = screen.getByTestId('InputCapital-Brasil') as HTMLInputElement;
    const inputArea = screen.getByTestId('InputArea-Brasil') as HTMLInputElement;
    const inputPopulacao = screen.getByTestId('InputPopulacao-Brasil') as HTMLInputElement;
    const inputDominio = screen.getByTestId('InputDominio-Brasil') as HTMLInputElement;
    expect(inputName).toBeInTheDocument();
    expect(inputCapital).toBeInTheDocument();
    expect(inputArea).toBeInTheDocument();
    expect(inputPopulacao).toBeInTheDocument();
    expect(inputDominio).toBeInTheDocument();
    expect(inputName.disabled).toBe(true);
    expect(inputCapital.disabled).toBe(true);
    expect(inputArea.disabled).toBe(true);
    expect(inputPopulacao.disabled).toBe(true);
    expect(inputDominio.disabled).toBe(true);
  });
});
