export class User {
  constructor(
    public uid: string,
    public name: string,
    public email: string,
    public google?: boolean,
    public role?: string,
    public image?: string
  ) {}
}
