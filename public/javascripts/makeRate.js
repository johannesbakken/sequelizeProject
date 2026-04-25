async function makeRate(userId, url) {
    let value = prompt("Rate hotel from 1 to 5: ");
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            UserId: userId,
            Value: value
        })
    });
    const resData = "Rate made...";
    location.reload();
    return resData;
}