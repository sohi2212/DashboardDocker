import moment from 'moment-timezone';

export const currentTime = () => {
    return moment().tz("Europe/Moscow").format('YYYY-MM-DD HH:mm:ss');
};
