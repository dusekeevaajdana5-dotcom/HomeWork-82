export interface everyArtists {
   image: string;
   name: string;
}

export interface ArtistMutation {
   image: string;
   name: string;
   date: number;
}

export interface Album {
   _id: string;
   name: string;
   artist: string;
   year: number;
   image?: string;
}
