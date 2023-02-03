import { render, screen } from '@testing-library/react';
import Home from "../../pages";


describe('home page', () => {
    it('renders correctly', () => {
        const { debug, getByText } = render(<Home/>)

        expect(getByText(/Filmes Recomendados do dia/i)).toBeInTheDocument()
        debug()
    })
})

