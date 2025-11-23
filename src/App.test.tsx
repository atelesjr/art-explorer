import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
	it('should render the Vite and React logos', () => {
		render(<App />);
		// App no longer shows the default Vite template text; assert a current UI string
		expect(screen.getByText('Search The Collection')).toBeInTheDocument();
	});
});
