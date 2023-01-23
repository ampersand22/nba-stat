import {useState, useEffect} from 'react'
import axios from 'axios'
import './Scoreboard.css'
import Leaders from './Leaders'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Button, Grid, GridItem } from '@chakra-ui/react'


const Scoreboard = () => {
    const [data, setData] = useState([])
    const [showTeam, setShowTeam] = useState(false)
    const [showLeaders, setShowLeaders] = useState({})

    const [showHome, setShowHome] = useState(false)
    const [showAway, setShowAway] = useState(false)

    useEffect(() => {
        axios('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard')
        .then((res) => {
            setData(res.data.events)
        })
    }, [])

    // small logo https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/phx.png

    const showTeamHandler = () => { 
        setShowTeam(!showTeam)
    }

    const teamLeaderStats = (e) => { 
        setShowLeaders(e.target.value)
    }

    const dropdownFunction = () => {
        document.getElementById(`dropdown${data.id}`).classList.toggle('show')
    }



  return (
    <div>
        <Button onClick={() => {showTeamHandler()}}>Toggle Leaders</Button>
        <div className='scoreboard-container'>
            {data.map((data) => {
                return (
                    <div className='score-container' key={data.id}>
                        <div className='game-container'>
                            <Card key={data.id} className='card-container' onClick={() => {showTeamHandler()}}>
                                <div className='game-details'>
                                    <p>{data.competitions[0].status.type.shortDetail}</p>
                                    <p style={{ fontSize: '0.5em'}}>
                                        {data.competitions[0].venue.fullName}, {data.competitions[0].venue.address.city}, {data.competitions[0].venue.address.state}
                                    </p>
                                </div>
                                <CardHeader className='away-column' value={data.id}>
                                    <img src={data.competitions[0].competitors[1].team.logo} alt='team-logo' className='logo-thumb'/>
                                    <h2 className='away-team'>{data.competitions[0].competitors[1].team.displayName}</h2>
                                    <p className='away-record'>({data.competitions[0].competitors[1].records[0].summary})</p>
                                    <h4 className='away-score'>{data.competitions[0].competitors[1].score}</h4>
                                </CardHeader>
                            
                                <div className='at-column'>
                                    <p style={{ margin: '0 3em'}}> at </p>
                                </div>

                                <CardHeader className='home-column'>
                                <img src={data.competitions[0].competitors[0].team.logo} alt='team-logo' className='logo-thumb'/>
                                    <h2 className='home-team'>{data.competitions[0].competitors[0].team.displayName}</h2>
                                    <p className='home-record'>({data.competitions[0].competitors[0].records[0].summary})</p>
                                    <h4 className='home-score'>{data.competitions[0].competitors[0].score}</h4>
                                </CardHeader>

                                { showTeam ? <Leaders data={data}/> : null}

                                

                            </Card>
                        </div>
                    </div>
                )
            })}
            
        </div>
    </div>
  )
}

export default Scoreboard
