import 'isomorphic-unfetch'

const fetchWithErrorHandling = async (url) => {
  try {
    return await (await fetch(url)).json()
  } catch (err) {
    return { error: true }
  }
}

export const getAllMovies = async (url) => {
  return await fetchWithErrorHandling(url)
}
