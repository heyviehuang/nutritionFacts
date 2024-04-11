/*調整Card寬高*/

document.getElementById('resize-btn').addEventListener('click', function() {
    const width = document.getElementById('card-width').value;
    const height = document.getElementById('card-height').value;

    const cards = document.querySelectorAll('.card');

    cards.forEach(function(card) {
        if (width) {
            card.style.width = width + 'cm';
        }
        if (height) {
            card.style.height = height + 'cm';
        }
    });
});