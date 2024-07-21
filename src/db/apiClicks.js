import supabase from "@/db/supabase.js";

export async function getClicksForUrls(urlIds){
    const {data, error} = await supabase.from('urls')
    .select("*").in('url_id', urlIds)
   
    if(error){
        console.error(error.message);
        throw new Error("Unable to Load Clicks");
    }
    return data;
}