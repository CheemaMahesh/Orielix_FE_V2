export const useFunctionDirectory = () => {
    const getHoursByMinutes = (minutes: string) => {
        const totalMinutes = parseInt(minutes, 10);
        if (isNaN(totalMinutes)) {
            return "Invalid input";
        }

        const hours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;

        if (hours > 0 && remainingMinutes === 0) {
            return `${hours} hour${hours !== 1 ? 's' : ''}`;
        }

        return `${hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''} ` : ''}${remainingMinutes > 0 ? `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}` : ''}`;
    };

    return {
        getHoursByMinutes,
    }
}