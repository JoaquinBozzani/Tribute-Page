function Slider(slider) {
    if(!(slider instanceof Element)) throw new Error('No slider passed in');
    //create some variables for whit the slider
    let prev;
    let current;
    let next;
    //select the elements needed for the slider
    const slides = slider.querySelector('.slides');
    const prevButton = slider.querySelector('.goToPrev');
    const nextButton = slider.querySelector('.goToNext');
    const caption = slider.querySelector('.img-caption');

    function startSlider() {
        current = slider.querySelector('.current') || slides.firstElementChild;
        prev = current.previousElementSibling || slides.lastElementChild;
        next = current.nextElementSibling || slides.firstElementChild;
    }

    function applyClasses() {
        current.classList.add('current');
        prev.classList.add('prev');
        next.classList.add('next');
        caption.innerHTML = current.getAttribute('alt');
    }  

    //make slider move with the arrowkeys only when it is focused
    function handleKeyUp(event) {
        if(event.key === 'ArrowRight') return move();
        if(event.key === 'ArrowLeft') return move('back');
    }

    function move(direction) {
        //first strip all the classes of the slides
        const classesToRemove = ['prev', 'current', 'next'];
        // [prev, current, next].forEach(el => el.classList.remove(...classesToRemove));
        prev.classList.remove(...classesToRemove);
        current.classList.remove(...classesToRemove);
        next.classList.remove(...classesToRemove);
        if(direction === 'back') {
            //make a new array of the new values and destructure them over and into the prev, current, and next variables
            [prev, current, next] = 
                //get the prev slide, if there is none get the last slide from the entire slider for wrapping    
                [prev.previousElementSibling || slides.lastElementChild,
                prev,
                current];
        } else {
            [prev, current, next] = 
                [current, 
                next,
                //get the next slide, if there is none get the first slide from the entire slider for wrapping    
                next.nextElementSibling || slides.firstElementChild];
        }

        applyClasses();
    }

    //when this slider is created, run the startSlider function
    startSlider();
    applyClasses();

    //event listeners
    prevButton.addEventListener('click', () => move('back'));
    nextButton.addEventListener('click', move);

    //make slider move with the arrowkeys only when it is focused
    slides.addEventListener('focus', () => addEventListener('keyup', handleKeyUp));
    slides.addEventListener('blur', () => removeEventListener('keyup', handleKeyUp));

}

const mySlider = Slider(document.querySelector('#slider'));