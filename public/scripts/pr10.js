const submitName = () => {
    const name = document.getElementById('name').value;
    const alias = document.getElementById('alias').value;
    const url = document.getElementById('url').value;

    const hero = { "name": name, "alias": alias, "image": url };

    console.log(hero);

    const uri = '/prove/10';

    fetch(uri, {
            method: "POST", // Send a POST request
            headers: {
                // Set the Content-Type, since our server expects JSON
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ "name": name, "alias": alias, "image": url }),
        })
        .then(res => {
            // Clear the input
            addToList();
            document.getElementById('name').value = '';
            document.getElementById('alias').value = '';
            document.getElementById('url').value = '';
            console.log("response: ", res);
        })
        .catch(err => {
            // Clear the input
            document.getElementById('name').value = '';
            document.getElementById('alias').value = '';
            document.getElementById('url').value = '';
            console.error("error: ", err);
        });
}

const addToList = () => {
    const nameList = document.getElementById('nameList')

    fetch('/prove/10/fetch')
        .then(res => res.json())
        .then(data => {
            // Clear the list first
            console.log(data)
                //     while (formData.firstChild) nameList.firstChild.remove()

            // Repopulate the list
            for (const avenger of data.avengers) {
                const article = document.createElement('article')
                article.appendChild(document.createTextNode(avenger.name))
                nameList.appendChild(article)
            }
        })
        .catch(err => {
            console.log('Error:' + err)
        })
}



addToList();
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
        AKA
       </h3>
    </div>
</article>
*/