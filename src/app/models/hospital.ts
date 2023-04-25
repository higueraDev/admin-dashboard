import { environment } from '../../environments/environment';

const baseUrl = environment.base_url;
export class Hospital {
  constructor(
    public uid: string,
    public name: string,
    public createdBy: string,
    public image?: string
  ) {}

  get imageUrl(): string {
    return `${baseUrl}/download/hospitals/${this.image}`;
  }
}
