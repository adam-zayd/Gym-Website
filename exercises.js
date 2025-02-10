
document.addEventListener("DOMContentLoaded", function(){
    
    const exerciseList= document.getElementById("exerciseList");
    const filtersContainer = document.getElementById("filters");
    const muscleGroupsList = [
        "abs", "biceps", "calves", "delts", "forearms", 
        "glutes", "hamstrings", "lats", "pectorals", "quads", "traps", 
        "triceps", "upper back"
    ];

    function createFilters(){
        muscleGroupsList.forEach(function(group){
            const filterDiv= document.createElement("div");
            const checkbox= document.createElement("input");
            checkbox.type= "checkbox"; 
            checkbox.id= group;  
            checkbox.checked= false; 
            checkbox.addEventListener('change', filterExercises);
            const label= document.createElement("label");
            label.setAttribute("for", group); 
            label.textContent= group;
            filterDiv.appendChild(checkbox);
            filterDiv.appendChild(label);
            filtersContainer.appendChild(filterDiv);
        });
    }

    function filterExercises(){
        const checkedGroups= Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                                    .map(function(checkbox) {
                                        return checkbox.id; 
                                    });

        if (checkedGroups.length== 0){
            exerciseList.innerHTML= "<li>Please select at least one muscle group to see exercises.</li>";
            return;
        }

        exerciseList.innerHTML= "";

        checkedGroups.forEach(function(group){
            fetchExercises(group);
        });
    }

    function fetchExercises(muscleGroup){
        fetch(`https://exercisedb.p.rapidapi.com/exercises/target/${muscleGroup}?limit=6&offset=0`, {
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
                    <img src="${exercise.gifUrl}">
                `;
                exerciseList.appendChild(listItem);
            });
        })
    }
    createFilters();
});
