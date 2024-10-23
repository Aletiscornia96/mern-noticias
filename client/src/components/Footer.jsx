import { Footer } from "flowbite-react"
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';
import logo from "../assets/images/logo.jpeg";

export default function FooterComponent() {
    return (
        <Footer container className='botder border-t-8 border-red-300'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5 '>
                    <Link
                    to="/"
                    className="self-center whitespace-nowrap text-sm sm:text-xl 
                    font-semibold dark:text-white"
                >
                    <img src={logo} alt="Logo" className="h-10 rounded-full"  />
                    {/* <span
                        className="px-2 py-1 bg-gradient-to-r from-indigo-500
                        via-purcle-500 to-pink-500 rounded-lg text-white"
                    >
                        El Funense
                    </span> */}
                </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                        <div>
                            {/* <Footer.Title title='About' />
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://www.google.com" target ='_blank' rel='nooperner noreferrer'>
                                    Google
                                </Footer.Link>
                                <Footer.Link href="https://www.youtube.com" target ='_blank' rel='nooperner noreferrer'>
                                    YouTube
                                </Footer.Link>
                            </Footer.LinkGroup> */}
                        </div>
                        <div>
                            <Footer.Title title='Follow Us' />
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://www.instagram.com/elfunensehoy/" target ='_blank' rel='nooperner noreferrer'>
                                    Instagram
                                </Footer.Link>
                                <Footer.Link href="https://www.facebook.com" target ='_blank' rel='nooperner noreferrer'>
                                    Facebook
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Legal' />
                            <Footer.LinkGroup col>
                                <Footer.Link href="/privacy" target ='_blank' rel='nooperner noreferrer'>
                                    Politicas de Privacidad
                                </Footer.Link>
                                <Footer.Link href="/terms" target ='_blank' rel='nooperner noreferrer'>
                                    Terminos y Condiciones
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider/>
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright href='#' by="Alejandro Tiscornia" year={new Date().getFullYear()}/>
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                        <Footer.Icon href='#' icon={BsFacebook}/>
                        <Footer.Icon href='https://www.instagram.com/elfunensehoy/' icon={BsInstagram}/>
                        <Footer.Icon href='https://x.com/Elfunensehoy?t=CpaUVwlpE03wBMbQPjUjmQ&s=08' icon={BsTwitter}/>
                        <Footer.Icon href='#' icon={BsYoutube}/>
                    </div>
                </div>
            </div>
        </Footer>
    );
}
