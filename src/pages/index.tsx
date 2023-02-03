import Head from "next/head";
import React from "react";
import Modal from 'react-modal';
import MovieDetails from "../modals/MovieDetails";
import {api} from '../services/api';
import {ApiKeyContext} from "../contexts/ApiKeyContext";
import {MovieCard} from '../components/MovieCard';
import {Header} from "../components/Header";

export interface IMovie {
    id: number;
    name?: string;
    title?: string;
    overview: string;
    backdrop_path: string;
}

export default function Home() {
    const {apiKey} = React.useContext(ApiKeyContext);

    const [movie, setMovie] = React.useState<IMovie>();
    const [movies, setMovies] = React.useState<IMovie[]>([]);
    const [openMovieDetails, setOpenMovieDetails] = React.useState<boolean>(false);

    React.useEffect(() => {
        async function getWeekMovies() {
            const response = await api.get(`/trending/all/day?api_key=${apiKey}`)
            setMovies(response.data.results)
        }

        getWeekMovies();
    }, [])

    function openMovieDetailsModal(isDetailOpen: boolean) {
        setOpenMovieDetails(isDetailOpen);
    }

    return (
        <>
            <Head>
                <title>
                    Home | GetHub Movies
                </title>
            </Head>
            <Header setMovies={setMovies}/>
            <div>
                <p className='ml-12 mt-10 whitespace-nowrap text-white font-bold text-2xl'>
                    Filmes Recomendados do dia
                </p>
            </div>
            <div className='flex w-full h-full justify-center'>
                <div className="w-full ml-10 lg:grid-cols-9">
                    {
                        movies.map(movie => {
                            return (
                                <div key={movie.id} onClick={() => {
                                    setMovie(movie);
                                    openMovieDetailsModal(true);
                                }} className='flex mx-2 my-4 justify-between float-left'>
                                    <MovieCard movie={movie}/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <Modal className='bg-transparent p-20 h-fit md:mt-[-80px] border-hidden border-none' ariaHideApp={false}
                   isOpen={openMovieDetails}>
                <MovieDetails setMovie={setMovie} movie={movie} closeModal={() => openMovieDetailsModal(false)}/>
            </Modal>
        </>
    )
}

