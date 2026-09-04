export interface everyArtists {
   image: string;
   name: string;
}

export interface ArtistMutation {
   image: string;
   name: string;
   date: string;
}

export interface Album {
   _id: string;
   name: string;
   artist: string;
   year: number;
   image?: string;
}

export interface Tracks {
   _id: string;
   number: number;
   album: string;
   name: string;
   duration?: string;
}

export interface RegisterMutation  {
   username: string;
   password: string;
}

export interface LoginMutation {
   username: string;
   password: string;
}

export interface ValidationError {
   errors: {
      [key: string] : {
         name: string;
         message: string;
      }
   }
}

export interface GlobalError {
   error: string;
}

export interface User {
   _id: string;
   username: string;
   token: string;
}