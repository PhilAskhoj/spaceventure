import React from 'react'

const LidtOmOsOutput = (props) => {

    const a = props.about;

    return (

        <div className="abouttekst">

            <h6>{a.title}</h6>
            <p className="teamStilling">{a.content}</p>

        </div>

    )
}

export default LidtOmOsOutput;