async function addHotel(url){
    let name = prompt("Enter hotel name: ");
    let hotelLocation = prompt("Enter hotel location: ");
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            Name: name,
            Location: hotelLocation
        })
    }).then((response)=>{
        if(response.ok){
            const resData = "Hotel added...";
            location.reload();
            return Promise.resolve(resData);
        }
        return Promise.reject(response);
    }).catch((response)=> {
        alert(response.statusText);
    });
}