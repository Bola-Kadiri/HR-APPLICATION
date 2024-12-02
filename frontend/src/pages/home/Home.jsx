import { useState } from "react";
import "../home/Home.css";
import jober from "../../assets/job 2.png";
import About from "../../pages/About/About";
import { Link } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import { useFetchJobsQuery } from "../../features/job/jobApiSlice";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { data: jobs, error, isLoading } = useFetchJobsQuery();

  // Handle loading and error states
  if (isLoading) return <div>Loading jobs...</div>;
  if (error) return <div>Error fetching jobs: {error.message}</div>;

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Define the FAQ content manually
  const faqData = [
    {
      question: "What is the application process?",
      answer:
        "The application process involves submitting your CV and cover letter, followed by a potential interview.",
    },
    {
      question: "How do I know if a job is still active?",
      answer:
        "You can check the job status on the job listing page. If it is active, the status will be displayed.",
    },
    {
      question: "Can I apply for multiple jobs at once?",
      answer:
        "Yes, you can apply for multiple jobs, but each application will be reviewed individually.",
    },
    {
      question: "How long will it take to hear back?",
      answer:
        "It varies, but we aim to get back to all applicants within two weeks after the application deadline.",
    },
    {
      question: "What happens if I miss the application deadline?",
      answer:
        "Unfortunately, you will not be able to apply once the deadline has passed.",
    },
  ];

  return (
    <div className="containers">
      <div className="home">
        <div className="home-container">
          <div className="left-para">
            <span>Lets start your careers here!</span>
            <h1>Looking for a career change? Browse our job listings now!</h1>
            <p>
              Mus vehicula dignissim quis si lorem libero cras pulvinar orci
              dapibus. Sagittis quisque orci pretium donec elit platea porta
              integer maecenas risus lobortis.
            </p>
          </div>
          <div className="job-img">
            <img src={jober} alt="job image" />
          </div>
        </div>
      </div>
      <div id="about-section">
        <About />
      </div>
      <div id="job-list">
        <div className="job-list-heading">
          <h1>Featured jobs</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus.
          </p>
        </div>
        <div className="job-content">
          {jobs &&
            jobs.map((job) => (
              <div className="job-card" key={job.id}>
                <span>{job.location} Nigeria</span>
                <hr />
                <h5>{job.title}</h5>
                <p>
                  Neque urna integer ridiculus tristique scelerisque tempor
                  torquent vulputate ullamcorper risus euismod
                </p>
                <div className="active-type">
                  <p>
                    {job.status === "active"
                      ? `ACTIVE - ${new Date(
                          job.expiry_date
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}`
                      : "EXPIRED"}
                  </p>
                  <p>{job.employment_type}</p>
                </div>
                <div className="job-card-bottom">
                  <Link to={`/job/${job.id}/`}>
                    <button>View Detail</button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="faq">
        <div className="faq-content">
          <div className="faq-left">
            <p>Common Questions</p>
            <h1>Frequently Asked Questions.</h1>
            <h3>It’s simple to get started</h3>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </span>
          </div>
          <div className="faq-right">
            <div className="accordion-container">
              {faqData.map((item, index) => (
                <div
                  className={`accordion ${
                    activeIndex === index ? "active" : ""
                  }`}
                  key={index}
                >
                  <div
                    className={`accordion-header ${
                      activeIndex === index ? "expanded" : ""
                    }`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="accordion-title">{item.question}</span>
                    <span
                      className={`accordion-icon ${
                        activeIndex === index ? "rotate" : ""
                      }`}
                    >
                      <RiArrowDownSLine />
                    </span>
                  </div>
                  <div className="accordion-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
