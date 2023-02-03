import axios from 'axios';
import { parseCookies } from "nookies";

const cookies = parseCookies();

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',

    // headers: {
    //     Authorization: `Bearer ${cookies['themoviedb.token']}`
    // }
});
