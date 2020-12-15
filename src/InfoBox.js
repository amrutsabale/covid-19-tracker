import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css'

function InfoBox({ title, cases, total }) {
    return (

        <Card className="infoBox">
            <CardContent>
                <Typography className="infobox__title" color="textSecondary">
                    {title}
                </Typography>
                {/* {title} */}
                {/* no of cases */}
                <h2>{cases}</h2>
                {/* total cases */}
                <Typography className="infoBox_total" color="textSecondary">
                    {total}
                </Typography>
            </CardContent>
        </Card>

    )
}

export default InfoBox
