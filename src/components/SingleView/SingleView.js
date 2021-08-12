import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./SingleView.scss";
import Spinner from "../Spinner/Spinner";
import { Link } from "@reach/router";

export default function Singleview(props) {

    var [ data, setData ] = useState();
    
    useEffect(() => {
        var options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: {i: props.id, r: 'json'},
            headers: {
                'x-rapidapi-key': 'cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a',
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            setData(response.data)
        }).catch(function (error) {
            console.error(error);
        }); 
    }, [props.id])

    console.log(data);

    return (
        <>
            <div className="singleView">
               {
                data === undefined ? <Spinner /> : 
                <>
                    <h1 className="singleView__title">{data?.Title}</h1>
                    <p className="singleView__releaseDate">{data?.Released}</p>
                    <p className="singleView__genre">{data?.Genre}</p>
                    <div className="singleView__scores">
                        {data?.Metascore === "N/A" ? null : <div className="singleView__scores__metascore">{data?.Metascore}</div>}
                        {data?.imdbRating === "N/A" ? null : <p className="singleView__scores__imdb">{data?.imdbRating}</p>}
                    </div>
                    <div className="singleView__wrapper">
                        <img src={data?.Poster === "N/A" ? "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=6&m=1147544807&s=612x612&w=0&h=8CXEtGfDlt7oFx7UyEZClHojvDjZR91U-mAU8UlFF4Y=" : data?.Poster} alt="" />
                        <div className="singleView__content">
                            <p className="singleView__runtime">{data?.Runtime}</p>
                            <p className="singleView__plot">{data?.Plot}</p>

                            <div className="singleView__creators">
                                <p>{data?.Actors}</p>
                                <p>{data?.Director}</p>
                                <p>{data?.Writer}</p>
                            </div>
                        </div>
                    </div>
                    <Link className="linkBack" to="/">«</Link>
                </>
                }
            </div>
        </>
    )
}
