import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const NavLink = forwardRef(({ className, activeClassName, pendingClassName, to, href, children, ...props }, ref) => {
  const router = useRouter();
  const target = href || to || "#";
  const isActive = router ? router.pathname === target : false;

  const computedClassName = typeof className === 'function' 
    ? className({ isActive, isPending: false })
    : cn(className, isActive && activeClassName);

  return (
    <Link ref={ref} href={target} className={computedClassName} {...props}>
      {children}
    </Link>
  );
});

NavLink.displayName = "NavLink";
export { NavLink };
