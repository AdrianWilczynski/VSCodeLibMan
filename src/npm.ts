import axios from 'axios';
import { searchResultCount } from './searchResults';

function url(query: string) {
    return `http://registry.npmjs.org/-/v1/search?text=${query}`;
}

interface Response {
    objects: {
        package: {
            name: string;
        }
    }[];
}

export async function search(query: string) {
    return (await axios.get<Response>(url(query)))
        .data.objects.map(o => o.package.name)
        .splice(0, searchResultCount);
}