export default function ApiRoute(path: string, init?: RequestInit) {
  const baseUrl = 'http://localhost'
  const apiPrefix = '/api/v1'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
