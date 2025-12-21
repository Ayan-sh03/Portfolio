import NavLink from "./NavLink";

interface MenuProps {
  title: string;
  path: string;
}

const MenuOverlay = ({ links }: { links: MenuProps[] }) => {
  return (
    <ul className="flex flex-col items-center py-4 bg-mono-bg border-t-2 border-mono-text">
      {links.map((link, index) => (
        <li key={index} className="list-none my-1">
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
