import { environment } from '../../environments/environment';

const baseUrl = environment.base_url;
export class Physician {
  constructor(
    public uid: string,
    public name: string,
    public createdBy: string,
    public hospital: string,
    public image?: string
  ) {}

  get imageUrl(): string {
    return `${baseUrl}/download/users/${this.image}`;
  }
}
