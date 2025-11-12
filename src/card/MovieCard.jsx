import React from "react";

const baseUrl = "https://image.tmdb.org/t/p/w500";

function MovieCard({ posterPath = null, title = "No title", voteAverage = null }) {
  const imgSrc = posterPath
    ? `${baseUrl}${posterPath}`
    : "https://via.placeholder.com/150x220?text=No+Image";

  const ratingText = Number.isFinite(voteAverage)
    ? voteAverage.toFixed(1)
    : "N/A";

  return (
    <div className="movie-card">
      <div className="poster-box">
        <img alt={title} src={imgSrc} />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-rating">평점: {ratingText}</p>
      </div>
    </div>
  );
}

export default MovieCard;
