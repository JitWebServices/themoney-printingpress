import { createDirectus, rest, } from '@directus/sdk';

export type Post = {
    title: string;
    user_created: string;
    date_created: string;
    status: string;
    body: string;
    slug: string;
    tags: string[];
    site: string;
    short_body: string;
}


type Schema = {
    posts: Post[];
}

const directusUrl: string = import.meta.env.DIRECTUS_URL;

const directus = createDirectus<Schema>(directusUrl).with(rest());

export default directus;