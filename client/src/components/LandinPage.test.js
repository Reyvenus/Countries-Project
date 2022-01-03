import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

test('Expero que Welcome este en la landingPage', () => {
    render(<LandingPage />);
    const element = screen.getByText(/WellCome/i);
    expect(element).toBeInTheDocument();
});

test('Expero que el boton `Enter` este en la landingPage', () => {
    render(<LandingPage />);
    const element = screen.getByText(/Enter/i);
    expect(element).toBeInTheDocument();
});
