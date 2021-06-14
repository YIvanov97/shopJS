import React, {useEffect} from 'react';
import './styles/home.scss'
import './styles/responsive/responsiveHome.scss'
import logo from './styles/images/NWN.png'
import fastDelivery from './styles/images/deliverycart.png'
import aboutProductsPicture from './styles/images/catalog.png'
import { FaGrinStars, FaHubspot, FaRegFileAlt, FaBookOpen, FaOpencart, FaHeadset, FaUserFriends } from 'react-icons/fa';
import { VscFeedback } from "react-icons/vsc";
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer";

function Home() {

    function FadeYWhenVisible({ children }) {
        const controls = useAnimation();
        const [ref, inView] = useInView();
      
        useEffect(() => {
          if (inView) {
            controls.start({y: "calc(6vw - 50%)"});
          }
        }, [controls, inView]);
      
        return (
          <motion.div
            ref={ref}
            animate={controls}
            initial={{y: "100%"}}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        );
    }

    function DivYWhenVisibleFirst({ children }) {
        const controls = useAnimation();
        const [ref, inView] = useInView();
      
        useEffect(() => {
          if (inView) {
            controls.start({y: "calc(9vw - 50%)"});
          }
        }, [controls, inView]);
      
        return (
          <motion.div
            ref={ref}
            animate={controls}
            initial={{y: "100%"}}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        );
    }

    function DivYWhenVisibleSecond({ children }) {
        const controls = useAnimation();
        const [ref, inView] = useInView();
      
        useEffect(() => {
          if (inView) {
            controls.start({y: "calc(9vw - 50%)"});
          }
        }, [controls, inView]);
      
        return (
          <motion.div
            ref={ref}
            animate={controls}
            initial={{y: "100%"}}
            transition={{ duration: 0.7 }}
          >
            {children}
          </motion.div>
        );
    }

    function DivYWhenVisibleThird({ children }) {
        const controls = useAnimation();
        const [ref, inView] = useInView();
      
        useEffect(() => {
          if (inView) {
            controls.start({y: "calc(9vw - 50%)"});
          }
        }, [controls, inView]);
      
        return (
          <motion.div
            ref={ref}
            animate={controls}
            initial={{y: "100%"}}
            transition={{ duration: 0.9 }}
          >
            {children}
          </motion.div>
        );
    }

    function FadeXWhenVisible({ children }) {
        const controls = useAnimation();
        const [ref, inView] = useInView();
      
        useEffect(() => {
          if (inView) {
            controls.start({x: "calc(20vw - 50%)"});
          }
        }, [controls, inView]);
      
        return (
          <motion.div
            ref={ref}
            animate={controls}
            initial={{x: "100%"}}
            transition={{ duration: 1 }}
          >
            {children}
          </motion.div>
        );
    }

    return(
            <div className="home--Container">
            <div className="custom-shape-divider-top-1619781151">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="custom-shape-divider-top-1619781152">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="custom-shape-divider-top-1619781153">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
                <header>
                    <h3>Technologies of the future</h3>
                    <p>Your choice, your place</p>
                </header>      
                <main className="home--Body">
                    <div className="top--Image">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="home--Section--Boxes--Container" />
                    <div className="home--Section--Boxes--Container--Transparent">
                        <motion.div transition={{duration: 0.3}} initial={{ y: "100%" }} animate={{ y: "calc(10vw - 50%)" }} className="home--Section--Box">
                            <h1><FaHubspot color={'#1E718D'}/> Smart solutions</h1>
                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Penatibus est proin mi tempus ad, ornare volutpat ante. Aliquam fermentum sapien dignissim a; senectus purus dui elementum. Nulla praesent varius; cras ullamcorper sem vivamus ligula non fermentum.</p>
                        </motion.div>
                        <motion.div transition={{duration: 0.5}} initial={{ y: "100%" }} animate={{ y: "calc(12vw - 50%)" }} className="home--Section--Box--Middle">
                            <h1><FaGrinStars color={'#1E718D'} /> Best choice</h1>
                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis sagittis potenti gravida lectus senectus class placerat vulputate. Hac consectetur neque neque quisque consequat fusce netus molestie quis? Accumsan taciti sociosqu sed mauris facilisis facilisi class. Eleifend suspendisse nisi adipiscing donec fames; ligula urna. Nostra scelerisque ridiculus elementum ante; vel aptent.</p>
                        </motion.div>
                        <motion.div transition={{duration: 0.7}} initial={{ y: "100%" }} animate={{ y: "calc(10vw - 50%)" }} className="home--Section--Box">
                            <h1><FaRegFileAlt color={'#1E718D'}/>Long-term maintenance</h1>
                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Penatibus est proin mi tempus ad, ornare volutpat ante. Aliquam fermentum sapien dignissim a; senectus purus dui elementum. Nulla praesent varius; cras ullamcorper sem vivamus ligula non fermentum.</p>
                        </motion.div>
                    </div>
                    <svg className="blob--One" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" width="50%" id="blobSvg">
                        <path id="blob" d="M385,284.5Q357,319,354.5,396.5Q352,474,287.5,455.5Q223,437,157.5,435Q92,433,53,376Q14,319,64,264.5Q114,210,127.5,167.5Q141,125,185,114Q229,103,261.5,128.5Q294,154,367.5,140.5Q441,127,427,188.5Q413,250,385,284.5Z" fill="#1E718D"></path>
                    </svg>
                    <div className="home--Section--Preview--Container" />
                    <div className="home--Section--Preview">
                        <div className="preview--First">
                            <div className="img--Repeat--Background--First" />
                            <div className="img--Repeat--Background--Second" />
                            <img src={aboutProductsPicture} alt="aboutproductsimg" />
                            <FadeYWhenVisible>
                                <div className="catalogue--About--Container">
                                    <h3><FaBookOpen className="catalogue--Header--Icon" color='#1E718D'/> Choose from hundred of products</h3>
                                    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Ullamcorper adipiscing felis inceptos bibendum consectetur. Curae est parturient urna nisi fermentum fringilla ullamcorper erat.</p>
                                    <p>Habitasse luctus pharetra, sem feugiat curabitur tristique vel metus interdum. Praesent turpis quam eleifend facilisis dictum nascetur ultrices risus. Orci commodo cursus egestas netus nibh in integer leo.</p>
                                </div>
                            </FadeYWhenVisible>
                        </div>
                        <svg className="blob--Two" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" width="40%" id="blobSvg">
                            <path id="blob" d="M430,310.5Q439,371,375.5,378Q312,385,263,441Q214,497,185,427.5Q156,358,117,329.5Q78,301,111,260Q144,219,148.5,178.5Q153,138,191.5,123Q230,108,277.5,97Q325,86,335.5,137Q346,188,383.5,219Q421,250,430,310.5Z" fill="#1E718D"></path>
                        </svg>
                        <div className="preview--Second">
                            <FadeXWhenVisible>
                                <img src={fastDelivery} alt="fast delivery"/>
                            </FadeXWhenVisible>
                            <div className="delivery--About--Container">
                                <h3><FaOpencart className="delivery--Header--Icon" color='#1E718D'/> Fast delivery</h3>
                                <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Ullamcorper adipiscing felis inceptos bibendum consectetur. Curae est parturient urna nisi fermentum fringilla ullamcorper erat.</p>
                                    <p>Habitasse luctus pharetra, sem feugiat curabitur tristique vel metus interdum. Praesent turpis quam eleifend facilisis dictum nascetur ultrices risus. Orci commodo cursus egestas netus nibh in integer leo.</p>
                            </div>
                        </div>
                    </div>
                    <div className="custom-shape-divider-top-1619193241">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                        </svg>
                    </div>
                    <div className="home--Section--Bottom--Container">
                        <DivYWhenVisibleFirst>
                            <div className="company--About--Buble">
                                <h4><FaUserFriends color='#1E718D'/> Friendly Team</h4>
                                <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Litora urna dignissim; imperdiet sollicitudin praesent orci aptent varius.</p>
                                <p>Sollicitudin felis feugiat vel consectetur facilisis libero nam varius ut. Sociosqu interdum per placerat mollis fames ultricies.</p>    
                            </div>
                        </DivYWhenVisibleFirst>
                        <DivYWhenVisibleSecond>
                            <div className="company--About--Buble">
                                <h4><VscFeedback color='#1E718D'/> Quick Feedback</h4>
                                <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Litora urna dignissim; imperdiet sollicitudin praesent orci aptent varius.</p>
                                <p>Sollicitudin felis feugiat vel consectetur facilisis libero nam varius ut. Sociosqu interdum per placerat mollis fames ultricies.</p>
                            </div>
                        </DivYWhenVisibleSecond>
                        <DivYWhenVisibleThird>
                            <div className="company--About--Buble">
                                <h4><FaHeadset color='#1E718D'/> Customer Support</h4>
                                <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Litora urna dignissim; imperdiet sollicitudin praesent orci aptent varius.</p>
                                <p>Sollicitudin felis feugiat vel consectetur facilisis libero nam varius ut. Sociosqu interdum per placerat mollis fames ultricies.</p>
                            </div>
                        </DivYWhenVisibleThird>
                    </div>
                </main> 
                <footer>
                    <ul>
                        <li className="footer--List--Header">Contacts</li>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>dignissim</li>
                        <li>Sociosqu</li>
                    </ul>
                    <ul>
                        <li className="footer--List--Header">Support</li>
                        <li>Sociosqu</li>
                        <li>Ipsum</li>
                        <li>Lorem</li>
                        <li>dignissim</li>
                    </ul>
                    <ul>
                        <li className="footer--List--Header">About</li>
                        <li>Ipsum</li>
                        <li>dignissim</li>
                        <li>Lorem</li>
                        <li>Sociosqu</li>
                    </ul>
                    <ul>
                        <li className="footer--List--Header">Locations</li>
                        <li>dignissim</li>
                        <li>Lorem</li>
                        <li>Sociosqu</li>
                        <li>Ipsum</li>
                    </ul>
                </footer>         
            </div>
    )
}

export default Home;