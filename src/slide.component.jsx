import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
    root: {
        width: 250,
    },
    input: {
        width: 42,
    },
});

export default function InputSlider() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const speed = useSelector(store => store.speed)

    const handleSliderChange = (event, newValue) => {
        dispatch({ type: 'SET_SPEED', payload: newValue });
    };



    return (
        <div className={classes.root}>
            <Typography id="input-slider" gutterBottom>
                SPEED
      </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    {/* <VolumeUp /> */}
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof speed === 'number' ? speed : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        
                        step={0.1}
                        min={1}
                        max={10}
                    />
                </Grid>
                <Grid item>

                </Grid>
            </Grid>
        </div>
    );
}