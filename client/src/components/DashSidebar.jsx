import { Sidebar } from "flowbite-react"
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFormUrl = urlParams.get('tab');
      if(tabFormUrl){
        setTab(tabFormUrl);
      }
    }, [location.search])
    return(
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"user"} labelColor='dark'>
                            Perfil
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item active icon={HiArrowSmRight} className='cursor-pointer'>
                        Cerrar Sesion
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}