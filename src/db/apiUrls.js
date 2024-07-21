import supabase from "@/db/supabase.js";

export async function getUrls(user_id){
    const {data, error} = await supabase.from('urls')
    .select("*").eq('user_id', user_id)
   
    if(error){
        console.error(error.message);
        throw new Error("Unable to Load Urls");
    }
    return data;
}