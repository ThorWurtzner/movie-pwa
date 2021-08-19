import React, { useState, useContext, useEffect } from 'react';
import "./Search.scss";
import axios from "axios";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import dataContext from "../../Context";

export default function Search() {
    var [ searchInput, setSearchInput ] = useState("");
    var [ spin, setSpin ] = useState();
    
    var dataArray = useContext(dataContext);
    
    // Intended use is to make dataArray[0] be undefined by fetching once
    // This is to make the turnary operator on line 77 put in the background image on page load
    // Når jeg skriver i input, sætter jeg et state, som får hele komponentet til at rerender hver gang

    // useEffect(() => {
    //     if (!dataArray[0] === undefined) {
    //         dataArray[1](undefined);
    //     }
    // }, [])

    console.log(dataArray[0]);

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

    Notification.requestPermission(function(status) {
        // console.log("Notification permission status:", status);
    })
    
    function displayNotification() {
        if (Notification.permission === "granted") {
            navigator.serviceWorker.getRegistration()
            .then(function(reg) {
                var options = {
                vibrate: [200, 100, 500, 100, 200, 100, 800, 100, 500]
                }
                reg.showNotification("Hello world", options);
            });
        }
    }

    return (
        <div className="frontpage">
            <div style={{display: "flex", alignItems: "center"}}>
                <button className="notificationBtn" onClick={displayNotification}></button>
                <p style={{color: "#fff", fontFamily: "VT323", fontSize: "20px", marginLeft: "10px"}}>⇦ Notification</p>
            </div>
            <h1 className="siteHeading" onClick={() => {
                searchInput = undefined;
                dataArray[0] = undefined;
                handleSubmit();
            }}>The Movie Base</h1>
            <div className="searchWrapper">
                <form onSubmit={handleSubmit}>
                    <input onChange={event => setSearchInput(event.target.value)} type="text" />
                    <button type="submit">&#x1F50D;</button>
                </form>
            </div>
            <div className="cards">
                { dataArray[0] === undefined || dataArray[0].length < 1 ? <img className="cards__bg" src="./icon.png" alt="" /> : dataArray[0]?.map(result => {
                    return (
                        spin === true ? <Spinner /> :
                        <Card title={result.Title} image={result.Poster} year={result.Year} id={result.imdbID} />
                    )
                })}
            </div>
        </div>
    )
}
