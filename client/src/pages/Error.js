import React from 'react'
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage"
import {Link} from "react-router-dom"

const Error = () => {
  return (
    <Wrapper className="full-page">
        <div>
            <img src={img} alt="not found"/>
            <h3>Ohh! page not found</h3>
            <p>we can't seem to find the page that you looking for</p>
            <Link to ="/">Back Home</Link>
        </div>
    </Wrapper>
  )
}

export default Error