import hero from "../assets/images/hero.svg";
import Wrapper from "../assets/wrappers/Home";
import {Logo} from "../components";
import {Link } from "react-router-dom"
const Welcome = () => {
  return (
    <Wrapper>
      <nav>
      <Logo/>
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is
            unique—accomplish it all with jobify.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={hero} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Welcome;
