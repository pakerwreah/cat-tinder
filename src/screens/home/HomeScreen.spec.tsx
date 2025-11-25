import { QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { type PanGesture } from 'react-native-gesture-handler';
import { fireGestureHandler, getByGestureTestId } from 'react-native-gesture-handler/jest-utils';

import { CatsClientProvider } from '@/lib/cats';
import { CatsClient } from '@/lib/cats/client';
import { type CatImage } from '@/lib/cats/types';
import { type Result } from '@/lib/http/client';
import { queryClient } from '@/lib/query/client';
import { HomeScreen } from '@/screens/home/HomeScreen';

describe('HomeScreen', () => {
  let catsClient: jest.Mocked<CatsClient>;

  beforeEach(() => {
    catsClient = jest.mocked(
      new CatsClient(
        {
          fetch: jest.fn().mockResolvedValue([null, {}]),
        },
        () => 'user-id',
      ),
    );
    jest.spyOn(catsClient, 'getImages');
    jest.spyOn(catsClient, 'addFavourite');
  });

  function renderHomeScreen() {
    render(
      <QueryClientProvider client={queryClient}>
        <CatsClientProvider client={catsClient}>
          <HomeScreen />
        </CatsClientProvider>
      </QueryClientProvider>,
    );
  }

  it('Swipe Left (dislike)', async () => {
    catsClient.getImages.mockResolvedValueOnce(makeCatsResult(5));

    renderHomeScreen();

    const cards = await screen.findAllByTestId('cat-image-card');
    expect(cards.length).toBe(5);

    const panGesture = getByGestureTestId('pan-gesture');

    fireGestureHandler<PanGesture>(panGesture, [{ translationX: 0 }, { translationX: -1000 }]);

    await waitFor(() => {
      const cards = screen.getAllByTestId('cat-image-card');
      expect(cards.length).toBe(4);
    });

    expect(catsClient.addFavourite).not.toHaveBeenCalled();
  });

  it('Swipe Right (like)', async () => {
    catsClient.getImages.mockResolvedValueOnce(makeCatsResult(5));

    renderHomeScreen();

    const cards = await screen.findAllByTestId('cat-image-card');
    expect(cards.length).toBe(5);

    const panGesture = getByGestureTestId('pan-gesture');

    fireGestureHandler<PanGesture>(panGesture, [{ translationX: 0 }, { translationX: 1000 }]);

    await waitFor(() => {
      const cards = screen.getAllByTestId('cat-image-card');
      expect(cards.length).toBe(4);
    });

    expect(catsClient.addFavourite).toHaveBeenCalledWith('1');
  });

  it('Tap dislike button', async () => {
    catsClient.getImages.mockResolvedValueOnce(makeCatsResult(5));

    renderHomeScreen();

    const dislikeBtn = screen.getByTestId('dislike-btn');

    expect(dislikeBtn).toBeDisabled();

    const cards = await screen.findAllByTestId('cat-image-card');
    expect(cards.length).toBe(5);

    expect(dislikeBtn).toBeEnabled();

    fireEvent.press(dislikeBtn);

    await waitFor(() => {
      const cards = screen.getAllByTestId('cat-image-card');
      expect(cards.length).toBe(4);
    });

    expect(catsClient.addFavourite).not.toHaveBeenCalled();
  });

  it('Tap like button', async () => {
    catsClient.getImages.mockResolvedValueOnce(makeCatsResult(5));

    renderHomeScreen();

    const likeBtn = screen.getByTestId('like-btn');

    expect(likeBtn).toBeDisabled();

    const cards = await screen.findAllByTestId('cat-image-card');
    expect(cards.length).toBe(5);

    expect(likeBtn).toBeEnabled();

    fireEvent.press(likeBtn);

    await waitFor(() => {
      const cards = screen.getAllByTestId('cat-image-card');
      expect(cards.length).toBe(4);
    });

    expect(catsClient.addFavourite).toHaveBeenCalledWith('1');
  });
});

const makeCatsResult = (length: number): Result<CatImage[]> => [
  null,
  Array.from({ length }, (_, i) => mockCat((++i).toString())),
];

const mockCat = (id: string): CatImage => ({
  id: id,
  url: 'cat url ' + id,
  breeds: [
    {
      name: 'Cat ' + id,
      origin: 'Cat Origin ' + id,
      affection_level: 3,
    },
  ],
});
