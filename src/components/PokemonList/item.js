import React, { Component } from 'react'

import styles from './styles'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class Item extends Component {
  constructor (props) {
    super(props)

    this.handleImageErrored = (event) => {
      let src
      if (this.props.imageSecond != null) {
        src = this.props.imageSecond
      } else {
        src = this.props.imageNull
      }
      event.target.src = src
      return event.target.src
    }
  }

  render () {
    const { image, name, baseExperience, types, globalStyles, loadSelectedType } = this.props

    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <div style={{ ...styles.mediaBox }}>
              <img
                src={image}
                alt={name}
                style={{ ...styles.media }}
                onError={this.handleImageErrored} />
            </div>
            <Typography variant='h5' component='h2'>
              {name}
            </Typography>
            <Typography color='textSecondary'>
              base expiriens: {baseExperience}
            </Typography>
          </CardContent>
          <CardActions>
            {types.map((type) =>
              <Button
                key={type.name}
                style={{ ...globalStyles[`type_${type.name}`] }}
                onClick={() => loadSelectedType(type.url)}>
                {type.name}
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

export default Item
