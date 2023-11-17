class BandSiteApi{
    constructor(apiKey){
        this.apiKey=apiKey,
        this.baseUrl='https://project-1-api.herokuapp.com/';
    }

    async getComments(){
        try{
            const response=await axios.get(`${this.baseUrl}comments?api_key=${this.apiKey}`);
            // console.log(response); //Baby step
            const sortedComments=response.data.sort((a,b)=> b.timestamp-a.timestamp);
            return sortedComments;
        }
        catch(error){
            console.log(error);
        }
    }

    async postComments(comment){
        try {
            const response= await axios.post(`${this.baseUrl}comments?api_key=${this.apiKey}`,comment);
        } catch (error) {
            console.log('Server Response:', error.response.data);
        }
    }
    
    async getShows(){
        try {
            const response=await axios.get(`${this.baseUrl}showdates?api_key=${this.apiKey}`);
        } catch (error) {
            console.log(error);
        }
    }
}
export default BandSiteApi;






