import {useSelector} from 'react-redux';

export function useAuth() {
    const {access, user} = useSelector(state => state.user);

    return {
        isAuth: !!access,
        access,
        user,
    };
}