import React from 'react'
import { Link } from 'gatsby';

function Intro() {
  return (
    <div className="container my-4">
      <h2 className="card-title text-info font-weight-bold">.NET Thailand</h2>
      <p className="card-subtitle mt-2">Crafted for developers , hoping they can learn something valuable out of it.</p>
      <Link className="btn btn-info my-3" to="about">Know More</Link>

      <hr />
      <h4>Built with</h4>
      <a href="https://reactjs.org/">
        <img
          className="mr-4 mt-3"
          src="https://img.icons8.com/ios/40/00D8FF/react-native-filled.png"
          alt="build-with-icon-1" />
      </a>
      <a href="http://gatsbyjs.org/">
        <img
          className="mr-4 mt-3"
          width="40px"
          src="https://seeklogo.com/images/G/gatsby-logo-1A245AD37F-seeklogo.com.png"
          alt="build-with-icon-2" />
      </a>
      <a href="https://github.com/">
        <img
          className="mr-4 mt-3"
          width="40px"
          src="https://img.icons8.com/ios/344/github.png"
          alt="build-with-icon-3" />
      </a>
      <a href="https://www.markdownguide.org/">
        <img
          className="mr-4 mt-3"
          src="https://img.icons8.com/office/40/000000/markdown.png"
          alt="build-with-icon-4" />
      </a>
      <br />
      <br />
      <h6>open source on <a href="https://github.com/dotnetthailand">github.com/dotnetthailand</a></h6>
    </div>
  );
};

export default Intro;
