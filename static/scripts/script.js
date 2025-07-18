document.addEventListener('DOMContentLoaded', () => {
    loadAnimals();

    const addAnimalBtn = document.getElementById('add-animal-btn');
    
    addAnimalBtn.addEventListener('click', () => {
        displayFormModal();
    });
});

function loadAnimals() {
    fetch('/animals/api')
    .then(response => response.json())
    .then((data) => {
        const contentContainer = document.getElementById('content');
        contentContainer.innerHTML = '';

        const ul = document.createElement('ul');
        ul.className = 'animal-list';

        data.forEach((content) => {
            const animal = addAnimalItem(content);
            ul.appendChild(animal);
        });

        contentContainer.appendChild(ul);
    })
    .catch(error => {
        console.log('Error:', error);
    });
}

function addAnimalItem(contents) {
    const animal = document.createElement('li');
    animal.className = 'animal-item';

    animal.innerHTML = `
        <img 
            class="animal-image"
            src="${contents.image_url}" 
            alt="${contents.name}" 
        >
        <span>Name: ${contents.name}</span>
        <span>Species: ${contents.species}</span>
        <span>Age: ${contents.age} year(s) old</span>
    `;

    return animal;
}

function displayFormModal() {
    const modal = document.createElement('div');
    modal.id = 'form-modal';

    const form = document.createElement('form');
        form.action = '/add';
        form.method = 'post';
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        form.style.backgroundColor = 'white';
        form.style.padding = '20px';
        form.style.borderRadius = '5px';
        form.style.width = '300px';
        form.style.margin = 'auto';
        form.style.marginTop = '100px';

    form.innerHTML = `
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="species">Species:</label>
        <input type="text" id="species" name="species" required>
        <label for="age">Age:</label>
        <input type="number" id="age" name="age" min="0" required>
        <button type="submit" style="margin-bottom: 3.5px" class="button">Add Animal</button>
        <button type="button" id="close-modal-btn" class="button">Cancel</button>
    `;

    modal.appendChild(form);

    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    document.body.appendChild(modal);

    document.getElementById('close-modal-btn').addEventListener('click', closeFormModal);

    const animalForm = document.getElementById('animal-form');

    animalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(animalForm);

        fetch('/add', {
            method: 'POST',
            body: formData
        })
        .catch(error => {
            console.log('Error adding animal: ' + error.message);
        });
    });
}

function closeFormModal() {
    const modal = document.getElementById('form-modal');
    if (modal) {
        modal.remove();
    }
}