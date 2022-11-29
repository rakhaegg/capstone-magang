/* eslint-disable no-undef */
import React from 'react';
import { findByLabelText, findByRole, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { App } from '../src/scripts/views/app';
import { act } from 'react-dom/test-utils';

describe('App Component', () => {
  it('Test state data Tanggal', async () => {
    render(
      <App />,
    );
    await screen.findByLabelText('container-task');
    const elementContainTextDate = await screen.findByRole('heading', { level: 2, name: 'Text Date' });
    expect(elementContainTextDate).not.toBeNull();
    expect(elementContainTextDate.textContent).toEqual(new Date().toDateString());
  });

  it('Test state data tanggal berubah ketika user menekan tombol yesterday', async () => {
    render(
      <App />,
    );
    const dataDateYesterday = new Date();
    dataDateYesterday.setDate(dataDateYesterday.getDate() - 1);
    await screen.findByLabelText('container-task');
    const elementContainTextDate = await screen.findByRole('heading', { name: 'Text Date', level: 2 });

    expect(elementContainTextDate).not.toBeNull();
    expect(elementContainTextDate.textContent).toEqual(new Date().toDateString());

    const elementButtonForUpdateDateState = screen.getByLabelText('Button Date Yesterday');
    fireEvent.click(elementButtonForUpdateDateState);
    const asd = await screen.findByRole('heading' , {name: 'Text Date' , level:2});
    console.log(asd);
    //expect((await screen.findByRole('heading', { level: 2, name: 'Text Date' })).textContent).toEqual(dataDateYesterday.toDateString());
  });

  /*
  it('Test state data tanggal berubah ketika user meneka tombol tomorrow', async ()=> {
    render(
      <App />,
    );

    const dataDateTomorrow = new Date();
    dataDateTomorrow.setDate(dataDateTomorrow.getDate() + 1);
    await screen.findByLabelText('container-task');

    const container = document.querySelector('div#hallo');
    const btn = await screen.findByLabelText('text-date');
    console.log(btn);
    // const btnTomorrow = screen.getByLabelText('Button Date Tomorrow');
    // expect(btnTomorrow.textContent).toBe('Tomorrow');
    // fireEvent.click(btnTomorrow);
    // expect(((await screen.findByLabelText('text-date',{selector: 'div'})).textContent)).toBe(dataDateTomorrow.toDateString());
  });
  */
});
