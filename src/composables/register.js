import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const errorMsg = ref(null)

const registerUser = async (displayName, email, password) => {
    errorMsg.value = null;

    try {
        const response = await projectAuth.createUserWithEmailAndPassword(email, password);

        if (!response) {
            throw new Error("Could not complete registration1 :-(");
        }

        await response.user.updateProfile({ displayName });

        errorMsg.value = null;

        // console.log(response)

        return response;

    } catch (error) {
        console.log(error.message)
        errorMsg.value = error.message;
    }
}



const register = () => {

    return { registerUser, errorMsg };
}




export default register 