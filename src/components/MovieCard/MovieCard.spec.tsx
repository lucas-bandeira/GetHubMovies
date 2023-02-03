import { render } from '@testing-library/react';
import {MovieCard} from "./index";

describe('Movie card Component', () => {
    it('renders correctly', () => {
        const movie = {
            id: 1234,
            name: 'white chiks',
            title: 'white chiks',
            overview: 'description',
            backdrop_path: 'https://image.tmdb.org/t/p/w185/1RZlwRdVbKav9O153vWbYCn54Nk.jpg',
        }
        const { debug } = render(
            <MovieCard movie={movie}/>
        )

        debug()
    })
})

