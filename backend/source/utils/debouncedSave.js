
import saveTimers from '../stores/saveDebounceStore.js';
import redisClient from './redisClient.js';
import fs from 'fs';
export default function scheduleSave(fileId,filePath){
    const existingTimer = saveTimers.get(fileId);

    //cancel previous timer

    if(existingTimer){
        clearTimeout(existingTimer);
    }
    const timer = setTimeout(async() => {
        //const fileState = activeFiles.get(fileId);
        const rediskey = `file:${fileId}`;

        const fileState = await redisClient.get(rediskey);
        if(fileState===null) return ;
        
        if(fs.existsSync(filePath)){
            fs.writeFileSync(filePath,fileState);
        }
        


        saveTimers.delete(fileId);
    }, 5000);
    saveTimers.set(fileId,timer);
}