
export let normalizeInput=num=>val=>{
    return val
    ?val.trim().length>=num
      ?val.substr(0,num)
      :val.trim()
    :'';
}

