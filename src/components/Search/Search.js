import React, { useState, useContext } from 'react';
import "./Search.scss";
import axios from "axios";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import dataContext from "../../Context";

export default function Search() {
    var [ searchInput, setSearchInput ] = useState("");
    var [ spin, setSpin ] = useState();
    
    var dataArray = useContext(dataContext);

    function handleSubmit(event) {
        if (event) {
            event.preventDefault();
        }
        setSpin(true);
        var options = {
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: {s: !searchInput === undefined && searchInput.charAt(searchInput.length - 1) === " " ? searchInput.slice(0, -1) : searchInput, page: '1', r: 'json'},
            headers: {
                'x-rapidapi-key': 'cbf0eada93mshda4348a7166d51bp13e11bjsna5929dc3ff1a',
                'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            dataArray[1](response.data.Search)
            setSpin(false);
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <div className="frontpage">
            <h1 className="siteHeading" onClick={() => {
                searchInput = undefined;
                dataArray[0] = undefined;
                handleSubmit()
            }}>The Movie Base</h1>
            <div className="searchWrapper">
                <form onSubmit={handleSubmit}>
                    <input onChange={event => setSearchInput(event.target.value)} type="text" />
                    <button type="submit">&#x1F50D;</button>
                </form>
            </div>
            <div className="cards">
                { dataArray[0] === undefined ? <img className="cards__bg" src="https://media.istockphoto.com/vectors/movie-time-vector-illustration-cinema-poster-concept-on-red-round-vector-id911590226?k=6&m=911590226&s=612x612&w=0&h=u6vP2FnJG8Ib3O1xofOUeJ5NtHWrWdRnV-OSL8arBnk=" alt="" /> : dataArray[0]?.map(result => {
                    return (
                        spin === true ? <Spinner /> :
                        <Card title={result.Title} image={result.Poster} year={result.Year} id={result.imdbID} />
                    )
                })}
            </div>
        </div>
    )
}
