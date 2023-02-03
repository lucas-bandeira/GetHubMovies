import React from 'react';
import {AiOutlineSearch} from "react-icons/ai";
import {api} from "../../services/api";
import {ApiKeyContext} from "../../contexts/ApiKeyContext";
import {IMovie} from '../../pages';

interface IHeaderProps{
    setMovies: (movies: IMovie[]) => void;
}

export const Header = ({ setMovies }: IHeaderProps) => {
    const {apiKey} = React.useContext(ApiKeyContext);

    const [searchWord, setSearchWord] = React.useState<string>('');
    const [openSearch, setOpenSearch] = React.useState<boolean>(false);

    async function getHomePageMovies() {
        const response = await api.get(`/trending/all/day?api_key=${apiKey}`)
        setMovies(response.data.results)
    }

    async function getSearchedMovies(searchedWord: string) {
        const movieName = searchedWord.replace(/\s/g, '%20');

        const getSearchedMovie = await api.get(`/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1&include_adult=false`)
        setMovies(getSearchedMovie.data.results);
    }

    function openSearchInput(isOpen: boolean) {
        setOpenSearch(isOpen)
    }

    return(
        <header>
            <nav className="px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex justify-between mx-auto ">
                    <a href="src/components/Header/Header#index.tsx" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9"
                             alt="logo de play"/>
                    </a>
                    <div>
                        <p onClick={() => {getHomePageMovies()}} className='cursor-pointer mx-auto whitespace-nowrap text-center text-white mt-2 font-bold text-2xl'>GetHub
                            Movies</p>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full lg:flex lg:w-auto lg:order-1"
                         id="mobile-menu-2">
                        <div
                            className="flex flex-row align-center mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {
                                openSearch ?
                                    <div className="flex items-center justify-center bg-gray-800">

                                        <div className="relative text-gray-600 focus-within:text-gray-400">
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                    <button type="button"
                                                            className="cursor-pointer p-1 focus:outline-none focus:shadow-outline">
                                                        <svg fill="none" stroke="currentColor" strokeLinecap="round"
                                                             strokeLinejoin="round" strokeWidth="2"
                                                             viewBox="0 0 24 24" className="w-6 h-6"><path
                                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                        </svg>
                                                    </button>
                                                </span>
                                            <input autoFocus={true} onKeyDown={(e) => {
                                                e.key === 'Enter' && getSearchedMovies(searchWord)
                                            }} id='searchInput' onChange={e => {
                                                setSearchWord(e.target.value)
                                            }} onBlur={() => openSearchInput(false)} type="search" name=""
                                                   className="text-black py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                                                   placeholder="Search..." autoComplete="off"/>
                                        </div>

                                    </div>
                                    :
                                    <div className='mt-2'>
                                        <AiOutlineSearch onClick={() => openSearchInput(true)}
                                                         className='cursor-pointer' size={30}/>
                                    </div>
                            }
                            <div className="overflow-hidden">
                                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                     src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                     alt="avatar"/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}