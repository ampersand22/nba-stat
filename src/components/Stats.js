import {useState, useEffect, useMemo, useCallback } from 'react'
import PlayerList from './PlayerList.js'
import PlayerCard from './Card.js'
import SearchForm from './Search.js'


const Stats = (props) => {

    const lebron = {
        id: 237,
        first_name: 'LeBron',
        last_name: 'James',
        team: { abbreviation: 'LAL', full_name: 'Los Angeles Lakers' },
        position: 'F',
        stats: {
          averagePointsPerGame: 24.9,
          averageReboundsPerGame: 8.8,
          averageAssistsPerGame: 6.9,
          averageBlocksPerGame: 1.0,
          averageFgPercentPerGame: 50.5,
          averageFg3percentPerGame: 34.4,
        },
    }

    const [name, setName] = useState('LeBron James')
    const [selectedPlayer, setSelectedPlayer] = useState(lebron)
    const [filteredPlayers, setFilteredPlayers] = useState([lebron])
    const [allPlayers, setAllPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [teams, setTeams] = useState([])
    const [searchValue, setSearchValue] = useState(null)
    const [isActive, setIsActive] = useState(null)

    const teamUrl = `https://www.balldontlie.io/api/v1/teams`


    const getAllPlayers = useCallback((page, players) => {
        if (page) {
            return fetch(`https://www.balldontlie.io/api/v1/players?per_page=100&page=${page}`)
            .then((response) => response.json())
            .catch(() => new Promise((r) => setTimeout(r, 25000)).then(() => getAllPlayers(page, players)))
            .then((result) => {
              return getAllPlayers(result.meta?.next_page, players.concat(result.data));
            });
        } else return players;
      }, []);

    useEffect(() => {
        getAllPlayers(1, [])
          .then(setAllPlayers)
          .finally(() => setLoading(false));
    }, [getAllPlayers]);
    
    
    // const allPlayerList = useMemo(() => {
    //     return getAllPlayers(1, [])
    // }, [getAllPlayers])

    // useEffect(() => {
    //     if (allPlayerList) {
    //     setAllPlayers(allPlayerList)
    //     setLoading(false)
    // }
    // }, [allPlayerList]);
  
  
  const filterPlayers = useMemo(() => {
    if (searchValue) {
      const searchInputLower = searchValue.toLowerCase()
      const result = allPlayers.filter((player) => {
        return player.last_name.toLowerCase().match(searchInputLower) || player.first_name.toLowerCase().match(searchInputLower)
      })
      return result
    }
    return allPlayers
  }, [allPlayers, searchValue])

    console.log(allPlayers)

    async function handleSubmit(event) {
        event.preventDefault();
        if (loading) await getPlayers(name);
        else setFilteredPlayers(allPlayers.filter((player) => `${player.first_name} ${player.last_name}`.includes(name)));
    }

    function handleChange(event) {
        setName(event.target.value);
    }

    async function getPlayers(name) {
        const url = `https://www.balldontlie.io/api/v1/players?per_page=100&search=${name}`;
        const result = await fetchData(url);
        console.log(result.data)
        setFilteredPlayers(result.data);
    }

    function averagePlayerStats(stats) {
        const assists = stats.data.map((game) => game.ast);
        const blocks = stats.data.map((game) => game.blk);
        const points = stats.data.map((game) => game.pts);
        const rebounds = stats.data.map((game) => game.reb);
        const steals = stats.data.map ((game) => game.stl)
        const fgPercent = stats.data.map((game) => game.fg_pct);
        const fg3percent = stats.data.map((game) => game.fg3_pct);
        const turnovers = stats.data.map((game) => game.turnover);     
        return {
          averageAssistsPerGame: calculateAverage(assists),
          averageBlocksPerGame: calculateAverage(blocks),
          averagePointsPerGame: calculateAverage(points),
          averageReboundsPerGame: calculateAverage(rebounds),
          averageStealsPerGame: calculateAverage(steals),
          averageFgPercentPerGame: calculateAverage(fgPercent),
          averageFg3percentPerGame: calculateAverage(fg3percent),
          averageTurnoverPerGame: calculateAverage(turnovers)
        };  
      }
    
    
    
      function calculateAverage(stats) {
        const total = stats.reduce((acc, c) => acc + c, 0);
        return total / stats.length;
      }
    
      async function getPlayerById(id) {
        return await fetchData(`https://www.balldontlie.io/api/v1/players/${id}`);
      }

    async function handlePlayerClick(id) {
        const url = `https://www.balldontlie.io/api/v1/stats?player_ids[]=${id}`;
    
        const results = await fetchData(url).then(averagePlayerStats);
        
        let playerData = loading ? await getPlayerById(id) : allPlayers.find((player) => player.id === id);
    
        setSelectedPlayer({
          ...playerData,
          stats: {
            averageAssistsPerGame: results.averageAssistsPerGame,
            averageBlocksPerGame: results.averageBlocksPerGame,
            averagePointsPerGame: results.averagePointsPerGame,
            averageReboundsPerGame: results.averageReboundsPerGame,
            averageStealsPerGame: results.averageStealsPerGame,
            averageFgPercentPerGame: results.averageFgPercentPerGame,
            averageFg3percentPerGame: results.averageFg3percentPerGame,
            averageTurnoverPerGame: results.averageTurnoverPerGame,
          },
        },
        );
    }

    async function fetchData(url) {
        return await fetch(url).then(handleFetchResponse);
    }

    async function handleFetchResponse(r) {
        if (r.ok) {
          return await r.json();
        } else {
          setShowAlert(true);
          console.log(r);
        }
    }
    


  return (
    <div className='stat-box'>
        <PlayerCard player={selectedPlayer} teamData={props.teamData}/>
        <SearchForm name={name} handleSubmit={handleSubmit} handleChange={handleChange}/>
        <PlayerList players={filteredPlayers} handlePlayerClick={handlePlayerClick} />
    </div>
  );
}

export default Stats