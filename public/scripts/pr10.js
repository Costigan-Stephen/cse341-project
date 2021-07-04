const socket = io('/');

socket.on('hero', () => {
    putLocal();
});

const submitName = (sub = 0) => {
    const name = document.getElementById('name').value;
    const alias = document.getElementById('alias').value;
    const url = document.getElementById('url').value;
    if (sub) {
        if (!name || !alias) {
            document.getElementById("error").innerHTML = "<span style='color: yellow;'>Please enter all required fields</span>";
            return;
        }

        const hero = { "name": name, "alias": alias, "image": url };
    }
    const hero = { "name": name, "alias": alias, "image": url };
    var existingEntries = new Array();
    fetch('/prove/10/fetch')
        .then(res => res.json())
        .then(existingEntries => {

            if (matchingName(existingEntries.avengers, name)) {
                document.getElementById("error").innerHTML = "<span style='color: yellow;'>Name already exists in system</span>";
                return;
            }

            if (sub == 1) {
                var i = existingEntries.avengers.length;
                if (name) {
                    existingEntries.avengers[i] = hero;
                }
            }
            // sessionStorage.setItem("heroes", JSON.stringify(existingEntries));
            if (sub == 1) {
                postData();
            }
            document.getElementById('name').value = '';
            document.getElementById('alias').value = '';
            document.getElementById('url').value = '';
        })
        .catch(err => {
            console.error("error: ", err);
        });

}
submitName();


const postData = () => {
    const name = document.getElementById('name').value;
    const alias = document.getElementById('alias').value;
    const url = document.getElementById('url').value;
    const hero = { "name": name, "alias": alias, "url": url };

    fetch('/prove/10', {
            method: 'POST', // Send a POST request
            headers: {
                // Set the Content-Type, since our server expects JSON
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hero),
        })
        .then((res) => {
            // Clear the input
            document.getElementById('name').value = '';
            document.getElementById('alias').value = '';
            document.getElementById('url').value = '';

            // Repopulate the list with our new name added
            putLocal();

            // Broadcast a change to the database
            socket.emit('hero');
        })
        .catch((err) => {
            // Clear the input
            document.getElementById('name').value = '';
            document.getElementById('alias').value = '';
            document.getElementById('url').value = '';
            console.error(err);
        });

}


const putLocal = () => {
    fetch('/prove/10/fetch')
        .then(res => res.json())
        .then(data => {

            const nameList = document.getElementById('nameList')
            var data = JSON.parse(data);

            while (nameList.firstChild) nameList.firstChild.remove()

            for (const avenger of data.avengers) {

                if (avenger.name != NULL) {
                    const article = document.createElement('article');
                    article.setAttribute("class", "card");

                    const div_img = document.createElement('div');
                    div_img.setAttribute("class", "card__image_prev");

                    const img = document.createElement('img');
                    if (avenger.image) {
                        img.setAttribute("src", avenger.image);
                    } else {
                        img.setAttribute("src", "/images/heroes/none.jpg");
                    }
                    img.setAttribute("alt", avenger.name);

                    div_img.appendChild(img);
                    article.appendChild(div_img);

                    const div_card = document.createElement('div');
                    div_card.setAttribute("class", "card__header");

                    const h2 = document.createElement('h2');
                    h2.appendChild(document.createTextNode(avenger.name))
                    const h3 = document.createElement('h3');
                    if (avenger.alias) {
                        h3.appendChild(document.createTextNode("AKA " + avenger.alias))
                    }

                    div_card.appendChild(h2);
                    div_card.appendChild(h3);

                    article.appendChild(div_card);

                    nameList.appendChild(article)
                }
            }
        })
        .catch(err => {
            console.error("error: ", err);
        });
}

const matchingName = (JSON, nameValue) => {
    var hasMatch = false;

    for (var index = 0; index < JSON.length; ++index) {

        var hero = JSON[index];

        if (hero.name == nameValue) {
            hasMatch = true;
            break;
        }
    }
    return hasMatch;
}

/*
<article class="card">
    <div class="card__image_prev">
        <img src="<%= domain %><%= object.image %>" alt="<%= object.name %>">
    </div>
    <div class="card__header">
        <h2>
            <%= object.name %>
        </h2>
        <h3>
            AKA <%= object.alias %>
        </h3>
    </div>
</article>
*/