import { useState, useEffect } from 'react';

function ClockComponent({ timezone }) {
    const [currentTime, setCurrentTime] = useState(getFormattedTime(timezone));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getFormattedTime(timezone));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timezone]);

    function getFormattedTime(currentTimezone) {
        const date = getTimeWithOffset(currentTimezone);
        let hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const strSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return `${hours}:${strMinutes}:${strSeconds} ${ampm}`;
    }

    return currentTime;
}

const getTimeWithOffset = (offsetInSeconds) => {
    return new Date(Date.now() + offsetInSeconds * 1000);
}

export default ClockComponent;
