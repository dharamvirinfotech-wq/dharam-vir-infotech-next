import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export function Link({ to, href, className, style, children, onClick, ...props }) {
  const target = href || to || '#';
  return (
    <NextLink href={target} className={className} style={style} onClick={onClick} {...props}>
      {children}
    </NextLink>
  );
}

export function NavLink({ to, href, className, activeClassName, children, ...props }) {
  const router = useRouter();
  const target = href || to || '#';
  const isActive = router ? router.pathname === target : false;
  const computedClass = typeof className === 'function' ? className({ isActive }) : (className + (isActive ? ` ${activeClassName}` : ''));
  return (
    <NextLink href={target} className={computedClass} {...props}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  return (to, options) => {
    if (!router) return;
    if (typeof to === 'number') {
      if (to === -1) router.back();
    } else if (options && options.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

export function useLocation() {
  const router = useRouter();
  const pathname = router ? router.pathname || '/' : '/';
  const asPath = router ? router.asPath || '/' : '/';
  const search = asPath.includes('?') ? '?' + asPath.split('?')[1] : '';
  return {
    pathname,
    search,
    hash: '',
    state: null,
    key: 'default',
  };
}

export function useParams() {
  const router = useRouter();
  return router ? router.query || {} : {};
}

export function useSearchParams() {
  const router = useRouter();
  const searchStr = typeof window !== 'undefined' ? window.location.search : '';
  const searchParams = new URLSearchParams(searchStr);
  const setSearchParams = (params) => {
    if (router && router.isReady) {
      router.push({ pathname: router.pathname, query: params });
    }
  };
  return [searchParams, setSearchParams];
}

export function Navigate({ to, replace }) {
  const router = useRouter();
  React.useEffect(() => {
    if (router && router.isReady) {
      if (replace) router.replace(to);
      else router.push(to);
    }
  }, [to, replace, router]);
  return null;
}

export const BrowserRouter = ({ children }) => <>{children}</>;
export const Routes = ({ children }) => <>{children}</>;
export const Route = () => null;
