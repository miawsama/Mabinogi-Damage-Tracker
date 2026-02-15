import { useContext } from 'react';
import { AppContext } from '../AppContext';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import PlayerDamagePieChart from './PlayerDamagePieChart';
import DamangeOverTimeLineGraph from './DamageOverTimeLineGraph';
import LinearProgress from '@mui/material/LinearProgress';
import LogStream from './LogStream'
import PlayerDamageGauge from './PlayerDamageGauge';

const RecordingButtonStyle = {
    width: '100%',
    height: 125,
};

export default function LiveMenu() {
    const {
        recording,
        startUT,
        damagePieChartData,
        damageOverTimeData,
        averageDPS,
        DPS,
        startRecording,
        stopRecording
    } = useContext(AppContext);

     
    const toggleRecording = async () => {
        if (recording) {
            await stopRecording();
            return;
        }

        await startRecording();
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
            <Typography variant="h2" sx={{ marginBottom: "24px" }}>Live</Typography>
            <Paper sx={{ height: "100%", padding: 2}}>
                <Grid container spacing={2}>
                    <Grid item size={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' } }>
                        {recording ?
                            <Button sx={RecordingButtonStyle} variant="outlined" color="error" onClick={toggleRecording}>
                                End Recording
                            </Button>
                            :
                            <Button sx={RecordingButtonStyle} variant="contained" color="error" onClick={toggleRecording}>
                                Start Recording
                            </Button>
                        }
                    </Grid>
                    <Grid item size={10}>
                        <LogStream />
                        <LinearProgress value={0} variant={recording ? "indeterminate" : "determinate"} color="error" />
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={2} alignItems="stretch" sx={{ flexGrow: 1 }}>
                <Grid item size={{ xs: 12, sm: 12, lg: 8, xl: 4 }}>
                    <PlayerDamagePieChart chartData={damagePieChartData} />
                </Grid>
                <Grid item size={{ xs: 12, sm: 12, lg: 12, xl: 8 }}>
                    <DamangeOverTimeLineGraph chartData={damageOverTimeData} start_ut={startUT}/>
                </Grid>
                <Grid item size={{ xs: 12, sm: 12, lg: 8, xl: 4 }}>
                    <PlayerDamageGauge value={DPS} averageDPS={averageDPS} />
                </Grid>
            </Grid>
             
        </Box>
    );
}
