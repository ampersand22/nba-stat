import {useState, useEffect} from 'react'
import axios from 'axios'
import '../App.css'
import './Content.css'
import Teams from './Teams'
import Scoreboard from './Scoreboard'
import News from './News.js'
import Stats from './Stats'

const Content = () => {

    const [active, setActive] = useState(true)
    const [showNews, setShowNews] = useState(false)
    const [showTeams, setShowTeams] = useState(false)
    const [showStats, setShowStats] = useState(false)
    const [teamData, setTeamData] = useState([])

    useEffect(() => {
        axios('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams')
        .then((res) => {
            setTeamData(res.data.sports[0].leagues[0].teams)
        })
    }, [])


    const activeToggle = () => { 
        setShowNews(false)
        setActive(true)
        setShowTeams(false)
        setShowStats(false)
    }

    const showNewsToggle = () => { 
        setShowNews(!showNews)
        setActive(false)
        setShowTeams(false)
        setShowStats(false)
    }

    const showTeamsToggle = () => { 
        setShowTeams(!showTeams)
        setActive(false)
        setShowNews(false)
        setShowStats(false)
    }

    const showStatsToggle = () => { 
        setShowStats(!showStats)
        setActive(false)
        setShowNews(false)
        setShowTeams(false)
    }



    return (
        <div className="content-container">
            <div className="tabs">
                {/* <div className="tab-score" onClick={() => {activeToggle()}}>
                    <h2 style={{color: active ? '#c20114' : null }}>Scoreboard</h2>
                </div>
                <div className="tab-teams" onClick={() => {showTeamsToggle()}}>
                    <h2 style={{color: showTeams ? '#c20114' : null }}>Teams</h2>
                </div>
                <div className="tab-news" onClick={() => {showNewsToggle()}}>
                    <h2 style={{color: showNews ? '#c20114' : null }}>News</h2>
                </div> */}
                <div className="tab-stats" onClick={() => {showStatsToggle()}}>
                    <h2 style={{color: showStats ? '#c20114' : null }}>Stats</h2>
                </div>
            </div>
            <div className='main-content'>
                { active ? <Scoreboard /> : null}
                { showTeams ? <Teams teamData={teamData}/> : null}
                { showNews ? <News /> : null}
                { showStats ? <Stats teamData={teamData}/> : null}

            </div>
        </div>
    )
}

export default Content