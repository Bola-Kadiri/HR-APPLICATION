import "./CareerPage.css";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import career_img from "../../assets/bg 2.png";
import core_img from "../../assets/career-img-one.jpg";
import task from "../../assets/task-one 2.png";

const CareerPage = () => {
  return (
    <div className="career">
      <div className="career-page">
        <div className="career-top">
          <Link to="/">home</Link>
          <IoIosArrowForward className="arrow" />
          <p>Career at Alphamead Group</p>
        </div>
        <div className="career-page-section-one">
          <div className="career-page-section-content-left">
            <div className="career-page-section-about">
              <div className="career-page-section-about-inner">
                <h1>careers at Alphamead.</h1>
                <p>
                  In the accelerating world of work, we offer unparalleled
                  opportunities. Staffing, recruitment, selection, business
                  development, HR, IT, marketing & communications, legal or
                  finance — wherever your talent takes you, you’ll find the
                  perfect match in a job at Randstad.
                </p>
                <button>See Open Position</button>
              </div>
            </div>
          </div>
          <div className="career-page-section-content-right">
            <img src={career_img} alt="career-image" width={550} />
          </div>
        </div>
      </div>
      <div className="career-page-section-two">
        <div className="career-page-section-two-left">
          <div className="career-page-section-two-left-content">
            <span>our core values.</span>
            <p>
              To know. To serve. To trust. Striving for perfection. Simultaneous
              promotion of all interests. Our core values, established in the
              company’s early days, guide our behavior and represent the
              foundation of our culture.
            </p>
          </div>
        </div>
        <div className="career-page-section-two-right">
          <img src={core_img} alt="career-img" />
        </div>
      </div>
      <div className="career-page-section-three">
        <div className="career-page-section-three-left">
          <div className="career-page-section-three-left-content">
            <img src={task} alt="tas-img" />
          </div>
        </div>
        <div className="career-page-section-three-right">
          <div className="career-page-section-three-right-content">
            <h1>equity, diversity & inclusion.</h1>
            <p>
              Randstad is strongly committed to equity, diversity and inclusion.
              We believe this helps us build a more agile, productive, and
              innovative workforce that reflects our talent and client base, and
              the society in which we work. 50% of management positions are held
              by women at Randstad.
            </p>
            <button>Lean more</button>
          </div>
        </div>
      </div>
      <div className="career-page-section-four">
        <div className="career-page-section-four-left">
          <h1>
            want to make a difference? Then join the world&apos;s largest HR services
            provider.
          </h1>
        </div>
        <div className="career-page-section-four-right">
          <button>Apply online</button>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
