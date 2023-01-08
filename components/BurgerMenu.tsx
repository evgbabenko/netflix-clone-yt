import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { navLink } from '../constants/menu';
import Link from 'next/link';

const BurgerMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className='md:!hidden'>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='!text-white !font-bold'
      >
        Меню
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className='menu'
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {navLink.map((element, index) => (
          <MenuItem onClick={handleClose} key={`${index * 47}-nav-${element.title}`}>
            <Link href={element.navlink}> {element.title}</Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default BurgerMenu;
