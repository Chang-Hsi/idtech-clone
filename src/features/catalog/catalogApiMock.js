const catalogApiMock = {
  fetchCatalog() {
    return Promise.resolve({
      products: [],
      solutions: [],
      resources: [],
    })
  },
}

export default catalogApiMock
