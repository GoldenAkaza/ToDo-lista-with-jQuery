$(document).ready(function () {
    // Tärkeimpien DOM-elementtien valinnat
    const $form = $('#todo-form'); // Lomake, jolla lisätään uusia tehtäviä
    const $input = $('#todo-input'); // Tekstikenttä, johon syötetään tehtävän nimi
    const $list = $('#todo-list'); // Tehtävälista
    const $filterButtons = $('#filter-buttons button'); // Suodatuspainikkeet (Kaikki, Aktiiviset, Valmiit)
    const $clearCompletedBtn = $('#clear-completed-btn'); // Nappi valmiiden tehtävien poistamiseen

    // Lataa tallennetut tehtävät selaimen localStoragesta tai luo tyhjä lista
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodoList(); // Piirretään tehtävät näkyviin sivun latauksen yhteydessä

    // Lomakkeen lähetys, kun käyttäjä lisää uuden tehtävän
    $form.on('submit', function (e) {
        e.preventDefault(); // Estetään lomakkeen oletustoiminto (sivun uudelleenlataus)
        const todoText = $input.val().trim(); // Syötetyn tekstin haku ja trimmaus

        // Tarkistetaan syötteen validius
        if (todoText === '') {
            alert('Teksti kenttä ei voi olla tyhjä!');
        } else if (todoText.length < 3) {
            alert('Teksti täytyy olla vähintään 3 merkkiä pitkä.');
        } else {
            // Luodaan uusi tehtäväobjekti
            const todoItem = {
                text: todoText, // Käyttäjän syöttämä tehtävän nimi
                completed: false // Uusi tehtävä on oletuksena "aktiivinen"
            };
            todos.push(todoItem); // Lisätään uusi tehtävä listaan
            localStorage.setItem('todos', JSON.stringify(todos)); // Tallennetaan localStorageen
            renderTodoItem(todoItem, true); // Piirretään uusi tehtävä animaation kera
            $input.val(''); // Tyhjennetään syöttökenttä
        }
    });

    // Suodatuspainikkeiden toiminta (Kaikki, Aktiiviset, Valmiit)
    $filterButtons.on('click', function () {
        $filterButtons.removeClass('active'); // Poistetaan aktiivinen luokka kaikilta painikkeilta
        $(this).addClass('active'); // Lisätään aktiivinen luokka painetulle painikkeelle
        renderTodoList(); // Piirretään tehtävät suodattimen perusteella
    });

    // Valmiiden tehtävien poistaminen
    $clearCompletedBtn.on('click', function () {
        const completedTodos = todos.filter(todo => todo.completed); // Haetaan kaikki valmiit tehtävät
        if (completedTodos.length > 0) {
            // Käydään kaikki valmiit tehtävät läpi ja poistetaan ne yksitellen
            completedTodos.forEach(todo => {
                const $completedItem = $list.find('li').filter(function () {
                    return $(this).find('span').text() === todo.text; // Etsitään vastaava listaelementti tekstin perusteella
                });

                $completedItem.fadeOut(300, function () {
                    // Poistetaan DOM:sta fadeOut-animaation jälkeen
                    $(this).remove();
                    todos = todos.filter(t => t.text !== todo.text); // Poistetaan tehtävä myös tallennuslistasta
                    localStorage.setItem('todos', JSON.stringify(todos)); // Päivitetään localStorage
                });
            });
        }
    });

    // Piirretään tehtävälista näkyviin
    function renderTodoList() {
        const activeFilter = $('#filter-buttons .active').data('filter'); // Haetaan aktiivinen suodatin (Kaikki/Aktiiviset/Valmiit)
        $list.empty(); // Tyhjennetään lista ennen uudelleenrakennusta

        // Käydään kaikki tehtävät läpi ja piirretään vain suodattimen mukaiset
        todos.forEach(todo => {
            if (
                activeFilter === 'all' || // Näytä kaikki tehtävät
                (activeFilter === 'active' && !todo.completed) || // Näytä vain aktiiviset
                (activeFilter === 'completed' && todo.completed) // Näytä vain valmiit
            ) {
                renderTodoItem(todo, false); // Piirretään ilman fadeIn-animaatiota
            }
        });
    }

    // Piirretään yksittäinen tehtävä
    function renderTodoItem(todo, useFadeIn) {
        // Luodaan listaelementti
        const $li = $('<li>')
            .addClass('list-group-item d-flex justify-content-between align-items-center')
            .hide(); // Piilotetaan elementti aluksi animaatiota varten

        const $taskText = $('<span>').text(todo.text); // Tehtävän nimi
        if (todo.completed) {
            $taskText.addClass('text-decoration-line-through'); // Lisää yliviivauksen, jos tehtävä on valmis
        }

        // "Valmis/Palauta" -painike
        const $completeBtn = $('<button>')
            .addClass('btn btn-success btn-sm me-2')
            .text(todo.completed ? 'Palauta' : 'Valmis') // Teksti riippuu tehtävän tilasta
            .on('click', function () {
                // Vaihdetaan tehtävän tila (aktiivinen/valmis)
                const $taskItem = $(this).closest('li');
                todo.completed = !todo.completed; // Käänteinen tila
                localStorage.setItem('todos', JSON.stringify(todos)); // Tallennetaan uusi tila
                $taskItem.fadeOut(300, function () { // fadeOut-animaatio
                    renderTodoList(); // Renderöidään lista uudelleen
                });
            });

        // "Poista" -painike
        const $deleteBtn = $('<button>')
            .addClass('btn btn-danger btn-sm')
            .text('Poista')
            .on('click', function () {
                const $taskItem = $(this).closest('li');
                $taskItem.fadeOut(300, function () { // fadeOut ennen poistamista
                    todos = todos.filter(t => t.text !== todo.text); // Poistetaan tehtävä listasta
                    localStorage.setItem('todos', JSON.stringify(todos)); // Päivitetään localStorage
                    renderTodoList(); // Renderöidään lista uudelleen
                });
            });

        $li.append($taskText, $completeBtn, $deleteBtn); // Lisätään tehtävän nimi ja painikkeet listaelementtiin

        if (useFadeIn) {
            $list.append($li.fadeIn(300)); // fadeIn-animaatio, jos kyseessä on uusi tehtävä
        } else {
            $list.append($li.show()); // Näytetään ilman animaatiota
        }
    }
});
