import React from 'react'

const TeamOutput = (props) => {

    const t = props.team;

    return (

        <div>

            <img src={"http://localhost:4444/images/team/" + t.image } alt="Billede af teammedlem" />

            <div className="teametsInformationer">
                <h6>{t.name}</h6>
                <p>{t.role}</p>
                <p>{t.phone}</p>
            </div>

        </div>

    )
}

export default TeamOutput;