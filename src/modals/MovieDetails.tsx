import React from "react";
import {IMovie} from '../pages/index';
import {api} from "../services/api";
import {ApiKeyContext} from "../contexts/ApiKeyContext";
import {MovieCard} from "../components/MovieCard";

interface MovieProps {
    closeModal: (isDetailOpen: boolean) => void;
    movie: IMovie;
    setMovie: (movie: IMovie) => void;
}

export default function MovieDetails({closeModal, movie, setMovie}: MovieProps) {
    const {apiKey} = React.useContext(ApiKeyContext);
    const [recommendedMovies, setRecommendedMovies] = React.useState<IMovie[]>([]);

    React.useEffect(() => {
        async function getRecommendedMovies() {
            const response = await api.get(`/movie/${movie.id}/recommendations?api_key=${apiKey}&language=en-US&page=1`)
            setRecommendedMovies(response.data.results);
        }

        getRecommendedMovies()
    }, [movie])
    return (
        <div className='mx-auto relative w-4/5 h-full p-10 bg-black'>
            <div onClick={() => closeModal(false)} className='btn btn-ghost  absolute right-6 top-6'>
                <img className='h-5' src="./icons/Close.svg" alt="icone do menu"/>
            </div>
            <div className='flex flex-row'>
                <div className='rounded-lg'>
                    <img className='md:w-64 lg:w-60 mt-2 min-w-[256px] h-40 rounded-lg'
                         src={`https://image.tmdb.org/t/p/w185${movie.backdrop_path}`} alt="poster do filme"/>
                </div>
                <div className='flex flex-col ml-10 max-w-2xl text-white mt-2 text-xl'>
                    <div className='font-bold'>{movie.name ?? movie.title}</div>
                    <div className='flex flex-col whitespace-wrap text-white mt-2 text-sm'>{movie.overview}</div>
                </div>
            </div>
            <div className='flex flex-col'>
                <div>
                    <p className='whitespace-nowrap text-white mt-4 font-bold text-xl'>
                        Filmes Recomendados Semelhantes
                    </p>
                </div>
                <div className={recommendedMovies.length > 0 ? 'flex flex-row overflow-x-scroll' : 'flex flex-row overflow-x-hidden'}>
                    {
                        recommendedMovies.length > 0 ?
                            recommendedMovies.map(movie => {
                                return (
                                    <div key={movie.id} onClick={() => {setMovie(movie)}} className='flex mx-2 my-4 justify-between float-left'>
                                        <MovieCard movie={movie}/>
                                    </div>
                                );
                            })
                            :
                            <p className='whitespace-nowrap text-white mt-2 text-sm'>
                                Ainda não possuimos filmes recomendados semelhantes
                            </p>
                    }
                </div>
            </div>
        </div>
    );
}
