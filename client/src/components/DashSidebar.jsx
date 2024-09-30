import { Sidebar } from "flowbite-react"
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";


export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch(); 

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFormUrl = urlParams.get('tab');
        if(tabFormUrl){
            setTab(tabFormUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.error)
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message)
        }
    };
    return(
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"user"} labelColor='dark' as='div'>
                            Perfil
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                        Cerrar Sesion
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}