const words = ["Аліса в зазеркалі", "Том Круз", "Грімм", "Апероль", "Лалаленд", "Дорога до НБА", "Марвел", "Залізна людина", "Людина-мураха", "Апгрейд"];

document.addEventListener("DOMContentLoaded", function() {
    let input = document.getElementById("myInput");

    input.addEventListener("input", function() {
        let value = this.value;
        closeAllLists();
        if (!value) return false;
        
        let divList = document.createElement("div");
        divList.setAttribute("id", this.id + "autocomplete-list");
        divList.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(divList);

        words.forEach(word => {
            if (word.substr(0, value.length).toUpperCase() === value.toUpperCase()) {
                let item = document.createElement("div");
                item.innerHTML = "<strong>" + word.substr(0, value.length) + "</strong>";
                item.innerHTML += word.substr(value.length);
                item.innerHTML += "<input type='hidden' value='" + word + "'>";
                item.addEventListener("click", function() {
                    input.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                divList.appendChild(item);
            }
        });
    });

    input.addEventListener("keydown", function(e) {
        let list = document.getElementById(this.id + "autocomplete-list");
        if (list) list = list.getElementsByTagName("div");
        if (e.keyCode === 40) {
            currentFocus++;
            addActive(list);
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(list);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (list) list[currentFocus].click();
            }
        }
    });

    let currentFocus = -1;

    function addActive(list) {
        if (!list) return false;
        removeActive(list);
        if (currentFocus >= list.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (list.length - 1);
        list[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(list) {
        for (let i = 0; i < list.length; i++) {
            list[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        let items = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < items.length; i++) {
            if (elmnt !== items[i] && elmnt !== input) {
                items[i].parentNode.removeChild(items[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
});
