import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
	it('should render the Vite and React logos', () => {
		render(<App />);
		expect(screen.getByText('Vite + React')).toBeInTheDocument();
	});
});
