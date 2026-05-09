import codeRunService from "../services/codeRunService.js"

export default async function codeRunController(req,res){
    const {language,code} = req.body
    console.log("language",language);
    console.log("code",code);

    if(typeof(code) !== 'string' || code.length === 0){
        return res.status(400).json({
            success:false,
            message:'Code not found !'
        })
    };
    const languageMap = {
   python: 71,
   javascript: 63,
   cpp: 54,
   java: 62,
   php: 68
};
    try{
        const result = await codeRunService(languageMap[language],code);

    res.status(200).json({
        success:true,
        output:result
    })
    }catch(err){

   console.log(err.response?.data || err.message);
   console.log("STATUS:", err.response?.status);

   console.log("DATA:", err.response?.data);

   console.log("MESSAGE:", err.message);

   res.status(500).json({
      message: "Code execution failed"
   });

   res.status(500).json({
      message: "Code execution failed"
   });
}
    

}