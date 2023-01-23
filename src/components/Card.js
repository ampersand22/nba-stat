import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Button, Grid, GridItem } from '@chakra-ui/react'


export default function PlayerCard (props) {
  const player = props.player;
  const playerPic = `https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`


  return (
    <Card style={{ width: '25rem'}} className='player-card'>
      {/* <Card.Img variant="top" src={playerPic} alt='player' /> */}
      <CardBody>
        <CardHeader style={{ fontSize: '2em'}}>{`${player.first_name} ${player.last_name}`}</CardHeader>
        <CardBody className="mb-2 text-muted">{player.team?.full_name}</CardBody>
        <h3 style={{ fontStyle: 'italic', fontSize: '.8em' }}>*every stat is per game*</h3>
        
          
        <div>
            <CardBody>
            Points: {player.stats.averagePointsPerGame} <br />
            Assists: {player.stats.averageAssistsPerGame} <br />
            Rebounds: {player.stats.averageReboundsPerGame} <br />
            Blocks: {player.stats.averageBlocksPerGame} <br />
            FG%: {player.stats.averageFgPercentPerGame} <br />
            3pt: {player.stats.averageFg3percentPerGame} <br />
            </CardBody>
          </div>
          <div>
            
          </div>


        
      </CardBody>
    </Card>
  );
}
