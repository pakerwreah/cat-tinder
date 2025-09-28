beforeEach(() => {
  global.fetch = jest.fn(() => Promise.reject());
});
