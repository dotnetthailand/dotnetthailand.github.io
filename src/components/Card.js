import React from 'react'
import AniLink from "gatsby-plugin-transition-link/AniLink";

const titleStyle = {
    fontWeight: "700",
}
const authorLinkStyle = {
    color: "#00BCD4"
}

const Author = ({ children, to }) => (
    <AniLink style={authorLinkStyle} to={to} className="font-weight-bold" fade>
        {children}
    </AniLink>
)

const Card = ({ title, description, timeStamp, authorName, slug }) => {
    const cardTextColor = typeof window !== "undefined" && getComputedStyle(document.documentElement).getPropertyValue("--card-text-color")

    const cardLinkStyle = { color: cardTextColor, textDecoration: "none" }

    return (
        <AniLink
            style={cardLinkStyle}
            to={slug}
            cover
            bg="#00BCD4"

        >
            <div class="card my-4">
                <div class="card-body">
                    <h5 class="card-title" style={titleStyle}>{title}</h5>
                    <p class="card-text">{description}</p>
                    <h6 class="card-subtitle text-muted">
                        <Author to="/about">{authorName}</Author> on {timeStamp}
                    </h6>
                </div>
            </div>

        </AniLink>)

}

export default Card