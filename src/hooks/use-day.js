import {useSelector} from 'react-redux';

export function useDay() {
    const {day} = useSelector(state => state.day);

    return {
        day
    };
}