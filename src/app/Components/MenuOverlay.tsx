import NavLink from "./NavLink";

interface MenuProps {
  title: string;
  path: string;
}

const MenuOverlay = ({ links }: { links: MenuProps[] }) => {
  return (
    <ul className="flex flex-col items-center py-4 ">
      {links.map((link, index) => (
        <NavLink href={link.path} title={link.title} key={index} />
      ))}
    </ul>
  );
};

export default MenuOverlay;
