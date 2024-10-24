import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.jpeg"



export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector((state) => state.theme);
    const [searchTerms, setSearchTerms] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermForUrl = urlParams.get('searchTerms');
        if (searchTermForUrl) {
            setSearchTerms(searchTermForUrl);
        }
    }, [location.search])

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
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerms);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    return (
        <Navbar className="border-b-2">
            <Link
                to="/"
                className="self-center whitespace-nowrap text-sm sm:text-xl 
                font-semibold dark:text-white"
            >
                <img src={logo} alt="Logo" className="h-12 rounded-full" />
                {/* <span
                    className="px-2 py-1 bg-gradient-to-r from-indigo-500
                    via-purcle-500 to-pink-500 rounded-lg text-white"
                >
                    El Funense
                </span> */}
            </Link>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="text"
                    placeholder="Buscar"
                    rightIcon={AiOutlineSearch}
                    className="hidden lg:inline"
                    value={searchTerms}
                    onChange={(e) => setSearchTerms(e.target.value)}
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button className='w-12 h-10 hidden sm:inline' color='gray'
                    pill
                    onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block txt-sm'>@{currentUser.username}</span>
                            <span className='block txt-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Perfil</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Cerrar Sesion</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to='/sign-in'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>
                )}
                {/* <Navbar.Toggle /> */}
            </div>
        </Navbar>
    );
}
