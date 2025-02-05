import './Sidebar.css';
import { FiMenu, FiClipboard, FiBriefcase, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineInventory2 } from "react-icons/md";
// Utility to map icon strings to actual icon components
const iconMap = {
  FiClipboard: <FiClipboard size={22} color="white" />,
  FiBriefcase: <FiBriefcase size={22} color="white" />,
  FiUser: <FiUser size={22} color="white" />,
  MdOutlineInventory2: <MdOutlineInventory2 size={22} color="white" />,
};

const Sidebar = () => {
  const navigate = useNavigate();
  
  const navItems = [
    {
      name: 'Projects',
      slug: "/",
      active: true,
      icon: 'FiClipboard'
    },
    {
      name: "Departments",
      slug: "/departments",
      active: true,
      icon: 'FiBriefcase'
    },
    {
      name: "Employees",
      slug: "/employees",
      active: true,
      icon: 'FiUser'
    },
    {
      name: "Inventory",
      slug: "/inventory",
      active: true,
      icon: 'MdOutlineInventory2'
      
    }
  ];

  return (
    <div className="sidebar">
      <FiMenu className="menu-icon" size={22} color="white" />
      <div className="menu">
        {navItems.map(item =>
          item.active ? (
            <Link 
              key={item.name}
              to={item.slug}
              className="icon-container"
            >
              {iconMap[item.icon]}
              <span className="menu-text">{item.name}</span>   
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
}

export default Sidebar;
