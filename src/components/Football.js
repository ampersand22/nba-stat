import {useEffect} from 'react'
import axios from 'axios'

const Football = () => {

    // useEffect(() => {
    //     axios('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams')
    //     .then((res) => {
    //         setTeamData(res.data.sports[0].leagues[0].teams)
    //     })
    // }, [])

    function GetESPNIds() {
        const url = 'https://sports.core.api.espn.com/v3/sports/football/nfl/athletes?limit=20000';
        fetch({
            type: "GET",
                  url: url,
                  success: function (data) {
                for (var i=0;i<data.items.length;i++) {
                    if(data.items[i].hasOwnProperty("lastName") && data.items[i].hasOwnProperty("firstName") && data.items[i].hasOwnProperty("dateOfBirth")) {
                        console.log("Name: "+data.items[i].lastName+","+data.items[i].firstName +" ID: " +data.items[i].id +" DOB: " +data.items[i].dateOfBirth);
                    }
                }
                  }
           });
        
    }
    
    GetESPNIds();

  return (
    <div>Football!!!!</div>
  )
}

export default Football