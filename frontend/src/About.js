import React, {useEffect} from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './styles/about.scss';
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer";
import { MdPhone, MdEmail, MdRoom } from "react-icons/md";


export const About = props => {

    function FadeXWhenVisibleFirst({ children }) {
        const controls = useAnimation();
        const [ref, inView] = useInView();
      
        useEffect(() => {
          if (inView) {
            controls.start({x: "calc(8.5vw - 50%)"});
          }
        }, [controls, inView]);
      
        return (
          <motion.div
            ref={ref}
            animate={controls}
            initial={{x: "100%"}}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        );
    }
    function FadeXWhenVisibleSecond({ children }) {
        const controls = useAnimation();
        const [ref, inView] = useInView();
      
        useEffect(() => {
          if (inView) {
            controls.start({x: "calc(7.7vw - 50%)"});
          }
        }, [controls, inView]);
      
        return (
          <motion.div
            ref={ref}
            animate={controls}
            initial={{x: "100%"}}
            transition={{ duration: 0.7 }}
          >
            {children}
          </motion.div>
        );
    }
    function FadeXWhenVisibleThird({ children }) {
        const controls = useAnimation();
        const [ref, inView] = useInView();
      
        useEffect(() => {
          if (inView) {
            controls.start({x: "calc(9vw - 50%)"});
          }
        }, [controls, inView]);
      
        return (
          <motion.div
            ref={ref}
            animate={controls}
            initial={{x: "100%"}}
            transition={{ duration: 0.9 }}
          >
            {children}
          </motion.div>
        );
    }

    return(
        <>
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
        <div className="about--Container">
            <div className="map--Container">
                <Map
                    google={props.google}
                    zoom={12}
                    style={{borderRadius: '30px', width: '100%', height: '100%'}}
                    initialCenter={{ lat: 42.698334, lng: 23.319941}}
                />
            </div>
            <div className="info--Container">
                <div className="about--Info--Container">
                    <h2>About</h2>
                    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Iaculis sagittis potenti gravida lectus senectus class placerat vulputate. Hac consectetur neque neque quisque consequat fusce netus molestie quis? Accumsan taciti sociosqu sed mauris facilisis facilisi class. Eleifend suspendisse nisi adipiscing donec fames; ligula urna. Nostra scelerisque ridiculus elementum ante; vel aptent.</p>
                </div>
                <div className="contacts--Container">
                    <h3>Contacts</h3>
                    <div className="contact--Info--Container">
                        <MdPhone size="30" color="#1E718D" />
                        <FadeXWhenVisibleFirst>
                            <p>Phone: <span>+359 88 254 8246</span></p>
                        </FadeXWhenVisibleFirst>
                    </div>
                    <div className="contact--Info--Container">
                        <MdEmail size="30" color="#1E718D" />
                        <FadeXWhenVisibleSecond>
                            <p>E-mail: <span>mwm@mail.com</span></p>
                        </FadeXWhenVisibleSecond>
                    </div>
                    <div className="contact--Info--Container">
                        <MdRoom size="30" color="#1E718D" />
                        <FadeXWhenVisibleThird>
                            <p>Adress: <span>str. Nikola Stefanov 21</span></p>
                        </FadeXWhenVisibleThird>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
} 

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDLi5psMpMPjnDQjBksKvAQ8vDD_kStBnA'
})(About);