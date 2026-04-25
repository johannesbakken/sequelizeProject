async function makeReservation(userId, roomId, url){
    let startDate = prompt("Please provide start date in format YYYY-MM-DD HH:MM:SS");
    let endDate = prompt("Please provide end date in format YYYY-MM-DD HH:MM:SS");
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            UserId: userId,
            RoomId: roomId,
            StartDate: startDate,
            EndDate: endDate
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