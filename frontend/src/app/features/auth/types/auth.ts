export type LoginBody = {
  username: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {id:number,username:string};
};

export type Payload = {
    exp:number;
    iat:number;
    iss:string;
    jti:string;
    nbf:number;
    prv:string;
    sub:string;
}