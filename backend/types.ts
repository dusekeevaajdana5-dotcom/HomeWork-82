export interface Artist {
    name: string;
    image: string;
    date: string;
}

export interface UserInfo {
    username: string;
    password: string;
    token: string;
    role: string;
}

export interface UserInfoGoogle {
    username: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleId?: string;
    avatar?: string;
}
