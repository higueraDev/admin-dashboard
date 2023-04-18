import { User } from '../models/user';

export interface RegisterResponse {
  ok: boolean;
  user: User;
  token: string;
}
