import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const errorMsg = ref(null)

const loginUser = async (email, password) => {
    errorMsg.value = null;

    try {
        const response = await projectAuth.signInWithEmailAndPassword(email, password);

        if (!response) {
            throw new Error("Wrong email or password");
        }
        errorMsg.value = null;

        return response;

    } catch (error) {
        // console.log(error.message)
        errorMsg.value = "Wrong email or password";
    }
}



const login = () => {
    return { loginUser, errorMsg };
}




export default login 