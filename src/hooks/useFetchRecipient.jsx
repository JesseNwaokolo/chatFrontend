import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

function useFetchRecipient(chat, user) {
    const [recipientUser, setRecipientUser] = useState()
    const [error, setError] = useState()
    // console.log(recipientUser)
    // console.log(chat)
    const recipientId = chat?.members.find((id) => id !==user?._id)
    // console.log(recipientId)
    useEffect(()=>{
        const getUser = async ()=>{
            if(!recipientId) return null
            const response = await getRequest(`${baseUrl}/user/find/${recipientId}`)

            if(response.error){
                return setError(error)
            }

            setRecipientUser(response)
        }

        getUser()
    }, [recipientId])


    return {recipientUser}
}

export default useFetchRecipient;