import axios from 'axios'
export default async function codeRunService(language_id,code){

     const response = await axios.post(
        "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
        {
            source_code: code,
            language_id: language_id
        }
    );


    return (
        response.data.stdout ||
        response.data.stderr ||
        response.data.compile_output ||
        response.data.message ||
        "No output"
    );
}