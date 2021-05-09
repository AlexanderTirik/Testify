import { IUser } from "../user/IUser";

export interface IResult {
  user: IUser;
  correctness: boolean[];
}
