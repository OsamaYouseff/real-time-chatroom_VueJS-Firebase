import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const errorMsg = ref(null)

const logoutUser = async () => {
    errorMsg.value = null;

    try {
        await projectAuth.signOut();
        window.location.href = "/login";

    } catch (error) {
        // console.log(error.message)
        errorMsg.value = "Wrong email or password";
    }
}



const logout = () => {
    return { logoutUser, errorMsg };
}




export default logout;