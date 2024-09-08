export default function ApiRoute(path: string, init?: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_ROUTE_API
  const apiPrefix = '/api/v2'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
