document.addEventListener('DOMContentLoaded', function() {
    const likeBtn = document.getElementById('like-btn');
    const likeImg = document.getElementById('like-img');
    const likesCount = document.getElementById('likes-count');
    const commentBtn = document.getElementById('comment-btn');
    const shareBtn = document.getElementById('share-btn');
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const bookmarkImg = document.getElementById('bookmark-img');
    const commentInput = document.getElementById('comment-input');
    const postCommentBtn = document.getElementById('post-comment');
    const commentsSection = document.getElementById('comments-section');
    const viewComments = document.getElementById('view-comments');
    
    let isLiked = false;
    let likes = 1234;
    let isBookmarked = false;
    let commentsExpanded = false;

    // Like button
    likeBtn.addEventListener('click', function() {
        if (isLiked) {
            likeImg.src = 'heart.png'; // Empty heart (gray)
            likes--;
        } else {
            likeImg.src = 'like.png'; // Filled heart (red)
            likeImg.classList.add('heart-animation');
            likes++;
            setTimeout(() => likeImg.classList.remove('heart-animation'), 600);
        }
        isLiked = !isLiked;
        likesCount.textContent = likes.toLocaleString() + ' likes';
    });

    // Comment button
    commentBtn.addEventListener('click', function() {
        commentInput.scrollIntoView({ behavior: 'smooth' });
        commentInput.focus();
    });

    // Share button
    shareBtn.addEventListener('click', function() {
        const mockLink = 'https://instagram.com/p/mockpost123';
        navigator.clipboard.writeText(mockLink).then(() => {
            alert('Link copied to clipboard: ' + mockLink);
        }).catch(() => {
            alert('Sharing simulated: ' + mockLink);
        });
    });

    // Bookmark button
    bookmarkBtn.addEventListener('click', function() {
        if (isBookmarked) {
            bookmarkImg.src = 'pin.png'; // Empty bookmark (gray)
        } else {
            bookmarkImg.src = 'pinned.png'; // Filled bookmark (black)
        }
        isBookmarked = !isBookmarked;
    });

    // View comments toggle
    viewComments.addEventListener('click', function() {
        commentsExpanded = !commentsExpanded;
        if (commentsExpanded) {
            commentsSection.classList.add('expanded');
            viewComments.textContent = 'Hide comments';
        } else {
            commentsSection.classList.remove('expanded');
            viewComments.textContent = 'View all 3 comments';
        }
    });

    // Comment input and post
    commentInput.addEventListener('input', function() {
        postCommentBtn.disabled = !commentInput.value.trim();
    });
    postCommentBtn.addEventListener('click', function() {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `<strong>you</strong> ${commentText}`;
            commentsSection.appendChild(newComment);
            commentInput.value = '';
            postCommentBtn.disabled = true;
            // Auto-expand if not already
            if (!commentsExpanded) {
                viewComments.click();
            }
        }
    });
    commentInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !postCommentBtn.disabled) {
            postCommentBtn.click();
        }
    });
});