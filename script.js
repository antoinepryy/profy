const backpack = document.getElementById('backpack');
const blocContainer = document.getElementById('bloc-container');
const backpackContent = document.getElementById('backpack-content'); // For displaying the dropped names

const students = [
    "Mathéo", "Camélia", "Elliot", "Luna", "JONATHAN",
    "Léna", "Jade", "Rose", "Dimitry", "Lihem",
    "JULIE", "HAYDEN", "Nathan", "AYDEN", "Ewen",
    "Camille", "Hajar", "LEIA", "EMILE", "Sibylle",
    "Moussa", "Eden", "SHERLEY", "Grzegorz", "EMY"
];

students.sort(() => Math.random() - 0.5);

// First letter uppercase only
students.forEach((name, index) => {
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    students[index] = formattedName;
});

// Array to store the dropped names in the backpack
let droppedNames = [];
let showNames = false; // Variable to track if names are displayed or hidden

// Dynamically generate the blocks with names
students.forEach((name, index) => {
    const bloc = document.createElement('div');
    bloc.classList.add('bloc');
    bloc.setAttribute('draggable', 'true');
    bloc.setAttribute('id', `bloc${index + 1}`);
    bloc.textContent = name;

    // Add drag event
    bloc.addEventListener('dragstart', dragStart);

    bloc.addEventListener('dragstart', (e) => {
        e.target.classList.add('dragging');
    });

    bloc.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
    });

    backpack.addEventListener('dragenter', (e) => {
        backpack.classList.add('drag-over');
    });

    backpack.addEventListener('dragleave', (e) => {
        backpack.classList.remove('drag-over');
    });

    backpack.addEventListener('drop', (e) => {
        backpack.classList.remove('drag-over');
        drop(e);
    });

    blocContainer.appendChild(bloc);
});

backpack.addEventListener('dragover', dragOver);
backpack.addEventListener('drop', drop);

// Logic for showing and hiding the dropped names when clicking on the backpack
backpack.addEventListener('click', () => {
    if (droppedNames.length > 0 && !showNames) {
        showNames = true; // Set to true to indicate names are now visible
        const nameList = droppedNames.join(', ');
        backpackContent.textContent = `Présents: ${nameList}`;
    } else if (showNames) {
        backpackContent.textContent = ''; // Clear the content to hide names
        showNames = false; // Set to false to indicate names are hidden
    }
});

// Function triggered when drag starts
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

// Function to allow drop (prevents default behavior)
function dragOver(e) {
    e.preventDefault();
}

// Function triggered when dropping
function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const bloc = document.getElementById(id);

    // Check if the block is dropped near the backpack
    if (bloc) {
        bloc.classList.add('hidden'); // Make the block disappear
        const name = bloc.textContent;

        // Add the name to droppedNames array if it's not already there
        if (!droppedNames.includes(name)) {
            droppedNames.push(name);
        }

        // Remove the block from the DOM to avoid multiple drops
        bloc.remove();
    }
}
