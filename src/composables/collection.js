import { ref } from "vue"
import { projectFirestore } from "../firebase/config"



const useCollection = (collection) => {
    const errorMsg = ref(null)

    const addDoc = async (doc) => {
        try {
            await projectFirestore.collection(collection).add(doc);

        } catch (error) {
            errorMsg.value = "Failed to send this message";
            // console.log(error.message)
        }
    }





    return { errorMsg, addDoc }
}



export default useCollection;