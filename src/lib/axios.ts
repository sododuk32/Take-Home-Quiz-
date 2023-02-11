import { mymy } from './interface'
import axios from 'axios'

export const convertionApi = async (contry: mymy) => {
    return axios
        .create({
            baseURL: 'http://localhost:3000',
            headers: {
                'Content-Type': `application/json`,
                withCredentials: true,
            },
        })
        .get(
            `http://localhost:3000` +
                `/convert/${contry.from.currency}/${contry.to.currency}`
        )
}
