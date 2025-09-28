import { CAT_API_KEY, CAT_API_URL } from '@/env';
import { type CatImage, type Favourite } from '@/lib/cats/types';
import { BasicHttpClient, type HttpClient, type Result } from '@/lib/http/client';
import { useUserStore } from '@/lib/user/store';

export class CatsClient {
  private httpClient: HttpClient;
  private getUserId: () => string;

  constructor(httpClient: HttpClient, getUserId: () => string) {
    this.httpClient = httpClient;
    this.getUserId = getUserId;
  }

  async getImages(): Promise<Result<CatImage[]>> {
    return this.httpClient.fetch('GET', '/v1/images/search', { has_breeds: 1, limit: 10 });
  }

  async addFavourite(imageId: string): Promise<Result<{ id: string }>> {
    return this.httpClient.fetch('POST', '/v1/favourites', {
      image_id: imageId,
      sub_id: this.getUserId(),
    });
  }

  async getFavourites(): Promise<Result<Favourite[]>> {
    return this.httpClient.fetch('GET', '/v1/favourites', {
      sub_id: this.getUserId(),
      attach_image: 1,
      limit: 100,
      order: 'DESC',
    });
  }

  async deleteFavourite(id: string): Promise<Result<void>> {
    return this.httpClient.fetch('DELETE', `/v1/favourites/${id}`);
  }
}

const httpClient = new BasicHttpClient(CAT_API_URL, { 'x-api-key': CAT_API_KEY });

const getUserId = () => useUserStore.getState().userId;

export const catsClient = new CatsClient(httpClient, getUserId);
