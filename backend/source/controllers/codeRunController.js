import codeRunService from "../services/codeRunService.js"

export default async function codeRunController(req,res){
    const {language,code} = req.body
    

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

  

  

   res.status(500).json({
      message: "Code execution failed"
   });
}
    

}