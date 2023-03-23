export interface RegisterResponse {
  ok:     boolean;
  userDB: UserDB;
  token:  string;
}

export interface UserDB {
  uid:    string;
  name:   string;
  email:  string;
  role:   string;
  google: boolean;
}
