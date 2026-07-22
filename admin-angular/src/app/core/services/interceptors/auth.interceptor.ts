import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  console.log('Interceptor - URL:', req.url);
  console.log('Interceptor - Token:', token ? 'presente' : 'ausente');

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Interceptor - Headers:', clonedReq.headers.get('Authorization'));
    return next(clonedReq);
  }

  return next(req);
};