import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
  } from '@chakra-ui/react'
import './PlayerList.css'

export default function PlayerList (props) {

    // const check = () => {
    //     console.log(props.players)
    // }

  return (
    <Box className='list-box' w='70em'>
        <TableContainer>
            <Table variant='striped'>
                <Thead>
                    <Tr>
                        <Th>Position</Th>
                        <Th>Name</Th>
                        <Th>Team</Th>
                    </Tr>
                </Thead>
                <Tbody>
                        {props.players.map((player) => {
                            return (
                                <Tr key={player.id} onClick={() => props.handlePlayerClick(player.id)} >
                                    <Td className='list-item'>{`${player.position}`}</Td>
                                    <Td className='list-item'>{`${player.first_name} ${player.last_name}`}</Td>
                                    <Td className='list-item'>{player.team.abbreviation}</Td>
                                </Tr>
                            )
                        })}
                </Tbody>
            </Table>
        </TableContainer>

    </Box>
  )
}