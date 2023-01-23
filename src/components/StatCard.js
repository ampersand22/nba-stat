import { useState, useEffect, useMemo, useCallback } from 'react'
import { Card, CardHeader } from '@chakra-ui/react'
import axios from 'axios'
import Filter from './Filter.js'
import Search from './Search.js'

const StatCard = (props) => {

    

    let [allPlayers, setAllPlayers] = useState([])
    let [players, setPlayers] = useState([])
    let [teams, setTeams] = useState([])
    let [pageNumber, setPageNumber] = useState(1);
    let [search, setSearch] = useState("");
    let [name, setName] = useState({})

    let page = 1
    let api = `https://www.balldontlie.io/api/v1/players?per_page=100&page=${page}`
    let searchApi = `https://www.balldontlie.io/api/v1/players?per_page=100&search=${name}`
    const teamUrl = `https://www.balldontlie.io/api/v1/teams`


    useEffect(() => {
        axios(`https://www.balldontlie.io/api/v1/players?page=${pageNumber}&name=${search}`)
            .then((res) => {
                setAllPlayers(res.data.data)
            })
    }, [pageNumber, search])

    const filterPlayers = useMemo(() => {
        if (search) {
        const searchInputLower = search.toLowerCase()
        const result = players.filter((player) => {
            return player.last_name.toLowerCase().match(searchInputLower) || player.first_name.toLowerCase().match(searchInputLower)
        })
        return result
        }
        return players
  }, [players, search])

  return (
    <>
    <Search setSearch={setSearch} setPageNumber={setPageNumber} search={search} allPlayers={allPlayers} setAllPlayers={setAllPlayers} />
    {allPlayers.map((player) => {
        return (
        <div key={player.id}>
            {player.first_name} {player.last_name}
        </div>
        )
    })}
    </>
  )
}

export default StatCard