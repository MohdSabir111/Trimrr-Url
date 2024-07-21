import supabase from "@/db/supabase.js";

// ==========[Get all Urls]==========================

export async function getUrls(user_id){
    const {data, error} = await supabase.from('urls')
    .select("*").eq('user_id', user_id)
   
    if(error){
        console.error(error.message);
        throw new Error("Unable to Load Urls");
    }
    return data;
}

// ==========[Create A New Url]==========================================

export async function createUrl({title, longUrl, customUrl, user_id}, qrcode) {
    const short_url = Math.random().toString(36).substr(2, 6);
    const fileName = `qr-${short_url}`;
  
    const {error: storageError} = await supabase.storage
      .from("qrs")
      .upload(fileName, qrcode);
  
    if (storageError) throw new Error(storageError.message);
  
    const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;
  
    const {data, error} = await supabase
      .from("urls")
      .insert([
        {
          title,
          user_id,
          original_url: longUrl,
          custom_url: customUrl || null,
          short_url,
          qr,
        },
      ])
      .select();
  
    if (error) {
      console.error(error);
      throw new Error("Error creating short URL");
    }
  
    return data;
  }
  
// ==========[Delete A Url By Id]==========================
   export async function deleteUrl(id) {
     const {data, error} = await supabase.from("urls").delete().eq("id", id);
  
    if (error) {
      console.error(error);
      throw new Error("Unable to delete Url");
    }
  
    return data;
  }