document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/toys')
    .then((response) => response.json())
    .then((toys) => {
      const toyCollection = document.querySelector('#toy-collection');
      toys.forEach((toy) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const h2 = document.createElement('h2');
        h2.textContent = toy.name;

        const img = document.createElement('img');
        img.src = toy.image;
        img.classList.add('toy-avatar');

        const p = document.createElement('p');
        p.textContent = `${toy.likes} Likes`;

        const likeBtn = document.createElement('button');
        likeBtn.classList.add('like-btn');
        likeBtn.id = toy.id;
        likeBtn.textContent = 'Like ❤️';

        card.appendChild(h2);
        card.appendChild(img);
        card.appendChild(p);
        card.appendChild(likeBtn);
        toyCollection.appendChild(card);
      });
    });

  const createToyForm = document.querySelector('.create-toy-form');
  createToyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const image = document.querySelector('#image').value;
    const likes = 0;

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        image,
        likes,
      }),
    })
      .then((response) => response.json())
      .then((newToy) => {
        const toyCollection = document.querySelector('#toy-collection');
        const card = document.createElement('div');
        card.classList.add('card');

        const h2 = document.createElement('h2');
        h2.textContent = newToy.name;

        const img = document.createElement('img');
        img.src = newToy.image;
        img.classList.add('toy-avatar');

        const p = document.createElement('p');
        p.textContent = `${newToy.likes} Likes`;

        const likeBtn = document.createElement('button');
        likeBtn.classList.add('like-btn');
        likeBtn.id = newToy.id;
        likeBtn.textContent = 'Like ❤️';

        card.appendChild(h2);
        card.appendChild(img);
        card.appendChild(p);
        card.appendChild(likeBtn);
        toyCollection.appendChild(card);
      });
  });

  const toyCollection = document.querySelector('#toy-collection');
  toyCollection.addEventListener('click', (event) => {
    if (event.target.matches('.like-btn')) {
      const id = event.target.id;
      const currentLikes = parseInt(event.target.previousElementSibling.textContent.split(' ')[0]);
      const newLikes = currentLikes + 1;

      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          likes: newLikes,
        }),
      })
        .then((response) => response.json())
        .then((updatedToy) => {
          event.target.previousElementSibling.textContent = `${updatedToy.likes} Likes`;
        });
    }
  });
});
