import FileContent from '../models/fileContentSchema.js';
import activeFiles from '../stores/activeFileStore.js';
import saveTimers from '../stores/saveDebounceStore.js';

export default function scheduleSave(fileId){
    const existingTimer = saveTimers.get(fileId);

    //cancel previous timer

    if(existingTimer){
        clearTimeout(existingTimer);
    }
    const timer = setTimeout(async() => {
        const fileState = activeFiles.get(fileId);
        if(!fileState) return ;
        if(!fileState.changed) return;
        await FileContent.updateOne({fileId},{
            content:fileState.content,
            lastEditedBy:fileState.lastEditedBy
        },{upsert:true});
        fileState.changed = false;
        saveTimers.delete(fileId);
    }, 5000);
    saveTimers.set(fileId,timer);
}