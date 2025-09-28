import { CatsClient } from '@/lib/cats/client';
import { type Breed, type CatImage, type Favourite } from '@/lib/cats/types';
import { type HttpClient } from '@/lib/http/client';

describe('CatsClient', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let catsClient: jest.Mocked<CatsClient>;

  beforeEach(() => {
    httpClient = { fetch: jest.fn() };
    catsClient = jest.mocked(new CatsClient(httpClient, () => 'user-id-123'));
  });

  it('getImages', async () => {
    httpClient.fetch.mockResolvedValueOnce([
      null,
      [
        {
          breeds: [
            {
              weight: { imperial: '8 - 25', metric: '4 - 11' },
              id: 'sava',
              name: 'Savannah',
              vetstreet_url: 'http://www.vetstreet.com/cats/savannah',
              temperament:
                'Curious, Social, Intelligent, Loyal, Outgoing, Adventurous, Affectionate',
              origin: 'United States',
              country_codes: 'US',
              country_code: 'US',
              description:
                'Savannah is the feline version of a dog. Actively seeking social interaction, they are given to pouting if left out. Remaining kitten-like through life. Profoundly loyal to immediate family members whilst questioning the presence of strangers. Making excellent companions that are loyal, intelligent and eager to be involved.',
              life_span: '17 - 20',
              indoor: 0,
              alt_names: '',
              adaptability: 5,
              affection_level: 5,
              child_friendly: 4,
              dog_friendly: 5,
              energy_level: 5,
              grooming: 1,
              health_issues: 1,
              intelligence: 5,
              shedding_level: 3,
              social_needs: 5,
              stranger_friendly: 5,
              vocalisation: 1,
              experimental: 1,
              hairless: 0,
              natural: 0,
              rare: 0,
              rex: 0,
              suppressed_tail: 0,
              short_legs: 0,
              wikipedia_url: 'https://en.wikipedia.org/wiki/Savannah_cat',
              hypoallergenic: 0,
              reference_image_id: 'a8nIYvs6S',
            },
          ],
          id: 'h0A4PuWV0',
          url: 'https://cdn2.thecatapi.com/images/h0A4PuWV0.jpg',
          width: 750,
          height: 750,
        },
      ],
    ]);

    const [error, result] = await catsClient.getImages();

    expect(httpClient.fetch).toHaveBeenCalledWith('GET', '/v1/images/search', {
      has_breeds: 1,
      limit: 10,
    });

    expect(error).toBeNull();

    expect(result).toEqual([
      expect.objectContaining<CatImage>({
        id: 'h0A4PuWV0',
        url: 'https://cdn2.thecatapi.com/images/h0A4PuWV0.jpg',
        breeds: [
          expect.objectContaining<Breed>({
            name: 'Savannah',
            origin: 'United States',
            affection_level: 5,
          }),
        ],
      }),
    ]);
  });

  it('getFavourites', async () => {
    httpClient.fetch.mockResolvedValueOnce([
      null,
      [
        {
          created_at: '2025-09-28T05:36:33.000Z',
          id: 232549814,
          image: { id: 'VXppGG5rK', url: 'https://cdn2.thecatapi.com/images/VXppGG5rK.jpg' },
          image_id: 'VXppGG5rK',
          sub_id: '9a4b6c02-9819-4e51-a84f-b0bc8eb86315',
          user_id: 'xq4ek3',
        },
      ],
    ]);

    const [error, result] = await catsClient.getFavourites();

    expect(httpClient.fetch).toHaveBeenCalledWith('GET', '/v1/favourites', {
      sub_id: 'user-id-123',
      attach_image: 1,
      limit: 100,
      order: 'DESC',
    });

    expect(error).toBeNull();

    expect(result).toEqual([
      expect.objectContaining<Favourite>({
        id: 232549814,
        image: { id: 'VXppGG5rK', url: 'https://cdn2.thecatapi.com/images/VXppGG5rK.jpg' },
      }),
    ]);
  });

  it('addFavourites', async () => {
    httpClient.fetch.mockResolvedValueOnce([null, { id: 12345 }]);

    const [error, result] = await catsClient.addFavourite('image-id-213');

    expect(httpClient.fetch).toHaveBeenCalledWith('POST', '/v1/favourites', {
      image_id: 'image-id-213',
      sub_id: 'user-id-123',
    });

    expect(error).toBeNull();

    expect(result).toEqual({ id: 12345 });
  });

  it('deleteFavourites', async () => {
    await catsClient.deleteFavourite(12345);

    expect(httpClient.fetch).toHaveBeenCalledWith('DELETE', '/v1/favourites/12345');
  });
});
