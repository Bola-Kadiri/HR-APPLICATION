import  { useEffect, useRef, useState } from 'react';
import about_img from '../../assets/self-hr.jpg';
import './About.css';
import { IoMdCheckmark } from "react-icons/io";

const About = () => {
    const [isInViewLeft, setIsInViewLeft] = useState(false);
    const [isInViewRight, setIsInViewRight] = useState(false);

    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target === leftRef.current) {
                    setIsInViewLeft(entry.isIntersecting);
                }
                if (entry.target === rightRef.current) {
                    setIsInViewRight(entry.isIntersecting);
                }
            });
        }, options);

        if (leftRef.current) {
            observer.observe(leftRef.current);
        }
        if (rightRef.current) {
            observer.observe(rightRef.current);
        }

        return () => {
            if (leftRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(leftRef.current);
            }
            if (rightRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(rightRef.current);
            }
        };
    }, []);

    return (
        <div className='about'>
            <div
                className={`about-content-left ${isInViewLeft ? 'animate-left' : ''}`}
                ref={leftRef}
            >
                <img src={about_img} alt="about image" />
            </div>
            <div
                className={`about-content-right ${isInViewRight ? 'animate-right' : ''}`}
                ref={rightRef}
            >
                <h4>About Us</h4>
                <h1>One Step To Your Future Starts Here</h1>
                <p>Dictumst duis ultricies eleifend eu porttitor rutrum ligula nostra mus leo. 
                    Odio aptent tempor conubia inceptos sit. Ad sociosqu accumsan nascetur per 
                    facilisi. Ex mollis ad efficitur taciti montes pede.
                </p>
                <div className="available-job">
                    <div className="mark">
                       <IoMdCheckmark />
                    </div>
                    <div className="available-job-content">
                        <h4>Thousands of jobs available</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                    </div>
                </div>
                <div className="available-job">
                    <div className="mark">
                       <IoMdCheckmark />
                    </div>
                    <div className="available-job-content">
                        <h4>The right job for your skills</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
