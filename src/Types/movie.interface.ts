export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date: string;
  vote_average: number;
  overview: string;
  popularity: number;
  runtime?: number;
  backdrop_path: string;
}
