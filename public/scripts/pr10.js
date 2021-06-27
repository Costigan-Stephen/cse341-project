const submitName = () => {
    const name = document.getElementById('name').value;
    const alias = document.getElementById('alias').value;
    const url = document.getElementById('url').value;

    const hero = { "name": name, "alias": alias, "image": url };
    var existingEntries = new Array();
    fetch('/prove/10/fetch')
        .then(res => res.json())
        .then(data => {

            existingEntries = JSON.parse(localStorage.getItem("heroes"));
            if (!existingEntries)
                existingEntries = data;

            var i = existingEntries.avengers.length;
            if (name) {
                existingEntries.avengers[i] = hero;
            }
            localStorage.setItem("heroes", JSON.stringify(existingEntries));
            putLocal();
            document.getElementById('name').value = '';
            document.getElementById('alias').value = '';
            document.getElementById('url').value = '';
        })
        .catch(err => {
            console.error("error: ", err);
        });

}
submitName();

const putLocal = () => {
    const nameList = document.getElementById('nameList')
    var data = JSON.parse(localStorage.getItem("heroes"));

    console.log(data);

    while (nameList.firstChild) nameList.firstChild.remove()

    for (const avenger of data.avengers) {
        const article = document.createElement('article');
        article.setAttribute("class", "card");

        const div_img = document.createElement('div');
        div_img.setAttribute("class", "card__image_prev");

        const img = document.createElement('img');
        img.setAttribute("src", avenger.image);
        img.setAttribute("alt", avenger.name);

        div_img.appendChild(img);
        article.appendChild(div_img);

        const div_card = document.createElement('div');
        div_card.setAttribute("class", "card__header");

        const h2 = document.createElement('h2');
        h2.appendChild(document.createTextNode(avenger.name))
        const h3 = document.createElement('h3');
        h3.appendChild(document.createTextNode("AKA " + avenger.alias))
        div_card.appendChild(h2);
        div_card.appendChild(h3);

        article.appendChild(div_card);

        nameList.appendChild(article)
    }
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