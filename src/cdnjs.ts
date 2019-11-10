import axios from 'axios';
import { searchResultCount } from './searchResults';

function url(query: string) {
    return `https://api.cdnjs.com/libraries?search=${query}`;
}

interface Response {
    results: {
        name: string
    }[];
}

export async function search(query: string) {
    return (await axios.get<Response>(url(query)))
        .data.results.map(r => r.name)
        .splice(0, searchResultCount);
}

