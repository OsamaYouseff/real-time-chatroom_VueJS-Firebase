import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";


const getCollection = (collection = "messages") => {

    const documents = ref([]);
    const errorMsg = ref(null);

    const getDocs = async () => {


        const unSub = await projectFirestore.collection((collection))
            .orderBy("createdAt", "asc")
            .onSnapshot((snap) => {
                let result = [];
                snap.forEach((doc) => {
                    doc.data().createdAt && result.push({ ...doc.data(), id: doc.id });
                });
                documents.value = result;
                errorMsg.value = null;
            }, (error) => {
                // console.log(error.message);
                errorMsg.value = error.message;
            });



        watchEffect((onInvalidate) => {
            //// unsubscribe form life listener when this watcher stop watching 
            onInvalidate(() => unSub());
        })

    }


    return { documents, errorMsg, getDocs };

}


export default getCollection;
