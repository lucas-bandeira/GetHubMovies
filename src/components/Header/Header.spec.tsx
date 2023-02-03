import {getByText, render} from '@testing-library/react';
import {Header} from "./index";

describe('Header Component', () => {
    const setMovies = () =>  {}
    it('renders correctly', () => {
        const { debug } = render(
            <Header setMovies={setMovies}/>
        )
        debug()
    })

    it('Check GetHub word renders correctly', () => {
        const setMovies = () =>  {}
        const { debug, getByText } = render(
            <Header setMovies={setMovies}/>
        )

        expect(getByText(/GetHub Movies/i)).toBeInTheDocument()
        debug()
    })
})

