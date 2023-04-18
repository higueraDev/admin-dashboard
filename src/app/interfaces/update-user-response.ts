import { User } from "../models/user";

export interface UpdateUserResponse {
  ok:   boolean;
  user: User;
}
