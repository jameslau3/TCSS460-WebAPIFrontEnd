export interface IBook {
    isbn13: string;
    authors: string;
    publication_year: string;
    original_title: string;
    title: string;
    // image_url: string;
    // image_url_small: string;
    icons: IUrlIcon;
    rating_avg: number;
    rating_count: number;
    ratings: IRatings;
    rating_1_star: number;
    rating_2_star: number;
    rating_3_star: number;
    rating_4_star: number;
    rating_5_star: number;
    image_url: string;
    image_small_url: string;
}

export interface IRatings {
    average: number;
    count: number;
    rating_1: number;
    rating_2: number;
    rating_3: number;
    rating_4: number;
    rating_5: number;
}

export interface IUrlIcon {
    image_url: string;
    image_small_url: string;
}