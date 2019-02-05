import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

const Spinner = ({ classes }) => <div className={classes.spinner} />

export default withStyles(styles)(Spinner)
