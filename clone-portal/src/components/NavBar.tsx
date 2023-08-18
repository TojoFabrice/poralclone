
import { useEffect, useState } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from "@material-tailwind/react"
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from 'react-redux';
import { infoUserConnected, userSignOut } from "../redux/actions/Auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const NavBar = () => {
    const dispatch = useDispatch()
    const { token, users } = useSelector(({ auth }) => auth)
    const { candidat_infos } = useSelector(({ candidat }) => candidat)
    const [openNav, setOpenNav] = useState(false);
    const [userName, setUserName] = useState<string>("");

    const navigate = useNavigate()

    //GET INFO USER CONNECTE
    useEffect(() => {
        if (token) {
            dispatch(infoUserConnected(token))
        }
    }, [token])

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    useEffect(() => {
        if (candidat_infos) {
            setUserName(candidat_infos.user.user_name)
        }
    }, [candidat_infos])


    useEffect(() => {
        const autoLogoutTimer = setTimeout(() => {
            dispatch(userSignOut(token));
        }, 3000000 );

        return () => {
            clearTimeout(autoLogoutTimer);
        };
    }, [dispatch]);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    OFFRES D'EMPLOI
                </a>
            </Typography>
        </ul>
    );

    const toDeconnect = () => {
        dispatch(userSignOut(token))
    }

    useEffect(() => {

    })

    const goTo = () => {
        (users?.user_role === "candidat") ?
        navigate('/candidat/moncompte/info-candidat') 
        : 
        navigate('/recruteur/dashbord')
    }

    return (
        <div className=" max-h-[768px]">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="/"
                        className="mr-4 cursor-pointer py-1.5 font-bold text-xl"
                    >
                        Portal
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        {
                            token ?
                                <Menu
                                    animate={{
                                        mount: { y: 0 },
                                        unmount: { y: 25 },
                                    }}
                                >
                                    <MenuHandler className="hidden lg:inline-block !bg-secondary">
                                        <Button>Bonjour {userName ? userName : users?.user_name}</Button>
                                    </MenuHandler>
                                    <MenuList>
                                        <MenuItem onClick={goTo}>Votre profil</MenuItem>
                                        <MenuItem onClick={toDeconnect}>Se déconnecter</MenuItem>
                                    </MenuList>
                                </Menu>
                                :
                                <Link href="/login">
                                    <Button
                                        variant="gradient"
                                        size="sm"
                                        className="hidden lg:inline-block !bg-secondary"
                                    >
                                        <span>Se connecter</span>
                                    </Button>
                                </Link>
                        }
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <ToastContainer />
                <Collapse open={openNav}>
                    {navList}
                    {/* <Button variant="gradient" size="sm" fullWidth className="mb-2">
                        <span>Se connecter</span>
                    </Button> */}
                    {
                        token ?
                            <Menu
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 25 },
                                }}
                            >
                                <MenuHandler className="lg:inline-block !bg-secondary">
                                    <Button>Bonjour {userName ? userName : users?.user_name}</Button>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem onClick={goTo}>Votre profil</MenuItem>
                                    <MenuItem onClick={toDeconnect}>Se déconnecter</MenuItem>
                                </MenuList>
                            </Menu>
                            :
                            <Link href="/login">
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="hidden lg:inline-block !bg-secondary"
                                >
                                    <span>Se connecter</span>
                                </Button>
                            </Link>
                    }
                </Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar
