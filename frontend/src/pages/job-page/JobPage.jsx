
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./JobPage.css";
import image_one from '../../assets/self-hr.jpg'
import image_two from "../../assets/hero-bg.jpg"
import image_three from "../../assets/career-img-one.jpg"
import { Link } from "react-router-dom";
import { useFetchJobsQuery } from "../../features/job/jobApiSlice";

const JobPage = () => {
  const carouselImages = [
    {
      src: image_one, // Replace with your image URL
      title: "Join Our Team",
      subtitle: "Your future starts here",
    },
    {
      src: image_two, // Replace with your image URL
      title: "Innovate with Us",
      subtitle: "Unleash your creativity",
    },
    {
      src: image_three, // Replace with your image URL
      title: "Shape the Future",
      subtitle: "Be a part of our mission",
    },
  ];


  const { data: jobs, error, isLoading } = useFetchJobsQuery();

   // Handle loading and error states
   if (isLoading) return <div>Loading jobs...</div>;
   if (error) return <div>Error fetching jobs: {error.message}</div>;
  return (
    <div className="job-page">
      {/* Section 1: Hero Section */}
      <section className="hero-section">
        <Carousel indicators={true} interval={1500} fade>
          {carouselImages.map((image, index) => (
            <Carousel.Item key={index}>
              <div
                className="carousel-slide"
                style={{
                  backgroundImage: `url(${image.src})`,
                }}
              >
                <div className="overlay">
                  <h1 className="hero-title">{image.title}</h1>
                  <p className="hero-subtitle">{image.subtitle}</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Section 2 */}
      <section className="company-section">
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
      </section>

      {/* Section 3 */}
    

      {/* Section 4 */}
     
    </div>
  );
};

export default JobPage;
