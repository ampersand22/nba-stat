import React from 'react'
import { Box, CardBody } from '@chakra-ui/react'
import './Scoreboard.css'

//leaders[0] = points, leaders[1] = rebounds

const Leaders = (props) => {
    
    return (
        <Box className='leaders-container'>
            <p style={{ fontWeight: 'bold'}}>{props.data.competitions[0].competitors[1].team.abbreviation}</p>
            <div className='leader-stats'>
                <p>Pts:</p>
                <p>{props.data.competitions[0].competitors[1].leaders[0].leaders[0].athlete.shortName}</p>
                <h4>{props.data.competitions[0].competitors[1].leaders[0].leaders[0].displayValue}</h4>
            </div>
            <div className='leader-stats'>
                <p>Rebs:</p>
                <p>{props.data.competitions[0].competitors[1].leaders[1].leaders[0].athlete.shortName}</p>
                <h4>{props.data.competitions[0].competitors[1].leaders[1].leaders[0].displayValue}</h4>
            </div>
            <div className='leader-stats'>
                <p>Asts:</p>
                <p>{props.data.competitions[0].competitors[1].leaders[2].leaders[0].athlete.shortName}</p>
                <h4>{props.data.competitions[0].competitors[1].leaders[2].leaders[0].displayValue}</h4>
            </div>

            <hr />

            <p style={{ fontWeight: 'bold'}}>{props.data.competitions[0].competitors[0].team.abbreviation}</p>
            <div className='leader-stats'>
                <p>Pts:</p>
                <p className='athlete-name'>{props.data.competitions[0].competitors[0].leaders[0].leaders[0].athlete.shortName}</p>
                <h4>{props.data.competitions[0].competitors[0].leaders[0].leaders[0].displayValue}</h4>
            </div>
            <div className='leader-stats'>
                <p>Rebs:</p>
                <p className='athlete-name'>{props.data.competitions[0].competitors[0].leaders[1].leaders[0].athlete.shortName}</p>
                <h4>{props.data.competitions[0].competitors[0].leaders[1].leaders[0].displayValue}</h4>
            </div>
            <div className='leader-stats'>
                <p>Asts:</p>
                <p className='athlete-name'>{props.data.competitions[0].competitors[0].leaders[2].leaders[0].athlete.shortName}</p>
                <h4>{props.data.competitions[0].competitors[0].leaders[2].leaders[0].displayValue}</h4>
            </div>
        </Box>
    )
}

export default Leaders