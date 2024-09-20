const listItem = document.querySelectorAll('.left_admin_container_option');

listItem.forEach((item) => {
    item.addEventListener('click', () => {
        listItem.forEach((item) => {
            item.classList.remove('active_block');
        });
        item.classList.add('active_block');
    });
});