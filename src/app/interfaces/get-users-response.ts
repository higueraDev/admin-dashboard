import { User } from "../models/user";

export interface GetUsersResponse {
  ok:    boolean;
  users: User[];
  total: number;
}

