import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const r = request.cookies.get('r')?.value
  const authenticated =
    token !== undefined && token.length >= 49 && token.length <= 53
  const autorization = r === 'JesusIsKingADM'
  if (
    !autorization &&
    (request.nextUrl.pathname.startsWith('/menu') ||
      request.nextUrl.pathname.startsWith('/table') ||
      request.nextUrl.pathname.startsWith('/itens/insert') ||
      request.nextUrl.pathname.startsWith('/itens/update') ||
      request.nextUrl.pathname.startsWith('/category'))
  ) {
    return NextResponse.redirect(new URL('/user/', request.url))
  }

  if (
    !authenticated &&
    (request.nextUrl.pathname.startsWith('/menu') ||
      request.nextUrl.pathname.startsWith('/table') ||
      request.nextUrl.pathname.startsWith('/category') ||
      request.nextUrl.pathname.startsWith('/order'))
  ) {
    return NextResponse.redirect(new URL('/user/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/menu/:path*',
    '/table/:path*',
    '/category/:path*',
    '/itens/insert',
    '/itens/update',
    '/itens/list',
    '/order/insert',
    '/order/comanda',
    '/order/addCart',
    '/order/update',
  ],
}
