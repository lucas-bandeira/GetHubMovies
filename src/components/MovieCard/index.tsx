import React from 'react';
import { IMovie } from '../../pages';

interface MovieCardProps{
    movie: IMovie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    return(
        <div className='flex relative w-fit h-fit justify-center align-center cursor-pointer hover:touch-pinch-zoom delay-100 rounded-lg'>
            <img className='md:w-64 lg:w-60 min-w-[210px] h-40 rounded-lg' src={`https://image.tmdb.org/t/p/w185${movie.backdrop_path}`} alt="poster do filme"/>
            <p className='absolute bottom-0 font-bold text-white text-center bg-base-200 rounded-lg'>{movie.name ?? movie.title}</p>
        </div>
    );
}