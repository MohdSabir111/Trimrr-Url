import supabase, { supabaseUrl } from "@/db/supabase.js";

//==========[Login]======================================
export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data;
}

//===================[Get Current User]=============================
export async function getCurrentUser(){
    const {data:session, error} = await supabase.auth.getSession();
    if(!session.session) return null;
    if(error) throw new Error(error.message);
    return session.session?.user;
}

//=================[Signup]===========================
export async function signup({name, email, password, profile_pic}) {
    const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  
    const {error: storageError} = await supabase.storage
      .from("profile_pic")
      .upload(fileName, profile_pic);
  
    if (storageError) throw new Error(storageError.message);
  
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
        },
      },
    });
  
    if (error) throw new Error(error.message);
  
    return data;
  }

  //=================[LogOut]============================

  export async function Logout(){
    const {error} = await supabase.auth.signOut();
    if (error) throw new Error(error.message);


  }