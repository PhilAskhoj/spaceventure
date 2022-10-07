import React from 'react';

const TeamOutput = (props) => {

    const t = props.team;

    return (

        <div className="teamIndivider">

            <img src={"http://localhost:4444/images/team/" + t.image } alt="Billede af teammedlem" />

            <div className="teametsInformationer">
                <h6>{t.name}</h6>
                <p className="teamStilling">{t.role}</p>
                <p className="teamTelefonnummer">{t.phone}</p>
            </div>

        </div>

    )
}

export default TeamOutput;