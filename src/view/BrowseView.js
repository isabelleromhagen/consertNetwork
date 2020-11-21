import React, {useState} from "react"
import './BrowseView.css'

export const BrowseView = () => {
    const [search, setSearch] = useState()
    return (
        <div className="browseViewWrapper">
            <div className="searchDiv">
                <span>Search: </span>
                <input onChange={event => setSearch(event.target.value)}/><br/>
                <span>Results for {search} </span>
            </div>
            <div className="contentDiv">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Picture</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
            </div>
        </div>
    )
}

/*should show latest added/most popular/some other list as default. 
if the user enters something in the search bar and hits enter, header should be replaced by result + show the bands that came up in the search.
if the search returns no results, show form for entering new band into database */