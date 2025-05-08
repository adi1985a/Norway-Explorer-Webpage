document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentFilter = 'all';

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            currentFilter = category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Animate items out
            galleryItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
            });

            // Filter gallery items with delay for animation
            setTimeout(() => {
                galleryItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                });
            }, 300);
        });
    });

    // Modal functionality
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-img');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    let currentImageIndex = 0;
    let visibleItems = [];

    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => {
            return currentFilter === 'all' || item.dataset.category === currentFilter;
        });
    }

    // Open modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            updateVisibleItems();
            currentImageIndex = visibleItems.indexOf(item);
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.gallery-overlay').textContent;
            showModal(imgSrc, caption);
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'Escape') {
                hideModal();
            }
        }
    });

    // Previous image
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousImage);
    }

    // Next image
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }

    function showPreviousImage() {
        updateVisibleItems();
        currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
        const prevItem = visibleItems[currentImageIndex];
        const imgSrc = prevItem.querySelector('img').src;
        const caption = prevItem.querySelector('.gallery-overlay').textContent;
        updateModal(imgSrc, caption);
    }

    function showNextImage() {
        updateVisibleItems();
        currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
        const nextItem = visibleItems[currentImageIndex];
        const imgSrc = nextItem.querySelector('img').src;
        const caption = nextItem.querySelector('.gallery-overlay').textContent;
        updateModal(imgSrc, caption);
    }

    function showModal(imgSrc, caption) {
        modal.style.display = 'block';
        modalImg.style.opacity = '0';
        modalImg.src = imgSrc;
        modalCaption.textContent = caption;
        
        // Fade in animation
        setTimeout(() => {
            modalImg.style.opacity = '1';
        }, 50);
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    function updateModal(imgSrc, caption) {
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.src = imgSrc;
            modalCaption.textContent = caption;
            modalImg.style.opacity = '1';
        }, 300);
    }

    // Voting functionality
    const upvoteBtn = document.querySelector('.upvote');
    const downvoteBtn = document.querySelector('.downvote');
    const voteCount = document.querySelector('.vote-count');
    let votes = parseInt(localStorage.getItem('photoVotes')) || 0;

    if (voteCount) {
        voteCount.textContent = votes;
    }

    if (upvoteBtn) {
        upvoteBtn.addEventListener('click', function() {
            votes++;
            updateVotes();
            this.classList.add('voted');
            setTimeout(() => this.classList.remove('voted'), 300);
        });
    }

    if (downvoteBtn) {
        downvoteBtn.addEventListener('click', function() {
            votes--;
            updateVotes();
            this.classList.add('voted');
            setTimeout(() => this.classList.remove('voted'), 300);
        });
    }

    function updateVotes() {
        voteCount.textContent = votes;
        localStorage.setItem('photoVotes', votes.toString());
        
        // Animate vote count
        voteCount.classList.add('vote-update');
        setTimeout(() => voteCount.classList.remove('vote-update'), 300);
    }

    // File upload functionality
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.querySelector('#file-input');

    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            handleFiles(files);
        });
    }

    function handleFiles(files) {
        // Add visual feedback
        uploadArea.classList.add('uploading');
        
        // Simulate upload process
        setTimeout(() => {
            uploadArea.classList.remove('uploading');
            alert('Files uploaded successfully! (Demo only)');
        }, 1500);
    }

    // Initialize animations for gallery items
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
    });

    // Animate items in on page load
    setTimeout(() => {
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 100);
        });
    }, 300);
});
