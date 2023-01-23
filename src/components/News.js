import {useState, useEffect} from 'react'
import axios from 'axios'
import StatCard from './StatCard'
import { Card, CardHeader, CardFooter } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const Stats = () => {

    const [data, setData] = useState([])
    const [showStatCard, setShowStatCard] = useState(false)
    const [playerData, setPlayerData] = useState([])

    useEffect(() => {
        axios('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news')
        .then((res) => {
            setData(res.data.articles)
        })
    }, [setData])


  return (
    <>
    {data.map((data) => {
        return (
            <div key={data.id}>
                <Card>
                    <CardHeader>
                    <img src={data.images.url} alt='link-pic' />
                    <a className='news-link' href={data.links.web.href}>{data.description}</a>
                    </CardHeader>
                    
                    <CardFooter>
                        {data.published}
                    </CardFooter>
                </Card>
            </div>
        )
    })}

    </>
  )
}

export default Stats