import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

test('renders learn react link', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/welcome/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react lik', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const list = screen.getByText(/Search/i);
  expect(list).toBeInTheDocument();
});

test('renders learn react lk', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const text = screen.getByText(/over/i);
  expect(text).toBeInTheDocument();
});
