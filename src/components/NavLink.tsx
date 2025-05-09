import { Link, useLocation, type LinkProps } from "react-router";

export type TNavLinkProps = LinkProps;
export function NavLink(props: TNavLinkProps) {
  const { pathname } = useLocation();
  return (
    <Link
      data-current={pathname === props.to}
      {...props}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground "
    />
  );
}
