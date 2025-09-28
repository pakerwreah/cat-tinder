export type Breed = {
  name: string;
  origin: string;
  affection_level: number;
};

export type CatImage = {
  id: string;
  url: string;
  breeds: Breed[];
};

export type Favourite = {
  id: string;
  image: CatImage;
};
