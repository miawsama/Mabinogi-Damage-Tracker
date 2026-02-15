import { useContext, useEffect, useRef } from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AppContext } from '../AppContext';


export default function LogStream() {
    const { logs, clearLogs } = useContext(AppContext);
    const logContainerRef = useRef(null);

    useEffect(() => {
        const container = logContainerRef.current;
        if (!container) return;

        const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        if (distanceFromBottom <= 40) {
            container.scrollTop = container.scrollHeight;
        }
    }, [logs]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: "150px" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">Event Logs</Typography>
                <Button size="small" variant="text" color="inherit" onClick={clearLogs}>Clear</Button>
            </Box>
            <Divider />
            <div ref={logContainerRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: "auto" }}>
                {logs.map((log, i) => {
                const opacity = (i + 1) / logs.length;

                return (
                    <Typography
                        variant="subtitle"
                        key={i}
                        sx={{ opacity }}
                    >
                        {log}
                    </Typography>
                );
                })}
            </div>
        </div>
    );
}
