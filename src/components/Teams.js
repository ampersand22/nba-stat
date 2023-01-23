import '../App.css'

const Teams = (props) => {
    

  return (
    <div className='teams-container'>
        {props.teamData.map((data) => {
            return (
                <div key={data.id} className='team-div'>
                    <img src={data.team.logos[0].href} alt='#'/>
                    <h2 key={data.id}>{data.team.displayName}</h2>
                    
                </div>
            )
        })}


    </div>
  )
}

export default Teams