import { environment } from '../../environments/environment';

const baseUrl = environment.base_url;
export class User {
  constructor(
    public uid: string,
    public name: string,
    public email: string,
    public google?: boolean,
    public role?: string,
    public image?: string
  ) {}

  get imageUrl(): string {
    const externalUrl = this.image?.substring(0,4) === 'http';
    if (this.image && externalUrl) return this.image;
    return `${baseUrl}/download/users/${this.image}`;
  }
}
