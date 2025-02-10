document.addEventListener("DOMContentLoaded", function() {
    const exerciseList= document.getElementById("exerciseList");

    fetch("https://exercisedb.p.rapidapi.com/exercises?limit=20&offset=0", {
        method: "GET",
        headers:{
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
            "x-rapidapi-key": "11c351d56emsh94e25460e1434e8p1df9d9jsn86b5275223e3"
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        data.forEach(function(exercise){
            let listItem= document.createElement("li");

            listItem.innerHTML= `
                <h3>${exercise.name}</h3>
                <p>Target Muscle: ${exercise.target}</p>
                <img src="${exercise.gifUrl}" >`;

            exerciseList.appendChild(listItem);
        });
    })
    .catch(function(error){
        console.log("Error fetching exercises:", error);
    });
});
