import { ref } from "vue"
import { projectAuth } from "../firebase/config"

const user = ref(projectAuth.currentUser);

projectAuth.onAuthStateChanged(currentUser => {
    // console.log(currentUser)
    user.value = currentUser;

})



const getUser = () => {
    return user;
}


export default getUser;
